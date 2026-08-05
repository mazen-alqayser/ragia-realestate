// ============================================================// RAGIA Real Estate - Comprehensive Sudan Data & Property Listings
// ============================================================

export interface Property {
  id: string;
  img: string;
  type: { ar: string; en: string };
  title: { ar: string; en: string };
  loc: { ar: string; en: string };
  city: string;
  region: string;
  price: { ar: string; en: string };
  beds?: number;
  baths?: number;
  area?: string;
  features?: string[];
}

export interface SudanCity {
  name: string;
  nameAr: string;
  state: string;
  stateAr: string;
  areas: { name: string; nameAr: string }[];
  description: { ar: string; en: string };
  propertyCount: number;
}

export interface Service {
  icon: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  features: { ar: string; en: string }[];
}

export interface Testimonial {
  name: string;
  role: { ar: string; en: string };
  text: { ar: string; en: string };
  rating: number;
  avatar: string;
}

export interface Country {
  name: { ar: string; en: string };
  flag: string;
  cities: string;
  propertyTypes: string[];
}

// ============================================================
// SUDAN CITIES & REGIONS (Comprehensive)
// ============================================================
export const sudanCities: SudanCity[] = [
  {
    name: "Khartoum",
    nameAr: "الخرطوم",
    state: "Khartoum State",
    stateAr: "ولاية الخرطوم",
    areas: [
      { name: "Al Amarat", nameAr: " العمارات" },
      { name: "Al Riyadh", nameAr: "الرياض" },
      { name: "Al Sahafah", nameAr: "الصحافة" },
      { name: "Al Manshiya", nameAr: "المنشية" },
      { name: "Al Mamoura", nameAr: "المعموره" },
      { name: "Al Matar", nameAr: "المطار " },
      { name: "Kafouri", nameAr: "كافوري" },
      { name: "Green Village", nameAr: "الوادي الأخضر" },
      { name: "All part of Khartoum", nameAr: "[جميع انحاء الخرطوم]" },
      { name: "Arkaweet", nameAr: "أركويت" },
      { name: "Al Fitihab", nameAr: "الفتيحاب" },
      { name: "Deim", nameAr: "الديم" },
    ],
    description: {
      ar: "العاصمة الوطنية وقلب الحياة الاقتصادية والتجارية في السودان، تضم أرقى الأحياء السكنية والتجارية وأهم المرافق الحكومية والدبلوماسية.",
      en: "The national capital and economic heart of Sudan, home to the most prestigious residential and commercial districts and key government and diplomatic facilities.",
    },
    propertyCount: 450,
  },
  {
    name: "Omdurman",
    nameAr: "أم درمان",
    state: "Khartoum State",
    stateAr: "ولاية الخرطوم",
    areas: [
      { name: "Al Thawra", nameAr: "الثورة" },
      { name: "Al Muhandiseen", nameAr: "المهندسين" },
      { name: "Al Wadi", nameAr: "الوادي" },
      { name: "Al Baladiya", nameAr: "البلدية" },
      { name: "Karrari", nameAr: "كرري" },
      { name: "Um Badda", nameAr: "أم بدة" },
      { name: "Al Daraja", nameAr: "الدرجة" },
    ],
    description: {
      ar: "أكبر مدينة في السودان من حيث عدد السكان، عاصمة التراث الثقافي والصوفي، تتميز بأسواقها الشعبية وأحيائها التاريخية العريقة.",
      en: "Sudan's most populous city, the capital of cultural and Sufi heritage, known for its traditional markets and historic neighborhoods.",
    },
    propertyCount: 380,
  },
  {
    name: "Khartoum North",
    nameAr: "الخرطوم بحري",
    state: "Khartoum State",
    stateAr: "ولاية الخرطوم",
    areas: [
      { name: "Al Shargia", nameAr: "الشرقية" },
      { name: "Al Gharbia", nameAr: "الغربية" },
      { name: "Halfaya", nameAr: "الحلفاية" },
      { name: "Kafouri", nameAr: "كافوري" },
      { name: "Shambat", nameAr: "شمبات" },
      { name: "Bahri", nameAr: "بحري الكبري" },
    ],
    description: {
      ar: "المدينة الصناعية الأولى في السودان، تضم المصانع الكبرى والمناطق الصناعية إضافة إلى أحياء سكنية حديثة ومتطورة.",
      en: "Sudan's primary industrial city, home to major factories and industrial zones as well as modern residential neighborhoods.",
    },
    propertyCount: 320,
  },
  {
    name: "Port Sudan",
    nameAr: "بورتسودان",
    state: "Red Sea State",
    stateAr: "ولاية البحر الأحمر",
    areas: [
      { name: "Al Jazeera", nameAr: "الجزيرة" },
      { name: "Al Salam", nameAr: "السلام" },
      { name: "Port Area", nameAr: "منطقة الميناء" },
    ],
    description: {
      ar: "عاصمة ولاية البحر الأحمر والميناء الرئيسي للسودان على البحر الأحمر، مدينة تجارية وساحلية ذات أهمية استراتيجية كبرى.",
      en: "Capital of Red Sea State and Sudan's main port on the Red Sea, a commercial and coastal city of strategic importance.",
    },
    propertyCount: 150,
  },
  {
    name: "Kassala",
    nameAr: "كسلا",
    state: "Kassala State",
    stateAr: "ولاية كسلا",
    areas: [
      { name: "Al Khatmiya", nameAr: "الختمية" },
      { name: "Al Matar", nameAr: "المطار" },
    ],
    description: {
      ar: "مدينة جبلية ساحرة تقع عند سفوح جبال تُبُقت، تتميز بطبيعتها الخلابة وتجارتها الحدودية مع إريتريا.",
      en: "A charming mountain city at the foot of the Tubaq mountains, known for its stunning nature and cross-border trade with Eritrea.",
    },
    propertyCount: 95,
  },
  {
    name: "El Obeid",
    nameAr: "الأبيض",
    state: "North Kordofan State",
    stateAr: "ولاية شمال كردفان",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
      { name: "Al Gardeed", nameAr: "الجديد" },
    ],
    description: {
      ar: "عاصمة ولاية شمال كردفان وأهم مدن وسط السودان، مركز تجاري وزراعي كبير يقع على طريق التجارة بين الشمال والجنوب.",
      en: "Capital of North Kordofan and a major central Sudan city, an important commercial and agricultural center on the north-south trade route.",
    },
    propertyCount: 110,
  },
  {
    name: "Nyala",
    nameAr: "نيالا",
    state: "South Darfur State",
    stateAr: "ولاية جنوب دارفور",
    areas: [
      { name: "Al Nour", nameAr: "النور" },
      { name: "Al Jazeera", nameAr: "الجزيرة" },
    ],
    description: {
      ar: "أكبر مدينة في إقليم دارفور وعاصمة ولاية جنوب دارفور، مركز تجاري وزراعي حيوي في غرب السودان.",
      en: "The largest city in the Darfur region and capital of South Darfur State, a vital commercial and agricultural center in western Sudan.",
    },
    propertyCount: 85,
  },
  {
    name: "Al Fashir",
    nameAr: "الفاشر",
    state: "North Darfur State",
    stateAr: "ولاية شمال دارفور",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
    ],
    description: {
      ar: "عاصمة ولاية شمال دارفور، مدينة تاريخية عريقة كانت عاصمة سلطنة دارفور القديمة.",
      en: "Capital of North Darfur State, a historic city that was the capital of the ancient Darfur Sultanate.",
    },
    propertyCount: 70,
  },
  {
    name: "Wad Madani",
    nameAr: "واد مدني",
    state: "Al Jazirah State",
    stateAr: "ولاية الجزيرة",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
      { name: "Al Shirqiyya", nameAr: "الشرقية" },
      { name: "Al Rimal", nameAr: "الرمال" },
    ],
    description: {
      ar: "عاصمة ولاية الجزيرة وأهم مدن السودان الزراعية، تقع في قلب مشروع الجزيرة الزراعي الأكبر في أفريقيا.",
      en: "Capital of Al Jazirah State and Sudan's most important agricultural city, located in the heart of Africa's largest irrigation project.",
    },
    propertyCount: 180,
  },
  {
    name: "Atbara",
    nameAr: "عطبرة",
    state: "River Nile State",
    stateAr: "ولاية نهر النيل",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
      { name: "Al Railway", nameAr: "حي السكة حديد" },
    ],
    description: {
      ar: "مدينة الحديد والنار، عاصمة ولاية نهر النيل، تتميز بتاريخها العمالي وموقعها الاستراتيجي عند التقاء النيل الأزرق والنيل الأبيض.",
      en: "The City of Iron and Fire, capital of River Nile State, known for its labor history and strategic location at the confluence of the Blue and White Nile.",
    },
    propertyCount: 90,
  },
  {
    name: "Dongola",
    nameAr: "دنقلا",
    state: "Northern State",
    stateAr: "الولاية الشمالية",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
    ],
    description: {
      ar: "عاصمة الولاية الشمالية، مدينة تاريخية تقع على ضفاف النيل وتتميز بمناخها المعتدل وآثارها النوبية القديمة.",
      en: "Capital of the Northern State, a historic city on the banks of the Nile known for its temperate climate and ancient Nubian ruins.",
    },
    propertyCount: 65,
  },
  {
    name: "Sennar",
    nameAr: "سنار",
    state: "Sennar State",
    stateAr: "ولاية سنار",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
    ],
    description: {
      ar: "مدينة تاريخية ذات أهمية كبيرة، تقع على الضفة الغربية للنيل الأزرق وتضم آثار المملكة السنارية القديمة.",
      en: "A historically significant city on the west bank of the Blue Nile, home to ancient Sennar Kingdom ruins.",
    },
    propertyCount: 75,
  },
  {
    name: "El Damer",
    nameAr: "الدامر",
    state: "River Nile State",
    stateAr: "ولاية نهر النيل",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
    ],
    description: {
      ar: "مدينة زراعية وتجارية مهمة في ولاية نهر النيل، تقع على ضفاف النيل وتعرف بإنتاجها الزراعي المتنوع.",
      en: "An important agricultural and commercial city in River Nile State, located on the Nile banks with diverse crop production.",
    },
    propertyCount: 55,
  },
  {
    name: "Kosti",
    nameAr: "كوستي",
    state: "White Nile State",
    stateAr: "ولاية النيل الأبيض",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
    ],
    description: {
      ar: "عاصمة ولاية النيل الأبيض ومدينة نهرية مهمة تقع على الضفة الشرقية للنيل الأبيض، مركز تجاري رئيسي.",
      en: "Capital of White Nile State, an important river city on the east bank of the White Nile and a major commercial hub.",
    },
    propertyCount: 80,
  },
  {
    name: "Al Qadarif",
    nameAr: "القضارف",
    state: "Al Qadarif State",
    stateAr: "ولاية القضارف",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
    ],
    description: {
      ar: "عاصمة ولاية القضارف ومركز زراعي بامتياز، تُعرف بإنتاجها الوفير من الذرة والسمسم والفول السوداني.",
      en: "Capital of Al Qadarif State and an agricultural center known for its abundant production of sorghum, sesame, and peanuts.",
    },
    propertyCount: 70,
  },
  {
    name: "Ed Daein",
    nameAr: "الدائن",
    state: "East Darfur State",
    stateAr: "ولاية شرق دارفور",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
    ],
    description: {
      ar: "عاصمة ولاية شرق دارفور، مدينة ناشئة تتميز بموقعها التجاري بين ولايات دارفور.",
      en: "Capital of East Darfur State, a growing city known for its commercial location between Darfur states.",
    },
    propertyCount: 45,
  },
  {
    name: "Zalingei",
    nameAr: "زالنجي",
    state: "Central Darfur State",
    stateAr: "ولاية وسط دارفور",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
    ],
    description: {
      ar: "عاصمة ولاية وسط دارفور، تقع في قلب إقليم دارفور وتعد مركزاً إدارياً وتجارياً مهماً.",
      en: "Capital of Central Darfur State, located in the heart of the Darfur region as an important administrative and commercial center.",
    },
    propertyCount: 40,
  },
  {
    name: "Al Fula",
    nameAr: "الفولة",
    state: "West Kordofan State",
    stateAr: "ولاية غرب كردفان",
    areas: [
      { name: "Al Madina", nameAr: "المدينة" },
    ],
    description: {
      ar: "عاصمة ولاية غرب كردفان، مدينة زراعية ورعوية تقع في منطقة غنية بالموارد الطبيعية.",
      en: "Capital of West Kordofan State, an agricultural and pastoral city in a resource-rich region.",
    },
    propertyCount: 35,
  },
];

