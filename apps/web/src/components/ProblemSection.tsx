'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Assuming you have your button component
import { Eye, FileWarning, Wallet, CheckCircle, Lock, Repeat } from 'lucide-react'; // Example icons

export function ProblemSection() {
    return (
        <section className="py-24 bg-bg-primary overflow-hidden relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">

                    {/* Legacy Verification Problems Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-bg-secondary border border-red-500/10 hover:border-red-500/20 transition-all duration-300 group shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <FileWarning className="w-5 h-5 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Legacy Verification</h3>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Eye, text: "Privacy Risk", sub: "Centralized honeypots of PII" },
                                { icon: Wallet, text: "High Frequency Costs", sub: "Pay for every check, every time" },
                                { icon: FileWarning, text: "Compliance Overhead", sub: "GDPR/Data retention nightmares" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-bg-primary/50 border border-white/5 group-hover:bg-bg-primary/80 transition-colors">
                                    <item.icon className="w-6 h-6 text-gray-500 mt-1" />
                                    <div>
                                        <div className="text-white font-medium">{item.text}</div>
                                        <div className="text-sm text-text-muted">{item.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* PrivateShip Solution Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl bg-bg-secondary border border-teal/10 hover:border-teal/30 transition-all duration-300 group shadow-lg shadow-teal/5 relative overflow-hidden"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-[100px] pointer-events-none" />

                        <div className="flex items-center gap-3 mb-8 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-teal" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">PrivateShip Solution</h3>
                        </div>

                        <div className="space-y-6 relative z-10">
                            {[
                                { icon: CheckCircle, text: "Verify Once", sub: "User verifies identity a single time" },
                                { icon: Lock, text: "Generate ZK Proof", sub: "Crytographic proof of attributes" },
                                { icon: Repeat, text: "Reuse Anywhere", sub: "Portable trust across platforms" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-teal/5 border border-teal/10 group-hover:bg-teal/10 transition-colors">
                                    <item.icon className="w-6 h-6 text-teal mt-1" />
                                    <div>
                                        <div className="text-white font-medium">{item.text}</div>
                                        <div className="text-sm text-text-secondary">{item.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
