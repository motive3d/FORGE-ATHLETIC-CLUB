export const plans = [
  {
    id: "monthly",
    name: ["Monthly", "شهري"],
    price: 2200,
    months: 1,
    label: ["Find your rhythm", "ابدأ على طريقتك"],
  },
  {
    id: "quarterly",
    name: ["Quarterly", "ربع سنوي"],
    price: 5700,
    months: 3,
    label: ["Build your consistency", "تمرّن باستمرار"],
  },
  {
    id: "annual",
    name: ["Annual", "سنوي"],
    price: 18000,
    months: 12,
    label: ["Make it a lifestyle", "اجعلها أسلوب حياتك"],
  },
];
export const facilities = [
  {
    id: "strength",
    name: ["Strength Zone", "منطقة القوة"],
    desc: [
      "Free weights. Racks. Room to progress.",
      "أوزان حرة ورفوف ومساحة للتطور.",
    ],
  },
  {
    id: "cardio",
    name: ["Cardio Zone", "منطقة الكارديو"],
    desc: [
      "Treadmills and bikes, at your pace.",
      "أجهزة مشي ودراجات تناسب إيقاعك.",
    ],
  },
  {
    id: "functional",
    name: ["Functional Training", "التدريب الوظيفي"],
    desc: ["Move freely. Train with purpose.", "حركة حرة وتدريب له هدف."],
  },
  {
    id: "crossfit",
    name: ["CrossFit Area", "منطقة الكروس فيت"],
    desc: [
      "Bars, boxes and full-body training.",
      "بارات وصناديق لتدريب الجسم بالكامل.",
    ],
  },
  {
    id: "boxing",
    name: ["Boxing & MMA Studio", "استوديو الملاكمة والفنون القتالية"],
    desc: [
      "Bag work, technique and mat training.",
      "تدريب على الأكياس والتكنيك والبساط.",
    ],
  },
  {
    id: "lockers",
    name: ["Locker Rooms", "غرف تبديل الملابس"],
    desc: [
      "Space to change. Lockers for your kit.",
      "مساحة للتبديل وخزائن لأغراضك.",
    ],
  },
  {
    id: "showers",
    name: ["Showers", "الدُش"],
    desc: [
      "Refresh, reset and get on with your day.",
      "انتعش واستعد لباقي يومك.",
    ],
  },
  {
    id: "recovery",
    name: ["Recovery Area", "منطقة الاستشفاء"],
    desc: [
      "Stretch, unwind and recover.",
      "مساحة للإطالة والاسترخاء والاستشفاء.",
    ],
  },
];
export const trainers = [
  {
    id: "omar",
    name: ["Omar El Sherif", "عمر الشريف"],
    specialty: ["Strength & Conditioning", "القوة والإعداد البدني"],
  },
  {
    id: "ahmed",
    name: ["Ahmed Fathy", "أحمد فتحي"],
    specialty: ["Bodybuilding", "كمال الأجسام"],
  },
  {
    id: "youssef",
    name: ["Youssef Hassan", "يوسف حسن"],
    specialty: ["Boxing & MMA", "الملاكمة والفنون القتالية المختلطة"],
  },
  {
    id: "karim",
    name: ["Karim Adel", "كريم عادل"],
    specialty: ["Functional Training", "التدريب الوظيفي"],
  },
  {
    id: "mariam",
    name: ["Mariam Mostafa", "مريم مصطفى"],
    specialty: ["Mobility & Recovery", "المرونة والاستشفاء"],
  },
  {
    id: "nour",
    name: ["Nour Ahmed", "نور أحمد"],
    specialty: ["CrossFit", "كروس فيت"],
  },
];
export const days = [
  ["Saturday", "السبت"],
  ["Sunday", "الأحد"],
  ["Monday", "الاثنين"],
  ["Tuesday", "الثلاثاء"],
  ["Wednesday", "الأربعاء"],
  ["Thursday", "الخميس"],
  ["Friday", "الجمعة"],
];
export const classes = {
  mma: {
    name: ["MMA", "فنون قتالية مختلطة"],
    image: "mma",
    coach: 2,
    desc: ["Technique. Control. Confidence.", "تكنيك وتحكّم وثقة."],
  },
  crossfit: {
    name: ["CrossFit", "كروس فيت"],
    image: "crossfit",
    coach: 5,
    desc: ["Strength meets conditioning.", "قوة ولياقة في تدريب واحد."],
  },
  boxing: {
    name: ["Boxing", "ملاكمة"],
    image: "boxing",
    coach: 2,
    desc: ["Footwork. Focus. Power.", "حركة قدمين وتركيز وقوة."],
  },
};
export const schedule = [
  { day: 0, type: "mma", hour: 19 },
  { day: 1, type: "crossfit", hour: 18 },
  { day: 2, type: "boxing", hour: 20 },
  { day: 3, type: "mma", hour: 19 },
  { day: 4, type: "crossfit", hour: 18 },
  { day: 5, type: "boxing", hour: 20 },
  { day: 6, type: "mma", hour: 17 },
];
export const nav = [
  { path: "/", name: ["Home", "الرئيسية"] },
  { path: "/facilities", name: ["Facilities & Training", "المرافق والتدريب"] },
  { path: "/classes", name: ["Classes & Schedule", "الحصص والجدول"] },
  { path: "/memberships", name: ["Memberships", "الاشتراكات"] },
  { path: "/contact", name: ["Contact & Visit", "تواصل وزيارة"] },
];
export const faqs = [
  {
    q: ["Is the gym open all day?", "هل الجيم مفتوح طوال اليوم؟"],
    a: [
      "The gym floor is open 24/7. Coaches and group classes are available by schedule.",
      "صالة الجيم مفتوحة على مدار الساعة. المدربون والحصص الجماعية متاحون حسب الجدول.",
    ],
  },
  {
    q: ["How do I join or book a class?", "كيف أشترك أو أحجز حصة؟"],
    a: [
      "Choose a plan or class and send a WhatsApp inquiry. Availability and arrangements are discussed directly; this website does not confirm bookings.",
      "اختر اشتراكًا أو حصة وأرسل استفسارك عبر واتساب. تتم مناقشة المواعيد والترتيبات مباشرة؛ الموقع لا يؤكد الحجوزات.",
    ],
  },
  {
    q: ["Which payment methods are shown?", "ما طرق الدفع المعروضة؟"],
    a: [
      "Cash, bank cards and InstaPay are illustrative payment options. There is no online payment or checkout.",
      "النقد والبطاقات البنكية وإنستاباي خيارات دفع توضيحية. لا يوجد دفع إلكتروني على الموقع.",
    ],
  },
  {
    q: ["Is FORGE a real gym?", "هل فورج جيم حقيقي؟"],
    a: [
      "FORGE is a fictional portfolio concept. Trainers, facilities, schedules and prices are illustrative. Images do not depict an operating FORGE location.",
      "فورج فكرة خيالية لعرض التصميم. المدربون والمرافق والجداول والأسعار توضيحية، والصور لا تعرض فرعًا حقيقيًا لفورج.",
    ],
  },
];
export const disclaimer = [
  "FORGE Athletic Club is a fictional concept website created for portfolio demonstration. Memberships, schedules, trainers, and prices are illustrative.",
  "نادي فورج الرياضي موقع لفكرة خيالية صُمم لعرض الأعمال. الاشتراكات والجداول والمدربون والأسعار جميعها توضيحية.",
];
