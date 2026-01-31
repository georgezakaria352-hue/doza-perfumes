import React from 'react';
import { motion } from 'framer-motion';

export const OurStoryView: React.FC = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-4 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto text-center space-y-12"
            >
                <div>
                    <h1 className="text-[#FFD700] text-4xl md:text-6xl font-serif uppercase tracking-widest mb-4">
                        Our Story
                    </h1>
                    <div className="h-1 w-24 bg-[#D4AF37] mx-auto opacity-50"></div>
                </div>

                <div className="space-y-8 text-stone-300 text-lg md:text-xl leading-relaxed font-light italic">
                    <p>
                        "Doza Perfumes was born from a passion for the timeless elegance of Ancient Egypt."
                    </p>
                    <p>
                        We believe that a fragrance is more than just a scent—it is a journey through time,
                        a whisper of royalty, and a tribute to the rituals of power that once echoed through the halls of Luxor.
                    </p>
                    <p>
                        Every bottle is crafted with the precision of a master embalmer,
                        balancing modern luxury with the deep, resonant notes of myrrh, frankincense,
                        and the hidden treasures of the Nile.
                    </p>
                </div>

                <div className="pt-10">
                    <p className="text-[#D4AF37] text-2xl font-serif">
                        Bringing the essence of gods to the modern world.
                    </p>
                </div>

                <div className="flex justify-center gap-8 pt-12 opacity-30">
                    <span className="text-4xl text-[#D4AF37]">𓂀</span>
                    <span className="text-4xl text-[#D4AF37]">𓋹</span>
                    <span className="text-4xl text-[#D4AF37]">𓅃</span>
                </div>
            </motion.div>
        </div>
    );
};
