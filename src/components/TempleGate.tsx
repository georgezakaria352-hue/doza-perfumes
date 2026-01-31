import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoorOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAudio } from '../context/AudioContext';

interface TempleGateProps {
    onEnter: () => void;
}

// Star Particle Component - TOMB GOLD SPARKLES
const StarParticle = ({ delay, side }: { delay: number; side: 'left' | 'right' }) => {
    const randomX = Math.random() * 150 - 75;
    const randomSize = Math.random() * 15 + 10; // 10-25px
    const duration = Math.random() * 2 + 3; // 3-5 seconds

    return (
        <motion.div
            className="absolute bg-[#D4AF37]" // Pure Gold
            style={{
                width: randomSize,
                height: randomSize,
                left: side === 'left' ? 'calc(50% - 5px)' : 'calc(50% + 5px)',
                top: '30%',
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)", // Star Shape
                boxShadow: "0 0 10px #FFD700"
            }}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1, 0.5, 0],
                y: [0, 50, 100, 150],
                x: [0, randomX, randomX * 1.5, randomX * 2],
                rotate: [0, 180, 360]
            }}
            transition={{
                duration: duration,
                delay: delay,
                ease: "easeOut"
            }}
        />
    );
};

// Light Ray - TOMB ATMOSPHERE
const LightRay = ({ delay }: { delay: number }) => (
    <motion.div
        className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-gradient-to-b from-[#D4AF37]/40 via-[#B8860B]/20 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
            opacity: [0, 0.4, 0.6, 0.2, 0],
            scaleX: [0, 15, 40, 60, 0],
        }}
        transition={{
            duration: 4,
            delay: delay,
            ease: "easeInOut"
        }}
    />
);

export const TempleGate: React.FC<TempleGateProps> = ({ onEnter }) => {
    const [isOpening, setIsOpening] = useState(false);
    const [showDust, setShowDust] = useState(false);
    const { t } = useLanguage();
    const { playSFX, startMusic } = useAudio();

    const handleEnter = () => {
        setIsOpening(true);
        setShowDust(true);

        // Play stone grinding sound
        playSFX('/stone-gate.mp3');

        // Start background music
        setTimeout(startMusic, 1000); // 1s delay for dramatic effect

        // Trigger onEnter later to allow reading the delayed text
        setTimeout(onEnter, 6500); // Extended time (was 3.8s) for delayed text + reading
    };



    // Shake effect at start
    const shakeVariants = {
        initial: { x: 0 },
        shake: {
            x: [0, -5, 5, -3, 3, 0],
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    return (
        <AnimatePresence>
            {!isOpening ? (
                // Closed Gate - Full Image with Enter Button
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-2 overflow-hidden bg-black"
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                    {/* Full Background Image */}
                    <div
                        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: "url('/temple-gate-bg.jpg')" }}
                    />

                    {/* Enter Button */}
                    <motion.button
                        onClick={handleEnter}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="z-10 group cursor-pointer relative"
                    >
                        <div className="relative px-6 py-3 bg-black/80 backdrop-blur-sm border-2 border-[#D4AF37] rounded 
                                        shadow-[0_0_20px_rgba(212,175,55,0.4)] 
                                        group-hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] 
                                        group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                            <div className="flex items-center gap-3 text-[#D4AF37] group-hover:text-[#FFD700]">
                                <DoorOpen className="w-6 h-6 sm:w-8 sm:h-8" />
                                <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide uppercase">
                                    {t.enterTemple}
                                </span>
                            </div>
                        </div>
                    </motion.button>
                </motion.div>
            ) : (
                // Opening Gate Animation
                <motion.div
                    className="fixed inset-0 z-50 overflow-hidden pointer-events-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.5, delay: 0.5 } }} // Fade out slower
                >
                    {/* Initial shake effect container */}
                    <motion.div
                        className="absolute inset-0"
                        variants={shakeVariants}
                        initial="initial"
                        animate="shake"
                    >
                        {/* LEFT SIDE */}
                        <motion.div
                            className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
                            initial={{ x: 0 }}
                            animate={{ x: '-100%' }}
                            transition={{
                                duration: 2.5, // Slightly slower (was 1.5)
                                ease: [0.6, 0.05, 0.01, 0.9],
                                delay: 0.2
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: "url('/temple-gate-bg.jpg')",
                                    backgroundSize: '200% 100%',
                                    backgroundPosition: '0% center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                            <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-stone-900/80 to-transparent"></div>
                        </motion.div>

                        {/* RIGHT SIDE */}
                        <motion.div
                            className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
                            initial={{ x: 0 }}
                            animate={{ x: '100%' }}
                            transition={{
                                duration: 2.5, // Slightly slower
                                ease: [0.6, 0.05, 0.01, 0.9],
                                delay: 0.2
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: "url('/temple-gate-bg.jpg')",
                                    backgroundSize: '200% 100%',
                                    backgroundPosition: '100% center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                            <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-stone-900/80 to-transparent"></div>
                        </motion.div>

                        {/* TAGLINE - Appearing as gates open (overlapping) */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 2, // Smooth fade in
                                delay: 1.5, // Start appearing BEFORE split finishes
                                ease: "easeOut"
                            }}
                        >
                            <h2 className="text-[#D4AF37] text-3xl md:text-5xl font-serif text-center drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] tracking-widest uppercase bg-black/40 p-4 rounded backdrop-blur-sm">
                                Luxury fragrance inspired by <br /> Egyptian heritage
                            </h2>
                        </motion.div>
                    </motion.div>

                    {/* LIGHT RAYS */}
                    <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        <LightRay delay={0.2} />
                        {/* Center Beam - Gold */}
                        <motion.div
                            className="absolute left-1/2 top-0 h-full w-20 -translate-x-1/2 bg-gradient-to-b from-[#D4AF37]/60 via-[#B8860B]/40 to-transparent"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: [0, 0.5, 0], scaleX: [0, 40, 80] }}
                            transition={{ duration: 3, delay: 0.3 }}
                        />
                    </motion.div>

                    {/* STARS falling */}
                    {showDust && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {Array.from({ length: 50 }).map((_, i) => (
                                <StarParticle
                                    key={i}
                                    delay={0.2 + i * 0.05}
                                    side={i % 2 === 0 ? 'left' : 'right'}
                                />
                            ))}
                        </div>
                    )}

                    {/* Shadow/depth shift overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 3, delay: 1 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