// ============================================================
// PROPERTIES DATA (Comprehensive)
// ============================================================
export const propertiesData: Property[] = [
  {
    id: "1",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2070",
    type: { ar: "فلة فاخرة", en: "Luxury Villa" },
    title: { ar: "قصر ملكي فاخر - الخرطوم", en: "Royal Luxury Palace - Khartoum" },
    loc: { ar: "الخرطوم - حي المطار", en: "Khartoum - Al Matar" },
    city: "Khartoum",
    region: "khartoum",
    price: { ar: "يُطلب", en: "Price on Request" },
    beds: 7,
    baths: 5,
    area: "850 م²",
    features: ["مسبح", "حديقة", "مرآب", "مراقبة"],
  },
  {
    id: "2",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000",
    type: { ar: "شقة فخمة", en: "Luxury Apartment" },
    title: { ar: "شقة تمليك فاخرة - الرياض", en: "Luxury Ownership Apartment - Riyadh" },
    loc: { ar: "الخرطوم - حي الرياض", en: "Khartoum - Al Riyadh" },
    city: "Khartoum",
    region: "khartoum",
    price: { ar: "ج.س", en: " SDG" },
    beds: 4,
    baths: 3,
    area: "320 م²",
    features: ["تشطيب سوبر لوكس", "إطلالة نهرية"],
  },
  {
    id: "3",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
    type: { ar: "برج سكني", en: "Residential Tower" },
    title: { ar: "برج سكني متكامل - أم درمان", en: "Integrated Residential Tower - Omdurman" },
    loc: { ar: "أم درمان - المهندسين", en: "Omdurman - Al Muhandiseen" },
    city: "Omdurman",
    region: "khartoum",
    price: { ar: "استثمار", en: "Investment" },
    beds: 8,
    baths: 6,
    area: "1200 م²",
    features: ["مصعد", "أمن ٢٤ ساعة", "مسبح"],
  },
  {
    id: "4",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070",
    type: { ar: "أرض سكنية", en: "Residential Land" },
    title: { ar: "قطعة أرض سكنية - كافوري", en: "Residential Land Plot - Kafouri" },
    loc: { ar: "الخرطوم - كافوري", en: "Khartoum - Kafouri" },
    city: "Khartoum",
    region: "khartoum",
    price: { ar: " ج.س", en: " SDG" },
    area: "600 م²",
    features: ["مخطط معتمد", "شوارع معبدة"],
  },
  {
    id: "5",
    img: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=80&w=2070",
    type: { ar: "مزرعة", en: "Farm" },
    title: { ar: "مزرعة زراعية شاملة - واد مدني", en: "Comprehensive Agricultural Farm - Wad Madani" },
    loc: { ar: "واد مدني - الشرابية", en: "Wad Madani - Al Sharqiya" },
    city: "Wad Madani",
    region: "al-jazirah",
    price: { ar: " ج.س", en: " SDG" },
    area: "50 فدان",
    features: ["آبار ارتوازية", "معدات زراعية"],
  },
  {
    id: "6",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075",
    type: { ar: "فلة", en: "Villa" },
    title: { ar: "فلة حديثة - عطبرة", en: "Modern Villa - Atbara" },
    loc: { ar: "عطبرة - المدينة", en: "Atbara - City Center" },
    city: "Atbara",
    region: "river-nile",
    price: { ar: " ج.س", en: " SDG" },
    beds: 5,
    baths: 4,
    area: "450 م²",
    features: ["تصميم عصري", "حديقة خاصة"],
  },
  {
    id: "7",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
    type: { ar: "شقة تمليك", en: "Ownership Apartment" },
    title: { ar: "شقة تمليك فاخرة - بورتسودان", en: "Luxury Apartment - Port Sudan" },
    loc: { ar: "بورتسودان - الجزيرة", en: "Port Sudan - Al Jazeera" },
    city: "Port Sudan",
    region: "red-sea",
    price: { ar: ", ج.س", en: " SDG" },
    beds: 3,
    baths: 2,
    area: "220 م²",
    features: ["إطلالة بحرية", "تشطيب سوبر"],
  },
  {
    id: "8",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    type: { ar: "عمارة سكنية", en: "Residential Building" },
    title: { ar: "عمارة سكنية - الخرطوم بحري", en: "Residential Building - Khartoum North" },
    loc: { ar: "الخرطوم بحري - الشرقية", en: "Khartoum North - Al Shargia" },
    city: "Khartoum North",
    region: "khartoum",
    price: { ar: "يُطلب", en: "Price on Request" },
    beds: 12,
    baths: 8,
    area: "2000 م²",
    features: ["شقق متعددة", "مصعد", "مرآب"],
  },
  {
    id: "9",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070",
    type: { ar: "أرض تجارية", en: "Commercial Land" },
    title: { ar: "أرض تجارية - الأبيض", en: "Commercial Land - El Obeid" },
    loc: { ar: "الأبيض - الجديد", en: "El Obeid - Al Gardeed" },
    city: "El Obeid",
    region: "north-kordofan",
    price: { ar: " ج.س", en: " SDG" },
    area: "800 م²",
    features: ["واجهة شارع رئيسي", "مخطط تجاري"],
  },
  {
    id: "10",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084",
    type: { ar: "فلة فاخرة", en: "Luxury Villa" },
    title: { ar: "فلة سوبر لوكس - نيالا", en: "Super Luxury Villa - Nyala" },
    loc: { ar: "نيالا - النور", en: "Nyala - Al Nour" },
    city: "Nyala",
    region: "south-darfur",
    price: { ar: "250,000,000 ج.س", en: "250M SDG" },
    beds: 6,
    baths: 4,
    area: "500 م²",
    features: ["مسبح", "حديقة", "نظام أمني"],
  },
  {
    id: "11",
    img: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070",
    type: { ar: "مزرعة", en: "Farm" },
    title: { ar: "مزرعة ماشية - كوستي", en: "Livestock Farm - Kosti" },
    loc: { ar: "كوستي - المدينة", en: "Kosti - City" },
    city: "Kosti",
    region: "white-nile",
    price: { ar: "200,000,000 ج.س", en: "200M SDG" },
    area: "30 فدان",
    features: ["حظائر", "آبار", "مراعي"],
  },
  {
    id: "12",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070",
    type: { ar: "شقة", en: "Apartment" },
    title: { ar: "شقة عائلية - كسلا", en: "Family Apartment - Kassala" },
    loc: { ar: "كسلا - الختمية", en: "Kassala - Al Khatmiya" },
    city: "Kassala",
    region: "kassala",
    price: { ar: "95,000,000 ج.س", en: "95M SDG" },
    beds: 3,
    baths: 2,
    area: "180 م²",
    features: ["قرب الجبل", "هواء نقي"],
  },
];

