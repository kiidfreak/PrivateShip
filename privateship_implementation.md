# PrivateShip Implementation Roadmap

## 🎯 Current Status

**Version**: 2.0 (Trust Protocol Pivot)  
**Phase**: MVP Development (Phase 1)  
**Timeline**: Q1 2025 (3 months)  
**Team**: 1-2 developers

---

## 📋 Phase 1: MVP (Months 1-3)

### Month 1: Foundation & Core Services

#### Week 1-2: Infrastructure Setup
**Goal:** Get development environment + core services running

**Tasks:**
- [x] ✅ **Database schema** (DONE - already complete)
  - identity_commitments, verification_events, proofs, trust_state, etc.
- [ ] 🟡 **API foundation** (IN PROGRESS)
  - [ ] Fastify server setup with plugins
  - [ ] PostgreSQL connection (Drizzle ORM)
  - [ ] Redis connection
  - [ ] Environment configuration
  - [ ] Docker Compose for local dev
  - [ ] Basic health check endpoint
- [ ] **Encryption utilities**
  - [ ] AES-256-GCM encryption helpers
  - [ ] Bcrypt hashing for lookups
  - [ ] KMS integration (AWS or local dev)
  - [ ] Key rotation mechanism
- [ ] **Logger setup**
  - [ ] Structured JSON logging (pino)
  - [ ] Sentry integration
  - [ ] Log levels (debug, info, warn, error)

**Deliverable:** API boots, connects to DB/Redis, logs properly

---

#### Week 3-4: Phone Verification
**Goal:** Users can verify phone numbers via OTP

**Tasks:**
- [ ] **Africa's Talking integration**
  - [ ] SMS service wrapper
  - [ ] Send OTP function
  - [ ] Rate limiting (1 OTP/min per phone)
  - [ ] Error handling + retries
- [ ] **OTP service**
  - [ ] Generate 6-digit code
  - [ ] Store in Redis (bcrypt hash, TTL 5 min)
  - [ ] Verify code (max 3 attempts)
  - [ ] Block after failed attempts
- [ ] **API endpoints**
  - [ ] `POST /api/v1/auth/send-otp`
  - [ ] `POST /api/v1/auth/verify-otp`
  - [ ] Return JWT token on success
- [ ] **Database operations**
  - [ ] Create identity_commitment (Tier 1)
  - [ ] Log verification_event
  - [ ] Update trust_state (basic score)
- [ ] **Tests**
  - [ ] Unit tests for OTP service
  - [ ] Integration tests for endpoints
  - [ ] E2E test: full phone verification flow

**Deliverable:** Phone verification works end-to-end

---

### Month 2: ID Verification & Trust Scoring

#### Week 5-6: Document Upload & OCR
**Goal:** Users can upload ID documents and extract data

**Tasks:**
- [ ] **S3 integration**
  - [ ] Bucket setup (encrypted)
  - [ ] Pre-signed URL generation
  - [ ] Upload helper functions
  - [ ] Auto-delete after 24h
- [ ] **OCR integration (SmileID or custom)**
  - [ ] ID document upload endpoint
  - [ ] Image validation (size, format)
  - [ ] OCR extraction (name, ID number, DOB)
  - [ ] Confidence scoring
  - [ ] Manual review queue (< 90% confidence)
- [ ] **API endpoints**
  - [ ] `POST /api/v1/verify/id` (upload)
  - [ ] `GET /api/v1/verify/status/:verificationId`
- [ ] **Database operations**
  - [ ] Update identity_commitment (Tier 2)
  - [ ] Store verification_request
  - [ ] Log verification_event
- [ ] **Tests**
  - [ ] Mock OCR responses
  - [ ] Test ID validation
  - [ ] Test S3 upload flow

**Deliverable:** Users can upload ID and get verified

---

#### Week 7-8: Trust Score Algorithm
**Goal:** Calculate trust scores based on verification + behavior

**Tasks:**
- [ ] **Trust score calculation**
  - [ ] Base score from verification level
    - Tier 1 (phone): 40 points
    - Tier 2 (ID): +40 points (total 80)
    - Tier 3 (face/liveness): +20 points (total 100)
  - [ ] Time decay (account age bonus)
  - [ ] Identity stability check
  - [ ] Fraud flags (subtract points)
- [ ] **Trust state service**
  - [ ] Calculate initial score
  - [ ] Update score periodically (cron job)
  - [ ] Cache in Redis (1 hour TTL)
- [ ] **API endpoints**
  - [ ] `GET /api/v1/trust-score/:userId`
  - [ ] `GET /api/v1/trust-badge/:userId` (public)
- [ ] **Background jobs**
  - [ ] BullMQ job: Recalculate scores daily
  - [ ] Update trust_state table
- [ ] **Tests**
  - [ ] Unit tests for score algorithm
  - [ ] Test edge cases (fraud flags, new users)

**Deliverable:** Trust scores calculated and queryable

---

### Month 3: API, Dashboard & Polish

#### Week 9-10: Core API Endpoints
**Goal:** Complete REST API for external integrations

