# دليل المعمارية ونظام التصميم للمنصة التعليمية
## Architecture & Design System Specification for AI Replication

> **ملاحظة توجيهية للذكاء الاصطناعي والمطورين:**  
> هذا الملف صُمم كمرجع قياسي وشامل (System Specification & Prompting Guide). عند تكليفك بإنشاء درس تفاعلي جديد، أو إضافة مادة تعليمية، أو إعادة بناء وتوسيع أي صفحة في هذا المشروع، **يجب عليك الالتزام الدقيق بنسبة 100%** بالأنماط، والمتغيرات، والقواعد، وهندسة الكود الموضحة هنا دون أي ارتجال خارج هذه المعايير.

---

### بيانات المرجع الأكاديمي والمنصة
- **المؤلف والمشرف:** م. عبدالحميد هلال دعيان (Eng. Abdulhamid Helal Daban)
- **المؤهل:** خريج علوم حاسوب (Computer Science) - مهندس برمجيات ومدرب أكاديمي.
- **الفئة المستهدفة:** طلبة كليات ومعاهد الحاسوب بمختلف تخصصاتهم (ذكاء اصطناعي AI، علوم حاسوب CS، نظم معلومات IS، تقنية معلومات IT).
- **العام الدراسي:** 2026-2027م.
- **طبيعة المشروع:** منصة تعليمية جامعية خفيفة وعالية الأداء تعتمد على الويب القياسي النقي (Vanilla HTML5 / CSS3 / ES6+ JavaScript) بدون أي أطر عمل ثقيلة (Zero Frameworks, No Build Step)، مع دعم كامل وأصيل لاتجاه الكتابة العربي (RTL-First).

---

## 1. شجرة وهيكل المشروع (Project Anatomy & File Hierarchy)

المشروع يتبع تنظيماً هرمياً ثابتاً للمجلدات يسهل توليده واستدعاؤه عبر الروابط النسبية (Relative Links):

```text
abdalhmmed_class/
│
├── index.html                               # بوابة المنصة الرئيسية وفهرس المقررات
├── README.md                                # الوثائق العامة والتعريف بالمشروع
│
├── docs/                                    # مجلد التوثيق الشامل والأدلة الأكاديمية
│   ├── README.md                            # بوابة ودليل التوثيق المركزي
│   ├── architecture/                        # دليل المعمارية ونظام التصميم (هذا الملف)
│   │   └── ARCHITECTURE_AND_DESIGN_GUIDE.md
│   ├── pedagogy/                            # الدراسات والتحليلات التعليمية والبيداغوجية
│   │   └── LECTURE_01_STYLE_ANALYSIS.md
│   └── guides/                              # أدلة التطوير والمعايير
│       └── COURSE_EXPANSION_GUIDE.md
│
└── courses/                                 # مجلد المقررات والمواد الدراسية
    ├── data-structures/                     # مقرر: تراكيب البيانات وخوارزمياتها
    │   ├── lecture-01/                      # المحاضرة الأولى: المصفوفات (Arrays)
    │   │   ├── README.md                    # فهرس ومحتوى المحاضرة الأولى
    │   │   ├── interactive.html             # المحاضرة التفاعلية ومحاكي الذاكرة
    │   │   └── print-pdf.html               # نسخة التلخيص والطباعة الجامعية (A4)
    │   └── lecture-02/                      # المحاضرات التالية مستقبلاً بنفس النمط...
    │
    ├── algorithms/                          # مقرر: تصميم وتحليل الخوارزميات (مستقبلي)
    └── java-oop/                            # مقرر: البرمجة كائنية التوجه (مستقبلي)
```

---

## 2. نظام الرموز البصرية والألوان (Design Tokens & Color Palette)

تعتمد المنصة على نظام متغيرات CSS موحد (`CSS Custom Properties`) يدعم التبديل السلس بين الوضعين الفاتح (Light) والداكن (Dark) مع الحفاظ على تباين لوني مريح وواضح للعين.

### كود المتغيرات الأساسية (CSS Root Tokens):

