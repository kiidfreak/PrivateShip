'use client';

import { motion } from 'framer-motion';
import { Smartphone, Shield, Globe } from 'lucide-react';

const steps = [
    {
        step: "1",
        title: "Verify",
        desc: "User completes verification via OTP or ID doc",
        icon: Smartphone,
    },
    {
        step: "2",
        title: "Generate Proof",
        desc: "Midnight creates a zero-knowledge proof",
        icon: Shield,
    },
    {
        step: "3",
        title: "Reuse",
        desc: "Validate proof on any integrated platform",
        icon: Globe,
    }
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-bg-secondary">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        The Trust Flow
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        A seamless infrastructure for portable identity.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 relative max-w-5xl mx-auto">
                    {/* Connecting Line (Desktop) with Gradient */}
                    <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-teal/20 via-teal/80 to-teal/20 -z-0" />

                    {steps.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="flex-1 relative z-10"
                        >
                            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-bg-primary border border-white/5 hover:border-teal/30 hover:shadow-glow-teal transition-all duration-300 h-full group">

                                <div className="w-24 h-24 rounded-full bg-bg-secondary border-4 border-bg-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative">
                                    <div className="absolute inset-0 rounded-full bg-teal/5 blur-md" />
                                    <item.icon className="w-10 h-10 text-teal relative z-10" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-bg-primary border border-white/10 flex items-center justify-center text-sm font-mono text-gray-400">
                                        {item.step}
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed px-4">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
