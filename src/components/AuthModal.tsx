import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { login, signup } = useAuth();
    const { language, dir } = useLanguage();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            login({ name: 'Guest User', email: formData.email, phone: '01000000000' });
        } else {
            signup(formData);
        }
        onClose();
    };

    const isRtl = dir === 'rtl';

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl" dir={isRtl ? 'rtl' : 'ltr'}>
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 40 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative bg-[#0A0A0A] border border-[#D4AF37]/30 w-full max-w-lg rounded-[2rem] shadow-[0_20px_80px_rgba(0,0,0,1),0_0_40px_rgba(212,175,55,0.1)] overflow-hidden"
                >
                    {/* Header with Logo or Icon */}
                    <div className="pt-12 pb-6 px-10 text-center relative">
                        <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                            <button onClick={onClose} className="text-stone-600 hover:text-[#D4AF37] transition-all p-2 hover:bg-white/5 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#8A6D3B] p-[1px] mb-6 shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                            <div className="w-full h-full bg-black rounded-[calc(1.5rem-1px)] flex items-center justify-center">
                                <Lock className="text-[#D4AF37]" size={32} strokeWidth={1.5} />
                            </div>
                        </div>

                        <h2 className="text-[#D4AF37] text-3xl font-serif font-bold tracking-tight mb-2">
                            {isLogin
                                ? (language === 'ar' ? 'مرحباً بعودتك' : 'Welcome Back')
                                : (language === 'ar' ? 'انضم إلى دوزا' : 'Join DOZA')}
                        </h2>
                        <p className="text-stone-500 text-sm font-serif italic">
                            {isLogin
                                ? (language === 'ar' ? 'سجل دخولك لتجربة عالم العطور الملكي' : 'Sign in to experience the world of regal fragrances')
                                : (language === 'ar' ? 'أنشئ حسابك للحصول على تجربة تسوق حصرية' : 'Create your account for an exclusive shopping experience')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="px-10 pb-12 pt-6 space-y-6">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="block text-[#C2B280] text-[11px] uppercase tracking-[0.2em] font-bold px-1 opacity-70">
                                    {language === 'ar' ? 'الاسم بالكامل' : 'Full Name'}
                                </label>
                                <div className="group relative">
                                    <input
                                        type="text"
                                        required
                                        className={`w-full bg-[#111] border border-stone-800 rounded-2xl p-4 ${isRtl ? 'pr-12' : 'pl-12'} text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 outline-none transition-all placeholder:text-stone-700`}
                                        placeholder={language === 'ar' ? 'أدخل اسمك بالكامل' : 'Your full name'}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <User className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-4' : 'left-4'} text-stone-600 group-focus-within:text-[#D4AF37] transition-colors`} size={20} />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="block text-[#C2B280] text-[11px] uppercase tracking-[0.2em] font-bold px-1 opacity-70">
                                {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                            </label>
                            <div className="group relative">
                                <input
                                    type="email"
                                    required
                                    className={`w-full bg-[#111] border border-stone-800 rounded-2xl p-4 ${isRtl ? 'pr-12' : 'pl-12'} text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 outline-none transition-all placeholder:text-stone-700`}
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <Mail className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-4' : 'left-4'} text-stone-600 group-focus-within:text-[#D4AF37] transition-colors`} size={20} />
                            </div>
                        </div>

                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="block text-[#C2B280] text-[11px] uppercase tracking-[0.2em] font-bold px-1 opacity-70">
                                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                                </label>
                                <div className="group relative">
                                    <input
                                        type="tel"
                                        required
                                        className={`w-full bg-[#111] border border-stone-800 rounded-2xl p-4 ${isRtl ? 'pr-12' : 'pl-12'} text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 outline-none transition-all placeholder:text-stone-700`}
                                        placeholder="01xxxxxxxxx"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                    <Phone className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-4' : 'left-4'} text-stone-600 group-focus-within:text-[#D4AF37] transition-colors`} size={20} />
                                </div>
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full relative group overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold py-5 rounded-2xl text-lg transition-all hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] active:scale-[0.98]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isLogin
                                        ? (language === 'ar' ? 'تسجيل الدخول' : 'Sign In Now')
                                        : (language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account')}
                                    <ArrowRight size={20} className={isRtl ? 'rotate-180' : ''} />
                                </span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                            </button>
                        </div>

                        <div className="text-center pt-2">
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-stone-500 hover:text-[#D4AF37] text-sm font-medium transition-all group"
                            >
                                {isLogin
                                    ? (language === 'ar' ? 'ليس لديك حساب؟ ' : "Don't have an account? ")
                                    : (language === 'ar' ? 'لديك حساب بالفعل؟ ' : "Already have an account? ")}
                                <span className="text-[#D4AF37] font-bold group-hover:underline">
                                    {isLogin
                                        ? (language === 'ar' ? 'سجل الآن' : 'Register Here')
                                        : (language === 'ar' ? 'سجل دخولك' : 'Login Here')}
                                </span>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
