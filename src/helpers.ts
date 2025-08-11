import { DMMF, GeneratorOptions } from '@prisma/generator-helper';
import prismaInternals from '@prisma/internals';
import { SourceFile } from 'ts-morph';
import { Config } from './config.js';
import getRelativePath from './utils/getRelativePath.js';
import { uncapitalizeFirstLetter } from './utils/uncapitalizeFirstLetter.js';

const { parseEnvValue } = prismaInternals;

const getProcedureName = (config: Config) => {
  if (config.withShield) {
    return 'shieldedProcedure';
  }
  if (config.withMiddleware) {
    return 'protectedProcedure';
  }
  return 'publicProcedure';
};

export const generateCreateRouterImport = ({
  sourceFile,
  config,
}: {
  sourceFile: SourceFile;
  config?: Config;
}) => {
  const imports = ['t'];

  if (config) {
    imports.push(getProcedureName(config));
  }

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./helpers/createRouter${config?.importExtension ? '.' + config.importExtension : ''}`,
    namedImports: imports,
  });
};

export const generatetRPCImport = (sourceFile: SourceFile) => {
  sourceFile.addImportDeclaration({
    moduleSpecifier: '@trpc/server',
    namespaceImport: 'trpc',
  });
};

export const generateShieldImport = (
  sourceFile: SourceFile,
  options: GeneratorOptions,
  value: string | boolean,
  config?: Config,
) => {
  const output = options.generator.output;
  if (!output) {
    throw new Error('Generator output path is required');
  }
  const outputDir = parseEnvValue(output);

  let shieldPath = getRelativePath(
    outputDir,
    'shield/shield',
    undefined,
    undefined,
    config?.importExtension,
  );

  if (typeof value === 'string') {
    shieldPath = getRelativePath(
      outputDir,
      value,
      true,
      options.schemaPath,
      config?.importExtension,
    );
  }

  sourceFile.addImportDeclaration({
    moduleSpecifier: shieldPath,
    namedImports: ['permissions'],
  });
};

export const generateMiddlewareImport = (
  sourceFile: SourceFile,
  options: GeneratorOptions,
  config?: Config,
) => {
  const output = options.generator.output;
  if (!output) {
    throw new Error('Generator output path is required');
  }
  const outputDir = parseEnvValue(output);
  sourceFile.addImportDeclaration({
    moduleSpecifier: getRelativePath(
      outputDir,
      'middleware',
      undefined,
      undefined,
      config?.importExtension,
    ),
    namedImports: ['permissions'],
  });
};

export const generateRouterImport = (
  sourceFile: SourceFile,
  modelNamePlural: string,
  modelNameCamelCase: string,
  config?: Config,
) => {
  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${modelNameCamelCase}.router${config?.importExtension ? '.' + config.importExtension : ''}`,
    namedImports: [`${modelNamePlural}Router`],
  });
};

export function generateBaseRouter(
  sourceFile: SourceFile,
  config: Config,
  options: GeneratorOptions,
) {
  const output = options.generator.output;
  if (!output) {
    throw new Error('Generator output path is required');
  }
  const outputDir = parseEnvValue(output);

  // Add context import
  sourceFile.addStatements(/* ts */ `
  import type { Context } from '${getRelativePath(
    outputDir,
    config.contextPath,
    true,
    options.schemaPath,
    config.importExtension,
  )}';
  `);

  // Add trpcOptions import if specified
  if (config.trpcOptionsPath) {
    sourceFile.addStatements(/* ts */ `
    import trpcOptions from '${getRelativePath(
      outputDir,
      config.trpcOptionsPath,
      true,
      options.schemaPath,
      config.importExtension,
    )}';
    `);
  }

  // Initialize tRPC
  sourceFile.addStatements(/* ts */ `
  export const t = trpc.initTRPC.context<Context>().create(${
    config.trpcOptionsPath ? 'trpcOptions' : ''
  });
  `);

  // Generate middleware declarations
  const middlewares = generateMiddlewareDeclarations(
    sourceFile,
    config,
    options,
    outputDir,
  );

  // Add public procedure
  sourceFile.addStatements(/* ts */ `
    export const publicProcedure = t.procedure; `);

  // Add protected/shielded procedure if middlewares exist
  if (middlewares.length > 0) {
    addProtectedProcedure(sourceFile, config, middlewares);
  }
}