```css
:root {
  /* ألوان الهوية والعلامة التجارية */
  --brand: #2563eb;          /* أزرق نيلي جامعي رئيسي */
  --brand-hover: #1d4ed8;    /* أزرق مركز للتفاعل والمؤشر */
  --brand-soft: #eff6ff;     /* خلفية هادئة لعناصر الهوية والمصفوفة */
  --brand-border: #bfdbfe;   /* حدود ناعمة لعناصر الشرح والبطاقات */

  /* ألوان الحالات والتعقيد الحسابي (Complexity Badges) */
  --success: #16a34a;        /* O(1) - أخضر للعمليات اللحظية والنجاح */
  --success-bg: #dcfce7;
  --warning: #d97706;        /* O(log n) - برتقالي للعمليات التكرارية */
  --warning-bg: #fef3c7;
  --danger: #dc2626;         /* O(n) / O(n²) - أحمر للعمليات الخطية أو التنبيهات */
  --danger-bg: #fee2e2;

  /* مساحات وألوان الخلفيات */
  --bg-page: #f8fafc;        /* خلفية الصفحة الفاتحة (Slate 50) */
  --bg-card: #ffffff;        /* خلفية البطاقات والألواح */
  --bg-muted: #f1f5f9;       /* مساحات الكود والمدخلات والمقارنات */

  /* النصوص والخطوط */
  --text-main: #0f172a;      /* نصوص داكنة أساسية عالية التباين (Slate 900) */
  --text-muted: #64748b;     /* نصوص الشرح والتلميحات (Slate 500) */
  --border-light: #e2e8f0;   /* فواصل الجداول والبطاقات الافتراضية */

  /* الأبعاد والظلال */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08);

  /* عائلة الخطوط القياسية */
  --font-arabic: 'Segoe UI', system-ui, -apple-system, Tahoma, Arial, sans-serif;
  --font-mono: 'Consolas', 'Cascadia Code', 'Fira Code', 'Courier New', monospace;
}

/* سمات الوضع الليلي (Dark Mode) - يُفعّل تلقائياً عبر data-theme="dark" */
[data-theme="dark"] {
  --bg-page: #0f172a;        /* كحلي غامق مريح للعين (Slate 900) */
  --bg-card: #1e293b;        /* بطاقات باللون الكحلي المتناسق (Slate 800) */
  --bg-muted: #334155;       /* خلفية العناصر الخافتة (Slate 700) */
  --border-light: #334155;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --brand-soft: rgba(37, 99, 235, 0.18);
  --brand-border: #3b82f6;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.5);
}
```

---

## 3. معيار الأيقونات والخطوط (Iconography & Fonts Standards)

