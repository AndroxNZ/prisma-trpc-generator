import prismaGeneratorHelper from '@prisma/generator-helper';
import { generate } from './prisma-generator.js';

const { generatorHandler } = prismaGeneratorHelper;

generatorHandler({
  onManifest: () => ({
    defaultOutput: './generated',
    prettyName: 'Prisma tRPC Generator',
  }),
  onGenerate: generate,
});
