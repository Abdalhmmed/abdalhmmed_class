/**
 * بيانات ومحتوى مختبر Unity 2D (Tilemap & Rule Tile & Animation)
 * أستاذ المقرر: م. محمد علي
 */

export const UNITY_META = {
  courseTitle: 'مختبر تطوير الألعاب باستخدام Unity 2D',
  courseTitleEn: 'Unity 2D Game Development Laboratory',
  instructor: 'إعداد: م. محمد علي',
  instructorEn: 'Preparation: Eng. Mohammed Ali',
  year: '2026-2027م',
  heroH1: 'الدرس العملي: إنشاء Tilemap ورسم العالم بـ Rule Tile ومقدمة في Animation داخل Unity 2D',
  heroH1En: 'Practical Lab: Building 2D Worlds with Tilemap & Rule Tile and Introduction to 2D Sprite Animation in Unity',
  heroP: 'دليل تطبيقي شامل خطوة بخطوة: بناء بيئة اللعبة ثنائية الأبعاد، تنظيم الطبقات بين الأرضية والزينة والخلفية، أتمتة حواف التضاريس والزوايا تلقائياً عبر Rule Tile، تفعيل التصادم الفيزيائي مع Composite Collider لمنع تعثر اللاعب، ثم إنشاء أول حركة شخصية بـ Animation Clip مع ضبط الإطارات والتكرار وفق معايير التقييم الـ 18.',
  heroPEn: 'A comprehensive hands-on lab guide: organizing Ground, Decoration, and Background layers, automating terrain edges and corners with Rule Tile, merging physics collisions via Tilemap Collider 2D & Composite Collider, creating 2D Sprite Animation Clips on the Dope Sheet timeline, and evaluating the final 18-point scene.'
}

export const UNITY_FLASHCARDS = [
  {
    question: 'س1: ما الفرق بين Sprite و Tile في محرك Unity؟',
    questionEn: 'Q1: What is the difference between a Sprite and a Tile in Unity?',
    answer: 'الـ <code>Sprite</code> هو ملف الصورة الرقمي الخام في نافذة Project، بينما الـ <code>Tile</code> هو أصل بيانات Unity الذي يحمل تلك الصورة مع إعدادات التصادم واللون ليُرسم على شبكة الـ Tilemap.',
    answerEn: 'A <code>Sprite</code> is the raw graphic asset in the Project window, whereas a <code>Tile</code> is the Unity asset wrapping that sprite with collider and tint rules to be stamped onto grid cells.',
    iconColor: 'var(--brand)'
  },
  {
    question: 'س2: لماذا نستخدم Rule Tile بدلاً من البلاطات اليدوية العادية؟',
    questionEn: 'Q2: Why do we use a Rule Tile instead of standard manual Tiles?',
    answer: 'لأتمتة اختيار الحواف والزوايا والأرض الداخلية تلقائياً بناءً على فحص حالة الخلايا الثمانية المجاورة دون الحاجة للرسم اليدوي الشاق لكل قطعة.',
    answerEn: 'To automate edge, corner, and center sprite selection based on neighbor conditions, eliminating hours of repetitive manual painting.',
    iconColor: 'var(--accent)'
  },
  {
    question: 'س3: ما وظيفة Composite Collider 2D لطبقة الأرضيات؟',
    questionEn: 'Q3: What critical physics issue does Composite Collider 2D solve?',
    answer: 'دمج مصادمات خلايا الـ Tilemap المتجاورة في مضلع تصادم واحد ناعم ومتصل، لمنع ظاهرة تعثر أو احتكاك كوليدر اللاعب عند الفواصل بين البلاطات.',
    answerEn: 'It merges individual adjacent tile colliders into one seamless polygon, permanently eliminating the internal edge snagging glitch.',
    iconColor: 'var(--ok)'
  }
]