### أ. منع استخدام الإيموجيات كأزرار (Strict No-Emoji Policy)
- **ممنوع منعاً باتاً** استخدام الإيموجيات مثل (✅, 🎬, 🗑️, ✏️, 🌙, ☀️, ⬅️, ➡️, ⏮️, ⏭️) داخل عناصر التحكم أو أزرار المشغل أو بطاقات المحتوى.
- **المعيار الإلزامي:** استخدام مكتبة المتجهات **Font Awesome 6 (Free CDN)** حصراً:
  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  ```

### جدول توحيد الأيقونات الرسمية:
| الوظيفة / الزر | الأيقونة المعتمدة (Font Awesome 6) | كود HTML القياسي |
| :--- | :--- | :--- |
| **تبديل الوضع الليلي** | `fa-moon` (ليلي) / `fa-sun` (نهاري) | `<i class="fa-solid fa-moon"></i>` |
| **قلم الشرح والتأشير** | `fa-pen-nib` | `<i class="fa-solid fa-pen-nib"></i> قلم الشرح` |
| **وضع العرض / السينما**| `fa-desktop` أو `fa-chalkboard` | `<i class="fa-solid fa-desktop"></i> وضع العرض` |
| **نسخة الطباعة PDF** | `fa-file-pdf` | `<i class="fa-solid fa-file-pdf"></i> نسخة PDF` |
| **العودة للرئيسية** | `fa-house` | `<i class="fa-solid fa-house"></i> الرئيسية` |
| **زر التشغيل / الإيقاف** | `fa-play` / `fa-pause` | `<i class="fa-solid fa-play"></i> تشغيل` |
| **إعادة الضبط / التطبيق** | `fa-rotate-right` | `<i class="fa-solid fa-rotate-right"></i> تطبيق وإعادة التشغيل` |
| **عمليات القراءة / البحث** | `fa-magnifying-glass` | `<i class="fa-solid fa-magnifying-glass"></i>` |
| **عمليات الكتابة / التعديل**| `fa-pen` | `<i class="fa-solid fa-pen"></i>` |
| **عمليات الحذف** | `fa-trash-can` | `<i class="fa-solid fa-trash-can"></i>` |
| **عمليات الإضافة / الإدراج**| `fa-plus` | `<i class="fa-solid fa-plus"></i>` |
| **عمليات الفرز والترتيب**| `fa-arrow-down-short-wide` | `<i class="fa-solid fa-arrow-down-short-wide"></i>` |
| **أيقونة السرعة والتوقيت**| `fa-gauge-high` | `<i class="fa-solid fa-gauge-high"></i> التحكم بالسرعة` |
| **عداد القراءات** | `fa-book-open-reader` | `<i class="fa-solid fa-book-open-reader"></i> قراءات` |
| **عداد الكتابات** | `fa-pencil` | `<i class="fa-solid fa-pencil"></i> كتابات` |
| **عداد المقارنات** | `fa-code-compare` | `<i class="fa-solid fa-code-compare"></i> مقارنات` |
| **عداد المجموع** | `fa-calculator` | `<i class="fa-solid fa-calculator"></i> المجموع` |

---

## 4. معمارية مشغل المحاكاة واتجاه RTL (Simulation Player & RTL Flow)

### الترتيب البصري الصارم لأزرار المشغل في الواجهات العربية (RTL):
في اللغة العربية (من اليمين إلى اليسار)، يبدأ خط الزمن والخطوات من اليمين متجهاً نحو اليسار. لذلك فإن ترتيب الأزرار داخل شريط التحكم (`.player-controls`) يجب أن يطابق بدقة النموذج التالي:

```text
[ البداية (خطوة 1) ]  [ خطوة للخلف ]   [ تشغيل / إيقاف ]   [ خطوة للأمام ]   [ النهاية (آخر خطوة) ]
       ⏭                  →               ▶ تشغيل                ←                   ⏮
   fa-forward-step   fa-arrow-right     fa-play/pause      fa-arrow-left       fa-backward-step
```

#### كود HTML القياسي لأزرار المشغل:
```html
<div class="player-controls">
  <button id="btnFirst" class="btn btn-sm btn-outline" title="الانتقال للبداية (الخطوة الأولى)">
    <i class="fa-solid fa-forward-step"></i>
  </button>
  <button id="btnPrev" class="btn btn-sm btn-outline" title="خطوة للخلف">
    <i class="fa-solid fa-arrow-right"></i>
  </button>
  <button id="btnPlay" class="btn btn-sm btn-primary" title="تشغيل / إيقاف مؤقت">
    <i class="fa-solid fa-play"></i> <span id="lblPlay">تشغيل</span>
  </button>
  <button id="btnNext" class="btn btn-sm btn-outline" title="خطوة للأمام">
    <i class="fa-solid fa-arrow-left"></i>
  </button>
  <button id="btnLast" class="btn btn-sm btn-outline" title="الانتقال للنهاية (الخطوة الأخيرة)">
    <i class="fa-solid fa-backward-step"></i>
  </button>
