export interface Governorate {
    id: string;
    ar: string;
    en: string;
    region: 'upper' | 'delta' | 'luxor';
    cities: { en: string; ar: string }[];
}

export const governorates: Governorate[] = [
    {
        id: 'luxor',
        ar: 'الأقصر',
        en: 'Luxor',
        region: 'luxor',
        cities: [
            { ar: 'الأقصر (المدينة)', en: 'Luxor City' },
            { ar: 'إسنا', en: 'Esna' },
            { ar: 'أرمنت', en: 'Armant' },
            { ar: 'القرنة', en: 'Al Qarna' },
            { ar: 'الطود', en: 'Al Tod' },
            { ar: 'البياضية', en: 'Al Bayadiyah' },
            { ar: 'الزينية', en: 'Al Ziniyah' },
        ]
    },
    {
        id: 'cairo',
        ar: 'القاهرة',
        en: 'Cairo',
        region: 'delta', // Treating Cairo as Delta/Lower Egypt for shipping pricing (Standard)
        cities: [
            { ar: 'مدينة نصر', en: 'Nasr City' },
            { ar: 'مصر الجديدة', en: 'Heliopolis' },
            { ar: 'التجمع الخامس', en: 'Fifth Settlement' },
            { ar: 'المعادي', en: 'Maadi' },
            { ar: 'وسط البلد', en: 'Downtown' },
            { ar: 'شبرا', en: 'Shoubra' },
            { ar: 'عين شمس', en: 'Ain Shams' },
            { ar: 'المطرية', en: 'El Matareya' },
            // Add more as generic...
        ]
    },
    {
        id: 'giza',
        ar: 'الجيزة',
        en: 'Giza',
        region: 'delta',
        cities: [
            { ar: 'الدقي', en: 'Dokki' },
            { ar: 'المهندسين', en: 'Mohandessin' },
            { ar: 'الهرم', en: 'Haram' },
            { ar: 'فيصل', en: 'Faisal' },
            { ar: '6 أكتوبر', en: '6th of October' },
            { ar: 'الشيخ زايد', en: 'Sheikh Zayed' },
        ]
    },
    {
        id: 'alexandria',
        ar: 'الإسكندرية',
        en: 'Alexandria',
        region: 'delta',
        cities: [
            { ar: 'سموحة', en: 'Smouha' },
            { ar: 'ميامي', en: 'Miami' },
            { ar: 'المنتزه', en: 'Montaza' },
            { ar: 'سيدي جابر', en: 'Sidi Gaber' },
            { ar: 'العجمي', en: 'Agami' },
        ]
    },
    {
        id: 'aswan',
        ar: 'أسوان',
        en: 'Aswan',
        region: 'upper',
        cities: [
            { ar: 'أسوان (المدينة)', en: 'Aswan City' },
            { ar: 'إدفو', en: 'Edfu' },
            { ar: 'كوم أمبو', en: 'Kom Ombo' },
            { ar: 'دراو', en: 'Daraw' },
            { ar: 'نصر النوبة', en: 'Nasr Al Nuba' },
        ]
    },
    {
        id: 'qena',
        ar: 'قنا',
        en: 'Qena',
        region: 'upper',
        cities: [
            { ar: 'قنا (المدينة)', en: 'Qena City' },
            { ar: 'نجع حمادي', en: 'Nag Hammadi' },
            { ar: 'قوص', en: 'Qus' },
            { ar: 'دشنا', en: 'Dishna' },
        ]
    },
    {
        id: 'sohag',
        ar: 'سوهاج',
        en: 'Sohag',
        region: 'upper',
        cities: [
            { ar: 'سوهاج (المدينة)', en: 'Sohag City' },
            { ar: 'جرجا', en: 'Girga' },
            { ar: 'طمـا', en: 'Tama' },
            { ar: 'المراغة', en: 'El Maragha' },
        ]
    },
    {
        id: 'assiut',
        ar: 'أسيوط',
        en: 'Assiut',
        region: 'upper',
        cities: [
            { ar: 'أسيوط (المدينة)', en: 'Assiut City' },
            { ar: 'ديروط', en: 'Dairut' },
            { ar: 'القوصية', en: 'El Qusiya' },
            { ar: 'منفلوط', en: 'Manfalut' },
        ]
    },
    // Adding generic handling for others to map to regions
    { id: 'minya', ar: 'المنيا', en: 'Minya', region: 'upper', cities: [] },
    { id: 'beni_suef', ar: 'بني سويف', en: 'Beni Suef', region: 'upper', cities: [] },
    { id: 'fayoum', ar: 'الفيوم', en: 'Fayoum', region: 'upper', cities: [] },
    { id: 'sharkia', ar: 'الشرقية', en: 'Sharkia', region: 'delta', cities: [] },
    { id: 'gharbia', ar: 'الغربية', en: 'Gharbia', region: 'delta', cities: [] },
    { id: 'dakahlia', ar: 'الدقهلية', en: 'Dakahlia', region: 'delta', cities: [] },
    { id: 'beheira', ar: 'البحيرة', en: 'Beheira', region: 'delta', cities: [] },
    { id: 'damietta', ar: 'دمياط', en: 'Damietta', region: 'delta', cities: [] },
    { id: 'port_said', ar: 'بورسعيد', en: 'Port Said', region: 'delta', cities: [] },
    { id: 'ismailia', ar: 'الإسماعيلية', en: 'Ismailia', region: 'delta', cities: [] },
    { id: 'suez', ar: 'السويس', en: 'Suez', region: 'delta', cities: [] },
    { id: 'red_sea', ar: 'البحر الأحمر', en: 'Red Sea', region: 'upper', cities: [] }, // Usually higher shipping, mapping to upper for now or needs custom
];

export const getShippingCost = (region: string): number => {
    switch (region) {
        case 'luxor': return 0;
        case 'upper': return 150;
        case 'delta': return 170;
        default: return 170;
    }
};
