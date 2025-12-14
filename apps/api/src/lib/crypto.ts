import crypto from 'crypto';
import bcrypt from 'bcrypt';

const ALGORITHM = 'aes-256-gcm';
// Ensure specific length for the key (32 bytes)
const ENCRYPTION_KEY = crypto.scryptSync(process.env.ENCRYPTION_SECRET || 'default-secret-key-change-me', 'salt', 32);
const IV_LENGTH = 16;

export const encryption = {
    encrypt: (text: string): string => {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();
        return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
    },

    decrypt: (text: string): string => {
        const parts = text.split(':');
        const iv = Buffer.from(parts.shift()!, 'hex');
        const authTag = Buffer.from(parts.shift()!, 'hex');
        const encryptedText = parts.join(':');
        const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    },

    hash: async (text: string): Promise<string> => {
        return bcrypt.hash(text, 10);
    },

    compareHash: async (text: string, hash: string): Promise<boolean> => {
        return bcrypt.compare(text, hash);
    }
};
