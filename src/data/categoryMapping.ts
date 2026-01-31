// Product import removed to avoid type-as-value errors
export interface CategorySection {
    id: string;
    titleEn: string;
    titleAr: string;
    originalCollectionIds: string[]; // Maps to 'princesses', 'luxury', etc.
}

export const perfumeCategories: CategorySection[] = [
    {
        id: 'queens',
        titleEn: 'Queens & Goddesses',
        titleAr: 'حريمي',
        originalCollectionIds: ['princesses']
    },
    {
        id: 'gods',
        titleEn: 'Gods & Pharaohs',
        titleAr: 'رجالي', // Assuming a standard counterpart, or just use English as primary if Arabic not specified for this one
        originalCollectionIds: ['first_edition']
    },
    {
        id: 'rituals',
        titleEn: 'Rituals of Power',
        titleAr: 'طقوس القوة',
        originalCollectionIds: ['luxury']
    }
];
