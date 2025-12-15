'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, Share2 } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Gradient - Midnight Blue to Electric Teal hint */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-[#0D1520] to-[#0D1117] z-0" />

            {/* Subtle geometric overlay or grid could go here */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

            <div className="relative z-10 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-teal/10 border border-teal/20 text-sm text-teal font-medium backdrop-blur-sm">
                        Trust Without Exposure
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold text-text-primary mb-6 tracking-tight"
                >
                    The Trust Layer for <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-blue-400">
                        Privacy-First
                    </span> Platforms
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Verify users once. Generate zero-knowledge proofs. <br className="hidden md:block" />
                    Reuse trust anywhere without exposing personal data.
                </motion.p>

                {/* Stats Chips */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {[
                        { icon: ShieldCheck, label: "Proofs Generated", val: "10k+" },
                        { icon: Lock, label: "Platforms Integrated", val: "50+" },
                        { icon: Share2, label: "Fraud-Free Users", val: "99.9%" },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <stat.icon className="w-4 h-4 text-teal" />
                            <span className="text-gray-400 text-sm font-medium">{stat.label}:</span>
                            <span className="text-white text-sm font-bold">{stat.val}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Button size="lg" className="bg-teal text-bg-primary hover:bg-teal/90 hover:shadow-glow-teal font-semibold w-full sm:w-auto h-12 px-8">
                        Start Integrating
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 text-white w-full sm:w-auto h-12 px-8">
                        Read Documentation
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
