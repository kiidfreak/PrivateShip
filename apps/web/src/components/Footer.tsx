'use client';

import { Github, Twitter, Disc, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-[#0D1117] border-t border-white/5 pt-20 pb-0 relative overflow-hidden">

            {/* CTA Section */}
            <div className="container mx-auto px-6 mb-24 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to give your agents <span className="text-teal">privacy?</span>
                </h2>
                <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
                    Whether you're building the next breakthrough AI product or exploring autonomous agents,
                    PrivateShip provides the trust layer you need.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="bg-white text-bg-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all flex items-center gap-2 group">
                        Start Building
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 rounded-full font-medium text-white border border-white/20 hover:bg-white/5 transition-colors">
                        Read Documentation
                    </button>
                </div>
            </div>

            {/* Links Grid */}
            <div className="container mx-auto px-6 mb-20 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase opacity-70">Company</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li><Link href="#" className="hover:text-teal transition-colors">About</Link></li>
                            <li><Link href="#" className="hover:text-teal transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-teal transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-teal transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase opacity-70">Product</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li><Link href="#" className="hover:text-teal transition-colors">Features</Link></li>
                            <li><Link href="#" className="hover:text-teal transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-teal transition-colors">Roadmap</Link></li>
                            <li><Link href="#" className="hover:text-teal transition-colors">Security</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase opacity-70">Resources</h4>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li><Link href="#" className="hover:text-teal transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-teal transition-colors">API Reference</Link></li>
                            <li><Link href="#" className="hover:text-teal transition-colors">SDKs</Link></li>
                            <li><Link href="#" className="hover:text-teal transition-colors">Community</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase opacity-70">Follow Us</h4>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <Link href="#" className="text-text-secondary hover:text-white transition-colors border border-white/10 p-2 rounded-lg hover:bg-white/5">
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-text-secondary hover:text-white transition-colors border border-white/10 p-2 rounded-lg hover:bg-white/5">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="text-text-secondary hover:text-white transition-colors border border-white/10 p-2 rounded-lg hover:bg-white/5">
                                <Disc className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
                    <p>© 2025 PrivateShip Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>

            {/* Massive Bottom Text */}
            <div className="w-full overflow-hidden leading-none select-none pointer-events-none opacity-[0.03]">
                <h1 className="text-[15vw] md:text-[18vw] font-bold text-center text-white tracking-tighter whitespace-nowrap translate-y-[20%]">
                    PrivateShip
                </h1>
            </div>
        </footer>
    );
}