**Tasks:**
- [ ] **Proof generation (pre-Midnight MVP)**
  - [ ] Generate basic proof object (JSON)
  - [ ] Sign with server key (JWT)
  - [ ] Store in proofs table
  - [ ] Cache in Redis (5 min)
- [ ] **API endpoints**
  - [ ] `POST /api/v1/proofs/generate`
  - [ ] `POST /api/v1/proofs/verify`
  - [ ] `GET /api/v1/proofs/:proofId`
- [ ] **Merchant API keys**
  - [ ] Generate API keys (pk_live_xxx, sk_live_xxx)
  - [ ] Store in api_keys table
  - [ ] Middleware for API key auth
  - [ ] Rate limiting per key
- [ ] **Webhook system**
  - [ ] Webhook subscriptions (merchants register URLs)
  - [ ] Event triggers (proof.generated, trust.score_updated)
  - [ ] Signature verification (HMAC-SHA256)
  - [ ] Retry logic (3 attempts, exponential backoff)
- [ ] **Documentation**
  - [ ] OpenAPI spec generation
  - [ ] Swagger UI at /api/docs
  - [ ] Postman collection

**Deliverable:** Full API ready for merchant integration

---

#### Week 11: User Dashboard (Next.js)
**Goal:** Web app where users manage their Trust Passport

**Tasks:**
- [ ] **Next.js app setup**
  - [ ] Next.js 14 (App Router)
  - [ ] Tailwind CSS + shadcn/ui
  - [ ] Clerk auth integration
- [ ] **Pages**
  - [ ] Landing page (marketing copy)
  - [ ] Login/Signup (phone OTP)
  - [ ] Verify Phone flow
  - [ ] Verify ID flow (upload UI)
  - [ ] Dashboard (Trust Passport view)
    - Trust score display
    - Verification status
    - Badge share (QR + link)
  - [ ] Settings page
- [ ] **Components**
  - [ ] TrustScoreCard
  - [ ] VerificationStatusBadge
  - [ ] ProofHistoryList
  - [ ] QRCodeGenerator (for badge)
- [ ] **API client**
  - [ ] React Query hooks
  - [ ] API wrapper (fetch/axios)
  - [ ] Error handling

**Deliverable:** Users can verify and view their Trust Passport

---

#### Week 12: Admin Dashboard (Filament)
**Goal:** Merchant/admin panel for managing verifications

**Tasks:**
- [ ] **Laravel + Filament setup**
  - [ ] Laravel 10 project
  - [ ] Filament 3 admin panel
  - [ ] Connect to same PostgreSQL database
- [ ] **Resources (CRUD)**
  - [ ] VerificationResource (list, view, approve/reject)
  - [ ] TrustScoreResource (view only)
  - [ ] ApiKeyResource (generate, revoke)
  - [ ] WebhookSubscriptionResource
  - [ ] AuditLogResource (view only)
- [ ] **Dashboard widgets**
  - [ ] StatsOverviewWidget (total users, verifications today)
  - [ ] TrustScoreChart (distribution histogram)
  - [ ] FraudAlertsWidget (flagged accounts)
- [ ] **Pages**
  - [ ] Dashboard (overview)
  - [ ] Analytics (charts, trends)
  - [ ] Fraud Detection (alerts, manual review)
- [ ] **Auth**
  - [ ] Email + password login
  - [ ] 2FA (TOTP required for admin)
  - [ ] Role-based access control

**Deliverable:** Admin can manage verifications and view analytics

---

## 🚀 MVP Launch Checklist

### Before Beta (Internal Testing)
- [ ] All core endpoints functional
- [ ] Phone + ID verification working
- [ ] Trust scores calculated
- [ ] User dashboard functional
- [ ] Admin dashboard functional
- [ ] Tests passing (unit + integration)
- [ ] Error monitoring (Sentry) set up
- [ ] Analytics (PostHog) tracking events
- [ ] Load testing (100 concurrent users)

### Beta Launch (10 Merchants)
- [ ] Documentation complete (API docs, SDK)
- [ ] Onboarding flow tested
- [ ] Support system ready (Chatwoot or email)
- [ ] Status page (status.privateship.co)
- [ ] Pricing page (free tier + paid plans)
- [ ] Terms of Service + Privacy Policy
- [ ] GDPR/KDPA compliance checklist
- [ ] Backup + disaster recovery plan

### Public Launch (Month 4)
- [ ] 100+ verified users
- [ ] 10+ merchant integrations
- [ ] < 500ms P95 response time
- [ ] 99.9% uptime
- [ ] Case studies (2-3 merchants)
- [ ] Marketing website live
- [ ] Blog + content
- [ ] Social media presence

---

## 📋 Phase 2: Midnight Integration (Months 4-6)

### Month 4: Midnight Smart Contracts

**Tasks:**
- [ ] **Learn Midnight development**
  - [ ] Midnight SDK documentation
  - [ ] Compact language (smart contracts)
  - [ ] Testnet setup
- [ ] **Design TrustProof contract**
  - [ ] Private state structure
  - [ ] ZK proof functions
  - [ ] Proof verification logic