// ============================================================
// SERVICES DATA
// ============================================================
export const servicesData: Service[] = [
  {
    icon: "Building2",
    title: { ar: "بيع العقارات", en: "Property Sales" },
    description: {
      ar: "نبيع لك عقارك بأعلى سعر ممكن من خلال شبكتنا الواسعة من المشترين المحليين والدوليين واستراتيجيات التسويق المتقدمة.",
      en: "We sell your property at the highest possible price through our extensive network of local and international buyers and advanced marketing strategies.",
    },
    features: [
      { ar: "تقييم دقيق للعقار", en: "Accurate property valuation" },
      { ar: "تسويق مستهدف", en: "Targeted marketing" },
      { ar: "تفاوض احترافي", en: "Professional negotiation" },
      { ar: "إتمام الصفقات بسرعة", en: "Fast deal closing" },
    ],
  },
  {
    icon: "Home",
    title: { ar: "شراء العقارات", en: "Property Purchase" },
    description: {
      ar: "نساعدك في العثور على العقار المثالي من بين آلاف الخيارات المتاحة، مع ضمان شرعية الملكية وأفضل الأسعار.",
      en: "We help you find the perfect property from thousands of available options, ensuring ownership legality and the best prices.",
    },
    features: [
      { ar: "بحث شامل عن العقارات", en: "Comprehensive property search" },
      { ar: "فحص قانوني دقيق", en: "Thorough legal verification" },
      { ar: "استشارة تمويلية", en: "Financing consultation" },
      { ar: "مرافقة حتى التسليم", en: "Accompaniment until delivery" },
    ],
  },
  {
    icon: "MessageSquare",
    title: { ar: "الاستشارات العقارية", en: "Real Estate Consulting" },
    description: {
      ar: "فريق من الخبراء المتخصصين يقدمون استشارات شاملة تغطي الجوانب القانونية والمالية والاستثمارية.",
      en: "A team of specialized experts provides comprehensive consulting covering legal, financial, and investment aspects.",
    },
    features: [
      { ar: "تحليل السوق العقاري", en: "Real estate market analysis" },
      { ar: "دراسة الجدوى", en: "Feasibility study" },
      { ar: "تخطيط الاستثمار", en: "Investment planning" },
      { ar: "نصائح ضريبية", en: "Tax advice" },
    ],
  },
  {
    icon: "Settings",
    title: { ar: "إدارة العقارات", en: "Property Management" },
    description: {
      ar: "نتولى إدارة عقاراتك بالكامل من الصيانة والتأجير وجمع الإيجارات وتقديم التقارير الدورية.",
      en: "We manage your properties entirely from maintenance and renting to rent collection and periodic reporting.",
    },
    features: [
      { ar: "صيانة دورية", en: "Regular maintenance" },
      { ar: "إدارة المستأجرين", en: "Tenant management" },
      { ar: "جمع الإيجارات", en: "Rent collection" },
      { ar: "تقارير مالية شهرية", en: "Monthly financial reports" },
    ],
  },
  {
    icon: "TrendingUp",
    title: { ar: "الاستثمار العقاري", en: "Real Estate Investment" },
    description: {
      ar: "نقدم فرص استثمارية عقارية مختارة بعناية في السودان ومصر والإمارات والسعودية بضمانات عوائد مجزية.",
      en: "We offer carefully selected real estate investment opportunities in Sudan, Egypt, UAE, and Saudi Arabia with guaranteed profitable returns.",
    },
    features: [
      { ar: "فرص استثمارية حصرية", en: "Exclusive investment opportunities" },
      { ar: "تحليل المخاطر", en: "Risk analysis" },
      { ar: "تنويع المحفظة", en: "Portfolio diversification" },
      { ar: "متابعة العوائد", en: "Returns tracking" },
    ],
  },
  {
    icon: "FileText",
    title: { ar: "الخدمات القانونية", en: "Legal Services" },
    description: {
      ar: "فريق قانوني متخصص يضمن لك سلامة جميع المعاملات العقارية من التسجيل حتى نقل الملكية.",
      en: "A specialized legal team ensures the safety of all real estate transactions from registration to title transfer.",
    },
    features: [
      { ar: "توثيق العقود", en: "Contract documentation" },
      { ar: "نقل الملكية", en: "Title transfer" },
      { ar: "حل النزاعات", en: "Dispute resolution" },
      { ar: "فحص الملكية", en: "Ownership verification" },
    ],
  },
];

