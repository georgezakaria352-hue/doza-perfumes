import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { governorates, getShippingCost } from '../data/governorates';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShoppingBag, CreditCard, Lock, CheckCircle2, ChevronRight, Package, Calendar } from 'lucide-react';
import type { Product } from '../data/products';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBack?: () => void;
    cart: { product: Product; size: string; price: number; quantity: number }[];
    clearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onBack, cart, clearCart }) => {
    const { t, language, dir } = useLanguage();
    const { addOrder, user } = useAuth();
    const [govId, setGovId] = useState('');
    const [city, setCity] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'instapay' | 'cod' | 'card'>('cod');
    const [showBankOverlay, setShowBankOverlay] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [otp, setOtp] = useState('');
    const [orderId, setOrderId] = useState('');

    const selectedGov = governorates.find(g => g.id === govId);
    const shippingCost = selectedGov ? getShippingCost(selectedGov.region) : 0;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = subtotal + shippingCost;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (paymentMethod === 'card') {
            setShowBankOverlay(true);
        } else {
            completeOrder();
        }
    };

    const completeOrder = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const newOrderId = addOrder({
                items: cart.map(item => ({
                    productName: item.product.name,
                    size: item.size,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: total
            });
            setOrderId(newOrderId);
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        }, 1500);
    };

    const handleVerifyOtp = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            completeOrder();
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-md" dir={dir}>

                {/* Bank Verification Overlay */}
                <AnimatePresence>
                    {showBankOverlay && !isSuccess && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-[120] bg-white text-stone-900 flex items-center justify-center p-4"
                        >
                            <div className="w-full max-w-sm space-y-8 text-center">
                                <div className="flex justify-between items-center border-b pb-4">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                    <span className="font-bold text-blue-800">{t.bankVerify}</span>
                                </div>
                                <div className="space-y-4 pt-4 text-left" dir={dir}>
                                    <p className="text-sm text-stone-600 leading-relaxed font-sans">{t.otpSent}</p>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-stone-400">{t.otpCode}</label>
                                        <input
                                            type="text"
                                            maxLength={6}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full border-2 border-stone-200 rounded p-4 text-2xl tracking-[1em] text-center font-mono focus:border-blue-500 outline-none"
                                            placeholder="000000"
                                        />
                                    </div>
                                    <button
                                        onClick={handleVerifyOtp}
                                        disabled={otp.length < 4 || isProcessing}
                                        className="w-full bg-blue-600 text-white font-bold py-4 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" /> : t.verify}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    className="bg-stone-900 border-2 border-[#D4AF37] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-[0_0_60px_rgba(0,0,0,0.8)] relative"
                >
                    {!isSuccess ? (
                        <>
                            {/* Header */}
                            <div className="sticky top-0 z-10 bg-[#1c1917] p-4 flex justify-between items-center border-b border-[#D4AF37]/30">
                                <div className="flex items-center gap-4">
                                    {onBack && (
                                        <button onClick={onBack} className="text-[#D4AF37] hover:scale-110 transition-transform">
                                            <ArrowRight className={language === 'ar' ? '' : 'rotate-180'} size={24} />
                                        </button>
                                    )}
                                    <h2 className="text-[#D4AF37] text-2xl font-bold">{t.modalTitle}</h2>
                                </div>
                                <button onClick={onClose} className="text-stone-400 hover:text-white p-2">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-4 sm:p-8 space-y-8">
                                {/* Order Summary */}
                                <div className="bg-[#D4AF37]/5 p-6 rounded-lg border border-[#D4AF37]/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <ShoppingBag size={80} className="text-[#D4AF37]" />
                                    </div>
                                    <h3 className="text-[#D4AF37] font-serif text-xl border-b border-[#D4AF37]/20 pb-2 mb-4">
                                        {language === 'ar' ? `ملخص الطلب (${totalItems})` : `Order Summary (${totalItems})`}
                                    </h3>
                                    <div className="space-y-2 relative z-10">
                                        {cart.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-stone-300 text-sm">
                                                <span>{item.quantity}x {item.product.name} ({item.size})</span>
                                                <span>{item.price * item.quantity} {t.price}</span>
                                            </div>
                                        ))}
                                        <div className="pt-4 mt-4 border-t border-[#D4AF37]/10 space-y-2">
                                            <div className="flex justify-between text-stone-400">
                                                <span>{t.shipping}</span>
                                                <span className="text-white">{selectedGov ? `${shippingCost} ${t.price}` : '---'}</span>
                                            </div>
                                            <div className="flex justify-between text-[#D4AF37] font-bold text-2xl pt-2">
                                                <span>{t.total}</span>
                                                <span>{total} {t.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Form */}
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <h3 className="text-[#D4AF37] font-serif text-xl border-b border-[#D4AF37]/20 pb-2">
                                        {language === 'ar' ? 'بيانات الشحن' : 'Shipping Information'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label className="block text-[#C2B280] text-sm uppercase tracking-wider">{t.name}</label>
                                            <input type="text" defaultValue={user?.name || ''} placeholder={language === 'ar' ? 'مثال: محمد أحمد علي' : 'e.g. John Doe'} className="w-full bg-black/40 border border-stone-700/50 rounded-md p-3 text-white focus:border-[#D4AF37] outline-none" required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-[#C2B280] text-sm uppercase tracking-wider">{t.phone}</label>
                                            <input type="tel" defaultValue={user?.phone || ''} placeholder="01xxxxxxxxx" className="w-full bg-black/40 border border-stone-700/50 rounded-md p-3 text-white focus:border-[#D4AF37] outline-none" required />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <select value={govId} onChange={(e) => setGovId(e.target.value)} className="w-full bg-black/40 border border-stone-700/50 rounded-md p-3 text-white focus:border-[#D4AF37] outline-none" required>
                                            <option value="">{t.selectGov}</option>
                                            {governorates.map(g => <option key={g.id} value={g.id}>{language === 'ar' ? g.ar : g.en}</option>)}
                                        </select>
                                        <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!selectedGov} className="w-full bg-black/40 border border-stone-700/50 rounded-md p-3 text-white focus:border-[#D4AF37] outline-none disabled:opacity-30" required>
                                            <option value="">{t.selectCity}</option>
                                            {selectedGov?.cities.map(c => <option key={c.en} value={c.en}>{language === 'ar' ? c.ar : c.en}</option>)}
                                        </select>
                                    </div>

                                    <textarea className="w-full bg-black/40 border border-stone-700/50 rounded-md p-3 text-white focus:border-[#D4AF37] outline-none min-h-[80px]" placeholder={language === 'ar' ? 'رقم الشارع، العمارة، الشقة...' : 'Street name, Building, Apartment...'} required />

                                    <div className="space-y-3">
                                        <label className="block text-[#C2B280] text-sm uppercase tracking-wider">{t.paymentMethod}</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {['cod', 'instapay', 'card'].map((method) => (
                                                <button key={method} type="button" onClick={() => setPaymentMethod(method as any)} className={`p-3 rounded-lg border-2 transition-all font-bold text-xs ${paymentMethod === method ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-black/20 border-stone-800 text-stone-500'}`}>
                                                    {t[method as keyof typeof t] || method.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button disabled={isProcessing} className="w-full bg-[#D4AF37] text-black font-bold py-5 rounded-lg text-2xl hover:bg-[#F2D06B] transition-all shadow-[0_10px_30px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3">
                                        {isProcessing ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full" /> : t.submitOrder}
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-8 sm:p-12 text-center space-y-8"
                        >
                            <div className="flex flex-col items-center gap-4">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(34,197,94,0.4)]"
                                >
                                    <CheckCircle2 size={60} />
                                </motion.div>
                                <h2 className="text-4xl font-serif font-bold text-[#D4AF37]">
                                    {language === 'ar' ? 'تم تأكيد طلبك بنجاح!' : 'Order Confirmed!'}
                                </h2>
                                <p className="text-stone-400 text-lg max-w-md">
                                    {language === 'ar' ? 'شكراً لثقتك بـ "دوزا". سيتم التواصل معك قريباً لتوصيل عطر الملكوت الخاص بك.' : 'Thank you for choosing DOZA. We will contact you soon to deliver your regal fragrance.'}
                                </p>
                            </div>

                            <div className="bg-black/40 border border-[#D4AF37]/20 rounded-xl p-6 space-y-4 max-w-sm mx-auto">
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-500">{language === 'ar' ? 'رقم الطلب' : 'Order ID'}</span>
                                    <span className="text-[#FFD700] font-mono font-bold">{orderId}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-500">{language === 'ar' ? 'الإجمالي' : 'Total'}</span>
                                    <span className="text-white font-bold">{total} LE</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-500">{language === 'ar' ? 'طريقة الدفع' : 'Payment'}</span>
                                    <span className="text-white">{paymentMethod.toUpperCase()}</span>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="bg-[#D4AF37] text-black font-bold py-4 px-12 rounded-lg hover:bg-[#F2D06B] transition-all shadow-xl"
                            >
                                {language === 'ar' ? 'الرجوع للمتجر' : 'Back to Store'}
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