</div>
```

---

## 5. محرك محاكاة الذاكرة وتتبع الحالات (The State-Recorder Engine)

تعتمد جميع المحاضرات التفاعلية على نمط برمجي نقي ومستقل يُدعى **نمط مسجل الحالات (State-Recorder Pattern)**:
1. عند اختيار عملية ما أو الضغط على "تطبيق وإعادة التشغيل"، يتم تفريغ شريط الخطوات.
2. تُنفذ دالة العملية رياضياً وتقوم بدفع (Push) كائنات تمثل "لقطات الذاكرة" (Snapshots) لكل خطوة داخل مصفوفة `steps`.
3. لا يتم التعديل على DOM مباشرة أثناء تنفيذ المنطق البرمجي، بل يقوم المشغل بقراءة `steps[currentIndex]` وتمريرها لدالة التقديم البصري `renderCurrentStep()`.

### بنية كائن الخطوة (Snapshot Step Schema):
```javascript
{
  arr: [10, 20, 30, 40, 50],     // نسخة مستقلة من المصفوفة في هذه اللحظة [...current]
  activeIdx: 2,                  // فهرس العنصر الجاري العمل عليه (أو -1 إن لم يوجد)
  compareIdx: -1,                // فهرس العنصر الثاني إن كانت العملية مقارنة
  swapIdx: -1,                   // فهرس العنصر المستبدل
  codeLine: 2,                   // رقم السطر المراد إضاءته في نافذة الكود (1-indexed)
  explanation: "تم الوصول إلى العنصر arr[2] بنجاح.", // النص التوضيحي للخطوة الحالية
  vars: { i: 2, val: 30 },       // المتغيرات البرمجية الحالية لعرضها في صندوق المتغيرات
  reads: 1,                      // إجمالي عدد القراءات حتى هذه اللحظة
  writes: 0,                     // إجمالي عدد الكتابات في الذاكرة حتى الآن
  comps: 0                       // إجمالي عدد المقارنات حتى الآن
}
```

### معمارية تمثيل خلايا الذاكرة (Memory Array Layout):
- **المظهر الأفقي الإلزامي:** يجب أن تظهر عناصر المصفوفة في صف أفقي مرن مع شريط تمرير عند زيادة العناصر:
  ```css
  .arr-row {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap;
    align-items: flex-end;
    justify-content: center;
    gap: 12px;
    padding: 2.5rem 1rem 1rem 1rem;
    overflow-x: auto;
  }
  ```
- **سلوك الألوان عند النشاط (Color Mechanics):**
  - تظل حدود الخلية الخارجية ثابتة بلون العلامة أو الرمادي (`border: 2.5px solid var(--brand)`).
  - يتغير اللون **الداخلي فقط** (`background-color`) للخلية النشطة إلى لون هادئ شفاف:
    - الخلية النشطة (Active): `var(--brand-soft)` (أزرق خفيف وناعم).
    - خلية المقارنة (Compare): `#fffbeb` (أصفر تحذيري ناعم).
    - خلية الاستبدال/الحذف (Swap/Delete): `#fef2f2` (أحمر ناعم).
  - **مؤشر الفهرس والرمز التفاعلي العلوي (`.ptr`):** يتموضع بشكل مطلق أعلى الخلية النشطة مع حركة ارتدادية خفيفة (`animation: bounce 0.6s infinite alternate`).

---

## 6. نافذة محاذاة الكود (Synchronized Code Tracing)

لكل عملية في المحاضرة كود نظيف مكتوب بلغة المقرر (مثلاً Java) ومقسّم إلى أسطر واضحة:
```html
<div class="code-box">
  <div class="code-header">
    <span><i class="fa-solid fa-code"></i> الكود — السطر المظلل هو الذي يُنفّذ الآن</span>
    <span class="badge-lang">Java</span>
  </div>
  <pre><code id="codeLines">
<div class="code-line" data-line="1"><span class="ln">1</span> <span class="kwd">int</span> val = arr[index];</div>
<div class="code-line" data-line="2"><span class="ln">2</span> <span class="kwd">return</span> val;</div>
  </code></pre>
</div>
```
- عند وصول المؤشر إلى الخطوة `step.codeLine == 1`، تضاف فئة `.active-line` للسطر المحدد، ويتحول لونه إلى الأزرق المضيء مع سهم دلالي أو خلفية مميزة لتثبيت الفهم البصري لدى الطالب.

---

## 7. لوحة العمليات المستعادة (Operations Hub & Cards Design)

