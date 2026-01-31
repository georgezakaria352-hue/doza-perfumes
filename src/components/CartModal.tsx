import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Product } from '../data/products';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cart: { product: Product; size: string; price: number; quantity: number }[];
    onUpdateQuantity: (index: number, delta: number) => void;
    onContinueToCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
    isOpen,
    onClose,
    cart,
    onUpdateQuantity,
    onContinueToCheckout
}) => {
    const { t, dir, language } = useLanguage();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" dir={dir}>
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="bg-stone-900 border-2 border-[#D4AF37] w-full max-w-xl max-h-[85vh] overflow-hidden rounded-lg shadow-[0_0_50px_rgba(212,175,55,0.2)] flex flex-col relative"
                >
                    {/* Header */}
                    <div className="p-6 flex justify-between items-center border-b border-[#D4AF37]/20 bg-[#1c1917]">
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="text-[#D4AF37]" size={28} />
                            <h2 className="text-[#D4AF37] text-2xl font-serif uppercase tracking-widest">
                                {language === 'ar' ? 'عربة التسوق' : 'Your Cart'}
                            </h2>
                        </div>
                        <button onClick={onClose} className="text-stone-400 hover:text-[#D4AF37] transition-colors p-2">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cart.length === 0 ? (
                            <div className="text-center py-20 space-y-4">
                                <ShoppingBag size={60} className="mx-auto text-stone-700 opacity-30" />
                                <p className="text-stone-500 italic text-xl">
                                    {language === 'ar' ? 'العربة فارغة حالياً' : 'Your cart is currently empty'}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cart.map((item, idx) => (
                                    <motion.div
                                        key={`${item.product.id}-${item.size}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-4 bg-stone-800/40 p-4 rounded-lg border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all group"
                                    >
                                        <div className="flex-1">
                                            <h4 className="text-[#D4AF37] text-xl font-bold">{item.product.name}</h4>
                                            <p className="text-stone-400 text-sm font-light">
                                                {item.size} • {item.price} {t.price}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center border border-[#D4AF37]/30 rounded-full overflow-hidden bg-black/40">
                                                <button
                                                    onClick={() => onUpdateQuantity(idx, -1)}
                                                    className="w-8 h-8 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                                                >
                                                    {item.quantity === 1 ? <Trash2 size={14} /> : '-'}
                                                </button>
                                                <span className="w-10 text-center font-bold text-white border-x border-[#D4AF37]/20">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => onUpdateQuantity(idx, 1)}
                                                    className="w-8 h-8 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="text-right min-w-[100px]">
                                                <p className="text-[#FFD700] font-bold text-lg">
                                                    {item.price * item.quantity} {t.price}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer / Summary */}
                    <div className="p-6 bg-[#1a1715] border-t border-[#D4AF37]/20 space-y-4">
                        <div className="flex justify-between items-center text-stone-400 text-lg">
                            <span>{language === 'ar' ? 'الإجمالي الفرعي' : 'Subtotal'} ({totalItems})</span>
                            <span className="text-white font-bold">{subtotal} {t.price}</span>
                        </div>

                        <div className="pt-2">
                            <button
                                disabled={cart.length === 0}
                                onClick={onContinueToCheckout}
                                className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-lg text-xl hover:bg-[#F2D06B] transition-all flex items-center justify-center gap-3 disabled:opacity-30 shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                            >
                                {language === 'ar' ? 'المتابعة لإتمام الشراء' : 'Continue to Checkout'}
                                <ArrowRight size={24} className={language === 'ar' ? 'rotate-180' : ''} />
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full mt-3 text-stone-500 hover:text-[#D4AF37] transition-colors py-2 text-sm uppercase tracking-widest"
                            >
                                {language === 'ar' ? 'العودة للتسوق' : 'Back to Shopping'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
