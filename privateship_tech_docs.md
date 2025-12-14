# PrivateShip Technical Documentation

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
│  (WhatsApp Sellers, Marketplace Buyers, Platform Developers) │
└──────────────┬──────────────────────────────┬───────────────┘
               │                               │
               │                               │
┌──────────────▼───────────────┐  ┌───────────▼──────────────┐
│   User-Facing Apps           │  │  Developer Interface      │
│  ┌──────────────────────┐    │  │  ┌──────────────────────┐│
│  │ Next.js Web App      │    │  │  │ REST API              ││
│  │ (Trust Passport)     │    │  │  │ GraphQL API           ││
│  ├──────────────────────┤    │  │  ├──────────────────────┤│
│  │ React Native App     │    │  │  │ SDKs (JS, React)      ││
│  │ (Mobile)             │    │  │  │ Embeddable Widget     ││
│  ├──────────────────────┤    │  │  ├──────────────────────┤│
│  │ WhatsApp Bot         │    │  │  │ Filament Admin       ││
│  │ (Social Commerce)    │    │  │  │ (Merchant Dashboard) ││
│  └──────────────────────┘    │  │  └──────────────────────┘│
└──────────────┬───────────────┘  └───────────┬──────────────┘
               │                               │
               └───────────────┬───────────────┘
                               │
                   ┌───────────▼────────────┐
                   │   API Gateway          │
                   │   (Rate Limit, Auth)   │
                   └───────────┬────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
┌────────▼─────────┐  ┌────────▼─────────┐  ┌──────▼──────────┐
│ Identity Service │  │  Proof Service   │  │  Trust Engine   │
│                  │  │                  │  │                 │
│ • Phone verify   │  │ • Generate proof │  │ • Score calc    │
│ • ID document    │  │ • Verify proof   │  │ • Fraud detect  │
│ • OCR extract    │  │ • Midnight sync  │  │ • Risk assess   │
│ • Liveness       │  │ • Proof cache    │  │ • Behavior track│
└────────┬─────────┘  └────────┬─────────┘  └──────┬──────────┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
┌────────▼─────────┐  ┌────────▼─────────┐  ┌──────▼──────────┐
│   PostgreSQL     │  │     Redis        │  │  MeiliSearch    │
│                  │  │                  │  │                 │
│ • Commitments    │  │ • Sessions       │  │ • User search   │
│ • Events         │  │ • Proof cache    │  │ • Fast lookup   │
│ • Trust state    │  │ • Rate limits    │  │                 │
│ • Audit logs     │  │ • Job queue      │  │                 │
└────────┬─────────┘  └────────┬─────────┘  └──────┬──────────┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               │
                   ┌───────────▼────────────┐
                   │  Midnight Protocol     │
                   │  (Cardano Network)     │
                   │                        │
                   │  • ZK Proofs           │
                   │  • Private State       │
                   │  • Immutable Anchors   │
                   └────────────────────────┘