// ============================================================
// TESTIMONIALS DATA
// ============================================================
export const testimonialsData: Testimonial[] = [
  {
    name: "أحمد محمد عبدالله",
    role: { ar: "رجل أعمال - الخرطوم", en: "Businessman - Khartoum" },
    text: {
      ar: "تعاملت مع راقية للعقارات في شراء فيلة فاخرة في حي الرياض. الخدمة كانت استثنائية من البداية حتى التسليم. أنصح الجميع بالتعامل معهم.",
      en: "I dealt with Ragia Real Estate to buy a luxury villa in Al Riyadh. The service was exceptional from start to finish. I recommend them to everyone.",
    },
    rating: 5,
    avatar: "AM",
  },
  {
    name: "سارة علي إبراهيم",
    role: { ar: "مستثمرة عقارية - دبي", en: "Real Estate Investor - Dubai" },
    text: {
      ar: "راقية للعقارات ساعدتني في العثور على فرصة استثمارية ممتازة في الخرطوم. فريق محترف وذو خبرة عالية في السوق السوداني.",
      en: "Ragia Real Estate helped me find an excellent investment opportunity in Khartoum. A professional team with deep knowledge of the Sudanese market.",
    },
    rating: 5,
    avatar: "SA",
  },
  {
    name: "محمد عثمان خالد",
    role: { ar: "مهندس مدني - عطبرة", en: "Civil Engineer - Atbara" },
    text: {
      ar: "خدمة الاستشارات العقارية من راقية كانت السبب الرئيسي في نجاح مشروعي السكني. شكراً لفريق العمل المحترف.",
      en: "Ragia's real estate consulting service was the main reason for the success of my residential project. Thanks to the professional team.",
    },
    rating: 5,
    avatar: "MK",
  },
  {
    name: "فاطمة أحمد حسن",
    role: { ar: "طبيبة - أم درمان", en: "Doctor - Omdurman" },
    text: {
      ar: "اشتريت شقتي الأولى عبر راقية للعقارات. التجربة كانت سلسة ومريحة وتم توفير كل ما أحتاجه بوقت قياسي.",
      en: "I bought my first apartment through Ragia Real Estate. The experience was smooth and comfortable, with everything provided in record time.",
    },
    rating: 5,
    avatar: "FA",
  },
];

