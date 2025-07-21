<div align="center">
  <img src="https://raw.githubusercontent.com/omar-dulaimi/prisma-trpc-generator/master/logo.png" alt="Prisma tRPC Generator" width="100" height="100">
  
  # ⚡ Prisma tRPC Generator
  
  ### 🚀 **Automatically generate fully implemented tRPC routers from your Prisma schema**
  
  <p>
    <a href="https://www.npmjs.com/package/prisma-trpc-generator">
      <img src="https://img.shields.io/npm/v/prisma-trpc-generator/latest.svg?style=for-the-badge&logo=npm&color=blue" alt="Stable Version">
    </a>
    <a href="https://www.npmjs.com/package/prisma-trpc-generator">
      <img src="https://img.shields.io/npm/v/prisma-trpc-generator/beta.svg?style=for-the-badge&logo=npm&label=beta&color=orange" alt="Beta Version">
    </a>
  </p>
  
  <p>
    <a href="https://www.npmjs.com/package/prisma-trpc-generator">
      <img src="https://img.shields.io/npm/dt/prisma-trpc-generator.svg?style=for-the-badge&logo=npm&color=green" alt="Downloads">
    </a>
    <a href="https://github.com/omar-dulaimi/prisma-trpc-generator/actions">
      <img src="https://img.shields.io/github/actions/workflow/status/omar-dulaimi/prisma-trpc-generator/ci.yml?style=for-the-badge&logo=github" alt="CI Status">
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/npm/l/prisma-trpc-generator.svg?style=for-the-badge&color=purple" alt="License">
    </a>
  </p>
  
  <p>
    <strong>🎯 Zero-config • 🛡️ Type-safe • ⚡ Fast • 🔧 Customizable</strong>
  </p>
  
</div>

---

<br>

<div align="center">
  <h3>💡 Transform your Prisma schema into production-ready tRPC APIs</h3>
  <p><em>Automatically generates type-safe endpoints with Zod validation, middleware support, and optional tRPC Shield integration</em></p>
</div>

<div align="center">
  
  ## 💖 **Support This Project**
  
  <p><em>If this tool accelerates your development, consider supporting its growth</em></p>
  
  <a href="https://github.com/sponsors/omar-dulaimi">
    <img src="https://img.shields.io/badge/💝_Sponsor_on_GitHub-ea4aaa?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Sponsors" height="45">
  </a>
  
  <p><strong>✨ Your sponsorship drives innovation and keeps this project thriving ✨</strong></p>
  
</div>

<div align="center">
  
  ## 🚀 **Version 2.0 Beta** - Major Upgrade Available!
  
  <table>
    <tr>
      <td align="center">
        <img src="https://img.shields.io/badge/⚠️_BETA_RELEASE-orange?style=for-the-badge&logo=rocket" alt="Beta Release">
      </td>
    </tr>
    <tr>
      <td align="center">
        <strong>🎉 Prisma 6 & tRPC 11 support with next-gen features!</strong>
      </td>
    </tr>
  </table>
  
</div>

### ✨ **What's New in v2.0.0-beta**

<div align="center">
  
  | 🚀 **Feature** | 📦 **Version** | 🎯 **Benefit** |
  |----------------|----------------|------------------|
  | **Prisma** | `6.12.0+` | 🏃‍♂️ Improved performance & stability |
  | **tRPC** | `11.4.3+` | 🛡️ Enhanced type safety & modern APIs |
  | **TypeScript** | `5.8+` | ⚡ Cutting-edge language features |
  | **Zod** | `4.0+` | 🔍 Advanced validation & error handling |
  | **Testing** | `Vitest 3` | 🧪 90%+ coverage with modern tooling |
  | **Tooling** | `ESLint 9` | 🔧 Latest dev experience |
  
</div>

<div align="center">
  
  ### 📦 **Try the Beta**
  
</div>

