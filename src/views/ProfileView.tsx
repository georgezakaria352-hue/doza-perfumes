import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Package, Calendar, Tag, User as UserIcon } from 'lucide-react';

export const ProfileView: React.FC = () => {
    const { user, orderHistory, logout } = useAuth();
    const { language, dir } = useLanguage();

    if (!user) return null;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-12 min-h-screen" dir={dir}>
            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 border border-[#D4AF37]/30 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <UserIcon size={160} className="text-[#D4AF37]" />
                </div>

                <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                    <UserIcon size={40} />
                </div>

                <div className="text-center md:text-left flex-1 space-y-2 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37]">{user.name}</h2>
                    <p className="text-stone-400 font-sans tracking-wide">{user.email}</p>
                    <p className="text-stone-500 text-sm">{user.phone}</p>
                </div>

                <button
                    onClick={logout}
                    className="px-6 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors font-bold text-sm"
                >
                    {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                </button>
            </motion.div>

            {/* Order History */}
            <div className="space-y-8">
                <h3 className="text-2xl font-serif text-[#D4AF37] border-b border-[#D4AF37]/20 pb-4 flex items-center gap-3">
                    <Package className="text-[#D4AF37]" />
                    {language === 'ar' ? 'تاريخ طلباتك' : 'Your Order History'}
                </h3>

                {orderHistory.length === 0 ? (
                    <div className="text-center py-20 bg-black/20 rounded-2xl border border-stone-800">
                        <Package size={48} className="mx-auto text-stone-700 mb-4" />
                        <p className="text-stone-500 font-serif text-xl italic">
                            {language === 'ar' ? 'لم تقم بأي طلبات بعد' : 'No orders yet.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {orderHistory.map((order) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-[#1a1a1a] border border-stone-800 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-colors group"
                            >
                                <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6">
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-center gap-4">
                                            <span className="bg-[#D4AF37]/10 text-[#FFD700] px-3 py-1 rounded-full text-xs font-bold border border-[#D4AF37]/30">
                                                {order.id}
                                            </span>
                                            <div className="flex items-center gap-2 text-stone-500 text-sm">
                                                <Calendar size={14} />
                                                {order.date}
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-3 text-stone-300">
                                                    <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                                                    <span className="flex-1 font-serif">{item.productName} ({item.size})</span>
                                                    <span className="text-stone-500">x{item.quantity}</span>
                                                    <span className="font-bold text-[#D4AF37]">{item.price * item.quantity} LE</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="md:border-l border-stone-800 md:pl-8 flex flex-col justify-center items-end gap-3">
                                        <div className="text-right">
                                            <p className="text-stone-500 text-xs uppercase tracking-widest">{language === 'ar' ? 'الإجمالي' : 'Total Amount'}</p>
                                            <p className="text-3xl font-serif font-bold text-[#FFD700]">{order.total} LE</p>
                                        </div>
                                        <span className={`px-4 py-1 rounded flex items-center gap-2 text-sm ${order.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                            <Tag size={14} />
                                            {order.status === 'confirmed' ? (language === 'ar' ? 'تم التأكيد' : 'Confirmed') : (language === 'ar' ? 'تم التوصيل' : 'Delivered')}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
