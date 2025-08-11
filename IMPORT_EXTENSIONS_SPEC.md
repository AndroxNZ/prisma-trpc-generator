# Import Extensions Configuration Technical Specification

## Overview

This document specifies the design and implementation of import extensions configuration options for the prisma-trpc-generator. These options will allow users to control the file extensions used in import statements and for generated files, providing better compatibility with different module systems (CommonJS vs ESM) and project configurations.

## 1. Configuration Options

### 1.1 importExtension

**Description**: Controls the file extension used in generated import statements.

**Possible Values**:

- `js` - Use .js extension in import statements
- `ts` - Use .ts extension in import statements
- `mjs` - Use .mjs extension in import statements
- `mts` - Use .mts extension in import statements
- `cjs` - Use .cjs extension in import statements
- `cts` - Use .cts extension in import statements
- `""` (empty string) - No extension in import statements

**Default Value**: `""` (empty string) - Maintains backward compatibility

### 1.2 generatedExtension

**Description**: Controls the file extension for generated files.

**Possible Values**:

- `ts` - Generate files with .ts extension
- `mts` - Generate files with .mts extension
- `cts` - Generate files with .cts extension

**Default Value**: `ts` - Maintains backward compatibility

## 2. Implementation Plan

### 2.1 Files to be Modified

1. **src/config.ts** - Add new configuration options to the schema
2. **src/prisma-generator.ts** - Update import path generation logic
3. **src/helpers.ts** - Update import statement generation functions
4. **src/utils/getRelativePath.ts** - Update path generation to support extensions

### 2.2 Configuration Flow

1. Configuration options are parsed from the generator config in `src/config.ts`
2. The parsed configuration is passed through the generator pipeline
3. Import paths are generated with appropriate extensions in `src/helpers.ts`
4. File generation uses the specified extension in `src/prisma-generator.ts`

### 2.3 Extension Logic Implementation

The extension logic will be implemented in the `getRelativePath` utility function and used throughout the generator where import paths are created.

### 2.4 Backward Compatibility

- Default values maintain current behavior
- Empty string for `importExtension` preserves existing import statements without extensions
- Existing configurations will continue to work without modification

### 2.5 Edge Cases Handling

1. **Conflicting Extensions**: When `importExtension` and `generatedExtension` are incompatible (e.g., generating .mts files but importing with .js), the generator will warn but still generate the code
2. **Module System Compatibility**: The generator will not validate if the chosen extensions are compatible with the project's module system
3. **Path Resolution**: Relative paths will be correctly resolved regardless of extension configuration

## 3. Example Usage

### 3.1 ESM Configuration

```prisma
generator trpc {
  provider          = "prisma-trpc-generator"
  importExtension   = "js"
  generatedExtension = "ts"
}
```

**Resulting Import Statements**:

```typescript
import { t } from './helpers/createRouter.js';
import { userRouter } from './User.router.js';
```

### 3.2 TypeScript Import Configuration

```prisma
generator trpc {
  provider          = "prisma-trpc-generator"
  importExtension   = "ts"
  generatedExtension = "ts"
}
```

**Resulting Import Statements**:

```typescript
import { t } from './helpers/createRouter.ts';
import { userRouter } from './User.router.ts';
```

### 3.3 No Extension Configuration (Default)

```prisma
generator trpc {
  provider          = "prisma-trpc-generator"
  // importExtension defaults to ""
  // generatedExtension defaults to "ts"
}
```

**Resulting Import Statements**:

```typescript
import { t } from './helpers/createRouter';
import { userRouter } from './User.router';
```

## 4. Implementation Steps

### Step 1: Update Configuration Schema (src/config.ts)

Add the new options to the Zod schema:

```typescript
export const configSchema = z.object({
  // ... existing options
  importExtension: z
    .enum(['js', 'ts', 'mjs', 'mts', 'cjs', 'cts', ''])
    .default(''),
  generatedExtension: z.enum(['ts', 'mts', 'cts']).default('ts'),
});
```

### Step 2: Update getRelativePath Utility (src/utils/getRelativePath.ts)

Modify the utility to support extension customization:

```typescript
export default function getRelativePath(
  outputPath: string,
  filePath: string,
  isOutsideOutputPath?: boolean,
  schemaPath?: string,
  importExtension?: string, // New parameter
) {
  // ... existing logic

  let newPath = path
    .relative(fromPath, toPath)
    .split(path.sep)
    .join(path.posix.sep);

  // Add import extension if specified
  if (importExtension) {
    // Remove existing extension if present
    const withoutExt = newPath.replace(/\.[^/.]+$/, '');
    newPath = `${withoutExt}.${importExtension}`;
  }

  return newPath;
}
```

### Step 3: Update Import Generation Functions (src/helpers.ts)

Update functions that generate import statements to use the new configuration:

```typescript
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
```

### Step 4: Update File Generation (src/prisma-generator.ts)

Update file generation to use the specified extension:

```typescript
// When creating files, use the generatedExtension
const createRouter = project.createSourceFile(
  path.resolve(
    outputDir,
    'routers',
    'helpers',
    `createRouter.${config.generatedExtension}`,
  ),
  undefined,
  { overwrite: true },
);
```

## 5. Testing Considerations

1. **Backward Compatibility**: Ensure existing configurations continue to work
2. **Extension Combinations**: Test all valid combinations of importExtension and generatedExtension
3. **Path Resolution**: Verify that relative paths are correctly resolved with different extensions
4. **Module System Compatibility**: Test with both CommonJS and ESM projects

## 6. Documentation Updates

1. Update README.md with new configuration options
2. Add examples for different module systems
3. Document default values and backward compatibility guarantees
