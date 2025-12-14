# PrivateShip 🔐

**Cryptographic Trust Protocol for African Commerce**

[![License: Private](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Midnight](https://img.shields.io/badge/Powered_by-Midnight-purple.svg)](https://midnight.network/)
[![Status](https://img.shields.io/badge/Status-In_Development-orange.svg)]()

> **Trust, without the exposure.** Privacy-preserving identity verification for social commerce, powered by zero-knowledge proofs.

---

## 🚀 What is PrivateShip?

PrivateShip is a **zero-knowledge trust infrastructure** that lets users prove they are real, trustworthy, and consistent — **without exposing their identity**.

### The Problem

In Kenya (and across Africa):
- **15.1M people** use social media for commerce (4h 19min daily - #1 globally)
- **91% cart abandonment** rate due to trust barriers
- **No portable trust layer** for WhatsApp/Instagram sellers
- **Invasive KYC** required on every platform
- **Data breaches** expose user identities constantly

### The Solution

**PrivateShip** enables users to:
- ✅ Verify once, reuse everywhere
- ✅ Prove trust properties (age, identity stability, fraud-free)
- ✅ Share trust scores without revealing identity
- ✅ Own their cryptographic identity
- ✅ Reduce fraud for merchants

**Powered by:** Cardano's Midnight protocol (zero-knowledge proofs + private state)

---

## 🎯 Key Features

### For Users
- **Trust Passport**: Cryptographic identity you own and control
- **Privacy-First**: Prove trust without exposing PII
- **Portable**: Use across any platform (WhatsApp, marketplaces, apps)
- **One-Time Verification**: Verify phone + ID once, reuse forever
- **Trust Score**: 0-100 score based on verification depth + behavior

### For Developers/Platforms
- **Simple API**: RESTful + GraphQL integration
- **SDKs**: JavaScript, React, Node.js
- **Webhooks**: Real-time event notifications
- **White-Label**: Embed trust verification in your app
- **Fraud Prevention**: Built-in risk scoring and detection

### For Merchants
- **Dashboard**: Filament-based admin panel (beautiful, fast)
- **Analytics**: Trust score distribution, fraud alerts
- **API Management**: Generate/revoke API keys
- **Compliance**: Full audit trail for regulations
- **Lower Liability**: Never store user PII

---

## 📁 Project Structure

```
privateship/
├── .kiro/
│   ├── steering/              # Kiro AI steering files
│   │   ├── product.md         # Product vision & strategy
│   │   ├── tech.md            # Technology stack
│   │   ├── structure.md       # Project structure
│   │   └── api-standards.md   # API design standards
│   └── specs/                 # Feature specifications
│       └── user-verification/
├── apps/
│   ├── api/                   # Fastify API (TypeScript)
│   ├── web/                   # Next.js user app
│   ├── admin/                 # Laravel Filament admin
│   └── mobile/                # React Native (Expo)
├── packages/
│   ├── database/              # Drizzle ORM + PostgreSQL ✅
│   ├── types/                 # Shared TypeScript types
│   ├── ui/                    # Shared UI components (shadcn)
│   └── utils/                 # Shared utilities
├── docs/                      # Documentation
├── scripts/                   # Utility scripts
└── docker-compose.yml         # Local development services
```

### Monorepo Structure
- **Package Manager**: pnpm (fast, efficient)
- **Build System**: Turborepo (parallel builds)
- **Language**: TypeScript (strict mode)
- **Database ORM**: Drizzle (type-safe)

---

## 🛠 Tech Stack

### Frontend
- **Web App**: Next.js 14 (App Router, Server Components)
- **Admin Panel**: Laravel Filament (enterprise-grade admin)
- **Mobile App**: React Native (Expo SDK 50+)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React Query (TanStack Query)

### Backend
- **API**: Fastify (fastest Node.js framework)
- **Language**: TypeScript 5.3+
- **Database**: PostgreSQL 16 + Drizzle ORM
- **Cache**: Redis 7 (sessions, proofs, queues)
- **Search**: MeiliSearch (fast user lookup)
- **Queue**: BullMQ (background jobs)

### Blockchain
- **Midnight Protocol**: Zero-knowledge proofs, private state
- **Cardano Network**: Immutable proof anchoring

### Infrastructure
- **Hosting**: Railway (MVP) → AWS (production)
- **Storage**: AWS S3 (encrypted documents)
- **Monitoring**: Sentry + PostHog + BetterUptime
- **CI/CD**: GitHub Actions

### Integrations
- **SMS**: Africa's Talking (phone OTP)
- **OCR**: SmileID (ID document extraction)
- **Auth**: Clerk (phone number auth)

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 14
- Redis >= 7
- Docker (optional, for local services)

### Installation

```bash
# Clone repository
git clone https://github.com/privateship/privateship
cd privateship

# Install dependencies
pnpm install

# Set up environment variables
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env with your values

# Start local services (PostgreSQL, Redis)
docker-compose up -d

# Run database migrations
pnpm db:migrate

# (Optional) Seed development data
pnpm db:seed

# Start development servers
pnpm dev
```

### Development URLs
- API: http://localhost:3001
- Web App: http://localhost:3000
- Admin Panel: http://localhost:8000
- Drizzle Studio: http://localhost:4983 (run `pnpm db:studio`)

---

## 📚 Documentation

### Core Documentation
- [**Product Vision**](.kiro/steering/product.md) - Why PrivateShip exists
- [**Technical Architecture**](docs/TECHNICAL.md) - System design & stack
- [**API Reference**](docs/API.md) - Endpoint documentation
- [**Database Schema**](packages/database/SCHEMA.md) - Tables & relationships

### Developer Guides
- [**Setup Guide**](docs/SETUP.md) - Local development setup
- [**API Integration**](docs/INTEGRATION.md) - How to integrate PrivateShip
- [**SDK Documentation**](docs/SDK.md) - JavaScript SDK usage
- [**Webhooks**](docs/WEBHOOKS.md) - Event notifications

### Architecture
- [**High-Level Architecture**](docs/ARCHITECTURE.md) - System overview
- [**Security**](docs/SECURITY.md) - Encryption, compliance
- [**Midnight Integration**](docs/MIDNIGHT.md) - ZK proof system

---

## 🔐 Security

### Data Protection
- **Encryption at Rest**: AES-256-GCM (PostgreSQL TDE, S3 SSE)
- **Encryption in Transit**: TLS 1.3 only
- **Field-Level Encryption**: Phone, ID, PII encrypted
- **Hashing**: Bcrypt for lookups (phone_hash, id_hash)
- **Key Management**: AWS KMS (90-day rotation)

### Privacy by Design
- **Zero-Knowledge Proofs**: Users prove claims without data
- **Minimal Disclosure**: Only ask what's necessary
- **Data Retention**: Documents deleted after 24h
- **Audit Logging**: Immutable trail for compliance
- **User Control**: Users can delete data anytime

### Compliance
- Kenya Data Protection Act 2019 ✅
- GDPR-ready (for future EU expansion) ✅
- Audit logs retained 7 years (legal requirement) ✅

---

## 🎯 Roadmap

### Phase 1: MVP (Q1 2025) - **In Progress** 🟡
- [x] Database schema & structure
- [x] Project setup (monorepo, CI/CD)
- [ ] Phone verification (OTP via Africa's Talking)
- [ ] ID document upload + OCR
- [ ] Trust score algorithm v1
- [ ] Basic proof generation (pre-Midnight)
- [ ] REST API (5 core endpoints)
- [ ] Next.js user dashboard
- [ ] Filament admin panel

**Goal:** 100 verified users, 10 merchant pilots

### Phase 2: Midnight Integration (Q2 2025)
- [ ] Midnight smart contracts (Compact)
- [ ] ZK proof generation
- [ ] On-chain proof anchoring
- [ ] Private state management
- [ ] Proof expiry + refresh mechanism
- [ ] WhatsApp bot integration

**Goal:** 1,000 users, 50 merchants, Midnight testnet

### Phase 3: Platform Integrations (Q3 2025)
- [ ] JavaScript SDK (React, Node.js)
- [ ] Browser extension
- [ ] Marketplace integrations (Jiji, PigiaMe)
- [ ] Advanced fraud detection
- [ ] Real-time trust monitoring
- [ ] Webhook system

**Goal:** 10,000 users, 200 merchants, Cardano mainnet

### Phase 4: Scale & Expand (Q4 2025)
- [ ] Nigeria expansion (local IDs, SMS)
- [ ] Face verification + liveness detection
- [ ] Mobile app (React Native)
- [ ] Web3 integrations (Sybil resistance)
- [ ] White-label solution
- [ ] Series A fundraising

**Goal:** 100,000 users, 1,000 merchants, profitability

---

## 🧪 Testing

### Run Tests
```bash
# Unit tests
pnpm test

# Integration tests
pnpm test:integration

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:coverage

# Type check
pnpm typecheck

# Lint
pnpm lint
```

### Testing Stack
- **Unit**: Jest + Testing Library
- **Integration**: Supertest (API)
- **E2E**: Playwright (user flows)
- **Load**: k6 (performance)

---

## 📊 Project Status

### Current Focus
Building **Phase 1 (MVP)** with core verification system:
1. ✅ Database schema complete
2. 🟡 Phone verification (in progress)
3. 🟡 ID document upload (in progress)
4. ⬜ Trust score calculation
5. ⬜ API endpoints
6. ⬜ User dashboard

### Metrics (Target for MVP)
- Users: 100 verified identities
- Merchants: 10 pilot partners
- Trust Scores: 80+ average
- API Uptime: 99.9%
- Response Time: P95 < 500ms

---

## 🤝 Contributing

We're currently in **private development**. If you're interested in contributing or partnering, please contact us.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- TypeScript strict mode
- ESLint + Prettier enforced
- Conventional Commits
- Test coverage > 80%

---

## 📞 Contact

- **Website**: [privateship.co](https://privateship.co) (coming soon)
- **Email**: founders@privateship.co
- **Twitter**: [@PrivateShipHQ](https://twitter.com/PrivateShipHQ)
- **GitHub**: [github.com/privateship](https://github.com/privateship)

### Team
- **Emmanuel** - Founder & CEO
- [Join us!](mailto:careers@privateship.co) - We're hiring

---

## 📄 License

**Private & Proprietary** - PrivateShip Kenya © 2024

All rights reserved. This software is proprietary and confidential.

---

## 🌟 Why PrivateShip?

### Problem: Trust Deficit in African Commerce
- 91% cart abandonment (trust barrier)
- $2.6B+ e-commerce market (growing 12%/year)
- 15M+ social commerce users (no trust layer)
- Scammers rotate identities easily
- KYC is invasive + centralized

### Solution: Cryptographic Trust Protocol
- Verify once, reuse everywhere
- Zero-knowledge proofs (privacy-preserving)
- Portable trust (cross-platform)
- Fraud prevention built-in
- First-mover advantage

### Unfair Advantages
1. **Technology**: Midnight + ZK proofs (hard to copy)
2. **Network**: First trust layer for African social commerce
3. **Compliance**: Built for Kenya Data Protection Act
4. **UX**: Simplest onboarding (< 2 minutes)
5. **Moat**: Crypto + network effects

---

## 🚀 Let's Build

PrivateShip is building the **trust infrastructure** that African commerce needs.

**Join us in creating a more trustworthy, privacy-preserving internet.**

---

<p align="center">
  <strong>PrivateShip: Trust, without the exposure.</strong>
  <br>
  Built with Midnight • Powered by cryptography • Designed for Africa
</p>

<p align="center">
  <a href="https://privateship.co">Website</a> •
  <a href="docs/API.md">API Docs</a> •
  <a href="mailto:founders@privateship.co">Contact</a>
</p>