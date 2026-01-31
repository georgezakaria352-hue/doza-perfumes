import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Video, MessageCircle } from 'lucide-react';

export const ContactView: React.FC = () => {
    const socialLinks = [
        {
            icon: <MessageCircle size={32} />, // WhatsApp
            action: () => window.open('https://wa.me/201550363823', '_blank'),
            color: 'hover:text-green-500'
        },
        {
            icon: <Instagram size={32} />,
            action: () => window.open('https://www.instagram.com/doza_perfumes1', '_blank'),
            color: 'hover:text-pink-500'
        },
        {
            icon: <Facebook size={32} />,
            action: () => window.open('https://www.facebook.com/share/1AozQ5nqDz/', '_blank'),
            color: 'hover:text-blue-500'
        },
        {
            icon: <Video size={32} />, // TikTok (using Video icon as generic if TikTok not available in Lucide, or specific icon if available)
            action: () => window.open('https://www.tiktok.com/@doza.perfumes', '_blank'),
            color: 'hover:text-pink-400'
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-[#D4AF37] text-3xl font-serif mb-12 uppercase tracking-widest">Connect With Us</h2>

            <div className="flex gap-8 md:gap-12">
                {socialLinks.map((link, index) => (
                    <motion.button
                        key={index}
                        onClick={link.action}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-[#D4AF37] transition-colors duration-300 ${link.color}`}
                    >
                        {link.icon}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
