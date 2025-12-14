# PrivateShip - Cryptographic Trust Protocol for African Commerce

## 🎯 The Pivot (December 2024)

**From:** Privacy-focused delivery aggregator with pickup points
**To:** Zero-knowledge trust infrastructure for social commerce

**Why:** 
- Delivery/logistics = operationally heavy, low margins, easily copied
- Trust protocol = pure software, high margins, crypto moat, global scale
- Midnight + ZK proofs = unfair technological advantage

---

## 🚀 New Vision (One Sentence)

**PrivateShip lets users prove they are real, trustworthy, and consistent — without exposing their identity.**

---

## 💡 The Problem (Real & Unsolved)

### In Kenya (and across Africa):

**Social commerce is massive:**
- 15.1M Kenyans on social media (4h 19min daily usage - #1 globally)
- Billions in WhatsApp/Instagram/Telegram commerce
- Zero platform trust infrastructure

**But there's NO trust layer:**
- ❌ No buyer protection
- ❌ No seller reputation that's portable
- ❌ Scammers rotate numbers endlessly
- ❌ Every platform requires re-KYC (invasive)
- ❌ Data breaches expose PII constantly
- ❌ Trust doesn't follow users across platforms

**Current "solutions" are broken:**
- **Persona/Onfido/SmileID**: Upload ID every time, centralized PII storage, vendor lock-in
- **Reputation systems**: Gameable, platform-specific, not portable
- **Manual trust**: "Send money first" (fraud), cash-on-delivery (friction)

**The gap:**
> There is no privacy-preserving, portable, cryptographic trust identity for peer-to-peer commerce.

---

## ✨ The Solution (PrivateShip Trust Protocol)

### Core Concept

**PrivateShip is NOT KYC. It's Trust as a Service.**

Instead of proving "who you are," you prove "trust properties":
- ✅ "I'm a verified human (not a bot)"
- ✅ "My identity hasn't changed in 12 months"
- ✅ "I have no fraud flags"
- ✅ "My phone/device pair is stable"
- ✅ "I passed government ID verification"

**WITHOUT revealing:**
- ❌ Your name
- ❌ Your ID number
- ❌ Your photo
- ❌ Your exact age

**How:** Zero-knowledge proofs powered by Cardano's Midnight protocol.

---

## 🎨 Product Architecture

### 3 Core Components

#### 1. **Trust Passport** (User-facing)
A cryptographic identity that users own and control.

**Contents:**
```json
{
  "trustId": "TP-abc123", // Anonymous identifier
  "proofs": {
    "verified_human": true,
    "verified_phone": true,
    "verified_id": true,
    "account_age_months": 18,
    "fraud_events": 0,
    "identity_stable": true
  },
  "trustScore": 87, // 0-100
  "lastUpdated": "2024-12-14T12:00:00Z",
  "expiresAt": "2025-03-14T12:00:00Z"
}
```

**Key Properties:**
- Non-transferable (device + biometric bound)
- Time-locked (can't change identity frequently)
- Stateful (trust degrades over time without activity)
- Portable (use across any platform)

#### 2. **Trust API** (Developer-facing)
RESTful + GraphQL API for platforms to verify trust.

**Core Endpoints:**
```
POST   /api/v1/verify/phone         # Step 1: Phone OTP
POST   /api/v1/verify/id             # Step 2: ID document
POST   /api/v1/proofs/generate       # Generate ZK proof
POST   /api/v1/proofs/verify         # Verify a proof
GET    /api/v1/trust-badge/:userId   # Get trust badge data
GET    /api/v1/trust-score/:proofId  # Verify trust score
```

**Integration Methods:**
- REST API (any platform)
- SDK (React, React Native, Node.js)
- WhatsApp Bot (for social sellers)
- Embeddable widget (iframe/web component)

#### 3. **Merchant Dashboard** (Admin)
Filament-based admin panel for businesses.

**Features:**
- View verification requests
- Analytics (trust scores, verification rates)
- API key management
- Webhook configuration
- Fraud alerts
- Audit logs
- Billing & usage

---

## 🔐 Technical Architecture

### Stack Overview

**Frontend:**
- **Web App**: Next.js 14 (App Router) + shadcn/ui + Tailwind
- **Admin Dashboard**: Laravel Filament (PHP) - enterprise-grade admin
- **Mobile**: React Native (Expo) for Trust Passport app

**Backend:**
- **API**: Fastify (Node.js/TypeScript) - high performance
- **Database**: PostgreSQL 16 + Drizzle ORM
- **Cache**: Redis 7 (sessions, proofs, scores)
- **Queue**: BullMQ (async jobs)
- **Search**: MeiliSearch (fast user lookup)

**Blockchain:**
- **Midnight Protocol**: Zero-knowledge proofs, private state
- **Cardano**: Immutable audit trail, proof anchoring

**External Services:**
- **SMS**: Africa's Talking (OTP)
- **OCR**: SmileID or custom (ID extraction)
- **Storage**: AWS S3 (encrypted documents)
- **Monitoring**: Sentry + PostHog

---

## 🌌 Why Midnight Changes Everything

### Traditional KYC (Persona/Onfido):
1. User uploads ID + selfie
2. Vendor stores raw PII
3. Platform receives "verified: true"
4. Risk: Data breach exposes everything

### PrivateShip + Midnight:
1. User verifies once (ID + selfie)
2. **Raw data never leaves secure enclave**
3. **ZK proof generated** (proves trust without data)
4. Proof stored on Midnight (private state)
5. User can reuse proof anywhere
6. Platform only sees: "Trust score: 87"

**Result:**
- ✅ User privacy preserved
- ✅ Platform liability reduced
- ✅ Trust becomes portable
- ✅ Cryptographically verifiable
- ✅ Midnight provides compliance without exposure

---

## 🎯 Use Cases (Go-to-Market)

### Phase 1: Social Commerce (MVP)
**Target:** WhatsApp/Instagram sellers & buyers

**Flow:**
1. Seller creates PrivateShip account
2. Verifies phone + ID once
3. Gets "Verified by PrivateShip 🔐" badge
4. Shares badge link with buyers
5. Buyers see trust score (not identity)
6. Transaction confidence increases

**Metrics:**
- 91% cart abandonment → 40% (trust reduces friction)
- Fraud rate: 15% → 2% (verified identities)

### Phase 2: Marketplaces & Apps
**Target:** Kenyan marketplaces (Jiji, PigiaMe, etc.)

**Integration:**
- Replace their KYC with PrivateShip API
- Users verify once, reuse across platforms
- Platforms never store PII (liability reduction)

### Phase 3: Web3 & DAOs
**Target:** Crypto communities, DeFi protocols

**Use:**
- Sybil resistance (1 person = 1 vote)
- Proof of personhood without KYC
- Gated communities (verified humans only)

### Phase 4: Global Expansion
**Target:** Nigeria, Ghana, South Africa, Uganda

**Model:**
- Same protocol, local SMS providers
- Local ID document support
- Regional trust networks

---

## 💰 Business Model

### Revenue Streams

1. **API Usage (Primary)**
   - Free tier: 100 verifications/month
   - Pro: $0.10 per verification
   - Enterprise: Custom pricing

2. **Subscriptions**
   - Merchants: $29/month (1000 verifications)
   - Platforms: $299/month (10K verifications)
   - Enterprise: $2999/month (unlimited + white-label)

3. **Trust Score Premium**
   - Advanced risk scoring: +$0.05 per check
   - Real-time fraud monitoring: $99/month
   - Custom trust models: Enterprise only

4. **Data Insights (Anonymized)**
   - Market trust heatmaps
   - Fraud pattern reports
   - Industry benchmarks

### Unit Economics
- Cost per verification: ~$0.03 (SMS + compute)
- Average revenue: $0.10
- Gross margin: 70%
- CAC: $5 (B2B referral-driven)
- LTV: $500+ (sticky API integration)

---

## 🏗️ Database Schema (Redesigned)

### Core Tables

```sql
-- Identity commitments (NOT raw identities)
identity_commitments
  - commitment_id (uuid)
  - user_id (uuid, encrypted)
  - commitment_hash (hash of identity)
  - created_at
  - expires_at
  - verification_level (phone, id, biometric)

-- Verification events (audit trail)
verification_events
  - event_id (uuid)
  - commitment_id (foreign key)
  - event_type (phone_verified, id_verified, proof_generated)
  - event_data (jsonb, encrypted)
  - timestamp
  - ip_address (hashed)
  - device_fingerprint (hashed)

-- ZK Proofs (generated and validated)
proofs
  - proof_id (uuid)
  - commitment_id (foreign key)
  - proof_type (trust_score, age_over_18, identity_stable)
  - proof_data (jsonb) -- ZK proof blob
  - generated_at
  - expires_at
  - used_count (how many times verified)
  - last_used_at

-- Trust state (live trust scores)
trust_state
  - commitment_id (foreign key)
  - trust_score (0-100)
  - fraud_flags (jsonb)
  - account_age_days
  - identity_stable (boolean)
  - last_activity_at
  - risk_level (low, medium, high)

-- Midnight anchor (blockchain proofs)
midnight_anchors
  - anchor_id (uuid)
  - proof_id (foreign key)
  - transaction_hash (Midnight tx)
  - block_height
  - anchored_at
```

**Key Changes from Original:**
- ❌ Removed: pickup_points, orders, merchants (logistics-focused)
- ✅ Added: identity_commitments, proofs, trust_state (trust-focused)
- 🔐 Everything encrypted/hashed
- 🌐 Midnight integration built-in

---

## 🎨 UI/UX Philosophy

### Design Principles
1. **Minimal Disclosure**: Ask only what's necessary
2. **Progressive Trust**: Start with phone, upgrade to ID
3. **Clear Value**: Users see why they benefit
4. **Fast Onboarding**: < 2 minutes to first proof
5. **Beautiful**: Modern, trustworthy, professional

### Key Screens

#### User Flow
1. **Landing** → "Verify once, trusted everywhere"
2. **Phone Verify** → OTP via SMS
3. **ID Upload** → Government ID (optional, Tier 2)
4. **Proof Generated** → "Your Trust Passport is ready"
5. **Badge Share** → QR + link to share

#### Admin (Filament)
1. **Dashboard** → Verifications today, trust score distribution
2. **Verifications** → List view with filters, fraud flags
3. **API Keys** → Generate, revoke, usage stats
4. **Webhooks** → Configure endpoints, retry failed
5. **Analytics** → Charts, trends, fraud patterns
6. **Audit Logs** → Full compliance trail

---

## 🚀 Roadmap

### Phase 1: MVP (Months 1-3) - **Q1 2025**
- ✅ Database schema (done)
- ⬜ Phone verification (OTP)
- ⬜ ID document upload + OCR
- ⬜ Trust score algorithm v1
- ⬜ Basic proof generation (pre-Midnight)
- ⬜ REST API (5 core endpoints)
- ⬜ Next.js user dashboard
- ⬜ Filament admin panel

**Goal:** 100 verified users, 10 merchant pilots

### Phase 2: Midnight Integration (Months 4-6) - **Q2 2025**
- ⬜ Midnight smart contracts
- ⬜ ZK proof generation
- ⬜ On-chain proof anchoring
- ⬜ Private state management
- ⬜ Proof expiry + refresh
- ⬜ WhatsApp bot integration

**Goal:** 1,000 users, 50 merchants, Midnight testnet

### Phase 3: Platform Integrations (Months 7-9) - **Q3 2025**
- ⬜ SDK (React, Node.js)
- ⬜ Browser extension
- ⬜ Marketplace integrations (Jiji, PigiaMe)
- ⬜ Advanced fraud detection
- ⬜ Real-time trust monitoring
- ⬜ Webhooks + events

**Goal:** 10,000 users, 200 merchants, mainnet launch

### Phase 4: Scale & Expand (Months 10-12) - **Q4 2025**
- ⬜ Nigeria expansion
- ⬜ Face verification + liveness
- ⬜ Mobile app (React Native)
- ⬜ Web3 integrations
- ⬜ White-label solution
- ⬜ Series A fundraising

**Goal:** 100,000 users, 1,000 merchants, profitability

---

## 🎯 Competitive Advantages

### vs. Traditional KYC (Persona, Onfido, SmileID)
- ✅ Privacy-preserving (ZK proofs)
- ✅ Portable across platforms
- ✅ User-controlled data
- ✅ Lower liability for platforms
- ✅ Cheaper ($0.10 vs $1-3)

### vs. Reputation Systems (Trust Pilot, Reviews)
- ✅ Cryptographically verifiable
- ✅ Non-gameable (tied to real identity)
- ✅ Portable (not platform-locked)
- ✅ Real-time fraud detection

### vs. Blockchain Identity (ENS, PoH, BrightID)
- ✅ Compliant with regulations
- ✅ Privacy-first (not public)
- ✅ Designed for commerce (not just governance)
- ✅ African focus (local SMS, ID types)

**Moat:**
- **Technology**: Midnight + ZK proofs (hard to copy)
- **Network**: First-mover in African social commerce trust
- **Compliance**: Built for Kenya Data Protection Act
- **UX**: Simplest onboarding (< 2 minutes)

---

## 📊 Success Metrics

### North Star Metric
**Active Trust Proofs Per Month** - Number of trust proofs generated and verified

### Key Metrics
- **User Growth**: New identity commitments/month
- **Verification Rate**: % who complete Tier 2 (ID)
- **Trust Score Distribution**: Median trust score
- **API Usage**: Verification requests/month
- **Fraud Prevention**: Fraud attempts blocked
- **Platform Adoption**: Merchant integrations
- **Revenue**: MRR, ARR, GMV enabled

### Targets (12 months)
- 100,000 verified identities
- 1,000 merchant integrations
- 1M API calls/month
- $50K MRR
- <2% fraud rate
- 85% trust score (average)

---

## 🔥 Why This Wins

1. **Real Problem**: 91% cart abandonment in Kenya social commerce
2. **Software-Only**: No logistics, no ops, pure margins
3. **Unfair Advantage**: Midnight + ZK proofs (tech moat)
4. **First-Mover**: No one else doing privacy-preserving trust for African commerce
5. **Massive TAM**: 15M+ social commerce users in Kenya alone
6. **Scalable**: API-first, protocol-level, global potential
7. **Defensible**: Network effects + crypto + compliance

---

## 🎯 The Ask (For Investors/Partners)

**We're building the trust layer for African social commerce.**

- $500M+ market opportunity (Kenya alone)
- Software-only, high margins (70%)
- Midnight partnership (technological advantage)
- Pre-seed raise: $500K (12-month runway)
- Use: MVP development, Midnight integration, first 1,000 users

**Contact:** founders@privateship.co

---

**PrivateShip: Trust, without the exposure.**

*Built with Midnight. Powered by cryptography. Designed for Africa.*