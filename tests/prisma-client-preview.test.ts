import { describe, it, expect, afterAll } from 'vitest';
import { join } from 'path';
import { TrpcGeneratorTestUtils } from './comprehensive-test-utils';
import fs from 'fs';

describe('Prisma Client Generator Preview Feature Tests', () => {
  const testOutputDir = join(process.cwd(), 'tests', 'generated', 'preview');
  
  afterAll(() => {
    TrpcGeneratorTestUtils.cleanup(testOutputDir);
  });

  const baseSchema = `
// Test schema for prisma-client generator (preview)
datasource db {
  provider = "postgresql"
  url      = "postgresql://test:test@localhost:5432/test"
}

generator trpc {
  provider    = "node ../../lib/generator.js"
  output      = "tests/generated/preview"
  contextPath = "../test-context"
  withZod     = true
  withShield  = false
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}
`;

  it('should work with new prisma-client generator', async () => {
    const schema = `generator client {
  provider = "prisma-client"
  output   = "tests/generated/preview/client"
}

${baseSchema}`;
    
    const tempSchemaPath = join(process.cwd(), 'temp-new-client.prisma');
    fs.writeFileSync(tempSchemaPath, schema);
    
    try {
      await TrpcGeneratorTestUtils.generateRouters(tempSchemaPath);
      
      const routers = TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);
      
      // Verify successful generation
      expect(routers.appRouter).toBeTruthy();
      expect(routers.createRouter).toBeTruthy();
      expect(routers.modelRouters['User']).toBeTruthy();
      expect(routers.modelRouters['Post']).toBeTruthy();
      
      // Verify CRUD operations are present
      const userRouter = routers.modelRouters['User'];
      const crudOps = TrpcGeneratorTestUtils.validateCrudOperations(userRouter, 'User');
      expect(crudOps.hasCreate).toBe(true);
      expect(crudOps.hasRead).toBe(true);
      expect(crudOps.hasUpdate).toBe(true);
      expect(crudOps.hasDelete).toBe(true);
      
    } finally {
      fs.unlinkSync(tempSchemaPath);
    }
  });

  it('should work with legacy prisma-client-js generator', async () => {
    const schema = `generator client {
  provider = "prisma-client-js"
}

${baseSchema}`;
    
    const tempSchemaPath = join(process.cwd(), 'temp-legacy-client.prisma');
    fs.writeFileSync(tempSchemaPath, schema);
    
    try {
      await TrpcGeneratorTestUtils.generateRouters(tempSchemaPath);
      
      const routers = TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);
      
      // Verify successful generation
      expect(routers.appRouter).toBeTruthy();
      expect(routers.createRouter).toBeTruthy();
      expect(routers.modelRouters['User']).toBeTruthy();
      expect(routers.modelRouters['Post']).toBeTruthy();
      
    } finally {
      fs.unlinkSync(tempSchemaPath);
    }
  });

  it('should support preview features in new prisma-client generator', async () => {
    const schema = `generator client {
  provider        = "prisma-client"
  previewFeatures = ["queryCompiler", "driverAdapters"]
  output          = "tests/generated/preview/client"
}

${baseSchema}`;
    
    const tempSchemaPath = join(process.cwd(), 'temp-preview-features.prisma');
    fs.writeFileSync(tempSchemaPath, schema);
    
    try {
      await TrpcGeneratorTestUtils.generateRouters(tempSchemaPath);
      
      const routers = TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);
      
      // Verify successful generation with preview features
      expect(routers.appRouter).toBeTruthy();
      expect(routers.createRouter).toBeTruthy();
      expect(routers.modelRouters['User']).toBeTruthy();
      expect(routers.modelRouters['Post']).toBeTruthy();
      
      // Verify router structure is valid
      const userRouter = routers.modelRouters['User'];
      const structure = TrpcGeneratorTestUtils.validateRouterStructure(userRouter);
      expect(structure.hasRouter).toBe(true);
      expect(structure.procedures.length).toBeGreaterThan(0);
      
    } finally {
      fs.unlinkSync(tempSchemaPath);
    }
  });

  it('should support preview features in legacy prisma-client-js generator', async () => {
    const schema = `generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["queryCompiler"]
}

${baseSchema}`;
    
    const tempSchemaPath = join(process.cwd(), 'temp-legacy-preview.prisma');
    fs.writeFileSync(tempSchemaPath, schema);
    
    try {
      await TrpcGeneratorTestUtils.generateRouters(tempSchemaPath);
      
      const routers = TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);
      
      // Verify successful generation with preview features on legacy client
      expect(routers.appRouter).toBeTruthy();
      expect(routers.createRouter).toBeTruthy();
      
    } finally {
      fs.unlinkSync(tempSchemaPath);
    }
  });

  it('should handle both generators in same schema', async () => {
    const schema = `generator clientLegacy {
  provider = "prisma-client-js"
  output   = "tests/generated/preview/client-legacy"
}

generator clientNew {
  provider        = "prisma-client"
  previewFeatures = ["queryCompiler", "driverAdapters"]
  output          = "tests/generated/preview/client-new"
}

${baseSchema}`;
    
    const tempSchemaPath = join(process.cwd(), 'temp-both-generators.prisma');
    fs.writeFileSync(tempSchemaPath, schema);
    
    try {
      await TrpcGeneratorTestUtils.generateRouters(tempSchemaPath);
      
      const routers = TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);
      
      // Should work when both generators are present
      expect(routers.appRouter).toBeTruthy();
      expect(routers.createRouter).toBeTruthy();
      
    } finally {
      fs.unlinkSync(tempSchemaPath);
    }
  });

  it('should throw error when no prisma client generator is present', async () => {
    const schema = `// No prisma client generator
generator trpc {
  provider    = "node ../../lib/generator.js"
  output      = "tests/generated/preview"
  contextPath = "../test-context"
  withZod     = true
  withShield  = false
}

datasource db {
  provider = "postgresql"
  url      = "postgresql://test:test@localhost:5432/test"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}`;
    
    const tempSchemaPath = join(process.cwd(), 'temp-no-client.prisma');
    fs.writeFileSync(tempSchemaPath, schema);
    
    try {
      // Should throw error when no Prisma client generator is present
      await expect(
        TrpcGeneratorTestUtils.generateRouters(tempSchemaPath)
      ).rejects.toThrow(/Prisma tRPC Generator requires a Prisma Client generator/);
      
    } finally {
      fs.unlinkSync(tempSchemaPath);
    }
  });

  it('should generate identical output regardless of generator type', async () => {
    const legacySchema = `generator client {
  provider = "prisma-client-js"
}

${baseSchema}`;

    const newSchema = `generator client {
  provider = "prisma-client"
  output   = "../generated/preview/client"
}

${baseSchema}`;
    
    const tempLegacyPath = join(process.cwd(), 'temp-legacy-compare.prisma');
    const tempNewPath = join(process.cwd(), 'temp-new-compare.prisma');
    
    fs.writeFileSync(tempLegacyPath, legacySchema);
    fs.writeFileSync(tempNewPath, newSchema);
    
    try {
      // Generate with legacy client
      await TrpcGeneratorTestUtils.generateRouters(tempLegacyPath);
      const legacyRouters = TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);
      
      // Clear output and generate with new client
      TrpcGeneratorTestUtils.cleanup(testOutputDir);
      await TrpcGeneratorTestUtils.generateRouters(tempNewPath);
      const newRouters = TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);
      
      // Compare outputs - should be functionally identical
      expect(legacyRouters.appRouter).toBeTruthy();
      expect(newRouters.appRouter).toBeTruthy();
      
      // Both should have same model routers
      expect(Object.keys(legacyRouters.modelRouters)).toEqual(
        Object.keys(newRouters.modelRouters)
      );
      
      // User router should have same CRUD operations
      const legacyUserCrud = TrpcGeneratorTestUtils.validateCrudOperations(
        legacyRouters.modelRouters['User'], 'User'
      );
      const newUserCrud = TrpcGeneratorTestUtils.validateCrudOperations(
        newRouters.modelRouters['User'], 'User'
      );
      
      expect(legacyUserCrud.hasCreate).toBe(newUserCrud.hasCreate);
      expect(legacyUserCrud.hasRead).toBe(newUserCrud.hasRead);
      expect(legacyUserCrud.hasUpdate).toBe(newUserCrud.hasUpdate);
      expect(legacyUserCrud.hasDelete).toBe(newUserCrud.hasDelete);
      
    } finally {
      fs.unlinkSync(tempLegacyPath);
      fs.unlinkSync(tempNewPath);
    }
  });

  it('should handle complex preview features configuration', async () => {
    const schema = `generator client {
  provider        = "prisma-client"
  previewFeatures = ["queryCompiler", "driverAdapters", "metrics"]
  output          = "tests/generated/preview/client-complex"
  runtime         = "nodejs"
  moduleFormat    = "esm"
}

${baseSchema}

model Profile {
  id     Int    @id @default(autoincrement())
  userId Int    @unique
  bio    String?
  user   User   @relation(fields: [userId], references: [id])
}`;

    // Add Profile relation to User model
    const complexSchema = schema.replace(
      'posts Post[]',
      'posts Post[]\n  profile Profile?'
    );
    
    const tempSchemaPath = join(process.cwd(), 'temp-complex-preview.prisma');
    fs.writeFileSync(tempSchemaPath, complexSchema);
    
    try {
      await TrpcGeneratorTestUtils.generateRouters(tempSchemaPath);
      
      const routers = TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);
      
      // Should handle complex configuration
      expect(routers.appRouter).toBeTruthy();
      expect(routers.createRouter).toBeTruthy();
      expect(routers.modelRouters['User']).toBeTruthy();
      expect(routers.modelRouters['Post']).toBeTruthy();
      expect(routers.modelRouters['Profile']).toBeTruthy();
      
      // All models should have valid router structure
      for (const [modelName, routerContent] of Object.entries(routers.modelRouters)) {
        const structure = TrpcGeneratorTestUtils.validateRouterStructure(routerContent);
        expect(structure.hasRouter).toBe(true);
        expect(structure.procedures.length).toBeGreaterThan(0);
      }
      
    } finally {
      fs.unlinkSync(tempSchemaPath);
    }
  });

  it('should handle schema with mixed generator versions', async () => {
    const schema = `generator clientOld {
  provider = "prisma-client-js"
  output   = "tests/generated/preview/client-old"
}

generator clientNew {
  provider        = "prisma-client" 
  previewFeatures = ["queryCompiler"]
  output          = "tests/generated/preview/client-new"
  runtime         = "nodejs"
}

generator trpc {
  provider    = "node ../../lib/generator.js"
  output      = "tests/generated/preview"
  contextPath = "../test-context"
  withZod     = true
  withShield  = false
}

datasource db {
  provider = "postgresql"
  url      = "postgresql://test:test@localhost:5432/test"
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  authorId  Int
  author    User    @relation(fields: [authorId], references: [id])
}`;
    
    const tempSchemaPath = join(process.cwd(), 'temp-mixed-generators.prisma');
    fs.writeFileSync(tempSchemaPath, schema);
    
    try {
      await TrpcGeneratorTestUtils.generateRouters(tempSchemaPath);
      
      const routers = TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);
      
      // Should prioritize the first found generator and work correctly
      expect(routers.appRouter).toBeTruthy();
      expect(routers.createRouter).toBeTruthy();
      expect(routers.modelRouters['User']).toBeTruthy();
      expect(routers.modelRouters['Post']).toBeTruthy();
      
    } finally {
      fs.unlinkSync(tempSchemaPath);
    }
  });

  it('should work with minimal new generator configuration', async () => {
    const schema = `generator client {
  provider = "prisma-client"
  output   = "tests/generated/preview/client-minimal"
}

${baseSchema}`;
    
    const tempSchemaPath = join(process.cwd(), 'temp-minimal-new.prisma');
    fs.writeFileSync(tempSchemaPath, schema);
    
    try {
      await TrpcGeneratorTestUtils.generateRouters(tempSchemaPath);
      
      const routers = TrpcGeneratorTestUtils.readGeneratedRouters(testOutputDir);
      
      // Should work with minimal configuration
      expect(routers.appRouter).toBeTruthy();
      expect(routers.createRouter).toBeTruthy();
      
      // Verify basic functionality
      const userRouter = routers.modelRouters['User'];
      const structure = TrpcGeneratorTestUtils.validateRouterStructure(userRouter);
      expect(structure.hasRouter).toBe(true);
      
    } finally {
      fs.unlinkSync(tempSchemaPath);
    }
  });
});