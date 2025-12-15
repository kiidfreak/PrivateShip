'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = () => {
        // Clear token logic here
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary">
            {/* Sidebar / Navbar placeholder */}
            <nav className="border-b border-white/5 bg-bg-secondary px-6 py-4 flex justify-between items-center">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal/20 flex items-center justify-center border border-teal/20">
                        <ShieldCheck className="w-5 h-5 text-teal" />
                    </div>
                    <span className="font-bold text-white text-lg">PrivateShip</span>
                </Link>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium text-gray-400">Mainnet Beta</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleLogout}>
                        <LogOut className="w-5 h-5 text-gray-400 hover:text-white" />
                    </Button>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-text-secondary">Your standardized identity passport.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Identity Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-bg-secondary border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-white">Identity Anchor</h3>
                            <div className="p-2 rounded-lg bg-teal/10">
                                <User className="w-5 h-5 text-teal" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Phone Status</div>
                                <div className="flex items-center gap-2 text-green-400 font-medium">
                                    <ShieldCheck className="w-4 h-4" /> Verified
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Government ID</div>
                                <div className="flex items-center gap-2 text-gray-500 font-medium">
                                    <div className="w-4 h-4 rounded-full border border-gray-600" /> Pending Upload
                                </div>
                            </div>
                        </div>
                        <Button className="w-full mt-6 bg-teal text-bg-primary hover:bg-teal/90">
                            Complete Verification
                        </Button>
                    </motion.div>

                    {/* Trust Score Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-bg-secondary border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <h3 className="font-semibold text-white mb-6">Trust Score</h3>
                        <div className="flex flex-col items-center justify-center py-4">
                            <div className="text-5xl font-bold text-white mb-2">40</div>
                            <div className="text-sm text-text-muted">Current Level</div>
                        </div>
                        <p className="text-center text-sm text-text-secondary mt-4">
                            Verify more attributes to increase your composable trust score.
                        </p>
                    </motion.div>

                </div>
            </main>
        </div>
    );
}