```

---

## Technology Stack

### Frontend Layer

#### 1. User Web App (Next.js 14)
**Purpose:** Trust Passport interface for end users

**Tech:**
- Framework: Next.js 14 (App Router, Server Components)
- Language: TypeScript 5.3+
- Styling: Tailwind CSS 3.4 + shadcn/ui
- State: React Query (TanStack Query v5)
- Auth: Clerk (phone number auth with OTP)
- Forms: React Hook Form + Zod validation

**Key Features:**
- Phone verification flow
- ID document upload
- Trust Passport dashboard
- Badge generation & sharing
- Proof history
- Account settings

**File Structure:**
```
apps/web/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── verify-phone/
│   │   │   └── verify-id/
│   │   ├── dashboard/
│   │   │   ├── trust-passport/
│   │   │   ├── proofs/
│   │   │   └── settings/
│   │   └── badge/[trustId]/    # Public trust badge
│   ├── components/
│   │   ├── ui/                  # shadcn components
│   │   ├── verification/
│   │   └── trust-passport/
│   └── lib/
│       ├── api-client.ts
│       └── utils.ts
```

#### 2. Merchant Dashboard (Laravel Filament)
**Purpose:** Admin panel for platforms/merchants

**Tech:**
- Framework: Laravel 10 + Filament 3
- Language: PHP 8.2+
- Database: PostgreSQL (shared with main API)
- Auth: Laravel Sanctum + API tokens
- UI: Filament Admin Panel

**Key Features:**
- Verification requests table
- Trust score analytics
- API key management
- Webhook configuration
- Fraud alerts dashboard
- Audit log viewer
- Billing & usage reports

**File Structure:**
```
apps/admin/
├── app/
│   ├── Filament/
│   │   ├── Resources/
│   │   │   ├── VerificationResource.php
│   │   │   ├── TrustScoreResource.php
│   │   │   └── ApiKeyResource.php
│   │   ├── Widgets/
│   │   │   ├── StatsOverview.php
│   │   │   └── TrustScoreChart.php
│   │   └── Pages/
│   ├── Models/
│   └── Policies/
```

**Why Filament:**
- Enterprise-grade admin UI out of the box
- Fast development (10x faster than building custom)
- Built-in table filtering, sorting, search
- Easy CRUD operations
- Beautiful charts and widgets
- Multi-tenancy support (for multiple merchants)

#### 3. Mobile App (React Native + Expo)
**Purpose:** Native mobile experience for Trust Passport

**Tech:**
- Framework: Expo SDK 50+
- Language: TypeScript
- UI: React Native Paper / NativeWind (Tailwind for RN)
- State: React Query
- Auth: Expo Auth Session
- Camera: expo-camera (for ID capture)

**Key Features:**
- Biometric auth (Face ID/Touch ID)
- QR code scanner/generator
- Push notifications
- Offline mode (cached proofs)
- Trust badge widget

---

### Backend Layer

#### Core API (Fastify + TypeScript)

**Server:** Fastify 4.x (fastest Node.js framework)
**Language:** TypeScript 5.3+ (strict mode)
**Runtime:** Node.js 20 LTS

**Architecture Pattern:** Domain-Driven Design (DDD)

```
apps/api/
├── src/
│   ├── domains/
│   │   ├── identity/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   └── schemas/
│   │   ├── proofs/
│   │   ├── trust/
│   │   └── webhooks/
│   ├── shared/
│   │   ├── database/
│   │   ├── cache/
│   │   ├── queue/
│   │   └── logger/
│   ├── plugins/
│   │   ├── auth.ts
│   │   ├── cors.ts
│   │   ├── rate-limit.ts
│   │   └── swagger.ts
│   └── server.ts
```

**Key Plugins:**
- `@fastify/jwt` - JWT token generation/validation
- `@fastify/cors` - CORS handling
- `@fastify/rate-limit` - Rate limiting (Redis-based)
- `@fastify/helmet` - Security headers
- `@fastify/swagger` - OpenAPI docs
- `@fastify/multipart` - File uploads (ID documents)

**Response Format (Standard):**
```typescript
// Success
{
  success: true,
  data: { ... },
  meta: {
    timestamp: "2024-12-14T12:00:00Z",
    requestId: "req-uuid"
  }
}

// Error
{
  success: false,
  error: {
    code: "INVALID_PROOF",
    message: "The proof has expired",
    details: { expiresAt: "..." }
  },
  meta: { ... }
}
```

---

### Data Layer

#### PostgreSQL 16 (Primary Database)

**ORM:** Drizzle ORM (type-safe, performant)

**Core Tables:**

```sql
-- Identity Commitments (not raw identities!)
identity_commitments (
  commitment_id UUID PRIMARY KEY,
  user_id UUID UNIQUE,
  commitment_hash TEXT NOT NULL, -- Hash of identity
  phone_hash TEXT UNIQUE,
  id_number_hash TEXT UNIQUE,
  verification_tier TEXT, -- 'phone' | 'id' | 'biometric'
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  midnight_anchor_tx TEXT
)

