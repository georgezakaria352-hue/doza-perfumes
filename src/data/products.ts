export interface Product {
  id: string;
  name: string;
  simulation: string;
  sizes: { size: string; price: number }[];
  collection: 'princesses' | 'luxury' | 'first_edition';
  notes?: {
    top: string[];
    mid: string[];
    base: string[];
  };
}

export const products: Product[] = [
  // ✨ مجموعة العطور الملكية للأميرات ✨
  {
    id: 'karma',
    name: 'كرما',
    simulation: 'بكرات روج (Baccarat Rouge)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Saffron', 'Jasmine'],
      mid: ['Amberwood', 'Ambergris'],
      base: ['Fir Resin', 'Cedar']
    }
  },
  {
    id: 'iza',
    name: 'إيزا',
    simulation: 'ليبر اف سان لوران (Libre YSL)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Lavender', 'Mandarin Orange', 'Black Currant'],
      mid: ['Lavender', 'Orange Blossom', 'Jasmine'],
      base: ['Madagascar Vanilla', 'Musk', 'Cedar', 'Ambergris']
    }
  },
  {
    id: 'not',
    name: 'نوت',
    simulation: 'سي باشون (Si Passione)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Pear', 'Black Currant', 'Pink Pepper', 'Grapefruit'],
      mid: ['Pineapple', 'Rose', 'Jasmine', 'Heliotrope'],
      base: ['Vanilla', 'Cedar', 'Patchouli', 'Amberwood']
    }
  },
  {
    id: 'mira',
    name: 'ميرا',
    simulation: 'ويك اند (Weekend)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Mignonette', 'Mandarin Orange', 'Sage'],
      mid: ['Nectarine', 'Blue Hyacinth', 'Peach Blossom', 'Rose Hip', 'Iris'],
      base: ['Musk', 'Sandalwood', 'Cedar']
    }
  },
  {
    id: 'naya',
    name: 'نايا',
    simulation: 'جود جيرل (Good Girl)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Almond', 'Coffee', 'Bergamot', 'Lemon'],
      mid: ['Jasmine Sambac', 'Tuberose', 'Orris', 'Rose', 'Orange Blossom'],
      base: ['Tonka Bean', 'Cocoa', 'Sandalwood', 'Vanilla', 'Praline', 'Cinnamon']
    }
  },
  {
    id: 'nefertiti',
    name: 'نفرتيتي',
    simulation: 'برادا انتنس (Prada Intense)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Pear', 'Neroli', 'Bergamot'],
      mid: ['Jasmine', 'Neroli Essence', 'Moss'],
      base: ['Bourbon Vanilla', 'Vanilla', 'Amber', 'Ambrofix']
    }
  },
  {
    id: 'tai',
    name: 'تاي',
    simulation: 'بيانكو لاتيه (Bianco Latte)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Caramel'],
      mid: ['Coumarin', 'Honey'],
      base: ['Vanilla', 'White Musk']
    }
  },
  {
    id: 'merit',
    name: 'مِريت',
    simulation: 'روز فانيليا (Roses Vanille)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Italian Lemon', 'Water Notes'],
      mid: ['Turkish Rose', 'Sugar'],
      base: ['Vanilla', 'Sugar', 'White Musk', 'Cedar']
    }
  },
  {
    id: 'vanora',
    name: 'فانورا',
    simulation: 'لابيل بارادايس جاردن (La Belle Paradise Garden)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Blue Lotus'],
      mid: ['Iris'],
      base: ['Vanilla']
    }
  },
  {
    id: 'kelora',
    name: 'كيلورا',
    simulation: 'سكاندل (Scandal)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Blood Orange', 'Mandarin Orange'],
      mid: ['Honey', 'Gardenia', 'Orange Blossom', 'Jasmine', 'Peach'],
      base: ['Beeswax', 'Caramel', 'Patchouli', 'Licorice']
    }
  },
  {
    id: 'tia',
    name: 'تيا',
    simulation: 'لافي بيل الكسير (La Vie Est Belle Elixir)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Raspberry', 'Liquor', 'Calabrian Bergamot'],
      mid: ['Violet Leaf', 'Rose'],
      base: ['Leather', 'Cacao Butter', 'Cedarwood']
    }
  },
  {
    id: 'cleopatra',
    name: 'كيلوباترا',
    simulation: 'بارا فانيلا (Bara Vanilla)',
    collection: 'princesses',
    sizes: [{ size: '30ml', price: 350 }],
    notes: {
      top: ['Vanilla Bean', 'Brown Sugar'],
      mid: ['Amber', 'Musk'],
      base: ['Woody Notes']
    }
  },

  // ✨ مجموعة العطور الملكية – الإصدار الفاخر ✨
  // ٣٠ مللي ٣٨٠ | ٥٠ مللي ٤٨٠ | ١٠٠ مللي ٩٠٠
  {
    id: 'neferhotep',
    name: 'نِفر حتب',
    simulation: 'عود أبيض (White Oud)',
    collection: 'luxury',
    sizes: [
      { size: '30ml', price: 380 },
      { size: '50ml', price: 480 },
      { size: '100ml', price: 900 }
    ],
    notes: {
      top: ['Artemisia', 'Bergamot'],
      mid: ['Patchouli', 'Pepper'],
      base: ['Oud', 'Amber', 'Musk']
    }
  },
  {
    id: 'onet',
    name: 'أونِت',
    simulation: 'واي سان لوران (YSL Y)',
    collection: 'luxury',
    sizes: [
      { size: '30ml', price: 380 },
      { size: '50ml', price: 480 },
      { size: '100ml', price: 900 }
    ],
    notes: {
      top: ['Apple', 'Ginger', 'Bergamot'],
      mid: ['Sage', 'Juniper Berries', 'Geranium'],
      base: ['Amberwood', 'Tonka Bean', 'Cedar', 'Vetiver', 'Olibanum']
    }
  },
  {
    id: 'ramses',
    name: 'رَمسيس',
    simulation: 'ليتون دي مارلي (Layton Parfums de Marly)',
    collection: 'luxury',
    sizes: [
      { size: '30ml', price: 380 },
      { size: '50ml', price: 480 },
      { size: '100ml', price: 900 }
    ],
    notes: {
      top: ['Apple', 'Lavender', 'Bergamot', 'Mandarin Orange'],
      mid: ['Geranium', 'Violet', 'Jasmine'],
      base: ['Vanilla', 'Cardamom', 'Sandalwood', 'Pepper', 'Patchouli', 'Guaiac Wood']
    }
  },
  {
    id: 'konir',
    name: 'كونير',
    simulation: 'انجل شير (Angels Share)',
    collection: 'luxury',
    sizes: [
      { size: '30ml', price: 380 },
      { size: '50ml', price: 480 },
      { size: '100ml', price: 900 }
    ],
    notes: {
      top: ['Cognac'],
      mid: ['Cinnamon', 'Tonka Bean', 'Oak'],
      base: ['Vanilla', 'Praline', 'Sandalwood']
    }
  },
  {
    id: 'khufu',
    name: 'خوفو',
    simulation: 'ديور هوم انتنس (Dior Homme Intense)',
    collection: 'luxury',
    sizes: [
      { size: '30ml', price: 380 },
      { size: '50ml', price: 480 },
      { size: '100ml', price: 900 }
    ],
    notes: {
      top: ['Lavender'],
      mid: ['Iris', 'Ambrette (Musk Mallow)', 'Pear'],
      base: ['Virginia Cedar', 'Vetiver']
    }
  },
  {
    id: 'nebamon',
    name: 'نِب آمون',
    simulation: 'نيشان هاشيفات (Nishane Hacivat)',
    collection: 'luxury',
    sizes: [
      { size: '30ml', price: 380 },
      { size: '50ml', price: 480 },
      { size: '100ml', price: 900 }
    ],
    notes: {
      top: ['Pineapple', 'Grapefruit', 'Bergamot'],
      mid: ['Cedar', 'Patchouli', 'Jasmine'],
      base: ['Oakmoss', 'Woody Notes']
    }
  },
  {
    id: 'nitro',
    name: 'نِترو',
    simulation: 'باسيفيك شيل (Pacific Chill)',
    collection: 'luxury',
    sizes: [
      { size: '30ml', price: 380 },
      { size: '50ml', price: 480 },
      { size: '100ml', price: 900 }
    ],
    notes: {
      top: ['Citron', 'Lemon', 'Orange', 'Mint', 'Black Currant', 'Coriander'],
      mid: ['Apricot', 'Basil', 'May Rose'],
      base: ['Fig', 'Dates', 'Ambrette']
    }
  },
  {
    id: 'renst',
    name: 'رِنست',
    simulation: 'إيربا بورا (Erba Pura)',
    collection: 'luxury',
    sizes: [
      { size: '30ml', price: 380 },
      { size: '50ml', price: 480 },
      { size: '100ml', price: 900 }
    ],
    notes: {
      top: ['Sicilian Orange', 'Calabrian Bergamot', 'Sicilian Lemon'],
      mid: ['Mediterranean Fruits'],
      base: ['Madagascar Vanilla', 'White Musk', 'Amber']
    }
  },
  {
    id: 'neter',
    name: 'نِتر',
    simulation: 'ليتون دي مارلي (Layton)',
    collection: 'luxury',
    sizes: [
      { size: '30ml', price: 380 },
      { size: '50ml', price: 480 },
      { size: '100ml', price: 900 }
    ],
    notes: {
      top: ['Apple', 'Lavender', 'Bergamot', 'Mandarin Orange'],
      mid: ['Geranium', 'Violet', 'Jasmine'],
      base: ['Vanilla', 'Cardamom', 'Sandalwood', 'Pepper', 'Patchouli', 'Guaiac Wood']
    }
  },
  {
    id: 'volatile',
    name: 'فولاتيل',
    simulation: 'خاص بالبراند (Doza Signature)',
    collection: 'luxury',
    sizes: [
      { size: '30ml', price: 380 },
      { size: '50ml', price: 480 },
      { size: '100ml', price: 900 }
    ],
    notes: {
      top: ['Rum', 'Tobacco', 'Saffron'],
      mid: ['Cinnamon', 'Vanilla', 'Sandalwood'],
      base: ['Tobacco', 'Vanilla', 'Sandalwood', 'Musk']
    }
  },

  // ✨ مجموعة العطور الملكية – الإصدار الأول ✨
  // ٣٠ مللي ٢٨٠ | ٥٠ مللي ٣٨٠ | ١٠٠ مللي ٧٠٠
  {
    id: 'atom',
    name: 'آتون',
    simulation: 'فيرزاتشي إيروس (Versace Eros)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Mint', 'Green Apple', 'Lemon'],
      mid: ['Tonka Bean', 'Ambroxan', 'Geranium'],
      base: ['Madagascar Vanilla', 'Virginian Cedar', 'Atlas Cedar', 'Vetiver', 'Oakmoss']
    }
  },
  {
    id: 'shu',
    name: 'شو',
    simulation: 'كول وتر بلو (Cool Water)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Sea Water', 'Lavender', 'Mint', 'Green Notes', 'Rosemary', 'Coriander'],
      mid: ['Sandalwood', 'Neroli', 'Geranium', 'Jasmine'],
      base: ['Musk', 'Oakmoss', 'Cedar', 'Tobacco', 'Ambergris']
    }
  },
  {
    id: 'serk',
    name: 'سِرِك',
    simulation: 'إنفكتوس (Invictus)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Sea Notes', 'Grapefruit', 'Mandarin Orange'],
      mid: ['Bay Leaf', 'Jasmine'],
      base: ['Ambergris', 'Guaiac Wood', 'Oakmoss', 'Patchouli']
    }
  },
  {
    id: 'ba',
    name: 'با',
    simulation: 'ألترا ميل (Ultra Male)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Pear', 'Lavender', 'Mint', 'Bergamot', 'Lemon'],
      mid: ['Cinnamon', 'Clary Sage', 'Caraway'],
      base: ['Black Vanilla Husk', 'Amber', 'Patchouli', 'Cedar']
    }
  },
  {
    id: 'iset_khe',
    name: 'إيسِت خِع',
    simulation: 'سلفر سنت (Silver Scent)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Orange Blossom', 'Lemon'],
      mid: ['Lavender', 'Nutmeg', 'Cardamom', 'Coriander', 'Geranium', 'Rosemary'],
      base: ['Litchi', 'Tonka Bean', 'Teak Wood', 'Vetiver']
    }
  },
  {
    id: 'seno',
    name: 'سِنو',
    simulation: 'دنهل (Dunhill)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Apple', 'Bergamot', 'Lemon', 'Neroli'],
      mid: ['Rose', 'Teak Wood', 'Patchouli'],
      base: ['Vanilla', 'Musk', 'Labdanum']
    }
  },
  {
    id: 'kain',
    name: 'كاين',
    simulation: 'جيمي شو (Jimmy Choo)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Mandarin Orange', 'Lavender', 'Honeydew Melon'],
      mid: ['Geranium', 'Patchouli', 'Pineapple Leaf', 'Pink Pepper'],
      base: ['Amber', 'Suede', 'Woody Notes']
    }
  },
  {
    id: 'golden_plus',
    name: 'جولدن بلس',
    simulation: 'سترونجر وذ يو (Stronger With You)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Cardamom', 'Pink Pepper', 'Violet Leaf', 'Mint'],
      mid: ['Pineapple', 'Sage', 'Melon', 'Lavender', 'Cinnamon'],
      base: ['Vanilla', 'Chestnut', 'Amberwood', 'Cedar', 'Guaiac Wood']
    }
  },
  {
    id: 'elysium',
    name: 'إليسيوم',
    simulation: 'بلاك ليكسيز (Black Xs)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Lemon', 'Sage'],
      mid: ['Praline', 'Cinnamon', 'Tolu Balsam', 'Black Cardamom'],
      base: ['Brazilian Rosewood', 'Patchouli', 'Black Amber']
    }
  },
  {
    id: 'nefru_breeze',
    name: 'نِفرو بريز',
    simulation: 'أكوا دي جيو (Acqua Di Gio)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Lime', 'Lemon', 'Bergamot', 'Jasmine', 'Orange', 'Mandarin Orange', 'Neroli'],
      mid: ['Sea Notes', 'Jasmine', 'Calone', 'Peach', 'Freesia', 'Cyclamen', 'Rose'],
      base: ['White Musk', 'Cedar', 'Oakmoss', 'Patchouli', 'Amber']
    }
  },
  {
    id: 'ozir',
    name: 'أوزير',
    simulation: 'بلو دي شانيل (Bleu de Chanel)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Lemon', 'Mint', 'Pink Pepper', 'Grapefruit'],
      mid: ['Ginger', 'Iso E Super', 'Nutmeg', 'Jasmine'],
      base: ['Labdanum', 'Sandalwood', 'Patchouli', 'Vetiver', 'Incense', 'Cedar', 'White Musk']
    }
  },
  {
    id: 'sobek',
    name: 'سوبك',
    simulation: 'فوياج (Voyage)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Green Leaves', 'Apple'],
      mid: ['Lotus', 'Mimosa'],
      base: ['Musk', 'Cedar', 'Oakmoss', 'Amber']
    }
  },
  {
    id: 'dja',
    name: 'دجا',
    simulation: 'إيماجينيشن (Imagination)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Citron', 'Bergamot', 'Orange'],
      mid: ['Ginger', 'Neroli', 'Cinnamon'],
      base: ['Black Tea', 'Ambroxan', 'Guaiac Wood', 'Olibanum']
    }
  },
  {
    id: 'ati',
    name: 'اتي',
    simulation: 'لومال الكسير (Le Male Elixir)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Lavender', 'Mint'],
      mid: ['Vanilla', 'Benzoin'],
      base: ['Honey', 'Tonka Bean', 'Tobacco']
    }
  },
  {
    id: 'ra_kemet',
    name: 'رَع كِمت',
    simulation: 'خَمره (Khamrah)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Cinnamon', 'Nutmeg', 'Bergamot'],
      mid: ['Dates', 'Praline', 'Tuberose', 'Lily of the Valley'],
      base: ['Vanilla', 'Tonka Bean', 'Amberwood', 'Myrrh', 'Benzoin', 'Akigalawood']
    }
  },
  {
    id: 'ra',
    name: 'رع',
    simulation: 'سبايس بومب اكستريم (Spicebomb Extreme)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Black Pepper', 'Grapefruit'],
      mid: ['Lavender', 'Cinnamon', 'Saffron', 'Cumin'],
      base: ['Tobacco', 'Vanilla', 'Bourbon', 'Amber']
    }
  },
  {
    id: 'neber',
    name: 'نِبِر',
    simulation: 'توم فورد بلاك أوركيد (Black Orchid)',
    collection: 'first_edition',
    sizes: [
      { size: '30ml', price: 280 },
      { size: '50ml', price: 380 },
      { size: '100ml', price: 700 }
    ],
    notes: {
      top: ['Truffle', 'Gardenia', 'Black Currant', 'Ylang-Ylang', 'Jasmine', 'Bergamot', 'Mandarin Orange', 'Lemon'],
      mid: ['Orchid', 'Spices', 'Fruity Notes', 'Lotus'],
      base: ['Mexican Chocolate', 'Patchouli', 'Vanilla', 'Incense', 'Amber', 'Sandalwood', 'Vetiver', 'White Musk']
    }
  }
];
