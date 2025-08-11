import { EnvValue, GeneratorOptions } from '@prisma/generator-helper';
import prismaInternals from '@prisma/internals';
import { promises as fs } from 'fs';
import path from 'path';
import pluralize from 'pluralize';
import { generate as PrismaTrpcShieldGenerator } from 'prisma-trpc-shield-generator/lib/prisma-generator.js';
import { generate as PrismaZodGenerator } from 'prisma-zod-generator/lib/prisma-generator.js';
import { configSchema } from './config.js';
import {
  generateBaseRouter,
  generateCreateRouterImport,
  generateProcedure,
  generateRouterImport,
  generateRouterSchemaImports,
  generateShieldImport,
  generatetRPCImport,
  getInputTypeByOpName,
  resolveModelsComments,
} from './helpers.js';
import { project } from './project.js';
import removeDir from './utils/removeDir.js';

const { getDMMF, parseEnvValue } = prismaInternals;

export async function generate(options: GeneratorOptions) {
  const outputDir = parseEnvValue(options.generator.output as EnvValue);
  const results = configSchema.safeParse(options.generator.config);
  if (!results.success) throw new Error('Invalid options passed');
  const config = results.data;

  await fs.mkdir(outputDir, { recursive: true });
  await removeDir(outputDir, true);

  if (config.withZod) {
    await PrismaZodGenerator(options);
  }

  if (config.withShield === true) {
    const shieldOutputPath = path.join(outputDir, './shield');
    await PrismaTrpcShieldGenerator({
      ...options,
      generator: {
        ...options.generator,
        output: {
          ...options.generator.output,
          value: shieldOutputPath,
          fromEnvVar: null,
        },
        config: {
          ...options.generator.config,
          contextPath: config.contextPath,
        },
      },
    });
  }

  const prismaClientProvider = options.otherGenerators.find((it) => {
    const provider = parseEnvValue(it.provider);
    return provider === 'prisma-client-js' || provider === 'prisma-client';
  });

  if (!prismaClientProvider) {
    throw new Error(
      'Prisma tRPC Generator requires a Prisma Client generator. Please add one of the following to your schema:\n\n' +
        'generator client {\n' +
        '  provider = "prisma-client-js"\n' +
        '}\n\n' +
        'OR\n\n' +
        'generator client {\n' +
        '  provider = "prisma-client"\n' +
        '  output   = "./generated/client"\n' +
        '}',
    );
  }

  const prismaClientDmmf = await getDMMF({
    datamodel: options.datamodel,
    previewFeatures: prismaClientProvider.previewFeatures,
  });

  const modelOperations = prismaClientDmmf.mappings.modelOperations;
  const models = prismaClientDmmf.datamodel.models;
  const hiddenModels: string[] = [];
  resolveModelsComments([...models], hiddenModels);
  const createRouter = project.createSourceFile(
    path.resolve(outputDir, 'routers', 'helpers', 'createRouter.ts'),
    undefined,
    { overwrite: true },
  );

  generatetRPCImport(createRouter);
  if (config.withShield) {
    generateShieldImport(createRouter, options, config.withShield);
  }

  generateBaseRouter(createRouter, config, options);

  createRouter.formatText({
    indentSize: 2,
  });

  const appRouter = project.createSourceFile(
    path.resolve(outputDir, 'routers', `index.ts`),
    undefined,
    { overwrite: true },
  );

  generateCreateRouterImport({
    sourceFile: appRouter,
  });

  const routerStatements = [];

  for (const modelOperation of modelOperations) {
    const { model, ...operations } = modelOperation;
    if (hiddenModels.includes(model)) continue;

    const modelActions = Object.keys(operations).filter((opType) => {
      const baseOpType = opType.replace('One', '').replace('OrThrow', '');
      return config.generateModelActions.some(
        (action) => action === baseOpType,
      );
    });
    if (!modelActions.length) continue;

    const plural = pluralize(model.toLowerCase());

    generateRouterImport(appRouter, plural, model);
    const modelRouter = project.createSourceFile(
      path.resolve(outputDir, 'routers', `${model}.router.ts`),
      undefined,
      { overwrite: true },
    );

    generateCreateRouterImport({
      sourceFile: modelRouter,
      config,
    });

    if (config.withZod) {
      generateRouterSchemaImports(modelRouter, model, modelActions);
    }

    modelRouter.addStatements(/* ts */ `
      export const ${plural}Router = t.router({`);

    for (const opType of modelActions) {
      const opNameWithModel = operations[opType as keyof typeof operations];
      const baseOpType = opType.replace('OrThrow', '');

      generateProcedure(
        modelRouter,
        opNameWithModel ?? '',
        getInputTypeByOpName(baseOpType, model) ?? '',
        model,
        opType,
        baseOpType,
        config,
      );
    }

    modelRouter.addStatements(/* ts */ `
    })`);

    modelRouter.formatText({ indentSize: 2 });
    routerStatements.push(/* ts */ `
      ${model.toLowerCase()}: ${plural}Router`);
  }

  appRouter.addStatements(/* ts */ `
    export const appRouter = t.router({${routerStatements}})
    `);

  appRouter.formatText({ indentSize: 2 });
  await project.save();
}