-- Verification Events (audit trail)
verification_events (
  event_id UUID PRIMARY KEY,
  commitment_id UUID REFERENCES identity_commitments,
  event_type TEXT, -- 'phone_verified', 'id_verified', 'proof_generated'
  event_data JSONB, -- Encrypted event details
  ip_hash TEXT,
  device_fingerprint_hash TEXT,
  timestamp TIMESTAMP
)

-- ZK Proofs
proofs (
  proof_id UUID PRIMARY KEY,
  commitment_id UUID REFERENCES identity_commitments,
  proof_type TEXT, -- 'trust_score', 'age_over_18', 'identity_stable'
  proof_data JSONB, -- ZK proof blob (from Midnight)
  generated_at TIMESTAMP,
  expires_at TIMESTAMP,
  used_count INT DEFAULT 0,
  last_used_at TIMESTAMP,
  midnight_tx_hash TEXT
)

-- Trust State (live scores)
trust_state (
  commitment_id UUID PRIMARY KEY REFERENCES identity_commitments,
  trust_score INT, -- 0-100
  fraud_flags JSONB,
  account_age_days INT,
  identity_stable BOOLEAN,
  last_activity_at TIMESTAMP,
  risk_level TEXT, -- 'low' | 'medium' | 'high'
  score_updated_at TIMESTAMP
)

-- Midnight Anchors (blockchain proofs)
midnight_anchors (
  anchor_id UUID PRIMARY KEY,
  proof_id UUID REFERENCES proofs,
  transaction_hash TEXT UNIQUE,
  block_height BIGINT,
  proof_commitment TEXT, -- Midnight proof commitment
  anchored_at TIMESTAMP
)

-- Merchant API Keys
api_keys (
  key_id UUID PRIMARY KEY,
  merchant_id UUID,
  key_hash TEXT UNIQUE,
  key_prefix TEXT, -- 'pk_live_' or 'sk_live_'
  permissions JSONB,
  created_at TIMESTAMP,
  last_used_at TIMESTAMP,
  expires_at TIMESTAMP
)

-- Webhook Subscriptions
webhook_subscriptions (
  subscription_id UUID PRIMARY KEY,
  merchant_id UUID,
  url TEXT,
  events TEXT[], -- ['proof.generated', 'trust.score_updated']
  secret TEXT, -- For signature verification
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP
)

-- Webhook Deliveries (retry tracking)
webhook_deliveries (
  delivery_id UUID PRIMARY KEY,
  subscription_id UUID REFERENCES webhook_subscriptions,
  event_type TEXT,
  payload JSONB,
  status TEXT, -- 'pending', 'delivered', 'failed'
  attempts INT DEFAULT 0,
  last_attempt_at TIMESTAMP,
  delivered_at TIMESTAMP
)
```

**Indexes (Critical for Performance):**
```sql
-- Fast lookups
CREATE INDEX idx_commitments_phone_hash ON identity_commitments(phone_hash);
CREATE INDEX idx_commitments_id_hash ON identity_commitments(id_number_hash);
CREATE INDEX idx_proofs_commitment ON proofs(commitment_id);
CREATE INDEX idx_proofs_expires_at ON proofs(expires_at);
CREATE INDEX idx_events_commitment ON verification_events(commitment_id);
CREATE INDEX idx_events_timestamp ON verification_events(timestamp DESC);