function generateMiddlewareDeclarations(
  sourceFile: SourceFile,
  config: Config,
  options: GeneratorOptions,
  outputDir: string,
) {
  const middlewares: Array<{ type: string; value: string }> = [];

  // Handle global middleware (boolean)
  if (config.withMiddleware && typeof config.withMiddleware === 'boolean') {
    sourceFile.addStatements(/* ts */ `
    export const globalMiddleware = t.middleware(async ({ ctx, next }) => {
      // Add your middleware logic here
      return next()
    });`);
    middlewares.push({
      type: 'global',
      value: /* ts */ `.use(globalMiddleware)`,
    });
  }

  // Handle global middleware (string path)
  if (config.withMiddleware && typeof config.withMiddleware === 'string') {
    sourceFile.addStatements(/* ts */ `
  import defaultMiddleware from '${getRelativePath(
    outputDir,
    config.withMiddleware,
    true,
    options.schemaPath,
    config.importExtension,
  )}';
  `);
    sourceFile.addStatements(/* ts */ `
    export const globalMiddleware = t.middleware(defaultMiddleware);`);
    middlewares.push({
      type: 'global',
      value: /* ts */ `.use(globalMiddleware)`,
    });
  }

  // Handle shield middleware
  if (config.withShield) {
    sourceFile.addStatements(/* ts */ `
    export const permissionsMiddleware = t.middleware(permissions); `);
    middlewares.push({
      type: 'shield',
      value: /* ts */ `
      .use(permissions)`,
    });
  }

  return middlewares;
}

function addProtectedProcedure(
  sourceFile: SourceFile,
  config: Config,
  middlewares: Array<{ type: string; value: string }>,
) {
  const procName = getProcedureName(config);

  middlewares.forEach((middleware, i) => {
    if (i === 0) {
      sourceFile.addStatements(/* ts */ `
    export const ${procName} = t.procedure
      `);
    }

    sourceFile.addStatements(/* ts */ `
      .use(${
        middleware.type === 'shield'
          ? 'permissionsMiddleware'
          : 'globalMiddleware'
      })
      `);
  });
}

export function generateProcedure(
  sourceFile: SourceFile,
  name: string,
  typeName: string,
  modelName: string,
  opType: string,
  baseOpType: string,
  config: Config,
) {
  let input = `input${!config.withZod ? ' as any' : ''}`;
  const nameWithoutModel = name.replace(modelName, '');
  if (nameWithoutModel === 'groupBy' && config.withZod) {
    input =
      '{ where: input.where, orderBy: input.orderBy, by: input.by, having: input.having, take: input.take, skip: input.skip }';
  }
  sourceFile.addStatements(/* ts */ `${
    config.showModelNameInProcedure ? name : nameWithoutModel
  }: ${getProcedureName(config)}
    ${config.withZod ? `.input(${typeName})` : ''}.${
      getProcedureTypeByOpName(baseOpType) || 'query'
    }(async ({ ctx, input }) => {
      const ${name} = await ctx.prisma.${uncapitalizeFirstLetter(
        modelName,
      )}.${opType.replace('One', '')}(${input});
      return ${name};
    }),`);
}

export function generateRouterSchemaImports(
  sourceFile: SourceFile,
  modelName: string,
  modelActions: string[],
) {
  sourceFile.addStatements(
    /* ts */
    [
      // remove any duplicate import statements
      ...new Set(
        modelActions.map((opName) =>
          getRouterSchemaImportByOpName(opName, modelName),
        ),
      ),
    ].join('\n'),
  );
}

export const getRouterSchemaImportByOpName = (
  opName: string,
  modelName: string,
) => {
  const opType = opName.replace('OrThrow', '');
  const inputType = getInputTypeByOpName(opType, modelName);

  return inputType
    ? `import { ${inputType} } from "../schemas/${opType}${modelName}.schema"; `
    : '';
};

