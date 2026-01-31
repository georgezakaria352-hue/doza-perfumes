import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, User as UserIcon, Volume2, VolumeX } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { AuthModal } from './AuthModal';

interface NavbarProps {
    currentView: 'home' | 'perfumes' | 'story' | 'contact' | 'profile' | 'auth';
    onNavigate: (view: any, subSection?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { user } = useAuth();
    const { isMuted, toggleMute } = useAudio();

    const handleMouseEnter = (id: string) => {
        if (id === 'perfumes') setActiveDropdown(id);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleMobileNavigate = (view: 'home' | 'perfumes' | 'story' | 'contact', subSection?: string) => {
        onNavigate(view, subSection);
        setIsMenuOpen(false);
    };

    const handleProfileClick = () => {
        if (user) {
            onNavigate('profile');
        } else {
            onNavigate('auth');
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-[#D4AF37]/20">
            <div className="flex items-center justify-between px-6 md:px-12 h-20 md:h-28 max-w-7xl mx-auto" dir="ltr">

                {/* Logo and Slogan - LEFT */}
                <div
                    className="flex flex-col items-center cursor-pointer z-20 shrink-0"
                    onClick={() => onNavigate('home')}
                >
                    <img
                        src="/doza-logo-new.png"
                        alt="Doza Logo"
                        className="h-14 md:h-24 w-auto object-contain"
                    />
                    <span
                        className="text-[10px] md:text-sm text-[#D4AF37] font-serif tracking-[0.15em] font-bold mt-1 whitespace-nowrap"
                        style={{
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        }}
                    >
                        أصل وحكاية العطور
                    </span>
                </div>

                {/* Desktop Links - RIGHT */}
                <div className="hidden md:flex items-center gap-10">
                    <ul className="flex items-center gap-10">
                        <li>
                            <button
                                onClick={() => onNavigate('home')}
                                className={`text-lg font-serif font-bold tracking-wider transition-all duration-300 ${currentView === 'home' ? 'text-[#FFD700] scale-110' : 'text-[#D4AF37] hover:text-[#FFD700] hover:scale-105'}`}
                            >
                                Home
                            </button>
                        </li>

                        <li
                            className="relative"
                            onMouseEnter={() => handleMouseEnter('perfumes')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                onClick={() => onNavigate('perfumes')}
                                className={`text-lg font-serif font-bold tracking-wider transition-all duration-300 flex items-center gap-1 ${currentView === 'perfumes' ? 'text-[#FFD700] scale-110' : 'text-[#D4AF37] hover:text-[#FFD700] hover:scale-105'}`}
                            >
                                Perfumes <ChevronDown size={14} />
                            </button>

                            <AnimatePresence>
                                {activeDropdown === 'perfumes' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden py-3 z-50 text-right"
                                    >
                                        <button onClick={() => onNavigate('perfumes', 'princesses')} className="block w-full text-right px-6 py-3 text-[#C2B280] hover:bg-[#D4AF37]/10 hover:text-[#FFD700] transition-colors font-serif border-b border-[#D4AF37]/10 last:border-0 text-sm tracking-wide">
                                            Queens & Goddesses
                                        </button>
                                        <button onClick={() => onNavigate('perfumes', 'luxury')} className="block w-full text-right px-6 py-3 text-[#C2B280] hover:bg-[#D4AF37]/10 hover:text-[#FFD700] transition-colors font-serif border-b border-[#D4AF37]/10 last:border-0 text-sm tracking-wide">
                                            Gods & Pharaohs
                                        </button>
                                        <button onClick={() => onNavigate('perfumes', 'first_edition')} className="block w-full text-right px-6 py-3 text-[#C2B280] hover:bg-[#D4AF37]/10 hover:text-[#FFD700] transition-colors font-serif text-sm tracking-wide">
                                            Rituals of Power
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>

                        <li>
                            <button
                                onClick={() => onNavigate('story')}
                                className={`text-lg font-serif font-bold tracking-wider transition-all duration-300 ${currentView === 'story' ? 'text-[#FFD700] scale-110' : 'text-[#D4AF37] hover:text-[#FFD700] hover:scale-105'}`}
                            >
                                Our Story
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => onNavigate('contact')}
                                className={`text-lg font-serif font-bold tracking-wider transition-all duration-300 ${currentView === 'contact' ? 'text-[#FFD700] scale-110' : 'text-[#D4AF37] hover:text-[#FFD700] hover:scale-105'}`}
                            >
                                Contact
                            </button>
                        </li>

                        <li className="ml-4 pl-4 border-l border-[#D4AF37]/20 flex items-center gap-4">
                            {/* Audio Toggle */}
                            <button
                                onClick={toggleMute}
                                className="text-[#D4AF37] hover:text-[#FFD700] p-2 transition-all hover:scale-110"
                                title={isMuted ? 'Unmute' : 'Mute'}
                            >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>

                            <button
                                onClick={handleProfileClick}
                                className={`flex items-center gap-2 text-lg font-serif font-bold tracking-wider transition-all duration-300 px-5 py-2 rounded-full border border-[#D4AF37]/30 ${currentView === 'profile' ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#FFD700]'}`}
                            >
                                <UserIcon size={18} />
                                {user ? (user.name.split(' ')[0]) : 'Profile'}
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu Button - Right on mobile */}
                <div className="md:hidden">
                    <button
                        className="text-[#D4AF37] p-2"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-[#0d0d0d] border-t border-[#D4AF37]/20 overflow-hidden"
                    >
                        <ul className="flex flex-col py-6 px-8 gap-6 text-right" dir="rtl">
                            <li>
                                <button
                                    onClick={() => handleMobileNavigate('home')}
                                    className={`w-full text-right text-lg font-serif font-bold ${currentView === 'home' ? 'text-[#FFD700]' : 'text-[#D4AF37]'}`}
                                >
                                    الرئيسية
                                </button>
                            </li>
                            <li className="border-t border-[#D4AF37]/10 pt-6">
                                <span className={`text-lg font-serif font-bold mb-4 block ${currentView === 'perfumes' ? 'text-[#FFD700]' : 'text-[#D4AF37]'}`}>
                                    العطور
                                </span>
                                <div className="flex flex-col gap-4 pr-4">
                                    <button onClick={() => handleMobileNavigate('perfumes', 'princesses')} className="text-right text-[#C2B280] hover:text-[#FFD700] font-serif text-md">Queens & Goddesses</button>
                                    <button onClick={() => handleMobileNavigate('perfumes', 'luxury')} className="text-right text-[#C2B280] hover:text-[#FFD700] font-serif text-md">Gods & Pharaohs</button>
                                    <button onClick={() => handleMobileNavigate('perfumes', 'first_edition')} className="text-right text-[#C2B280] hover:text-[#FFD700] font-serif text-md">Rituals of Power</button>
                                </div>
                            </li>
                            <li className="border-t border-[#D4AF37]/10 pt-6">
                                <button
                                    onClick={() => handleMobileNavigate('story')}
                                    className={`w-full font-serif font-bold text-lg text-right ${currentView === 'story' ? 'text-[#FFD700]' : 'text-[#D4AF37]'}`}
                                >
                                    قصتنا
                                </button>
                            </li>
                            <li className="border-t border-[#D4AF37]/10 pt-6">
                                <button
                                    onClick={() => handleMobileNavigate('contact')}
                                    className={`w-full font-serif font-bold text-lg text-right ${currentView === 'contact' ? 'text-[#FFD700]' : 'text-[#D4AF37]'}`}
                                >
                                    اتصل بنا
                                </button>
                            </li>
                            <li className="border-t border-[#D4AF37]/10 pt-6">
                                <button
                                    onClick={() => { handleProfileClick(); setIsMenuOpen(false); }}
                                    className={`w-full font-serif font-bold text-lg text-right ${currentView === 'profile' ? 'text-[#FFD700]' : 'text-[#D4AF37]'}`}
                                >
                                    {user ? 'حسابي' : 'تسجيل الدخول'}
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </nav>
    );
};