-- Trust queries
CREATE INDEX idx_trust_score ON trust_state(trust_score);
CREATE INDEX idx_trust_risk ON trust_state(risk_level);
```

#### Redis 7 (Cache + Queue)

**Use Cases:**
1. **Session Management**: User sessions (TTL: 7 days)
2. **Proof Cache**: Recently generated proofs (TTL: 5 minutes)
3. **Rate Limiting**: API rate limit counters (TTL: 1 hour)
4. **OTP Storage**: Phone verification OTPs (TTL: 5 minutes)
5. **Job Queue**: BullMQ background jobs

**Structure:**
```
Keys:
  session:{userId}           → User session data
  proof:{proofId}            → Cached proof data
  otp:{phoneHash}            → OTP code (bcrypt hash)
  ratelimit:{ip}:{endpoint}  → Rate limit counter
  trust_score:{commitmentId} → Cached trust score
```

**BullMQ Queues:**
```typescript
// Job types
- sms:send              // Send SMS via Africa's Talking
- proof:generate        // Generate ZK proof (heavy)
- proof:anchor          // Anchor proof to Midnight
- webhook:deliver       // Deliver webhook event
- trust:calculate       // Recalculate trust score
- fraud:check           // Run fraud detection
```

#### MeiliSearch (Search Engine)

**Purpose:** Fast, typo-tolerant user search for admin dashboard

**Indexed Documents:**
```json
{
  "commitmentId": "uuid",
  "phoneHash": "hash",
  "trustScore": 87,
  "verificationTier": "id",
  "accountAgeDays": 180,
  "riskLevel": "low",
  "createdAt": "2024-06-14T12:00:00Z"
}
```

**Search Capabilities:**
- Find users by hashed phone
- Filter by trust score range
- Filter by risk level
- Sort by creation date

---

### Integration Layer

#### Midnight Protocol (Cardano Network)

**Purpose:** Zero-knowledge proofs + private state storage

**Smart Contract (Midnight Compact):**
```typescript
// Simplified pseudocode
contract TrustProof {
  // Private state (only accessible via ZK proofs)
  private identityCommitment: Hash
  private verificationLevel: TierLevel
  private trustProperties: {
    phoneVerified: boolean,
    idVerified: boolean,
    accountAgeDays: number,
    fraudFlags: number
  }
  
  // Public functions
  @zk
  function generateTrustProof(
    minTrustScore: number
  ): Proof {
    // Generate ZK proof that trust score >= minTrustScore
    // WITHOUT revealing actual score or identity
  }
  
  @zk
  function proveAgeOver(age: number): Proof {
    // Prove age > X without revealing birthdate
  }
  
  @zk
  function proveIdentityStable(): Proof {
    // Prove identity hasn't changed in N months
  }
  
  function anchorProof(proofHash: Hash): TxHash {
    // Store proof commitment on-chain immutably
  }
}
```

**Integration Flow:**
1. User completes verification (phone + ID)
2. API creates identity commitment
3. Commitment sent to Midnight contract
4. When proof requested:
   - API calls Midnight contract
   - Contract generates ZK proof
   - Proof returned to API
   - Proof cached in Redis
   - Proof anchored on-chain (async)

#### SMS Provider (Africa's Talking)

**Purpose:** Phone verification OTPs

**API Wrapper:**
```typescript
class SMSService {
  async sendOTP(phone: string, code: string): Promise<void> {
    await africastalking.SMS.send({
      to: [phone],
      message: `Your PrivateShip verification code is ${code}. Valid for 5 minutes.`,
      from: "PrivateShip"
    })
  }
}
```

**OTP Security:**
- 6-digit numeric code
- TTL: 5 minutes
- Max 3 attempts
- Rate limit: 1 OTP per minute per phone
- Store bcrypt hash only (never plaintext)

#### OCR Service (SmileID or Custom)

**Purpose:** Extract data from ID documents

**Flow:**
1. User uploads ID photo
2. S3 upload (encrypted)
3. OCR extraction
4. Parse: name, ID number, DOB, expiry
5. Validation checks
6. Delete uploaded image after extraction (GDPR)

**Fallback:** Manual review queue if OCR confidence < 90%

#### Storage (AWS S3)

**Purpose:** Temporary document storage

**Buckets:**
```
privateship-documents-dev/
  ├── id-uploads/{commitmentId}/front.jpg
  └── id-uploads/{commitmentId}/back.jpg

