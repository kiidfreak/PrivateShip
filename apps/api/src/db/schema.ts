import { pgTable, uuid, text, timestamp, jsonb, integer, boolean } from 'drizzle-orm/pg-core';

export const identityCommitments = pgTable('identity_commitments', {
    commitmentId: uuid('commitment_id').primaryKey().defaultRandom(),
    userId: uuid('user_id').unique(),
    commitmentHash: text('commitment_hash').notNull(),
    phoneHash: text('phone_hash').unique(),
    idNumberHash: text('id_number_hash').unique(),
    verificationTier: text('verification_tier'), // 'phone' | 'id' | 'biometric'
    createdAt: timestamp('created_at').defaultNow(),
    expiresAt: timestamp('expires_at'),
    midnightAnchorTx: text('midnight_anchor_tx'),
});

export const verificationEvents = pgTable('verification_events', {
    eventId: uuid('event_id').primaryKey().defaultRandom(),
    commitmentId: uuid('commitment_id').references(() => identityCommitments.commitmentId),
    eventType: text('event_type'), // 'phone_verified', 'id_verified', 'proof_generated'
    eventData: jsonb('event_data'), // Encrypted event details
    ipHash: text('ip_hash'),
    deviceFingerprintHash: text('device_fingerprint_hash'),
    timestamp: timestamp('timestamp').defaultNow(),
});

export const proofs = pgTable('proofs', {
    proofId: uuid('proof_id').primaryKey().defaultRandom(),
    commitmentId: uuid('commitment_id').references(() => identityCommitments.commitmentId),
    proofType: text('proof_type'), // 'trust_score', 'age_over_18', 'identity_stable'
    proofData: jsonb('proof_data'), // ZK proof blob (from Midnight)
    generatedAt: timestamp('generated_at').defaultNow(),
    expiresAt: timestamp('expires_at'),
    usedCount: integer('used_count').default(0),
    lastUsedAt: timestamp('last_used_at'),
    midnightTxHash: text('midnight_tx_hash'),
});

export const trustState = pgTable('trust_state', {
    commitmentId: uuid('commitment_id').primaryKey().references(() => identityCommitments.commitmentId),
    trustScore: integer('trust_score'), // 0-100
    fraudFlags: jsonb('fraud_flags'),
    accountAgeDays: integer('account_age_days'),
    identityStable: boolean('identity_stable'),
    lastActivityAt: timestamp('last_activity_at'),
    riskLevel: text('risk_level'), // 'low' | 'medium' | 'high'
    scoreUpdatedAt: timestamp('score_updated_at'),
});
