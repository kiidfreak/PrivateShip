const API_URL = 'http://localhost:3001/api/v1';

export const api = {
    auth: {
        sendOtp: async (phone: string) => {
            const res = await fetch(`${API_URL}/auth/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Failed to send OTP');
            }

            return res.json();
        },

        verifyOtp: async (phone: string, code: string) => {
            const res = await fetch(`${API_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, code }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || 'Failed to verify OTP'); // Note: backend returns 'error' prop
            }

            return res.json();
        }
    }
};