privateship-documents-prod/
  └── (same structure)
```

**Security:**
- Server-side encryption (AES-256)
- Pre-signed URLs (15 min expiry)
- Auto-delete after 24 hours (once extracted)
- Access logs enabled

---

## Security Architecture

### Data Protection

**Encryption at Rest:**
- PostgreSQL: Transparent Data Encryption (TDE)
- S3: SSE-S3 (server-side encryption)
- Redis: Encrypted connections only

**Encryption in Transit:**
- TLS 1.3 for all connections
- HTTPS only (no HTTP)
- Certificate pinning (mobile apps)

**Field-Level Encryption:**
```typescript
// Sensitive fields encrypted with AES-256-GCM
encryptedFields = [
  'phone_number',
  'id_number',
  'name',
  'dob',
  'address'
]

// Hashed fields for lookup
hashedFields = [
  'phone_hash',      // bcrypt
  'id_number_hash',  // bcrypt
  'ip_hash',         // SHA-256
  'device_fingerprint_hash' // SHA-256
]
```

**Key Management:**
- AWS KMS for encryption keys
- Key rotation every 90 days
- Separate keys per environment
- No hardcoded secrets

### Authentication & Authorization

**User Auth:**
- Phone OTP (passwordless)
- JWT tokens (15 min access, 7 day refresh)
- Device binding (fingerprint + biometric)

**API Auth:**
- API keys for merchants (`sk_live_xxx`, `pk_live_xxx`)
- Scoped permissions
- Rate limiting per key

**Admin Auth:**
- Email + password (Filament)
- 2FA required (TOTP)
- Role-based access control (RBAC)

### Rate Limiting

**Limits:**
```
Endpoint Type           Limit       Window
---------------------------------------------
Public (no auth)        100 req     15 min
Authenticated user      300 req     15 min
Merchant API            1000 req    15 min
Admin                   Unlimited   -
Webhooks (inbound)      5000 req    1 min
```

**Response (429):**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "details": {
      "retryAfter": 60,
      "limit": 300,
      "remaining": 0
    }
  }
}
```

### Fraud Detection

**Signals Tracked:**
- Device fingerprint changes
- IP address patterns
- Velocity checks (too many attempts)
- Duplicate identity detection
- Known fraud patterns

**Actions:**
- Flag for manual review
- Temporary account lock
- Require additional verification
- Webhook alert to merchant

---

## Performance Targets

### API Response Times
- **P50:** < 100ms
- **P95:** < 500ms
- **P99:** < 1s

### Database Queries
- Simple queries: < 10ms
- Complex queries: < 100ms
- Use indexes aggressively

### Caching Strategy
- Proof cache: 5 min (hot data)
- Trust score cache: 1 hour
- User session: 7 days
- API response cache: 1 min (GET endpoints)

### Horizontal Scaling
- Stateless API servers (scale to 10+)
- Read replicas for PostgreSQL
- Redis Cluster for high availability
- Job queue workers (scale based on queue size)

---

## Monitoring & Observability

### Error Tracking (Sentry)
- Real-time error alerts
- Stack traces + context
- User impact tracking
- Performance monitoring

### Analytics (PostHog)
- Product analytics
- Feature flags
- Session replay
- Funnel analysis

### Logs (Structured JSON)
```json
{
  "level": "info",
  "timestamp": "2024-12-14T12:00:00Z",
  "service": "api",
  "method": "POST",
  "path": "/api/v1/proofs/generate",
  "statusCode": 201,
  "responseTime": 150,
  "userId": "uuid",
  "requestId": "req-uuid",
  "environment": "production"
}
```

