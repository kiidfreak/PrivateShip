'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Globe, CreditCard, Users, ArrowRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const cases = [
    {
        title: "Social Commerce",
        metric: "Reduce scams 80%",
        icon: ShoppingBag,
        color: "text-pink-500",
        bg: "bg-pink-500/10"
    },
    {
        title: "Marketplaces",
        metric: "Lower fraud, higher trust",
        icon: Globe,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "DeFi / Payments",
        metric: "Compliance without custody",
        icon: CreditCard,
        color: "text-teal",
        bg: "bg-teal/10"
    },
    {
        title: "DAOs & Governance",
        metric: "Sybil resistance",
        icon: Users,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    }
];

export function UseCases() {
    return (
        <section className="py-24 bg-bg-secondary w-full overflow-hidden">
            <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Built for modern trust.
                    </h2>
                    <p className="text-text-secondary">Industries transformed by PrivateShip.</p>
                </div>

                {/* Simple navigation hint if needed, or just keep it clean */}
                <div className="hidden md:flex gap-2">
                    {/* Arrows could be functional here in a real carousel component */}
                </div>
            </div>

            <div className="container mx-auto px-6">
                {/* Simple Horizontal Scroll Container */}
                <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
                    {cases.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="min-w-[280px] md:min-w-[320px] p-8 rounded-3xl bg-bg-primary border border-white/5 hover:border-white/20 transition-all cursor-pointer snap-start relative overflow-hidden group"
                        >
                            <div className={`absolute top-0 right-0 p-32 ${item.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none translate-x-10 -translate-y-10`} />

                            <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-8 border border-white/5`}>
                                <item.icon className={`w-7 h-7 ${item.color}`} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>

                            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-text-muted group-hover:text-white transition-colors">
                                <span className="uppercase tracking-widest text-xs">Impact</span>
                                <div className="h-px bg-white/20 flex-grow" />
                            </div>
                            <p className={`mt-2 text-lg font-medium ${item.color}`}>
                                {item.metric}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
