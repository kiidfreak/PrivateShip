# PrivateShip Detailed Roadmap & Implementation Guide

This document outlines the detailed execution plan broken down by domain: Frontend, Backend, Developer Documentation, and API Integrations.

---

## 🎨 Frontend Roadmap (Next.js 14)

### Phase 1: Landing Page & Marketing
- [x] **Project Setup**: Next.js 14, Tailwind CSS v4, Font configuration.
- [x] **Design System**: Global variables, Colors, Typography in `globals.css`.
- [x] **Core Components**: `Button` (variants), `Hero` section.
- [ ] **Landing Page Sections**:
  - [ ] **Trust Signal Bar**: Infinite slider of trust/security badges.
  - [ ] **Problem/Solution**: Visual comparison of Legacy vs. PrivateShip.
  - [ ] **How It Works**: 3-step animated flow (Verify -> Generate -> Reuse).
  - [ ] **Use Cases**: Tabbed or grid view of seller/marketplace scenarios.
  - [ ] **Developer Preview**: Code snippet block with syntax highlighting.
  - [ ] **Footer**: Navigation and social links.

### Phase 2: User Authentication & Onboarding
- [ ] **Auth Pages**:
  - [ ] `/auth/login`: Phone number input form with country code selector.
  - [ ] `/auth/verify`: OTP input form with countdown timer and resend logic.
  - [ ] **State Management**: React Query hooks for API integration.
- [ ] **Identity Verification Flow**:
  - [ ] **ID Upload**: Drag-and-drop zone for front/back ID images.
  - [ ] **Liveness Check**: Camera interface integration (using `react-webcam` or vendor SDK).
  - [ ] **Verification Status**: Real-time polling UI for verification progress.

### Phase 3: User Dashboard (Trust Passport)
- [ ] **Dashboard Layout**: Sidebar navigation, checking auth state.
- [ ] **Trust Score Card**: Visual representation (gauge/chart) of the current trust score.
- [ ] **Proof Management**:
  - [ ] List of generated proofs.
  - [ ] "Generate Proof" modal/wizard.
- [ ] **Badges**:
  - [ ] Shareable Trust Badge component (QR Code generation).
  - [ ] Public profile view (`/u/[id]`) settings.

---

## ⚙️ Backend Roadmap (Fastify API)

### Phase 1: Infrastructure & Core Identity (Current Status)
- [x] **Server Setup**: Fastify, TypeScript, Pino Logger.
- [x] **Database**: PostgreSQL connection via Drizzle ORM.
- [x] **Cache**: Redis connection with IORedis.
- [x] **Security**: Encryption utilities (AES-256-GCM).
- [x] **OTP Service**: Logic for generating/verifying codes (currently Mock provider).

### Phase 2: Identity & Verification Logic
- [ ] **SMS Integration**:
  - [ ] Replace `MockSmsProvider` with **Africa's Talking**.
  - [ ] Implement rate limiting implementation for SMS endpoints.
- [ ] **ID Verification**:
  - [ ] **S3 Service**: Secure upload URL generation (PUT signed URLs).
  - [ ] **OCR Pipeline**: Integration with SmileID or generic OCR provider.
  - [ ] **Data Extraction**: Parsing logic to standardize ID data.
- [ ] **User Management**:
  - [ ] CRUD for `identity_commitments`.
  - [ ] Device fingerprinting middleware.

### Phase 3: Trust Engine & Midnight Integration
- [ ] **Trust Scoring Algorithm**:
  - [ ] Service to calculate score based on verified attributes (Phone +40, ID +40).
  - [ ] Background job (BullMQ) for periodic score updates.
- [ ] **Midnight Protocol**:
  - [ ] Proof generation service (interfacing with Midnight devnet/testnet).
  - [ ] Storing proof commitments/anchors in DB.
  - [ ] API endpoints for verifying ZK proofs.

---

## 📚 Developer Documentation Roadmap

### Internal & Contributor Docs
- [ ] **Setup Guide**: `CONTRIBUTING.md` updating with Docker/Env setup.
- [ ] **Architecture Decision Records (ADRs)**: Documenting why Fastify, Drizzle, Midnight were chosen.
- [ ] **DB Schema Docs**: Visual diagram of tables and relationships.

### External Developer Portal (For Merchants)
- [ ] **API Reference**:
  - [ ] **Swagger/OpenAPI**: Auto-generation via Fastify Swagger.
  - [ ] Detailed endpoint descriptions for `/proofs/*` and `/verify/*`.
- [ ] **Quickstart Guide**: "Verify your first user in 5 minutes".
- [ ] **SDK Design**:
  - [ ] **Node.js SDK**: Wrapper for server-side verification.
  - [ ] **React Hooks**: `useTrustScore()`, `useVerify()`.
- [ ] **Integration Tutorials**:
  - [ ] "Integrating PrivateShip with Shopify".
  - [ ] "Building a Trust-based Marketplace".

---

## 🔌 API Integrations Roadmap

### 1. External Services (Vendors)
| Service | Purpose | Status | Next Step |
|---------|---------|--------|-----------|
| **Africa's Talking** | SMS/OTP Delivery | 🟡 Planned | Register account, get API Key |
| **AWS S3** | ID Document Storage | 🟡 Planned | Create private buckets, IAM user |
| **SmileID / Metamap** | OCR & AML Checks | 🔴 Todo | Evaluate pricing/docs |
| **Midnight Network** | ZK Proofs | 🔴 Todo | Set up local devnet node |

### 2. Internal Microservices/Modules
| Module | Integration Method | Status |
|--------|-------------------|--------|
| **PostgreSQL** | Drizzle ORM Pool | 🟢 Active |
| **Redis** | IORedis Client | 🟢 Active |
| **Background Jobs** | BullMQ (Redis) | 🔴 Todo |
| **Search** | MeiliSearch | 🔴 Todo |

### 3. Client Integrations (Future)
- [ ] **WhatsApp Bot**: Twilio/Meta API integration for chat-based verification.
- [ ] **Mobile App**: React Native (Expo) API consumption.

---

## 🗓️ Execution Timeline (Next 4 Weeks)

**Week 1 (Now):** Finish Frontend Landing + Auth UI, Hook up OTP Backend.
**Week 2:** ID Verification Backend (S3 + OCR), Dashboard Frontend.
**Week 3:** Trust Scoring Logic, Swagger Docs auto-gen.
**Week 4:** Merchant API Keys, SDK MVP, Alpha Testing.
