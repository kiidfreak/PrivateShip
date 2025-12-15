'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const tabs = ["TypeScript", "Python", "cURL"];

const codeSnippets = {
    TypeScript: `// Generate trust proof
const proof = await privateship.proofs.generate({
  userId: 'user-123',
  proofType: 'trust_score',
  minScore: 70
});

// Verify proof
const valid = await privateship.proofs.verify(proof.id);
// → { valid: true, score: 87, tier: 'id' }`,
    Python: `# Generate trust proof
proof = privateship.proofs.generate(
    user_id='user-123',
    proof_type='trust_score',
    min_score=70
)

# Verify proof
valid = privateship.proofs.verify(proof.id)
# → { valid: True, score: 87, tier: 'id' }`,
    cURL: `# Generate trust proof
curl -X POST https://api.privateship.io/v1/proofs \\
  -d '{"user_id": "user-123", "min_score": 70}'

# Verify proof
curl https://api.privateship.io/v1/proofs/verify/proof_123`
};

export function DeveloperSection() {
    const [activeTab, setActiveTab] = useState("TypeScript");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippets[activeTab as keyof typeof codeSnippets]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-24 bg-bg-primary overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/30 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Code Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="rounded-2xl overflow-hidden bg-[#0D1117] border border-white/10 shadow-2xl relative group">
                            {/* Glow hint */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-teal/20 to-neon/20 blur opacity-20 group-hover:opacity-40 transition-opacity" />

                            <div className="relative bg-[#0D1117]">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    </div>
                                    <div className="flex bg-black/50 rounded-lg p-1">
                                        {tabs.map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === tab ? 'bg-white/10 text-white' : 'text-text-muted hover:text-gray-300'}`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-6 overflow-x-auto relative">
                                    <button
                                        onClick={handleCopy}
                                        className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                    <pre className="text-sm font-mono leading-relaxed font-fira-code">
                                        <code className="text-gray-300">
                                            {/* Simple syntax highlighting hack for visual demo */}
                                            {codeSnippets[activeTab as keyof typeof codeSnippets].split('\n').map((line, i) => (
                                                <div key={i}>
                                                    <span className="text-gray-600 select-none mr-4 w-6 inline-block text-right">{i + 1}</span>
                                                    <span dangerouslySetInnerHTML={{
                                                        __html: line
                                                            .replace(/(const|await|import|from|def)/g, '<span class="syntax-keyword">$1</span>')
                                                            .replace(/('[\w\d-_]+')/g, '<span class="syntax-string">$1</span>')
                                                            .replace(/(\/\/.*|#.*)/g, '<span class="syntax-comment">$1</span>')
                                                            .replace(/(\d+)/g, '<span class="syntax-number">$1</span>')
                                                            .replace(/(privateship\.|proofs\.|verify|generate)/g, '<span class="syntax-method">$1</span>')
                                                    }} />
                                                </div>
                                            ))}
                                        </code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Features */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                            Designed for developers.
                        </h2>
                        <p className="text-text-secondary text-lg mb-10 leading-relaxed">
                            Integrate privacy-preserving verification in minutes with our typed SDKs and robust API.
                        </p>

                        <div className="space-y-6 mb-10">
                            {[
                                { title: "Get Started in 5 Minutes", desc: "From signup to verified proof in moments." },
                                { title: "Ship with Confidence", desc: "Typed SDKs, OpenAPI specs, and webhooks." },
                                { title: "Pay Only for What You Use", desc: "No monthly fees. Just pay per proof." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-1 h-full min-h-[40px] bg-gradient-to-b from-teal to-transparent rounded-full opacity-50" />
                                    <div>
                                        <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                                        <p className="text-text-secondary text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <Button className="font-semibold px-8 bg-white/10 hover:bg-white/20 text-white border border-white/5">
                                View Docs
                            </Button>
                            <Button variant="ghost" className="text-teal hover:text-teal/80">
                                Explore GitHub &rarr;
                            </Button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
