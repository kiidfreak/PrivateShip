CREATE TABLE "identity_commitments" (
	"commitment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"commitment_hash" text NOT NULL,
	"phone_hash" text,
	"id_number_hash" text,
	"verification_tier" text,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp,
	"midnight_anchor_tx" text,
	CONSTRAINT "identity_commitments_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "identity_commitments_phone_hash_unique" UNIQUE("phone_hash"),
	CONSTRAINT "identity_commitments_id_number_hash_unique" UNIQUE("id_number_hash")
);
--> statement-breakpoint
CREATE TABLE "proofs" (
	"proof_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"commitment_id" uuid,
	"proof_type" text,
	"proof_data" jsonb,
	"generated_at" timestamp DEFAULT now(),
	"expires_at" timestamp,
	"used_count" integer DEFAULT 0,
	"last_used_at" timestamp,
	"midnight_tx_hash" text
);
--> statement-breakpoint
CREATE TABLE "trust_state" (
	"commitment_id" uuid PRIMARY KEY NOT NULL,
	"trust_score" integer,
	"fraud_flags" jsonb,
	"account_age_days" integer,
	"identity_stable" boolean,
	"last_activity_at" timestamp,
	"risk_level" text,
	"score_updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "verification_events" (
	"event_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"commitment_id" uuid,
	"event_type" text,
	"event_data" jsonb,
	"ip_hash" text,
	"device_fingerprint_hash" text,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "proofs" ADD CONSTRAINT "proofs_commitment_id_identity_commitments_commitment_id_fk" FOREIGN KEY ("commitment_id") REFERENCES "public"."identity_commitments"("commitment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trust_state" ADD CONSTRAINT "trust_state_commitment_id_identity_commitments_commitment_id_fk" FOREIGN KEY ("commitment_id") REFERENCES "public"."identity_commitments"("commitment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_events" ADD CONSTRAINT "verification_events_commitment_id_identity_commitments_commitment_id_fk" FOREIGN KEY ("commitment_id") REFERENCES "public"."identity_commitments"("commitment_id") ON DELETE no action ON UPDATE no action;