// ============================================================
// COUNTRIES WE OPERATE IN
// ============================================================
export const countriesData: Country[] = [
  {
    name: { ar: "السودان", en: "Sudan" },
    flag: "🇸🇩",
    cities: "الخرطوم، أم درمان، الخرطوم بحري، بورتسودان، كسلا، واد مداني والمزيد",
    propertyTypes: ["فلل", "شقق", "أراضي", "مزارع", "أبراج", "عمائر"],
  },
  {
    name: { ar: "مصر", en: "Egypt" },
    flag: "🇪🇬",
    cities: "القاهرة، الإسكندرية، الجيشة، التجمع الخامس، ٦ أكتوبر",
    propertyTypes: ["فلل", "شقق", "استوديوهات", "محلات تجارية"],
  },
  {
    name: { ar: "الإمارات", en: "UAE" },
    flag: "🇦🇪",
    cities: "دبي، أبوظبي، الشارقة، عجمان، رأس الخيمة",
    propertyTypes: ["أبراج سكنية", "شقق فاخرة", "فلل", "مكاتب تجارية"],
  },
  {
    name: { ar: "السعودية", en: "Saudi Arabia" },
    flag: "🇸🇦",
    cities: "الرياض، جدة، الدمام، مكة المكرمة، المدينة المنورة",
    propertyTypes: ["فلل", "شقق", "أراضي", "عمائر تجارية"],
  },
];

