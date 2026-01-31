import type { Product } from '../data/products';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface CartoucheCardProps {
    product: Product;
    onAddToCart: (product: Product, size: string, price: number, buyNow?: boolean) => void;
    onViewDetails: (product: Product) => void;
}

export const CartoucheCard: React.FC<CartoucheCardProps> = ({ product, onAddToCart, onViewDetails }) => {
    const { t } = useLanguage();

    return (
        <motion.div
            className="relative bg-stone-900 border border-[#D4AF37]/30 rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 group overflow-hidden"
            whileHover={{ y: -5 }}
        >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-900/30 via-transparent to-transparent"></div>

            {/* Premium Gold Accents */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>

            <h3 className="text-3xl text-[#D4AF37] font-bold mb-1 mt-4 font-serif relative z-10 drop-shadow-md tracking-widest leading-tight">
                {product.name}
            </h3>

            {/* Discover Secret Button - Now more prominent and clickable */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(product);
                }}
                className="relative z-30 flex items-center gap-1.5 px-4 py-1.5 mb-5 rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 group/secret shadow-[0_0_15px_rgba(212,175,55,0.2)] active:scale-95 cursor-pointer"
            >
                <Sparkles size={14} className="group-hover/secret:scale-125 group-hover/secret:rotate-12 transition-transform" />
                {t.viewSecret}
            </button>

            <div className="text-stone-400 text-sm mb-6 italic relative z-10">
                {t.simulation}: <span className="text-stone-200">{product.simulation}</span>
            </div>

            <div className="w-full relative z-10 space-y-4 mb-6">
                {product.sizes.map((s, idx) => (
                    <div key={idx} className="flex flex-col gap-3 p-3 bg-black/40 rounded border border-[#D4AF37]/10 group/item hover:border-[#D4AF37]/30 transition-colors">
                        <div className="flex justify-between items-center text-[#C2B280]">
                            <span className="text-lg font-serif">{s.size}</span>
                            <span className="font-bold text-xl text-[#FFD700]">{s.price} {t.price}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-1">
                            <button
                                onClick={() => onAddToCart(product, s.size, s.price)}
                                className="flex items-center justify-center gap-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black py-2 px-3 rounded text-sm font-bold transition-all border border-[#D4AF37]/30"
                            >
                                <ShoppingBag size={16} />
                                {t.addToCart}
                            </button>
                            <button
                                onClick={() => onAddToCart(product, s.size, s.price, true)}
                                className="bg-[#D4AF37] hover:bg-[#FFD700] text-black py-2 px-3 rounded text-sm font-bold transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                            >
                                {t.buyNow}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto opacity-20 text-[#D4AF37] text-2xl select-none">
                𓁹 𓋹 𓅃
            </div>
        </motion.div>
    );
};
