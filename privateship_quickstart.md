# PrivateShip Quick Start Guide

**Get from zero to running in 30 minutes.**

---

## 🎯 What You're Building Today

By the end of this guide, you'll have:
- ✅ API server running (Fastify)
- ✅ Database connected (PostgreSQL)
- ✅ Cache working (Redis)
- ✅ First endpoint (`GET /health`)
- ✅ Hot reload enabled
- ✅ Ready to build phone verification

---

## 📋 Prerequisites Check

Before starting, verify you have:

```bash
# Node.js (must be v18+)
node --version
# Should show: v18.x.x or v20.x.x

# pnpm (must be v8+)
pnpm --version
# Should show: 8.x.x or 9.x.x

# If not installed:
npm install -g pnpm

# PostgreSQL (must be v14+)
psql --version
# Should show: psql (PostgreSQL) 14.x or higher

# Redis (must be v7+)
redis-cli --version
# Should show: redis-cli 7.x.x
```

**Don't have PostgreSQL or Redis locally?**
→ Use Docker (see Docker Setup below)

---

## 🚀 Setup Steps

### Step 1: Clone & Install (5 minutes)

```bash
# If starting fresh (no repo yet)
mkdir privateship
cd privateship
git init

# Initialize pnpm workspace
pnpm init

# Create workspace config
cat > pnpm-workspace.yaml << EOF
packages:
  - 'apps/*'
  - 'packages/*'
EOF

# Create folder structure
mkdir -p apps/api/src
mkdir -p packages/{database,types,utils}
mkdir -p .kiro/steering

# Install Turborepo
pnpm add -D turbo

# Create turbo.json
cat > turbo.json << EOF
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {
      "dependsOn": ["^build"]
    }
  }
}
EOF
```

---

### Step 2: Set Up API (10 minutes)

```bash
cd apps/api

# Initialize package.json
pnpm init

# Install dependencies
pnpm add fastify @fastify/cors @fastify/helmet @fastify/jwt
pnpm add drizzle-orm postgres
pnpm add redis ioredis
pnpm add pino pino-pretty
pnpm add dotenv
pnpm add zod

# Install dev dependencies
pnpm add -D typescript @types/node tsx nodemon
pnpm add -D drizzle-kit
pnpm add -D @types/pg

# Initialize TypeScript
npx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --lib es2022 --module commonjs --target es2022 --strict --skipLibCheck
```

**Create `src/server.ts`:**

```typescript
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { config } from './config';
import { logger } from './utils/logger';

const server = Fastify({
  logger: logger,
});

// Plugins
server.register(cors, { origin: true });
server.register(helmet);

// Health check endpoint
server.get('/health', async (request, reply) => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});

// Start server
const start = async () => {
  try {
    const port = config.port;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`✅ Server listening on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
```

**Create `src/config.ts`:**

```typescript
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001'),
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/privateship',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  },
};
```

**Create `src/utils/logger.ts`:**

```typescript
import pino from 'pino';
import { config } from '../config';

export const logger = pino({
  level: config.nodeEnv === 'development' ? 'debug' : 'info',
  transport: config.nodeEnv === 'development'
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
});
```

**Update `package.json` scripts:**

```json
{
  "name": "@privateship/api",
  "version": "1.0.0",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "lint": "eslint src/**/*.ts",
    "test": "jest"
  }
}
```

**Create `.env`:**

```bash
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/privateship
REDIS_URL=redis://localhost:6379
JWT_SECRET=dev-secret-change-me
```

---

### Step 3: Set Up Database (10 minutes)

```bash
cd ../../packages/database

# Initialize package
pnpm init

# Install dependencies
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit

# Create folder structure
mkdir -p src/schema
```

**Create `drizzle.config.ts`:**

```typescript
import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  schema: './src/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

**Create `src/schema/identity-commitments.ts`:**

```typescript
import { pgTable, uuid, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const identityCommitments = pgTable('identity_commitments', {
  commitmentId: uuid('commitment_id').defaultRandom().primaryKey(),
  userId: uuid('user_id').unique().notNull(),
  commitmentHash: text('commitment_hash').notNull(),
  phoneHash: text('phone_hash').unique(),
  idNumberHash: text('id_number_hash').unique(),
  verificationTier: text('verification_tier').notNull(), // 'phone' | 'id' | 'biometric'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at'),
  midnightAnchorTx: text('midnight_anchor_tx'),
});
```

