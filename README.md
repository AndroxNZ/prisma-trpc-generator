# Prisma tRPC Generator

> 🚀 Automatically generate fully implemented tRPC routers from your Prisma schema

[![npm version](https://badge.fury.io/js/prisma-trpc-generator.svg)](https://badge.fury.io/js/prisma-trpc-generator)
[![npm downloads](https://img.shields.io/npm/dt/prisma-trpc-generator.svg)](https://www.npmjs.com/package/prisma-trpc-generator)
[![CI](https://github.com/omar-dulaimi/prisma-trpc-generator/workflows/CI/badge.svg)](https://github.com/omar-dulaimi/prisma-trpc-generator/actions)
[![License](https://img.shields.io/npm/l/prisma-trpc-generator.svg)](LICENSE)

A powerful Prisma generator that creates fully implemented [tRPC](https://trpc.io) routers from your Prisma schema. Automatically generates type-safe API endpoints with Zod validation, middleware support, and optional tRPC Shield integration - saving you time and reducing boilerplate code.

## 🚀 Version 2.0 Beta - Major Upgrade Available!

> ⚠️ **Beta Release**: This is a major version upgrade currently in beta testing

**Now available: Prisma 6 & tRPC 11 support with enhanced features!**

### 🔥 What's New in v2.0.0-beta

- ✅ **Prisma 6.12.0+** - Latest Prisma support with improved performance
- ✅ **tRPC 11.4.3+** - Enhanced type safety and modern API patterns  
- ✅ **TypeScript 5.8+** - Cutting-edge TypeScript features
- ✅ **Zod 4.0+** - Advanced validation with better error handling
- ✅ **Comprehensive Testing** - New test suite with 90%+ coverage
- ✅ **Modern Tooling** - ESLint 9, Prettier 3, Vitest 3

### 📦 Try the Beta

```bash
# Install the beta version
npm install prisma-trpc-generator@beta

# Or specify the exact version
npm install prisma-trpc-generator@2.0.0-beta.0
```

### 🔄 Migration from v1.x

The v2.0 beta maintains API compatibility but requires:
- **Node.js 18+** (previously 16+)
- **Prisma 6.12.0+** (previously 4.8+) 
- **tRPC 11.4.3+** (previously 10.7+)

Simply update your dependencies and re-run `npx prisma generate` - no code changes needed!

### 📝 Beta Feedback

Please test thoroughly and [report any issues](https://github.com/omar-dulaimi/prisma-trpc-generator/issues). Your feedback helps us deliver a stable v2.0 release!

## 📖 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
  - [Installation](#installation)
  - [Setup](#setup)
- [Generated Output](#-generated-output)
- [Configuration Options](#️-configuration-options)
- [Advanced Usage](#-advanced-usage)
  - [Custom Middleware](#custom-middleware)
  - [Integration with tRPC Shield](#integration-with-trpc-shield)
- [Examples](#-examples)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Related Projects](#-related-projects)

## ✨ Features

- 🚀 **Zero Configuration** - Works out of the box with sensible defaults
- 🔄 **Auto-Generated** - Updates every time you run `prisma generate`
- 🛡️ **Type Safe** - Full TypeScript support with proper typing
- 🎯 **Comprehensive** - Covers all Prisma operations (queries, mutations, aggregations)
- ⚙️ **Configurable** - Customize output directory, middleware, and more
- 📦 **Lightweight** - Minimal dependencies and fast generation
- 🔗 **Integrations** - Works seamlessly with Zod validation and tRPC Shield
- 🎨 **Flexible** - Support for custom middleware and context paths

## 🚀 Quick Start

### Installation

#### Beta Version (Recommended - Latest Features)
```bash
# NPM
npm install prisma-trpc-generator@beta

# Yarn  
yarn add prisma-trpc-generator@beta

# PNPM
pnpm add prisma-trpc-generator@beta
```

#### Stable Version (v1.4.1)
```bash
# NPM
npm install prisma-trpc-generator@latest

# Yarn
yarn add prisma-trpc-generator@latest

# PNPM  
pnpm add prisma-trpc-generator@latest
```

### Setup

1. **Star this repo** 😉

2. **Add the generator to your Prisma schema:**

```prisma
generator trpc {
  provider          = "prisma-trpc-generator"
  withZod           = true
  withMiddleware    = false
  withShield        = false
  contextPath       = "../src/context"
  trpcOptionsPath   = "../src/trpcOptions"
}
```

3. **Enable strict mode in `tsconfig.json`** (required by Zod):

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

4. **Generate your tRPC routers:**

```bash
npx prisma generate
```

## 📋 Generated Output

For the following schema:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  published Boolean  @default(false)
  viewCount Int      @default(0)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}
```

The generator creates:

![tRPC Routers](https://raw.githubusercontent.com/omar-dulaimi/prisma-trpc-generator/master/trpcRouters.png)

### Version Compatibility

| Version | Prisma | tRPC | TypeScript | Zod | Status |
|---------|--------|------|------------|-----|--------|
| **v2.0.0-beta** | 6.12.0+ | 11.4.3+ | 5.8+ | 4.0+ | 🧪 **Beta** |
| v1.4.1 (stable) | 4.8.0+ | 10.7.0+ | 4.9+ | 3.20+ | ✅ **Stable** |

> **Recommendation**: Use the beta version for new projects to get the latest features and future-proof your setup.

## ⚙️ Configuration Options

| Option | Description | Type | Default |
|--------|-------------|------|---------|
| `output` | Output directory for generated files | `string` | `./generated` |
| `withZod` | Generate Zod validation schemas | `boolean` | `true` |
| `withMiddleware` | Include global middleware support | `boolean \| string` | `true` |
| `withShield` | Generate tRPC Shield permissions | `boolean \| string` | `false` |
| `contextPath` | Path to your tRPC context file | `string` | `../../../../src/context` |
| `trpcOptionsPath` | Path to tRPC instance options | `string` | `../../../../src/trpcOptions` |
| `isGenerateSelect` | Enable Select schema generation | `boolean` | `false` |
| `isGenerateInclude` | Enable Include schema generation | `boolean` | `false` |
| `showModelNameInProcedure` | Include model name in procedure names | `boolean` | `true` |
| `generateModelActions` | Specify which CRUD operations to generate | `string` | All operations |

### Example Configuration

```prisma
generator trpc {
  provider                  = "prisma-trpc-generator"
  output                    = "./src/server/api"
  withZod                   = true
  withMiddleware            = "../middleware"
  withShield                = "../permissions"
  contextPath               = "../context"
  trpcOptionsPath           = "../trpcOptions"
  isGenerateSelect          = true
  isGenerateInclude         = true
  showModelNameInProcedure  = false
  generateModelActions      = "findMany,findUnique,create,update,delete"
}
```

## 🔧 Advanced Usage

### Custom Middleware

Create a middleware file to run before all procedures:

```ts
// src/middleware.ts
import { TRPCError } from '@trpc/server';
import { t } from './trpc';

export const authMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const loggingMiddleware = t.middleware(async ({ path, type, next }) => {
  console.log(`tRPC ${type} ${path}`);
  return next();
});
```

### Integration with tRPC Shield

Set up permissions using the generated shield:

```ts
// src/permissions.ts
import { shield, rule, and, or } from 'trpc-shield';

const isAuthenticated = rule()(async (parent, args, ctx) => {
  return !!ctx.user;
});

const isOwner = rule()(async (parent, args, ctx) => {
  if (!args.where?.id) return false;
  const post = await ctx.prisma.post.findUnique({
    where: { id: args.where.id },
    select: { authorId: true }
  });
  return post?.authorId === ctx.user?.id;
});

export const permissions = shield({
  query: {
    findManyPost: true, // Public
    findUniqueUser: isAuthenticated,
  },
  mutation: {
    createOnePost: isAuthenticated,
    updateOnePost: and(isAuthenticated, isOwner),
    deleteOnePost: and(isAuthenticated, isOwner),
  },
});
```

### Custom tRPC Options

Configure your tRPC instance with custom options:

```ts
// src/trpcOptions.ts
import { ZodError } from 'zod';
import superjson from 'superjson';

export default {
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
};
```

## 🎨 Customizations

### Skipping Models

Hide specific models from generation:

```prisma
/// @@Gen.model(hide: true)
model InternalLog {
  id        Int      @id @default(autoincrement())
  message   String
  createdAt DateTime @default(now())
}
```

### Custom Context

Ensure you have a properly typed context file:

```ts
// src/context.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const createContext = async ({ req }): Promise<Context> => {
  // Add your authentication logic here
  const user = await getUserFromRequest(req);
  
  return {
    prisma,
    user,
  };
};
```

## 📚 Examples

### Basic CRUD with Authentication

```ts
// src/server/routers/posts.ts
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const postsRouter = createTRPCRouter({
  // Public read access
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: { published: true },
      include: { author: { select: { name: true } } },
    });
  }),

  // Protected create
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      content: z.string().optional(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          ...input,
          authorId: ctx.user.id,
        },
      });
    }),

  // Protected update (owner only)
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).optional(),
      content: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      
      // Verify ownership
      const post = await ctx.prisma.post.findFirst({
        where: { id, authorId: ctx.user.id },
      });
      
      if (!post) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }
      
      return ctx.prisma.post.update({
        where: { id },
        data,
      });
    }),
});
```

### Integration with Next.js App Router

```ts
// src/app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/api/root';
import { createContext } from '@/server/api/context';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
```

### Client-side Usage

```ts
// src/lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/api/root';

export const trpc = createTRPCReact<AppRouter>();

// In your component
const PostList = () => {
  const { data: posts, isLoading } = trpc.post.findMany.useQuery();
  const createPost = trpc.post.createOne.useMutation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};
```

## 🔍 Troubleshooting

### Beta Version Issues

**Dependency compatibility errors with v2.0.0-beta**
- Ensure you're using Node.js 18+ (required for beta)
- Update Prisma to 6.12.0+ and tRPC to 11.4.3+
- Check that all peer dependencies are compatible

**Migration from v1.x to v2.0.0-beta**
- Backup your project before upgrading
- Update all related dependencies (Prisma, tRPC, Zod)
- Re-run `npx prisma generate` after upgrading
- Test thoroughly in development environment

### Common Issues

**Error: Cannot find module '../context'**
- Ensure your `contextPath` is correct relative to the output directory
- Check that your context file exports a `Context` type

**TypeScript errors in generated routers**
- Make sure all dependencies are installed and up to date
- Verify your tRPC context is properly typed
- Ensure `strict: true` is enabled in `tsconfig.json`

**Generated routers not updating**
- Run `npx prisma generate` after modifying your schema
- Check that the generator is properly configured in `schema.prisma`
- Clear your build cache and regenerate

**Zod validation errors (v2.0 beta)**
- Ensure you have Zod 4.0+ installed for beta compatibility
- Check that your input schemas match your Prisma model types

### Getting Help

- 🐛 **Bug Reports**: [Create a bug report](https://github.com/omar-dulaimi/prisma-trpc-generator/issues/new?template=bug_report.yml)
- 💡 **Feature Requests**: [Request a feature](https://github.com/omar-dulaimi/prisma-trpc-generator/issues/new?template=feature_request.md)
- 💬 **Discussions**: [Join the discussion](https://github.com/omar-dulaimi/prisma-trpc-generator/discussions)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on:

- Setting up the development environment
- Running tests
- Submitting pull requests
- Code style guidelines

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [prisma-trpc-shield-generator](https://github.com/omar-dulaimi/prisma-trpc-shield-generator) - Generate tRPC Shield permissions from Prisma schema
- [tRPC Shield](https://github.com/omar-dulaimi/trpc-shield) - Permission system for tRPC
- [Prisma](https://github.com/prisma/prisma) - Database toolkit and ORM
- [tRPC](https://trpc.io) - End-to-end typesafe APIs made easy

---

<p align="center">
  <a href="https://github.com/omar-dulaimi/prisma-trpc-generator">
    <img src="https://img.shields.io/github/stars/omar-dulaimi/prisma-trpc-generator?style=social" alt="GitHub Stars">
  </a>
  <a href="https://www.npmjs.com/package/prisma-trpc-generator">
    <img src="https://img.shields.io/npm/v/prisma-trpc-generator/beta.svg?label=beta&color=orange" alt="Beta Version">
  </a>
  <a href="https://www.npmjs.com/package/prisma-trpc-generator">
    <img src="https://img.shields.io/npm/v/prisma-trpc-generator/latest.svg?label=stable&color=green" alt="Stable Version">
  </a>
</p>

<p align="center">
  <strong>Prisma tRPC Generator</strong> - Automate your tRPC API development
</p>