**Never Log:**
- Passwords, OTPs, API keys
- Raw PII (phone, ID numbers)
- JWT tokens
- Encryption keys

### Uptime Monitoring (BetterUptime)
- Endpoint health checks (every 30s)
- Downtime alerts (Slack, email)
- Status page (status.privateship.co)

---

## Deployment Architecture

### Infrastructure (Railway → AWS)

**MVP (Railway):**
- Web: Railway service
- API: Railway service
- PostgreSQL: Railway database
- Redis: Railway Redis
- Cost: ~$50/month

**Production (AWS):**
- API: ECS Fargate (auto-scaling)
- Database: RDS PostgreSQL (Multi-AZ)
- Cache: ElastiCache Redis (Cluster mode)
- Storage: S3
- CDN: CloudFront
- Load Balancer: ALB
- Cost: ~$500-1000/month (at scale)

### Environments
- **Development**: Local (Docker Compose)
- **Staging**: Railway
- **Production**: AWS

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/api-ci.yml
on: [push, pull_request]

jobs:
  test:
    - Install dependencies (pnpm)
    - Run linter (ESLint)
    - Run type check (TypeScript)
    - Run unit tests (Jest)
    - Run integration tests
  
  deploy-staging:
    if: branch == develop
    - Build Docker image
    - Push to Railway
    - Run smoke tests
  
  deploy-production:
    if: tag matches v*
    - Build Docker image
    - Push to AWS ECR
    - Deploy to ECS
    - Run smoke tests
    - Notify team (Slack)
```

---

## Development Workflow

### Local Setup
```bash
# Clone repo
git clone https://github.com/privateship/privateship
cd privateship

# Install dependencies
pnpm install

# Set up environment
cp apps/api/.env.example apps/api/.env
# Edit .env with local values

# Start services (Docker)
docker-compose up -d  # PostgreSQL, Redis

# Run migrations
pnpm db:migrate

# Seed data
pnpm db:seed

# Start development
pnpm dev  # Starts all apps in parallel
```

### Testing Strategy
- **Unit Tests**: Jest + Testing Library (80% coverage target)
- **Integration Tests**: Supertest (API endpoints)
- **E2E Tests**: Playwright (critical flows)
- **Load Tests**: k6 (1000 concurrent users)

### Code Quality
- ESLint + Prettier (enforced via pre-commit hooks)
- Husky (Git hooks)
- TypeScript strict mode
- Conventional Commits

---

## API Reference (Core Endpoints)

### Authentication
```http
POST /api/v1/auth/send-otp
Body: { phone: "+254712345678" }
Response: { success: true, data: { expiresAt: "..." } }

POST /api/v1/auth/verify-otp
Body: { phone: "+254712345678", code: "123456" }
Response: { success: true, data: { token: "jwt...", userId: "..." } }
```

### Verification
```http
POST /api/v1/verify/id
Headers: Authorization: Bearer {token}
Body: { frontImage: File, backImage: File }
Response: { success: true, data: { verificationId: "..." } }

GET /api/v1/verify/status/:verificationId
Response: { success: true, data: { status: "approved", tier: "id" } }
```

### Proofs
```http
POST /api/v1/proofs/generate
Body: { proofType: "trust_score", minScore: 70 }
Response: { success: true, data: { proofId: "...", proof: { zkProof } } }

POST /api/v1/proofs/verify
Body: { proofId: "...", proof: { zkProof } }
Response: { success: true, data: { valid: true, claims: {...} } }
```

### Trust Badge
```http
GET /api/v1/trust-badge/:userId
Response: {
  success: true,
  data: {
    trustId: "TP-abc123",
    trustScore: 87,
    tier: "id",
    verifiedAt: "2024-06-14",
    badgeUrl: "https://privateship.co/badge/TP-abc123"
  }
}
```

---

**Last Updated:** December 2024  
**Version:** 2.0 (Trust Protocol)  
**Status:** In Development