**Create `src/schema/index.ts`:**

```typescript
export * from './identity-commitments';
// Export other tables here as you create them
```

**Create `src/index.ts`:**

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);

export const db = drizzle(client, { schema });

// Export types
export type IdentityCommitment = typeof schema.identityCommitments.$inferSelect;
export type NewIdentityCommitment = typeof schema.identityCommitments.$inferInsert;
```

**Update `package.json`:**

```json
{
  "name": "@privateship/database",
  "version": "1.0.0",
  "scripts": {
    "generate": "drizzle-kit generate",
    "migrate": "drizzle-kit migrate",
    "studio": "drizzle-kit studio"
  }
}
```

**Create database:**

```bash
# If using local PostgreSQL
createdb privateship

# Or using psql
psql -U postgres -c "CREATE DATABASE privateship;"
```

---

### Step 4: Docker Setup (Alternative - 5 minutes)

**If you don't have PostgreSQL/Redis installed, use Docker:**

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: privateship-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: privateship
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: privateship-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

**Start services:**

```bash
docker-compose up -d

# Check if running
docker ps

# You should see postgres and redis containers
```

---

### Step 5: Run Everything (2 minutes)

```bash
# From project root

# Generate database schema
cd packages/database
pnpm generate

# Run migrations (creates tables)
pnpm migrate

# Start API server
cd ../../apps/api
pnpm dev

# You should see:
# ✅ Server listening on http://localhost:3001
```

**Test it:**

```bash
# Open new terminal
curl http://localhost:3001/health

# Should return:
{
  "status": "ok",
  "timestamp": "2024-12-14T12:00:00.000Z",
  "uptime": 5.123
}
```

---

## ✅ Success! What's Next?

You now have:
- ✅ API server running on port 3001
- ✅ PostgreSQL database with schema
- ✅ Redis cache ready
- ✅ Hot reload enabled (edit code → auto restarts)
- ✅ Health check endpoint working

---

## 🎯 Next Steps (Build Phone Verification)

### Today's Goal: OTP Phone Verification

**What you're building:**
1. Endpoint to send OTP via SMS
2. Endpoint to verify OTP
3. Create user identity commitment
4. Return JWT token

**Start here:**

```bash
# Install Africa's Talking SDK
cd apps/api
pnpm add africastalking

# Create SMS service
mkdir -p src/services
touch src/services/sms.service.ts
```

**Create `src/services/sms.service.ts`:**

```typescript
import AfricasTalking from 'africastalking';
import { config } from '../config';

const client = AfricasTalking({
  apiKey: config.africastalking.apiKey,
  username: config.africastalking.username,
});

const sms = client.SMS;

export class SMSService {
  async sendOTP(phone: string, code: string): Promise<void> {
    try {
      const result = await sms.send({
        to: [phone],
        message: `Your PrivateShip verification code is ${code}. Valid for 5 minutes.`,
        from: 'PrivateShip',
      });
      
      console.log('SMS sent:', result);
    } catch (error) {
      console.error('SMS error:', error);
      throw new Error('Failed to send SMS');
    }
  }
}
```

**Update `src/config.ts` (add Africa's Talking):**

```typescript
africastalking: {
  apiKey: process.env.AT_API_KEY || 'your-api-key',
  username: process.env.AT_USERNAME || 'sandbox',
},
```

**Create OTP service:**

```typescript
// src/services/otp.service.ts
import { createClient } from 'redis';
import bcrypt from 'bcrypt';

export class OTPService {
  private redis;

  constructor() {
    this.redis = createClient({ url: process.env.REDIS_URL });
    this.redis.connect();
  }

  generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async storeOTP(phone: string, code: string): Promise<void> {
    const hash = await bcrypt.hash(code, 10);
    const key = `otp:${phone}`;
    
    await this.redis.setEx(key, 300, hash); // 5 min TTL
  }