export const UNITY_QUIZ_QUESTIONS = [
  {
    title: 'لمنع تشوه رسومات Pixel Art وجعل الحواف حادة دون ضبابية، نضبط Filter Mode في Inspector على:',
    titleEn: 'To keep Pixel Art crisp and prevent blurry edges, set Filter Mode in the Inspector to:',
    options: [
      { text: 'Bilinear (افتراضي)', textEn: 'Bilinear (Default)', correct: false },
      { text: 'Point (no filter)', textEn: 'Point (no filter)', correct: true },
      { text: 'Trilinear', textEn: 'Trilinear', correct: false },
      { text: 'Anisotropic Filtering', textEn: 'Anisotropic Filtering', correct: false }
    ]
  },
  {
    title: 'عند إضافة Composite Collider 2D لطبقة الأرضية، يجب ضبط مكوّن Rigidbody 2D المرفق على:',
    titleEn: 'When adding Composite Collider 2D to Ground_Tilemap, set its Rigidbody 2D Body Type to:',
    options: [
      { text: 'Dynamic (ديناميكي تتأثر بالجاذبية)', textEn: 'Dynamic (Falls under gravity)', correct: false },
      { text: 'Static (ثابت غير متحرك كأرضية صلبة)', textEn: 'Static (Immovable ground)', correct: true },
      { text: 'Kinematic (حركي برمجي)', textEn: 'Kinematic (Script-driven)', correct: false },
      { text: 'حذف مكوّن Rigidbody تماماً', textEn: 'Remove Rigidbody 2D completely', correct: false }
    ]
  },
  {
    title: 'إذا أردت أن تتكرر حركة المشي أو دوران العملة إلى ما لا نهاية في المشهد، يجب تفعيل:',
    titleEn: 'To make a Walk or Coin Spin animation repeat continuously during gameplay, enable:',
    options: [
      { text: 'Root Motion', textEn: 'Root Motion', correct: false },
      { text: 'Write Defaults', textEn: 'Write Defaults', correct: false },
      { text: 'Loop Time في ملف Animation Clip', textEn: 'Loop Time on the Animation Clip asset', correct: true },
      { text: 'Constant Interpolation', textEn: 'Constant Interpolation', correct: false }
    ]
  }
]

export const UNITY_TROUBLESHOOTING = [
  {
    issue: 'الصور لا تظهر كـ Sprites',
    issueEn: 'Images do not appear as Sprites',
    cause: 'نوع الصورة لم يُضبط في Inspector.',
    causeEn: 'Texture Type was not configured in Inspector.',
    fix: 'حدّد الصورة وضع Texture Type = Sprite (2D and UI) ثم اضغط Apply.',
    fixEn: 'Select texture, set Texture Type = Sprite (2D and UI), and click Apply.'
  },
  {
    issue: 'الصورة كلها تظهر كقطعة واحدة ضخمة',
    issueEn: 'Entire Sprite Sheet appears as one giant tile',
    cause: 'لم يتم تقطيع الـ Sprite Sheet.',
    causeEn: 'Sprite Sheet was not sliced in Sprite Editor.',
    fix: 'غيّر Sprite Mode إلى Multiple، ثم افتح Sprite Editor واضغط Slice.',
    fixEn: 'Set Sprite Mode = Multiple, open Sprite Editor, and click Slice.'
  },
  {
    issue: 'القطع تظهر ضبابية وباهتة الحواف',
    issueEn: 'Pixel Art tiles look blurry and smudged',
    cause: 'فلتر التنعيم مفعّل على صور Pixel Art.',
    causeEn: 'Bilinear filtering and compression are active.',
    fix: 'غيّر Filter Mode إلى Point (no filter) وضع Compression = None.',
    fixEn: 'Set Filter Mode = Point (no filter) and Compression = None.'
  },
  {
    issue: 'القطع لا تتطابق في الحجم عند الرسم',
    issueEn: 'Tiles appear too small or too large in grid cells',
    cause: 'قيمة Pixels Per Unit غير موحدة.',
    causeEn: 'Pixels Per Unit (PPU) does not match cell resolution.',
    fix: 'وحّد قيمة Pixels Per Unit لجميع صور المجموعة (مثلاً 16 أو 32 لكل الأصول).',
    fixEn: 'Unify Pixels Per Unit (PPU) across all sprites in the set (e.g., 16 or 32).'
  },
  {
    issue: 'اللاعب يسقط ويخترق الأرضية',
    issueEn: 'Player falls straight through the ground',
    cause: 'لا يوجد مصادم أو إعداد Rigidbody خاطئ.',
    causeEn: 'Missing Tilemap Collider 2D or wrong Rigidbody2D Body Type.',
    fix: 'أضف Tilemap Collider 2D وتأكد من أن Rigidbody2D في الأرضية مضبوط على Static.',
    fixEn: 'Add Tilemap Collider 2D and set the ground\'s Rigidbody 2D Body Type to Static.'
  },
  {
    issue: 'الحركة تعمل مرة واحدة ثم تتوقف',
    issueEn: 'Animation plays once and freezes',
    cause: 'خيار التكرار غير مفعل في الكليب.',
    causeEn: 'Loop Time is unchecked on the Animation Clip asset.',
    fix: 'حدّد ملف الـ Animation Clip في Project وفعّل خيار Loop Time في Inspector.',
    fixEn: 'Select the Animation Clip asset in the Project window and check Loop Time in Inspector.'
  }
]
