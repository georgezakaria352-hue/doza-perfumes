import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Anchor, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Product } from '../data/products';

interface ProductDetailsModalProps {
    product: Product | null;
    onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
    const { t, language, dir } = useLanguage();

    if (!product) return null;

    const layers = [
        {
            title: t.topNotes,
            notes: product.notes?.top || [],
            icon: <Sparkles className="text-yellow-400" size={20} />,
            color: 'from-yellow-500/20 to-transparent',
            delay: 0.2
        },
        {
            title: t.midNotes,
            notes: product.notes?.mid || [],
            icon: <Heart className="text-red-400" size={20} />,
            color: 'from-red-500/20 to-transparent',
            delay: 0.4
        },
        {
            title: t.baseNotes,
            notes: product.notes?.base || [],
            icon: <Anchor className="text-blue-400" size={20} />,
            color: 'from-blue-500/20 to-transparent',
            delay: 0.6
        }
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" dir={dir}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-stone-900 border-2 border-[#D4AF37] w-full max-w-xl overflow-hidden rounded-lg shadow-[0_0_50px_rgba(212,175,55,0.2)] relative"
                >
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

                    {/* Header */}
                    <div className="p-4 border-b border-[#D4AF37]/30 flex justify-between items-center bg-black/40">
                        <div className="flex items-center gap-3">
                            <Info className="text-[#D4AF37]" size={20} />
                            <h2 className="text-[#D4AF37] text-xl font-bold font-serif uppercase tracking-widest">{product.name}</h2>
                        </div>
                        <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6 sm:p-10">
                        <div className="text-center mb-10">
                            <h3 className="text-[#C2B280] text-sm uppercase tracking-[0.3em] font-light mb-2">{t.olfactoryPyramid}</h3>
                            <div className="h-0.5 w-20 bg-[#D4AF37] mx-auto opacity-50"></div>
                        </div>

                        {/* Olfactory Pyramid Viz */}
                        <div className="space-y-6 relative">
                            {layers.map((layer, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ x: dir === 'rtl' ? 50 : -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: layer.delay }}
                                    className={`relative p-4 rounded-lg bg-gradient-to-r ${layer.color} border-l-2 border-[#D4AF37]/30 flex items-start gap-4 group hover:border-[#D4AF37] transition-colors`}
                                >
                                    <div className="bg-black/60 p-3 rounded-full border border-[#D4AF37]/20 group-hover:scale-110 transition-transform">
                                        {layer.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[#D4AF37] font-bold text-sm mb-2 uppercase tracking-wider">{layer.title}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {layer.notes.map((note, nIdx) => (
                                                <span
                                                    key={nIdx}
                                                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
                                                >
                                                    {note}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Decorative Line on the left/right */}
                            <div
                                className={`absolute top-0 bottom-0 ${dir === 'rtl' ? 'right-[23px]' : 'left-[23px]'} w-px bg-gradient-to-b from-[#D4AF37]/0 via-[#D4AF37]/40 to-[#D4AF37]/0 -z-10`}
                            ></div>
                        </div>

                        <div className="mt-12 text-center">
                            <div className="text-[#D4AF37]/20 text-4xl font-serif">
                                𓋹 𓅃 𓁹 𓈗
                            </div>
                            <p className="text-stone-500 text-[10px] mt-4 uppercase tracking-tighter italic">
                                {language === 'ar' ? 'أسرار قديمة محفوظه في كل زجاجة' : 'Ancient secrets preserved in every bottle'}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
