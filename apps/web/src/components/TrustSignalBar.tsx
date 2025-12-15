'use client';

import { ShieldCheck, Lock, Database, Network, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const signals = [
    { icon: ShieldCheck, text: "Zero-knowledge proofs" },
    { icon: Lock, text: "Midnight-powered privacy" },
    { icon: Database, text: "No PII storage" },
    { icon: Network, text: "Protocol-level infrastructure" },
    { icon: Zap, text: "Built for scale" },
];

export function TrustSignalBar() {
    return (
        <div className="w-full bg-bg-secondary/50 border-y border-white/5 py-8 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 items-center">
                    {signals.map((signal, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 group"
                        >
                            <signal.icon className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
                            <span className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
                                {signal.text}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
