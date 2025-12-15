'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const legacyFeatures = [
    "Upload ID every time",
    "Store personal data",
    "Centralized databases",
    "Platform-specific",
    "Manual review",
    "High cost per check"
];

const privateShipFeatures = [
    "Verify once",
    "Generate proofs",
    "Zero-knowledge",
    "Portable trust",
    "Cryptographic",
    "Protocol pricing"
];

export function ParadigmShift() {
    return (
        <section className="py-24 bg-bg-secondary relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-semibold text-white mb-6"
                    >
                        From identity checks to trust proofs.
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Legacy Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm"
                    >
                        <h3 className="text-xl font-medium text-text-muted mb-8 tracking-wide text-center uppercase text-sm">Legacy Verification</h3>
                        <div className="space-y-4">
                            {legacyFeatures.map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 text-text-secondary">
                                    <X className="w-5 h-5 text-red-500/50 flex-shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* PrivateShip Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-2xl bg-gradient-to-b from-accent/10 to-transparent border border-accent/20 backdrop-blur-sm relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

                        <h3 className="text-xl font-medium text-accent mb-8 tracking-wide text-center uppercase text-sm">PrivateShip Proofs</h3>
                        <div className="space-y-4">
                            {privateShipFeatures.map((feature, i) => (
                                <div key={i} className="flex items-center gap-4 text-white">
                                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-text-muted text-sm">Same trust outcome. Radically different architecture.</p>
                </div>
            </div>
        </section>
    );
}