// ============================================================
// STATS DATA
// ============================================================
export const statsData = [
  { target: 23, suffix: "+", label: { ar: "سنة من الخبرة", en: "Years of Experience" } },
  { target: 25000, suffix: "+", label: { ar: "عقار تم تسويقه", en: "Properties Marketed" } },
  { target: "world", suffix: "", label: { ar: "دول نعمل فيها", en: "Countries We Operate In" } },
  { target: 18, suffix: "+", label: { ar: "مدينة سودانية", en: "Sudanese Cities Covered" } },
  { target: 100, suffix: "%", label: { ar: "رضا العملاء", en: "Client Satisfaction" } },
  { target: 50, suffix: "+", label: { ar: "خبير عقاري", en: "Real Estate Experts" } },
];

// ============================================================
// PROPERTY TYPE FILTERS
// ============================================================
export const propertyTypes = [
  { value: "all", label: { ar: "الكل", en: "All" } },
  { value: "villa", label: { ar: "فلل", en: "Villas" } },
  { value: "apartment", label: { ar: "شقق", en: "Apartments" } },
  { value: "land", label: { ar: "أراضي", en: "Land" } },
  { value: "tower", label: { ar: "أبراج", en: "Towers" } },
  { value: "farm", label: { ar: "مزارع", en: "Farms" } },
  { value: "building", label: { ar: "عمائر", en: "Buildings" } },
];

// ============================================================
// WA NUMBER
// ============================================================
export const WA_NUMBER = "249920119571";
export const PHONE_NUMBER = "+249912339585";