  async verifyOTP(phone: string, code: string): Promise<boolean> {
    const key = `otp:${phone}`;
    const hash = await this.redis.get(key);
    
    if (!hash) return false;
    
    const valid = await bcrypt.compare(code, hash);
    
    if (valid) {
      await this.redis.del(key); // Delete after successful verification
    }
    
    return valid;
  }
}
```

**Create auth routes:**

```typescript
// src/routes/auth.ts
import { FastifyPluginAsync } from 'fastify';
import { SMSService } from '../services/sms.service';
import { OTPService } from '../services/otp.service';
import { z } from 'zod';

const smsService = new SMSService();
const otpService = new OTPService();

export const authRoutes: FastifyPluginAsync = async (server) => {
  // Send OTP
  server.post('/send-otp', async (request, reply) => {
    const schema = z.object({
      phone: z.string().regex(/^\+254\d{9}$/), // Kenya format
    });
    
    const { phone } = schema.parse(request.body);
    
    // Generate and send OTP
    const code = otpService.generateCode();
    await otpService.storeOTP(phone, code);
    await smsService.sendOTP(phone, code);
    
    return {
      success: true,
      data: {
        message: 'OTP sent successfully',
        expiresIn: 300, // 5 minutes
      },
    };
  });

  // Verify OTP
  server.post('/verify-otp', async (request, reply) => {
    const schema = z.object({
      phone: z.string(),
      code: z.string().length(6),
    });
    
    const { phone, code } = schema.parse(request.body);
    
    const valid = await otpService.verifyOTP(phone, code);
    
    if (!valid) {
      return reply.code(400).send({
        success: false,
        error: {
          code: 'INVALID_OTP',
          message: 'Invalid or expired OTP',
        },
      });
    }
    
    // TODO: Create identity commitment in database
    // TODO: Generate JWT token
    
    return {
      success: true,
      data: {
        message: 'Phone verified successfully',
        // token: 'jwt-token-here',
      },
    };
  });
};
```

**Register routes in `src/server.ts`:**

```typescript
import { authRoutes } from './routes/auth';

// After plugins, before start()
server.register(authRoutes, { prefix: '/api/v1/auth' });
```

---

## 📚 Helpful Commands

```bash
# Development
pnpm dev              # Start API with hot reload

# Database
pnpm db:generate      # Generate migration
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio (GUI)

# Testing
pnpm test            # Run tests

# Docker
docker-compose up -d         # Start services
docker-compose down          # Stop services
docker-compose logs -f       # View logs
```

---

## 🐛 Troubleshooting

### "Cannot connect to PostgreSQL"
```bash
# Check if PostgreSQL is running
docker ps
# Or if local install:
pg_isready

# Check connection string
echo $DATABASE_URL
```

### "Redis connection refused"
```bash
# Check if Redis is running
docker ps
# Or:
redis-cli ping
# Should return: PONG
```

### "Port 3001 already in use"
```bash
# Find process using port
lsof -ti:3001

# Kill it
kill -9 $(lsof -ti:3001)

# Or change port in .env
PORT=3002
```

### "pnpm not found"
```bash
npm install -g pnpm
```

---

## 🎯 Your First PR Checklist

Before committing your first code:

- [ ] Server starts without errors
- [ ] Health check endpoint works
- [ ] Database migrations run successfully
- [ ] Redis connection works
- [ ] `.env` NOT committed (add to `.gitignore`)
- [ ] TypeScript compiles without errors
- [ ] Code formatted (Prettier)
- [ ] Commit message follows convention: `feat: add health check endpoint`

---

## 📞 Need Help?

If you get stuck:

1. Check the error message carefully
2. Search the issue on Stack Overflow
3. Read the package documentation
4. Ask in the team chat (or create GitHub issue)

---

## 🚀 What's After Phone Verification?

Once phone verification works, you'll build:

**Week 2:** ID document upload + OCR
**Week 3:** Trust score calculation
**Week 4:** Proof generation API
**Week 5:** User dashboard (Next.js)
**Week 6:** Admin dashboard (Filament)

**Follow:** [IMPLEMENTATION.md](IMPLEMENTATION.md) for detailed roadmap

---

**Ready? Let's build! 🔨**

**First Task:** Get the health check endpoint working. Everything else builds from there.

---

**Pro tip:** Commit often. Push daily. Don't let code sit on your machine. Ship fast, iterate faster. 🚢