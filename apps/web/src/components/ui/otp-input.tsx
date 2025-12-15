'use client';

import { motion } from 'framer-motion';
import { OTPInput, SlotProps } from 'input-otp';
import { cn } from '@/lib/utils'; // Assuming you have a utility for merging classes

interface PrivateShipOTPProps {
    value: string;
    onChange: (value: string) => void;
    maxLength?: number;
}

export function PrivateShipOTP({ value, onChange, maxLength = 6 }: PrivateShipOTPProps) {
    return (
        <div className="flex justify-center items-center py-4">
            <OTPInput
                maxLength={maxLength}
                value={value}
                onChange={onChange}
                containerClassName="group flex items-center gap-3 has-[:disabled]:opacity-30"
                render={({ slots }) => (
                    <>
                        <div className="flex gap-3">
                            {slots.slice(0, 3).map((slot, idx) => (
                                <Slot key={idx} {...slot} />
                            ))}
                        </div>

                        {/* Visual separator/dash */}
                        <div className="text-gray-500 text-xl font-bold">-</div>

                        <div className="flex gap-3">
                            {slots.slice(3, 6).map((slot, idx) => (
                                <Slot key={idx + 3} {...slot} />
                            ))}
                        </div>
                    </>
                )}
            />
        </div>
    );
}

// Individual Slot Component with Animations
function Slot(props: SlotProps) {
    return (
        <div
            className={cn(
                'relative w-12 h-14 text-[2rem]',
                'flex items-center justify-center',
                'transition-all duration-300',
                'border-b-2 border-white/10 bg-white/5 rounded-t-md',
                'outline outline-0 outline-offset-2',
                {
                    'border-teal border-b-2 bg-teal/5 shadow-[0_0_20px_rgba(29,233,182,0.1)]': props.isActive,
                    'border-green-500 text-green-500': !props.isActive && props.char !== null, // Success/Filled state look (optional)
                }
            )}
        >
            {/* Character with specialized animation */}
            <div className="group-hover:scale-110 transition-transform duration-300">
                {props.char !== null && <div>{props.char}</div>}
            </div>

            {/* Cursor / Caret for empty active slot */}
            {props.hasFakeCaret && (
                <motion.div
                    layoutId="otp-caret"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                    <div className="h-8 w-0.5 animate-caret-blink bg-teal duration-1000" />
                </motion.div>
            )}
        </div>
    );
}
