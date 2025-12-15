'use client';

import { motion } from 'framer-motion';
import { UserCheck, Lock, ShieldAlert, Cake, Star, FileCog } from 'lucide-react';

const features = [
    { title: "Human Verified", icon: UserCheck, desc: "Real person, real phone. No bots." },
    { title: "Identity Stable", icon: Lock, desc: "No changes in 12+ months." },
    { title: "Fraud-Free History", icon: ShieldAlert, desc: "Zero fraud events on record." },
    { title: "Age Verification", icon: Cake, desc: "Over 18, without revealing DOB." },
    { title: "Trust Score ≥ X", icon: Star, desc: "Meet platform requirements." },
    { title: "Custom Conditions", icon: FileCog, desc: "Policy-driven trust rules." }
];

export function FeaturesGrid() {
    return (
        <section className="py-24 bg-bg-primary">
            <div className="container mx-auto px-6">
                <h2 className="text-center text-3xl md:text-5xl font-bold text-white mb-16">
                    Prove properties, <span className="text-teal">not identity</span>.
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-2xl bg-bg-secondary border border-white/5 hover:border-teal/50 hover:shadow-glow-teal transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-bg-primary border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <item.icon className="w-6 h-6 text-gray-400 group-hover:text-teal transition-colors" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-text-secondary text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
