import { FastifyInstance } from 'fastify';
import { OtpService } from '../services/otp.service';
import { MockSmsProvider } from '../services/sms.provider';
import { z } from 'zod';
import { db } from '../../../db';
import { identityCommitments } from '../../../db/schema';
import { encryption } from '../../../lib/crypto';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

// Schema validation
const sendOtpSchema = z.object({
    phone: z.string().min(10), // Basic validation
});

const verifyOtpSchema = z.object({
    phone: z.string().min(10),
    code: z.string().length(6),
});

export async function authRoutes(fastify: FastifyInstance) {
    const smsProvider = new MockSmsProvider();
    const otpService = new OtpService(smsProvider);

    fastify.post('/auth/send-otp', async (request, reply) => {
        try {
            const { phone } = sendOtpSchema.parse(request.body);

            await otpService.generateAndSend(phone);

            return { success: true, message: 'OTP sent' };
        } catch (err) {
            if (err instanceof z.ZodError) {
                return reply.status(400).send({ success: false, error: (err as any).errors });
            }
            request.log.error(err);
            return reply.status(500).send({ success: false, error: 'Internal Server Error' });
        }
    });

    fastify.post('/auth/verify-otp', async (request, reply) => {
        try {
            const { phone, code } = verifyOtpSchema.parse(request.body);

            const isValid = await otpService.verify(phone, code);

            if (!isValid) {
                return reply.status(400).send({ success: false, error: 'Invalid or expired OTP' });
            }

            // Create identity commitment if not exists
            const phoneHash = crypto.createHash('sha256').update(phone).digest('hex');

            // For now, let's just return success to prove the flow.

            return { success: true, token: 'mock-jwt-token', message: 'Verified successfully' };
        } catch (err) {
            if (err instanceof z.ZodError) {
                return reply.status(400).send({ success: false, error: (err as any).errors });
            }
            request.log.error(err);
            return reply.status(500).send({ success: false, error: 'Internal Server Error' });
        }
    });
}