في النسخة المعتمدة نهائياً، تُعرض العمليات على هيئة بطاقات تفاعلية أنيقة (`.op-card`) مجمعة في شبكة (`grid`):
- كل بطاقة تحتوي على:
  - أيقونة العملية الدلالية (Font Awesome).
  - اسم العملية باللغتين العربية والإنجليزية.
  - وسم التعقيد الزمني (Time Complexity Badge: `O(1)`, `O(n)`).
  - زر تشغيل العملية أو فتح حقول الإدخال الخاصة بها.
- عند النقر على العملية، تصبح البطاقة نشطة (`.active`) مع إطار أزرق متوهج خفيف، وتُحمّل الخطوات فوراً في المشغل الرئيسي.

---

## 8. معمارية الصفحة الرئيسية وفهرس المقررات (`index.html`)

تمتاز الصفحة الرئيسية بكونها بوابة موحدة لجميع المقررات:
1. **الترويسة الأكاديمية (Academic Hero Section):**
   - اسم المهندس والمحاضر: **م. عبدالحميد هلال دعيان**.
   - تخصص وتوصيف المنصة: منصة المقررات الجامعية التفاعلية في علوم الحاسوب وتقنية المعلومات.
   - أزرار سريعة ومبدل الوضع الليلي.
2. **بطاقات المقررات المصغرة (`.compact-card`):**
   - تصميم مضغوط وحديث يبتعد عن الحشو البصري.
   - لكل مقرر: أيقونة ملونة، عنوان المقرر، التخصصات الموجه لها (AI, CS, IS)، رمز المادة، وعدد المحاضرات المتاحة.
   - روابط تنقل واضحة نحو أول محاضرة تفاعلية ومسار المنهج.
3. **التذييل الجامعي المعتمد (University Standard Footer):**
   - إشارة واضحة لحقوق الإعداد والتنظيم للمهندس عبدالحميد هلال دعيان.
   - روابط سريعة للجامعة، المستودع، وملفات الـ PDF.

---

## 9. تحليل وهندسة صفحة التصدير والطباعة الجامعية (`print-pdf.html`)

صُممت صفحة الطباعة (`print-pdf.html`) لتكون **ملزمة أكاديمية قياسية جاهزة للطباعة الورقية والتصدير المباشر كملف PDF بقياس A4**، مع دعم العرض المتجاوب على الشاشات والهواتف دون التأثير على إخراج الطابعة.

### أ. فلسفة التصميم (Dual-Mode Responsive & Print Architecture):
1. **وضع الشاشة (Screen View):**
   - يظهر شريط إجراءات علوي عائم (`.action-bar`) يحتوي على روابط العودة للبوابة الرئيسية، والانتقال للشرح التفاعلي، وزر الطباعة السريع (`window.print()`).
   - تُعرض الملزمة داخل حاوية مركزية تشبه الورقة الحقيقية (`.doc-container`) بحد أقصى `max-width: 900px` مع ظلال ناعمة وهوامش قراءة مريحة.
2. **وضع الطباعة والـ PDF (`@media print`):**
   - يُخفى شريط الإجراءات العلوي نهائياً (`.action-bar { display: none !important; }`).
   - تُلغى الظلال والحواف الدائرية وهوامش الحاوية ليأخذ المستند أبعاد صفحة الطباعة الحقيقية بالكامل.
   - قياس الصفحة القياسي محدد بدقة:
     ```css
     @page {
       size: A4 portrait;
       margin: 14mm 16mm;
     }
     ```
   - إجبار المتصفح على طباعة الألوان الدقيقة والخلفيات:
     ```css
     -webkit-print-color-adjust: exact !important;
     print-color-adjust: exact !important;
     ```