```bash
# 🚀 Install the cutting-edge beta
npm install prisma-trpc-generator@beta

# 🎯 Or lock to specific version
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

<div align="center">
  
  ## 📚 **Navigation**
  
  <table>
    <tr>
      <td><a href="#-features">✨ Features</a></td>
      <td><a href="#-quick-start">🚀 Quick Start</a></td>
      <td><a href="#-generated-output">📋 Output</a></td>
      <td><a href="#️-configuration-options">⚙️ Config</a></td>
    </tr>
    <tr>
      <td><a href="#-advanced-usage">🔧 Advanced</a></td>
      <td><a href="#-examples">📚 Examples</a></td>
      <td><a href="#-troubleshooting">🔍 Troubleshooting</a></td>
      <td><a href="#-contributing">🤝 Contributing</a></td>
    </tr>
  </table>
  
</div>

<div align="center">
  
  ## ✨ **Why Choose Prisma tRPC Generator?**
  
</div>

<table>
  <tr>
    <td align="center" width="25%">
      <img src="https://img.shields.io/badge/🚀-Zero_Config-blue?style=for-the-badge" alt="Zero Config">
      <br><strong>Works instantly</strong><br><em>Sensible defaults included</em>
    </td>
    <td align="center" width="25%">
      <img src="https://img.shields.io/badge/🔄-Auto_Generated-green?style=for-the-badge" alt="Auto Generated">
      <br><strong>Always in sync</strong><br><em>Updates with schema changes</em>
    </td>
    <td align="center" width="25%">
      <img src="https://img.shields.io/badge/🛡️-Type_Safe-purple?style=for-the-badge" alt="Type Safe">
      <br><strong>100% TypeScript</strong><br><em>Catch errors at compile time</em>
    </td>
    <td align="center" width="25%">
      <img src="https://img.shields.io/badge/🎯-Comprehensive-orange?style=for-the-badge" alt="Comprehensive">
      <br><strong>Full CRUD coverage</strong><br><em>All Prisma operations included</em>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/⚙️-Configurable-red?style=for-the-badge" alt="Configurable">
      <br><strong>Highly customizable</strong><br><em>Adapt to your needs</em>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/📦-Lightweight-yellow?style=for-the-badge" alt="Lightweight">
      <br><strong>Minimal footprint</strong><br><em>Fast generation & runtime</em>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/🔗-Integrations-cyan?style=for-the-badge" alt="Integrations">
      <br><strong>Ecosystem ready</strong><br><em>Zod, Shield, middleware</em>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/🎨-Flexible-pink?style=for-the-badge" alt="Flexible">
      <br><strong>Your way</strong><br><em>Custom paths & middleware</em>
    </td>
  </tr>
</table>

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

```
generated/
├── routers/
│   ├── index.ts              # Main app router that combines all model routers  
│   ├── helpers/
│   │   └── createRouter.ts   # Base router factory with middleware/shield setup
│   ├── User.router.ts        # User CRUD operations
│   └── Post.router.ts        # Post CRUD operations
└── schemas/                  # Zod validation schemas (if withZod: true)
    ├── objects/              # Input type schemas
    ├── findManyUser.schema.ts
    ├── createOneUser.schema.ts
    └── index.ts              # Barrel exports
