import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AuthViewProps {
    onSuccess: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onSuccess }) => {
    const { login, signup } = useAuth();
    const { language, dir } = useLanguage();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            login({ name: 'Guest User', email: formData.email, phone: '01000000000', password: formData.password });
        } else {
            signup(formData);
        }
        onSuccess();
    };

    const isRtl = dir === 'rtl';

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[15%] w-[30%] h-[30%] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[15%] w-[30%] h-[30%] bg-[#D4AF37]/5 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-xl bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,1),0_0_50px_rgba(212,175,55,0.05)] overflow-hidden"
            >
                <div className="pt-16 pb-10 px-12 text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-[#D4AF37] to-[#8A6D3B] p-[1px] mb-8 shadow-[0_15px_40px_rgba(212,175,55,0.2)]">
                        <div className="w-full h-full bg-black rounded-[calc(1.8rem-1px)] flex items-center justify-center text-[#D4AF37]">
                            <Lock size={40} strokeWidth={1.5} />
                        </div>
                    </div>

                    <h1 className="text-[#D4AF37] text-4xl font-serif font-bold tracking-tight mb-4">
                        {isLogin
                            ? (language === 'ar' ? 'مملكة دوزا للعطور' : 'DOZA Perfumes Kingdom')
                            : (language === 'ar' ? 'انضم إلى المملكة' : 'Join the Kingdom')}
                    </h1>
                    <p className="text-stone-500 text-lg font-serif italic max-w-sm mx-auto">
                        {isLogin
                            ? (language === 'ar' ? 'سجل دخولك لتجربة عالم العطور الملكي' : 'Sign in to experience the world of regal fragrances')
                            : (language === 'ar' ? 'أنشئ حسابك للحصول على تجربة تسوق حصرية ومميزة' : 'Create your account for an exclusive and premium shopping experience')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="px-12 pb-16 space-y-8">
                    {!isLogin && (
                        <div className="space-y-3">
                            <label className="block text-[#C2B280] text-xs uppercase tracking-[0.25em] font-bold px-2 opacity-80">
                                {language === 'ar' ? 'الاسم بالكامل' : 'Full Name'}
                            </label>
                            <div className="group relative">
                                <input
                                    type="text"
                                    required
                                    className={`w-full bg-[#111] border border-stone-800 rounded-2xl p-5 ${isRtl ? 'pr-14' : 'pl-14'} text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 outline-none transition-all placeholder:text-stone-700 text-lg`}
                                    placeholder={language === 'ar' ? 'أدخل اسمك بالكامل' : 'Your full name'}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <User className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-5' : 'left-5'} text-stone-600 group-focus-within:text-[#D4AF37] transition-colors`} size={24} />
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="block text-[#C2B280] text-xs uppercase tracking-[0.25em] font-bold px-2 opacity-80">
                            {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                        </label>
                        <div className="group relative">
                            <input
                                type="email"
                                required
                                className={`w-full bg-[#111] border border-stone-800 rounded-2xl p-5 ${isRtl ? 'pr-14' : 'pl-14'} text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 outline-none transition-all placeholder:text-stone-700 text-lg`}
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <Mail className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-5' : 'left-5'} text-stone-600 group-focus-within:text-[#D4AF37] transition-colors`} size={24} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-[#C2B280] text-xs uppercase tracking-[0.25em] font-bold px-2 opacity-80">
                            {language === 'ar' ? 'كلمة المرور' : 'Password'}
                        </label>
                        <div className="group relative">
                            <input
                                type="password"
                                required
                                className={`w-full bg-[#111] border border-stone-800 rounded-2xl p-5 ${isRtl ? 'pr-14' : 'pl-14'} text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 outline-none transition-all placeholder:text-stone-700 text-lg`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <Lock className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-5' : 'left-5'} text-stone-600 group-focus-within:text-[#D4AF37] transition-colors`} size={24} />
                        </div>
                    </div>

                    {!isLogin && (
                        <div className="space-y-3">
                            <label className="block text-[#C2B280] text-xs uppercase tracking-[0.25em] font-bold px-2 opacity-80">
                                {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                            </label>
                            <div className="group relative">
                                <input
                                    type="tel"
                                    required
                                    className={`w-full bg-[#111] border border-stone-800 rounded-2xl p-5 ${isRtl ? 'pr-14' : 'pl-14'} text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 outline-none transition-all placeholder:text-stone-700 text-lg`}
                                    placeholder="01xxxxxxxxx"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <Phone className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-5' : 'left-5'} text-stone-600 group-focus-within:text-[#D4AF37] transition-colors`} size={24} />
                            </div>
                        </div>
                    )}

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full relative group overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold py-6 rounded-2xl text-xl transition-all hover:shadow-[0_15px_50px_rgba(212,175,55,0.4)] active:scale-[0.98] shadow-lg"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {isLogin
                                    ? (language === 'ar' ? 'تسجيل الدخول' : 'Sign In Now')
                                    : (language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account')}
                                <ArrowRight size={24} className={isRtl ? 'rotate-180' : ''} />
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                        </button>
                    </div>

                    <div className="text-center pt-4">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-stone-500 hover:text-[#D4AF37] text-md font-medium transition-all group"
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
    );
};
