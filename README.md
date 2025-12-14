# PrivateShip 🚢🔒

**The privacy-preserving trust layer for payments, platforms, and protocols.**

PrivateShip is an infrastructure protocol that allows users to verify their identity once and generate zero-knowledge proofs to prove trustworthiness to any third party—without ever exposing their personal data (PII).

Built with **Midnight Network** (ZK Proofs), **Fastify** (Backend), and **Next.js** (Frontend).

---

## 🏗️ Architecture (Monorepo)

- **`apps/web`** (Next.js 14): The user-facing application. Includes the marketing landing page, user dashboard (Trust Passport), and verification flows.
  - **Port**: `3000`
- **`apps/api`** (Fastify): The core API service handling identity commitments, verification logic, and database interactions.
  - **Port**: `3001`
- **`docker-compose.yml`**: Orchestrates local development infrastructure (PostgreSQL, Redis).

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- pnpm (recommended) or npm

### 1. Environment Setup

Copy the example environment files (if available) or create them:

**Backend (`apps/api/.env`)**:
```env
DATABASE_URL="postgres://user:password@127.0.0.1:5432/privateship"
# REDIS_URL="redis://localhost:6379" (Optional, defaults to localhost)
# ENCRYPTION_SECRET="your-32-byte-secret-key"
```

### 2. Start Infrastructure

Spin up the database and cache services:
```bash
docker-compose up -d
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Servers

You can run them individually in separate terminals:

**Backend:**
```bash
cd apps/api
npm run dev
```

**Frontend:**
```bash
cd apps/web
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, Tailwind CSS v4, Framer Motion, Lucide React.
- **Backend**: Fastify, TypeScript, Zod, Drizzle ORM.
- **Data**: PostgreSQL (Primary DB), Redis (Cache/Queues).
- **Cryptography**: Native node 'crypto' for MVP, Midnight.js for ZK proofs (upcoming).

## 🗺️ Roadmap

See [privateship_detailed_roadmap.md](./privateship_detailed_roadmap.md) for the detailed implementation plan.

## 🤝 Contributing

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---

## 📄 License

Proprietary / Closed Source (Initial Phase)
