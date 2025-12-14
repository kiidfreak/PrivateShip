import { redis } from '../../../lib/redis';
import { encryption } from '../../../lib/crypto';
import { ISmsProvider } from './sms.provider';

export class OtpService {
    constructor(private smsProvider: ISmsProvider) { }

    private getRedisKey(phone: string): string {
        return `otp:${encryption.encrypt(phone).split(':')[2]}`; // Use hashed or encrypted phone part for key safe-ish
    }

    async generateAndSend(phone: string): Promise<void> {
        // Generate 6 digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        console.log(`[DEBUG] Generated OTP for ${phone}: ${code}`);

        // Hash code for storage
        const hashCode = await encryption.hash(code);

        // Store in Redis (5 minutes TTL)
        // We typically key by phone number. For privacy, we should probably hash the phone number for the key.
        // In this MVP, let's just use a simple prefix.
        await redis.set(`otp:${phone}`, hashCode, 'EX', 300);

        // Send SMS
        await this.smsProvider.send(phone, `Your PrivateShip verification code is ${code}. Valid for 5 minutes.`);
    }

    async verify(phone: string, code: string): Promise<boolean> {
        const storedHash = await redis.get(`otp:${phone}`);

        if (!storedHash) {
            return false;
        }

        const isValid = await encryption.compareHash(code, storedHash);

        if (isValid) {
            // Consume OTP so it can't be reused
            await redis.del(`otp:${phone}`);
        }

        return isValid;
    }
}