- [ ] **Implement contract**
  - [ ] Write Compact code
  - [ ] Deploy to Midnight testnet
  - [ ] Test proof generation
  - [ ] Test proof verification

**Deliverable:** Smart contract on Midnight testnet

---

### Month 5: ZK Proof Integration

**Tasks:**
- [ ] **API ↔ Midnight integration**
  - [ ] Wallet setup (for contract calls)
  - [ ] Submit identity commitment to contract
  - [ ] Generate ZK proof via contract
  - [ ] Retrieve proof from contract
- [ ] **Replace JWT proofs with ZK proofs**
  - [ ] Update proof generation endpoint
  - [ ] Update proof verification endpoint
  - [ ] Migration path for existing users
- [ ] **Proof anchoring**
  - [ ] Anchor proof commitments on-chain
  - [ ] Store midnight_anchors table
  - [ ] Background job for anchoring

**Deliverable:** ZK proofs working on testnet

---

### Month 6: WhatsApp Bot + Polish

**Tasks:**
- [ ] **WhatsApp bot (Twilio)**
  - [ ] Webhook endpoint for incoming messages
  - [ ] Message parsing (NLP or keyword-based)
  - [ ] Conversation state management (Redis)
  - [ ] Order flow: "I want to verify"
    - Send OTP
    - Request ID upload (via link)
    - Generate proof
    - Send badge link
- [ ] **Mobile app MVP**
  - [ ] Expo app setup
  - [ ] Trust Passport view
  - [ ] QR code scanner
  - [ ] Push notifications
- [ ] **Mainnet preparation**
  - [ ] Security audit (external)
  - [ ] Load testing (1000 concurrent)
  - [ ] Backup strategy
  - [ ] Incident response plan

**Deliverable:** WhatsApp bot live, ready for mainnet

---

## 📋 Phase 3: Platform Integrations (Months 7-9)

### Goals
- SDK development (JS, React, Node)
- Browser extension
- Marketplace integrations (Jiji, PigiaMe)
- Advanced fraud detection (ML models)
- Real-time monitoring dashboard
- 10,000 users, 200 merchants

---

## 📋 Phase 4: Scale & Expand (Months 10-12)

### Goals
- Nigeria expansion (local IDs, providers)
- Face verification + liveness (webcam/mobile)
- React Native app (full release)
- Web3 integrations (Sybil resistance)
- White-label solution
- 100,000 users, 1,000 merchants

---

## 🛠 Development Best Practices

### Daily
- [ ] Push code to Git (commit often)
- [ ] Run tests before pushing
- [ ] Update task status (check off items)
- [ ] Log blockers/questions

### Weekly
- [ ] Review progress (compare to roadmap)
- [ ] Refactor technical debt
- [ ] Update documentation
- [ ] Team sync (if 2+ people)

### Monthly
- [ ] Deploy to staging
- [ ] Beta test with pilot users
- [ ] Gather feedback
- [ ] Update roadmap based on learnings

---

## 🎯 Success Metrics (Track Weekly)

### Technical Metrics
- API uptime: > 99.9%
- P95 response time: < 500ms
- Error rate: < 0.1%
- Test coverage: > 80%
- Build time: < 5 min

### Product Metrics
- New verifications/week
- Trust score distribution (median)
- Phone → ID conversion rate (target: 60%)
- API requests/day
- Active merchants

### Business Metrics
- MRR (Monthly Recurring Revenue)
- CAC (Customer Acquisition Cost)
- Churn rate
- NPS (Net Promoter Score)

---

## 🚨 Risk Mitigation

### Technical Risks
| Risk | Mitigation |
|------|------------|
| Midnight delays | Build MVP without ZK first, add later |
| OCR accuracy low | Manual review queue + human verification |
| SMS delivery fails | Retry logic + alternative providers |
| Database bottleneck | Read replicas + Redis caching |
| API downtime | Multi-region deployment + redundancy |

### Business Risks
| Risk | Mitigation |
|------|------------|
| No merchant adoption | Free tier + direct sales |
| Competition | First-mover + tech moat (Midnight) |
| Regulatory | Legal review + compliance-first design |
| Fraud attacks | Multi-layer verification + ML detection |

---

## 📞 Weekly Standup Template

**What I built this week:**
- [ ] Task 1 (link to PR)
- [ ] Task 2 (link to PR)

**What I'm building next week:**
- [ ] Task 3
- [ ] Task 4

**Blockers:**
- None / [describe blocker]

**Questions:**
- [Technical question]

---

## 🎯 Next Immediate Steps

**This Week (Week 1):**
1. ✅ Complete API foundation (Fastify server)
2. ✅ Connect PostgreSQL + Redis
3. ✅ Basic health check endpoint
4. ✅ Logger setup (pino + Sentry)
5. Start encryption utilities

**Next Week (Week 2):**
1. Africa's Talking SMS integration
2. OTP service (generate + verify)
3. Phone verification endpoints
4. Tests for phone verification

**Priority:** Get phone verification working first. Everything else builds on this foundation.

---

**Let's build! 🚀**

Focus: **MVP first, polish later. Ship fast, iterate faster.**