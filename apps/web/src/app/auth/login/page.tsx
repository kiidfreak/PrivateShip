'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Smartphone, ShieldCheck, AlertCircle } from 'lucide-react';
import { PrivateShipOTP } from '@/components/ui/otp-input';
import { useRouter } from 'next/navigation';

import 'react-phone-number-input/style.css';
import './phone-input.css';
import PhoneInput from 'react-phone-number-input';
import { api } from '@/lib/api';

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendOtp = async () => {
        if (!phoneNumber) return;
        setLoading(true);
        setError(null);

        try {
            await api.auth.sendOtp(phoneNumber);
            setStep('otp');
        } catch (err: any) {
            setError(err.message || 'Failed to send verification code');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (code?: string) => {
        const verifyCode = code || otp;
        if (verifyCode.length !== 6) return;

        setLoading(true);
        setError(null);

        try {
            const res = await api.auth.verifyOtp(phoneNumber, verifyCode);
            // In a real app, store the token here (e.g., cookie or local storage)
            // localStorage.setItem('token', res.token); 
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Invalid code. Please try again.');
            setOtp(''); // Clear OTP on error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0D1117] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-purple-500/5 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <motion.div
                    layout
                    className="bg-[#161b22] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-16 h-16 bg-[#0D1117] rounded-2xl border border-white/5 mx-auto mb-6 flex items-center justify-center shadow-inner"
                        >
                            {step === 'phone' ? (
                                <Smartphone className="w-8 h-8 text-teal" />
                            ) : (
                                <ShieldCheck className="w-8 h-8 text-neon" />
                            )}
                        </motion.div>

                        <motion.h1
                            key={step}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-bold text-white mb-2"
                        >
                            {step === 'phone' ? 'Welcome to PrivateShip' : 'Verify Identity'}
                        </motion.h1>

                        <motion.p
                            key={`${step}-sub`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-400 text-sm"
                        >
                            {step === 'phone'
                                ? 'Enter your mobile number to continue.'
                                : `Enter the code sent to ${phoneNumber}`
                            }
                        </motion.p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-200 text-sm"
                        >
                            <AlertCircle className="w-4 h-4 text-red-400" />
                            {error}
                        </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                        {step === 'phone' ? (
                            <motion.div
                                key="phone-input"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Mobile Number</label>
                                    <div className="bg-[#0D1117] border border-white/10 rounded-xl overflow-hidden focus-within:border-teal/50 focus-within:ring-1 focus-within:ring-teal/50 transition-all">
                                        <PhoneInput
                                            placeholder="Enter phone number"
                                            value={phoneNumber}
                                            onChange={(val) => setPhoneNumber(val || '')}
                                            defaultCountry="KE"
                                            className="px-0"
                                            international
                                            withCountryCallingCode
                                        />
                                    </div>
                                </div>

                                <Button
                                    className="w-full h-12 text-lg font-medium bg-teal hover:bg-teal/90 text-[#0D1117]"
                                    onClick={handleSendOtp}
                                    disabled={loading || !phoneNumber || phoneNumber.length < 5}
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continue'}
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="otp-input"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <PrivateShipOTP
                                    value={otp}
                                    onChange={(val) => {
                                        setOtp(val);
                                        if (val.length === 6) {
                                            handleVerifyOtp(val);
                                        }
                                    }}
                                />

                                <div className="flex justify-between items-center mt-6">
                                    <button
                                        onClick={() => {
                                            setStep('phone');
                                            setError(null);
                                        }}
                                        className="text-sm text-text-muted hover:text-white flex items-center gap-1 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Change Number
                                    </button>

                                    <button
                                        onClick={handleSendOtp}
                                        disabled={loading}
                                        className="text-sm text-teal hover:text-teal/80 font-medium disabled:opacity-50"
                                    >
                                        Resend Code
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            </div>
        </div>
    );
}