### ب. هيكل الفصول وفواصل الصفحات (Pagination & Breaks Management):
- **صفحة الغلاف (`.cover-page`):** صفحة مستقلة بنسبة ارتفاع كاملة (`height: 94vh` أو `page-break-after: always;`) تضم الترويسة الجامعية، عنوان المقرر والمحاضرة بخط عريض (36px)، النبذة التعريفية، ومصفوفة بيانات المحاضر والتخصصات المستهدفة.
- **فهرس المحتويات (`.toc-box`):** ينتهي بفاصل صفحة إجباري (`break-after: page;`) لضمان بدء المحتوى العلمي في ورقة جديدة.
- **منع تمزق الكتل البرمجية والجداول:** يتم استخدام القواعد التالية لمنع انشطار الصناديق عبر الصفحات:
  ```css
  .op-card, .card-box, table, .diagram-stage, .code-block {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  h2.sec-heading, h3.sub-heading {
    page-break-after: avoid !important;
    break-after: avoid !important;
  }
  ```

### ج. تمثيل الذاكرة والمخططات الورقية (`.diagram-stage`):
- على عكس الصفحة التفاعلية التي تستخدم المشغل الحركي، تستخدم صفحة الطباعة **مخططات شريطية ثابتة ومتجهة** (`.array-strip` و `.array-item`):
  - عنوان الذاكرة الفيزيائي (`.addr`): بخط أحادي (Monospace) باللون البرتقالي (مثل `0x1000`, `0x1004`).
  - صندوق القيمة (`.box`): مربع بحدود واضحة وخلفية بيضاء أو مظللة بالحالات (Highlight, Success, Danger).
  - رقم الفهرس (`.idx`): موضّح بوضوح أسفل الصندوق (`[0]`, `[1]`, `[2]`).

### د. صناديق التوضيح والأكواد المرجعية (Callouts & Code Blocks):
- **صناديق التنبيه:** كتل ملونة بحدود يمنى عريضة:
  - ملاحظات إرشادية (`.note-box`): أزرق ملكي خفيف (`--brand-light`).
  - تحذيرات ومخاطر (`.warn-box`): كهرماني ناعم (`--accent-light`).
  - إيجابيات وتأكيدات (`.success-box`): أخضر نعناعي (`--ok-light`).
- **بلوكات الكود (`.code-block`):** خلفية كحلية داكنة ثابتة حتى أثناء الطباعة (`#0f172a`) مع تلوين نحوي (Syntax Highlighting) يدعم الخط الأحادي الأنيق `Fira Code` واتجاه كود يسار-يمين (LTR).

---

## 10. تعليمات وقواعد الاستنساخ لأي نموذج ذكاء اصطناعي (AI Prompt Rules)

عند إصدار أمر لنموذج الذكاء الاصطناعي لإنشاء محاضرة جديدة (مثلاً `lecture-02/interactive.html` لموضوع *Linked Lists* أو *Stacks*):

> ### القواعد الإلزامية الخمس:
> 1. **الاعتماد الذاتي الكامل (Self-Contained Single File):** أن تكون صفحة المحاضرة متكاملة وتعمل مباشرة بمجرد فتحها في المتصفح دون الحاجة لأي خادم محلي أو حزم npm (CDN خارجي فقط لـ Font Awesome).
> 2. **الحفاظ التام على هوية الألوان والمتغيرات:** استخدم نفس متغيرات `:root` المذكورة في هذا الدليل دون استبدال ألوان الهوية.
> 3. **تطبيق نمط المسجل (Recorder Engine):** اكتب منطق كل دالة على هيئة تسجيل مصفوفة خطوات متسلسلة تحتوي على قراءات الذاكرة ونصوص الشرح لكل خطوة باللغة العربية الواضحة.
> 4. **منع الإيموجيات واستخدام Font Awesome:** أي زر، عداد، مؤشر، أو حالة يجب أن يستخدم أيقونات Font Awesome 6 المناسبة.
> 5. **اتجاه مشغل RTL الصحيح:** تأكد من أن أزرار المشغل مرتبة من اليمين لليسار حسب الترتيب: `⏭` ثم `→` ثم `▶ تشغيل` ثم `←` ثم `⏮`.

---
*تم اعتماد وتوثيق هذا الدليل رسمياً لمستودع `abdalhmmed_class` لضمان أعلى معايير الجودة الأكاديمية والتصميم التفاعلي.*