export const getInputTypeByOpName = (opName: string, modelName: string) => {
  let inputType;
  switch (opName) {
    case 'findUnique':
      inputType = `${modelName}FindUniqueSchema`;
      break;
    case 'findFirst':
      inputType = `${modelName}FindFirstSchema`;
      break;
    case 'findMany':
      inputType = `${modelName}FindManySchema`;
      break;
    case 'findRaw':
      inputType = `${modelName}FindRawObjectSchema`;
      break;
    case 'createOne':
      inputType = `${modelName}CreateOneSchema`;
      break;
    case 'createMany':
      inputType = `${modelName}CreateManySchema`;
      break;
    case 'deleteOne':
      inputType = `${modelName}DeleteOneSchema`;
      break;
    case 'updateOne':
      inputType = `${modelName}UpdateOneSchema`;
      break;
    case 'deleteMany':
      inputType = `${modelName}DeleteManySchema`;
      break;
    case 'updateMany':
      inputType = `${modelName}UpdateManySchema`;
      break;
    case 'upsertOne':
      inputType = `${modelName}UpsertSchema`;
      break;
    case 'aggregate':
      inputType = `${modelName}AggregateSchema`;
      break;
    case 'aggregateRaw':
      inputType = `${modelName}AggregateRawObjectSchema`;
      break;
    case 'groupBy':
      inputType = `${modelName}GroupBySchema`;
      break;
    default:
    // Fallback for unknown operation types
  }
  return inputType;
};

export const getProcedureTypeByOpName = (opName: string) => {
  let procType;
  switch (opName) {
    case 'findUnique':
    case 'findFirst':
    case 'findMany':
    case 'findRaw':
    case 'aggregate':
    case 'aggregateRaw':
    case 'groupBy':
      procType = 'query';
      break;
    case 'createOne':
    case 'createMany':
    case 'deleteOne':
    case 'updateOne':
    case 'deleteMany':
    case 'updateMany':
    case 'upsertOne':
      procType = 'mutation';
      break;
    default:
    // Fallback for unknown operation types
  }
  return procType;
};

export function resolveModelsComments(
  models: DMMF.Model[],
  hiddenModels: string[],
) {
  const modelAttributeRegex = /(@@Gen\.)+([A-z])+(\()+(.+)+(\))+/;
  const attributeNameRegex = /(?:\.)+([A-Za-z])+(?:\()+/;
  const attributeArgsRegex = /(?:\()+([A-Za-z])+:+(.+)+(?:\))+/;

  for (const model of models) {
    if (!model.documentation) continue;

    const attribute = parseModelAttribute(
      model.documentation,
      modelAttributeRegex,
    );
    if (!attribute) continue;

    const attributeName = parseAttributeName(attribute, attributeNameRegex);
    if (attributeName !== 'model') continue;

    const rawAttributeArgs = parseAttributeArgs(attribute, attributeArgsRegex);
    const parsedAttributeArgs = parseAttributeArgsToObject(rawAttributeArgs);

    if (parsedAttributeArgs.hide) {
      hiddenModels.push(model.name);
    }
  }
}

function parseModelAttribute(documentation: string, regex: RegExp) {
  return RegExp(regex).exec(documentation)?.[0];
}

function parseAttributeName(attribute: string, regex: RegExp) {
  return RegExp(regex).exec(attribute)?.[0]?.slice(1, -1);
}

function parseAttributeArgs(attribute: string, regex: RegExp) {
  return RegExp(regex).exec(attribute)?.[0]?.slice(1, -1);
}

function parseAttributeArgsToObject(rawAttributeArgs: string | undefined) {
  const parsedAttributeArgs: Record<string, unknown> = {};

  if (!rawAttributeArgs) {
    return parsedAttributeArgs;
  }

  const rawAttributeArgsParts = rawAttributeArgs
    .split(':')
    .map((it) => it.trim())
    .map((part) => (part.startsWith('[') ? part : part.split(',')))
    .flat()
    .map((it) => it.trim());

  for (let i = 0; i < rawAttributeArgsParts.length; i += 2) {
    const key = rawAttributeArgsParts[i];
    const value = rawAttributeArgsParts[i + 1];
    try {
      parsedAttributeArgs[key] = JSON.parse(value);
    } catch {
      // If JSON parsing fails, keep the raw value
      parsedAttributeArgs[key] = value;
    }
  }

  return parsedAttributeArgs;
}
