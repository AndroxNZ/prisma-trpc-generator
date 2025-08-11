import { describe, it, expect, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { TrpcGeneratorTestUtils } from './comprehensive-test-utils.js';

describe('Import Extensions Configuration', () => {
  const testOutputDir = path.join(
    process.cwd(),
    'tests',
    'generated',
    'import-extensions',
  );

  afterAll(() => {
    TrpcGeneratorTestUtils.cleanup(testOutputDir);
  });

  it('should generate files with default extensions and no import extensions', async () => {
    const tempSchemaPath = path.join(
      process.cwd(),
      'tests',
      'temp-import-extensions-default.prisma',
    );

    const schemaContent = `
      generator client {
        provider = "prisma-client-js"
      }
      
      generator trpc {
        provider    = "node ../../lib/generator.js"
        output      = "./generated/import-extensions"
        contextPath = "../test-context"
        withZod     = true
        withShield  = false
      }
      
      datasource db {
        provider = "sqlite"
        url      = "file:./dev.db"
      }
      
      model User {
        id    Int     @id @default(autoincrement())
        email String  @unique
        name  String?
      }
    `;

    try {
      fs.writeFileSync(tempSchemaPath, schemaContent);

      // Generate routers
      await TrpcGeneratorTestUtils.generateRouters(tempSchemaPath);

      // Read generated files
      const routers =
        TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);

      // Debug output
      console.log('Generated routers:', Object.keys(routers));
      console.log('App router exists:', !!routers.appRouter);
      console.log('Create router exists:', !!routers.createRouter);
      console.log('Model routers:', Object.keys(routers.modelRouters));

      // Check that files are generated with .ts extension by default
      expect(routers.appRouter).toContain('export const appRouter');
      expect(routers.createRouter).toContain('export const t =');

      // Check that import statements don't have extensions (but may have protectedProcedure)
      expect(routers.appRouter).toContain(
        'import { t, protectedProcedure } from "./helpers/createRouter";',
      );
      expect(routers.appRouter).toContain(
        'import { usersRouter } from "./User.router";',
      );
    } finally {
      if (fs.existsSync(tempSchemaPath)) {
        fs.unlinkSync(tempSchemaPath);
      }
    }
  });

  it('should generate files with custom extensions and import extensions', async () => {
    const tempSchemaPath = path.join(
      process.cwd(),
      'tests',
      'temp-import-extensions-custom.prisma',
    );

    const schemaContent = `
      generator client {
        provider = "prisma-client-js"
      }
      
      generator trpc {
        provider          = "node ../../lib/generator.js"
        output            = "./generated/import-extensions"
        contextPath       = "../test-context"
        withZod           = true
        withShield        = false
        importExtension   = "js"
        generatedExtension = "ts"
      }
      
      datasource db {
        provider = "sqlite"
        url      = "file:./dev.db"
      }
      
      model User {
        id    Int     @id @default(autoincrement())
        email String  @unique
        name  String?
      }
    `;

    try {
      fs.writeFileSync(tempSchemaPath, schemaContent);

      // Generate routers
      await TrpcGeneratorTestUtils.generateRouters(tempSchemaPath);

      // Read generated files
      const routers =
        TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);

      // Debug output
      console.log('Generated routers (custom):', Object.keys(routers));
      console.log('App router exists (custom):', !!routers.appRouter);
      console.log('Create router exists (custom):', !!routers.createRouter);
      console.log('Model routers (custom):', Object.keys(routers.modelRouters));

      // Check that import statements have .js extensions (and protectedProcedure)
      expect(routers.appRouter).toContain(
        'import { t, protectedProcedure } from "./helpers/createRouter.js";',
      );
      expect(routers.appRouter).toContain(
        'import { usersRouter } from "./User.router.js";',
      );
    } finally {
      if (fs.existsSync(tempSchemaPath)) {
        fs.unlinkSync(tempSchemaPath);
      }
    }
  });

  it('should generate files with .ts extension and .ts import extensions', async () => {
    const tempSchemaPath = path.join(
      process.cwd(),
      'tests',
      'temp-import-extensions-ts.prisma',
    );

    const schemaContent = `
      generator client {
        provider = "prisma-client-js"
      }
      
      generator trpc {
        provider          = "node ../../lib/generator.js"
        output            = "./generated/import-extensions"
        contextPath       = "../test-context"
        withZod           = true
        withShield        = false
        importExtension   = "ts"
        generatedExtension = "ts"
      }
      
      datasource db {
        provider = "sqlite"
        url      = "file:./dev.db"
      }
      
      model User {
        id    Int     @id @default(autoincrement())
        email String  @unique
        name  String?
      }
    `;

    try {
      fs.writeFileSync(tempSchemaPath, schemaContent);

      // Generate routers
      await TrpcGeneratorTestUtils.generateRouters(tempSchemaPath);

      // Read generated files
      const routers =
        TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);

      // Debug output
      console.log('Generated routers (ts):', Object.keys(routers));
      console.log('App router exists (ts):', !!routers.appRouter);
      console.log('Create router exists (ts):', !!routers.createRouter);
      console.log('Model routers (ts):', Object.keys(routers.modelRouters));

      // Check that import statements have .ts extensions (and protectedProcedure)
      expect(routers.appRouter).toContain(
        'import { t, protectedProcedure } from "./helpers/createRouter.ts";',
      );
      expect(routers.appRouter).toContain(
        'import { usersRouter } from "./User.router.ts";',
      );
    } finally {
      if (fs.existsSync(tempSchemaPath)) {
        fs.unlinkSync(tempSchemaPath);
      }
    }
  });
});