```

### Version Compatibility

| Version | Prisma | tRPC | TypeScript | Zod | Node.js | Status |
|---------|--------|------|------------|-----|---------|--------|
| **v2.0.0-beta** | 6.12.0+ | 11.4.3+ | 5.8+ | 4.0+ | 18+ | 🧪 **Beta** |
| v1.4.1 (stable) | 4.8.0+ | 10.7.0+ | 4.9+ | 3.20+ | 16+ | ✅ **Stable** |

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

### Performance Considerations

#### Large Schemas
For projects with many models (50+), consider:
- Using selective generation with model hiding
- Splitting routers into multiple files
- Implementing lazy loading for routers

#### Build Times
To optimize build performance:
- Add generated files to `.gitignore`
- Use parallel builds where possible
- Consider caching in CI/CD pipelines

### FAQ

**Q: Can I customize the generated router validation rules?**
A: The routers are generated based on your Prisma schema constraints. Modify your Prisma model definitions to change validation rules.

**Q: Does this work with Prisma Edge Runtime?**
A: Yes, the generated routers are compatible with Prisma Edge Runtime.

**Q: Can I use this with databases other than the officially supported ones?**
A: The generator supports all Prisma-compatible databases. Custom databases should work if Prisma supports them.

**Q: How do I handle enum validation?**
A: Enums are automatically converted to Zod enum schemas and included in the generated validation.

**Q: Can I exclude certain fields from validation?**
A: Use Prisma's `@ignore` directive or model-level hiding with `@@Gen.model(hide: true)`.

### Getting Help

- 🐛 **Bug Reports**: [Create a bug report](https://github.com/omar-dulaimi/prisma-trpc-generator/issues/new)
- 💡 **Feature Requests**: [Request a feature](https://github.com/omar-dulaimi/prisma-trpc-generator/issues/new)
- 💬 **Discussions**: [Join the discussion](https://github.com/omar-dulaimi/prisma-trpc-generator/discussions)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Development Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/your-username/prisma-trpc-generator.git
cd prisma-trpc-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development build**
```bash
npm run generate
```

4. **Run tests**
```bash
npm test
```

### Testing

We have comprehensive tests covering:
- **Unit Tests**: Core transformation logic
- **Integration Tests**: End-to-end router generation
- **Multi-Provider Tests**: All database providers
- **Performance Tests**: Large schema handling

Run specific test suites:
```bash
npm run test:basic           # Basic functionality
npm run test:integration     # Integration testing  
npm run test:coverage        # Coverage reports
npm run test:comprehensive   # Full test suite
```

### Contribution Guidelines

1. **Create an issue** for bugs or feature requests
2. **Follow the existing code style** (ESLint + Prettier)
3. **Add tests** for new functionality
4. **Update documentation** as needed
5. **Submit a pull request** with a clear description

### Code Style

We use ESLint and Prettier for consistent code formatting:
```bash
npm run lint      # Check and fix linting issues
npm run format    # Format code with Prettier
```

### Release Process

This project uses semantic versioning and automated releases:
- **Patch**: Bug fixes and small improvements
- **Minor**: New features and enhancements  
- **Major**: Breaking changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [prisma-zod-generator](https://github.com/omar-dulaimi/prisma-zod-generator) - Generate Zod schemas from Prisma schema
- [prisma-trpc-shield-generator](https://github.com/omar-dulaimi/prisma-trpc-shield-generator) - Generate tRPC Shield permissions from Prisma schema
- [tRPC Shield](https://github.com/omar-dulaimi/trpc-shield) - Permission system for tRPC
- [Prisma](https://github.com/prisma/prisma) - Database toolkit and ORM
- [tRPC](https://trpc.io) - End-to-end typesafe APIs made easy

## 🙏 Acknowledgments

- [Prisma](https://github.com/prisma/prisma) - Modern database toolkit
- [tRPC](https://trpc.io) - End-to-end typesafe APIs
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation
- All our [contributors](https://github.com/omar-dulaimi/prisma-trpc-generator/graphs/contributors)

---

<br>

---

<div align="center">
  
  <h3>🌟 **Show Your Support** 🌟</h3>
  
  <a href="https://github.com/omar-dulaimi/prisma-trpc-generator">
    <img src="https://img.shields.io/github/stars/omar-dulaimi/prisma-trpc-generator?style=for-the-badge&logo=github&color=yellow" alt="GitHub Stars">
  </a>
  
  <br><br>
  
  <table>
    <tr>
      <td align="center">
        <img src="https://img.shields.io/badge/💎-Latest_Stable-success?style=for-the-badge&logo=npm" alt="Stable">
        <br>
        <code>v1.4.1</code>
      </td>
      <td align="center">
        <img src="https://img.shields.io/badge/🚀-Beta_Version-warning?style=for-the-badge&logo=rocket" alt="Beta">
        <br>
        <code>v2.0.0-beta.0</code>
      </td>
    </tr>
  </table>
  
  <br>
  
  <p>
    <strong>Made with ❤️ by</strong>
    <a href="https://github.com/omar-dulaimi">
      <img src="https://img.shields.io/badge/Omar_Dulaimi-100000?style=for-the-badge&logo=github&logoColor=white" alt="Omar Dulaimi">
    </a>
  </p>
  
  <p><em>⚡ Accelerating tRPC development, one schema at a time</em></p>
  
</div>
