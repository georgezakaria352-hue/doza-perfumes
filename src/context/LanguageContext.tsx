import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'ar' | 'en';

interface Translations {
    title: string;
    subtitle: string;
    enterTemple: string;
    princesses: string;
    luxury: string;
    first_edition: string;
    simulation: string;
    price: string;
    footer: string;
    orderNow: string;
    governorate: string;
    city: string;
    address: string;
    phone: string;
    paymentMethod: string;
    instapay: string;
    cod: string; // Cash on Delivery
    submitOrder: string;
    requiredField: string;
    shipping: string;
    total: string;
    freeShipping: string;
    luxor: string;
    selectGov: string;
    selectCity: string;
    name: string;
    modalTitle: string;
    instaInstructions: string;
    addToCart: string;
    buyNow: string;
    cardPayment: string;
    cardNumber: string;
    expiryDate: string;
    cardHolder: string;
    cvv: string;
    bankVerify: string;
    otpSent: string;
    otpCode: string;
    verify: string;
    olfactoryPyramid: string;
    topNotes: string;
    midNotes: string;
    baseNotes: string;
    viewSecret: string;
    ingredients: string;
}

const translations: Record<Language, Translations> = {
    ar: {
        title: 'دوزا للعطور',
        subtitle: 'روح مصر القديمة',
        enterTemple: 'ادخل المعبد',
        princesses: 'مجموعة الأميرات',
        luxury: 'الإصدار الفاخر',
        first_edition: 'الإصدار الأول',
        simulation: 'محاكاة لـ',
        price: 'ج.م',
        footer: '© 2026 دوزا للعطور. أرواح قديمة، روائح عصرية.',
        orderNow: 'اطلب الآن',
        governorate: 'المحافظة',
        city: 'المركز / المدينة',
        address: 'العنوان بالتفصيل (رقم الشارع، العمارة، الشقة)',
        phone: 'رقم الهاتف',
        paymentMethod: 'طريقة الدفع',
        instapay: 'إنستا باي (Instapay)',
        cod: 'الدفع عند الاستلام',
        submitOrder: 'تأكيد الطلب',
        requiredField: 'هذا الحقل مطلوب',
        shipping: 'الشحن',
        total: 'الإجمالي',
        freeShipping: 'مجاناً',
        luxor: 'الأقصر',
        selectGov: 'اختر المحافظة',
        selectCity: 'اختر المركز',
        name: 'الاسم رباعي',
        modalTitle: 'بيانات الشحن',
        instaInstructions: 'بعد التحويل برجاء إرسال صورة الفاتورة على واتساب لتوكيد الحجز.\nيتم إلغاء الطلب تلقائياً إذا لم يتم التحويل خلال 24 ساعة.',
        addToCart: 'إضافة للسلة',
        buyNow: 'شراء الآن',
        cardPayment: 'بطاقة ائتمان / ميزة',
        cardNumber: 'رقم البطاقة',
        expiryDate: 'تاريخ الانتهاء (MM/YY)',
        cardHolder: 'اسم صاحب البطاقة',
        cvv: 'الرقم السري (CVV)',
        bankVerify: 'تأكيد البنك',
        otpSent: 'تم إرسال رمز التأكيد لهاتفك المسجل لدى البنك',
        otpCode: 'رمز التأكيد',
        verify: 'تأكيد',
        olfactoryPyramid: 'الهرم العطري',
        topNotes: 'الإفتتاحية (القمة)',
        midNotes: 'القلب (الأوسط)',
        baseNotes: 'القاعدة (الخاتمة)',
        viewSecret: 'اكتشف سر الرائحة',
        ingredients: 'المكونات العطرية'
    },
    en: {
        title: 'Doza Perfumes',
        subtitle: 'Royal Essence of Egypt',
        enterTemple: 'Enter The Temple',
        princesses: 'Princesses Collection',
        luxury: 'Luxury Edition',
        first_edition: 'First Edition',
        simulation: 'Inspired by',
        price: 'EGP',
        footer: '© 2026 Doza Perfumes. Ancient Souls, Modern Scents.',
        orderNow: 'Order Now',
        governorate: 'Governorate',
        city: 'City / Center',
        address: 'Detailed Address (Street, Building, Apt)',
        phone: 'Phone Number',
        paymentMethod: 'Payment Method',
        instapay: 'Instapay',
        cod: 'Cash on Delivery',
        submitOrder: 'Confirm Order',
        requiredField: 'This field is required',
        shipping: 'Shipping',
        total: 'Total',
        freeShipping: 'Free',
        luxor: 'Luxor',
        selectGov: 'Select Governorate',
        selectCity: 'Select City',
        name: 'Full Name',
        modalTitle: 'Shipping Details',
        instaInstructions: 'After transfer, please send the receipt on WhatsApp to confirm.\nOrders are auto-cancelled if transfer is not made within 24h.',
        addToCart: 'Add to Cart',
        buyNow: 'Buy It Now',
        cardPayment: 'Credit / Debit Card',
        cardNumber: 'Card Number',
        expiryDate: 'Expiry Date (MM/YY)',
        cardHolder: 'Cardholder Name',
        cvv: 'CVV',
        bankVerify: 'Bank Verification',
        otpSent: 'A verification code has been sent to your registered phone number.',
        otpCode: 'Verification Code',
        verify: 'Verify',
        olfactoryPyramid: 'Olfactory Pyramid',
        topNotes: 'Top Notes',
        midNotes: 'Heart Notes',
        baseNotes: 'Base Notes',
        viewSecret: 'Discover the Secret',
        ingredients: 'Aromatic Notes'
    }
};

interface LanguageContextType {
    language: Language;
    t: Translations;
    toggleLanguage: () => void;
    dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('ar');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
    };

    const dir = language === 'ar' ? 'rtl' : 'ltr';

    return (
        <LanguageContext.Provider value={{ language, t: translations[language], toggleLanguage, dir }}>
            <div dir={dir} className={language === 'ar' ? 'font-serif' : 'font-sans'}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
