export const portalData = {
  ar: {
    brand: {
      name: 'بوابة الملازم والمختبرات',
      role: ''
    },
    nav: {
      home: 'الرئيسية',
      courses: 'المقررات الدراسية',
      about: 'عن المنصة',
      themeTooltip: 'تبديل المظهر (ليلي / نهاري)',
      langLabel: 'English',
      paletteTooltip: 'تغيير الهوية اللونية'
    },
    hero: {
      kicker: 'منصة أكاديمية جامعية',
      badge: 'المحاضرات والمختبرات البرمجية الشاملة',
      year: '2026-2027م',
      titleLine1: 'البوابة التعليمية للملازم والمختبرات',
      titleHighlight: 'والتطبيقات البرمجية العملية',
      desc: 'بيئة تعليمية مخصصة لتقديم شروحات المقررات الحاسوبية والبرمجية بأسلوب عملي تطبيقي حديث؛ تجمع بين المحاكاة التفاعلية الحية وملازم الـ PDF المنسقة للطباعة، لدعم وتأهيل طلاب الحاسوب والتخصصات التقنية كافة.',
      stats: [
        { num: '03', label: 'مقررات نشطة', bordered: false },
        { num: '04', label: 'مختبرات وملازم تفاعلية', bordered: true },
        { num: '100%', label: 'تفاعلي & مجاني للطلاب', bordered: true }
      ]
    },
    instructor: {
      name: 'م. عبدالحميد هلال دعبان',
      subtitle: 'بكالوريوس علوم حاسوب · مدرس الجانب العملي',
      profileBtnLabel: 'الملف الأكاديمي والتواصل',
      phone: '+967 778123807',
      email: 'abdalhmmeddaban@gmail.com',
      meta: [
        { icon: 'fa-solid fa-user-graduate', label: 'المؤهل:', value: 'بكالوريوس علوم حاسوب (Computer Science)' },
        { icon: 'fa-solid fa-chalkboard-user', label: 'التدريس:', value: 'مدرس المعامل والمختبرات البرمجية' },
        { icon: 'fa-solid fa-layer-group', label: 'الطلبة:', value: 'ذكاء اصطناعي (AI) · CS · IS · IT' },
        { icon: 'fa-solid fa-building-columns', label: 'الجهة الأكاديمية:', value: 'جامعة عدن' }
      ]
    },
    coursesSection: {
      title: 'المقررات والملازم الدراسية',
      subtitle: 'استعرض الملازم المتاحة للمقرر، مع إمكانية الدخول للشرح التفاعلي أو الانتقال لنسخة الـ PDF المجهزة للطباعة.',
      badge: 'المقررات والملازم العملية',
      btnInteractive: 'المختبر التفاعلي',
      btnPdf: 'ملزمة PDF (English)',
      courses: [
        {
          id: 'ds',
          themeClass: 'theme-ds',
          icon: 'fa-solid fa-diagram-project',
          title: 'هياكل البيانات والخوارزميات (Data Structures)',
          subtitle: 'المختبر البرمجي والشروحات التطبيقية بلغة Java · أستاذ المقرر: م. عبدالحميد هلال دعبان',
          tagIcon: 'fa-brands fa-java',
          tagText: 'Java · Data Structures',
          lectures: [
            {
              id: 'ds-lec-01',
              numberTag: 'الدرس الأول',
              topicTag: 'Arrays & Big-O',
              title: 'المصفوفات (Arrays) وتحليل كفاءة الخوارزميات',
              desc: 'شرح معمارية المصفوفة الأحادية في الذاكرة الفيزيائية، وتطبيق العمليات الأساسية (الوصول، التعديل، المجموع، البحث الخطي، الإدراج، والحذف مع إزاحة الذاكرة) مع تحليل التعقيد الزمني والمكاني.',
              meta: [
                { icon: 'fa-solid fa-chalkboard-user', text: 'أستاذ المقرر: م. عبدالحميد دعبان' },
                { icon: 'fa-solid fa-layer-group', text: 'محاكاة الذاكرة والتعقيد' },
                { icon: 'fa-brands fa-java', text: 'Java SE' }
              ],
              interactiveRoute: '/courses/data-structures/lecture-01',
              pdfUrl: 'courses/data-structures/lecture-01/print-pdf.html'
            },
            {
              id: 'ds-lec-02',
              numberTag: 'الدرس الثاني',
              topicTag: '2D Arrays & Matrices',
              title: 'المصفوفات ثنائية الأبعاد (2D Arrays & Matrices) وخوارزميات الشبكات',
              desc: 'محاكاة معمارية Array of Arrays في الذاكرة مقارنة بـ Row-Major، المصفوفات المتعرجة (Jagged Arrays)، وتطبيق 9 خوارزميات (مجاميع الصفوف والأعمدة، البحث السُّلَّمي في O(R+C)، الأقطار في O(N)، التدوير، القلب، والمسار الحلزوني).',
              meta: [
                { icon: 'fa-solid fa-chalkboard-user', text: 'أستاذ المقرر: م. عبدالحميد دعبان' },
                { icon: 'fa-solid fa-table-cells', text: '9 خوارزميات شبكية 2D' },
                { icon: 'fa-brands fa-java', text: 'Java SE' }
              ],
              interactiveRoute: '/courses/data-structures/lecture-02',
              pdfUrl: 'courses/data-structures/lecture-02/print-pdf.html'
            }
          ]
        },
        {
          id: 'cyber',
          themeClass: 'theme-cyber',
          icon: 'fa-solid fa-shield-halved',
          title: 'الأمن السيبراني والتشفير (Cybersecurity & Cryptography)',
          subtitle: 'مختبر هندسة الخوارزميات الأمنية لطلبة السنة الثالثة علوم حاسوب · أستاذ المقرر: م. عبدالحميد هلال دعبان',
          tagIcon: 'fa-solid fa-shield-cat',
          tagText: 'سنة 3 CS · أمن سيبراني',
          lectures: [
            {
              id: 'cyber-lec-01',
              numberTag: 'الدرس الأول',
              topicTag: 'Cryptography & Security',
              title: 'أسس علم التشفير وهندسة الخوارزميات الأمنية',
              desc: 'دراسة تفاعلية متقدمة تغطي مبادئ CIA ومبدأ كيركهوفس، حساب الموديلار، ومحاكاة 7 خوارزميات رئيسية (قيصر، لوحة المرة الواحدة OTP، معيار AES، خوارزمية RSA، تبادل المفاتيح DH، دوال الهاش SHA-256، والتوقيع الرقمي).',
              meta: [
                { icon: 'fa-solid fa-chalkboard-user', text: 'أستاذ المقرر: م. عبدالحميد دعبان' },
                { icon: 'fa-solid fa-shield-halved', text: '7 خوارزميات أمنية' },
                { icon: 'fa-solid fa-lock', text: 'كتل وتدفق' }
              ],
              interactiveRoute: '/courses/cybersecurity/lecture-01',
              pdfUrl: 'courses/cybersecurity/lecture-01/print-pdf.html'
            }
          ]
        },
        {
          id: 'unity-2d',
          themeClass: 'theme-amber',
          icon: 'fa-brands fa-unity',
          title: 'تطوير ألعاب 2D بمحرك Unity (Unity 2D Game Dev)',
          subtitle: 'المختبر العملي لتطوير الألعاب ثنائية الأبعاد · أستاذ المقرر: م. محمد علي',
          tagIcon: 'fa-brands fa-unity',
          tagText: 'Unity 2D · C# & Game Dev',
          lectures: [
            {
              id: 'unity-lec-01',
              numberTag: 'الدرس الأول',
              topicTag: 'Tilemap & Rule Tile & 2D Animation',
              title: 'إنشاء Tilemap ورسم العالم باستخدام Rule Tile وحركة الشخصيات 2D Animation',
              desc: 'مختبر عملي تفاعلي شامل لبناء بيئة لعبة 2D متكاملة: معمارية Grid والـ Tilemaps، فلاتر Pixel Art و PPU، أتمتة حواف التضاريس بـ Rule Tile 3x3، نظام التصادم الفيزيائي المدمج (Composite Collider)، ونظام التحريك الإطاري Sprite Animation.',
              meta: [
                { icon: 'fa-solid fa-chalkboard-user', text: 'إعداد: م. محمد علي' },
                { icon: 'fa-solid fa-wand-magic-sparkles', text: 'محاكي Rule Tile و Sprite Animation' },
                { icon: 'fa-brands fa-unity', text: 'Unity 2D Engine' }
              ],
              interactiveRoute: '/courses/unity-game-dev/lecture-01',
              pdfUrl: 'courses/unity-game-dev/lecture-01/print-pdf.html'
            }
          ]
        }
      ]
    },
    featuresSection: {
      title: 'ما يميز هذه المنصة الأكاديمية؟',
      subtitle: 'صُممت الملازم والموقع خصيصاً لتسهيل استيعاب المواد العملية المعقدة وربط النظرية بالتطبيق البرمجي.',
      items: [
        {
          icon: 'fa-solid fa-chalkboard',
          title: 'شرح تفاعلي خطوة بخطوة',
          desc: 'محاكاة حية لسير الأكواد داخل الذاكرة مع عداد للعمليات وتظليل للأسطر أثناء التنفيذ.'
        },
        {
          icon: 'fa-solid fa-print',
          title: 'ملازم PDF جاهزة ومفروزة',
          desc: 'تنسيق A4 نقي خالي من الأزرار وعناصر التحكم، مهيأ للطباعة الورقية المباشرة أو الحفظ بجودة عالية.'
        },
        {
          icon: 'fa-solid fa-laptop-file',
          title: 'أكواد نظيفة ومعتمدة',
          desc: 'أكواد Java قياسية وموثقة باللغة العربية مع مراعاة أفضل ممارسات هندسة البرمجيات والتعقيد.'
        },
        {
          icon: 'fa-solid fa-mobile-screen-button',
          title: 'متوافقة مع كل الأجهزة',
          desc: 'تصميم متجاوب وسريع يعمل بسلاسة على الهواتف، الأجهزة اللوحية، وشاشات المعمل العريضة.'
        }
      ]
    },
    footer: {
      badgeKicker: 'المنصة الأكاديمية والبرمجية الرسمية',
      logoTitle: 'بوابة المحاضرات والمختبرات البرمجية | م. عبدالحميد هلال دعبان',
      descLine1: 'بوابة أكاديمية متكاملة مخصصة للمختبرات التفاعلية وملازم المقررات العملية لطلاب علوم الحاسوب وتكنولوجيا المعلومات (ذكاء اصطناعي، علوم حاسوب، نظم معلومات، تقنية معلومات) · جامعة عدن.',
      labelEng: 'هندسة وبرمجة المنصة:',
      descAuthor: 'م. عبدالحميد هلال دعبان',
      labelRole: 'الصفة:',
      descRole: 'بكالوريوس علوم حاسوب · مدرس الجانب العملي',
      descYear: 'العام الجامعي 2026-2027م',
      labelCourses: 'المقررات والملازم الدراسية:',
      instructorsLine: 'هياكل البيانات والخوارزميات (Java) · أمن المعلومات والتشفير',
      rights: 'جميع حقوق الملكية الفكرية والأكاديمية والبرمجية محفوظة © 2026-2027م',
      credits: 'تصميم وهندسة وتطوير: م. عبدالحميد هلال دعبان · جامعة عدن'
    }
  },
  en: {
    brand: {
      name: 'Programming Lectures Portal',
      role: ''
    },
    nav: {
      home: 'Home',
      courses: 'Academic Courses',
      about: 'About Portal',
      themeTooltip: 'Toggle Theme (Dark / Light)',
      langLabel: 'العربية',
      paletteTooltip: 'Switch Color Palette'
    },
    hero: {
      kicker: 'University Academic Portal',
      badge: 'Comprehensive Programming Lectures & Interactive Labs',
      year: '2026-2027',
      titleLine1: 'Academic Portal for Interactive Handouts',
      titleHighlight: '& Practical Programming Labs',
      desc: 'An academic educational platform offering computer science and software engineering tutorials with a modern hands-on approach—combining live interactive memory simulations with print-ready A4 PDF handouts.',
      stats: [
        { num: '03', label: 'Active Courses', bordered: false },
        { num: '04', label: 'Interactive Labs & Handouts', bordered: true },
        { num: '100%', label: 'Interactive & Free for Students', bordered: true }
      ]
    },
    instructor: {
      name: 'Eng. Abdulhamid Helal Daban',
      subtitle: 'B.Sc. in Computer Science · Practical Lab Instructor',
      profileBtnLabel: 'Academic Profile & Contact',
      phone: '+967 778123807',
      email: 'abdalhmmeddaban@gmail.com',
      meta: [
        { icon: 'fa-solid fa-user-graduate', label: 'Degree:', value: 'B.Sc. in Computer Science' },
        { icon: 'fa-solid fa-chalkboard-user', label: 'Role:', value: 'Programming Labs & Practical Instructor' },
        { icon: 'fa-solid fa-layer-group', label: 'Students:', value: 'Artificial Intelligence (AI) · CS · IS · IT' },
        { icon: 'fa-solid fa-building-columns', label: 'Institution:', value: 'University of Aden' }
      ]
    },
    coursesSection: {
      title: 'Academic Courses & Lab Handouts',
      subtitle: 'Explore available course modules with direct access to live interactive simulations or print-ready A4 PDF handouts.',
      badge: 'Practical Courses & Labs',
      btnInteractive: 'Interactive Lab',
      btnPdf: 'PDF Handout (EN)',
      courses: [
        {
          id: 'ds',
          themeClass: 'theme-ds',
          icon: 'fa-solid fa-diagram-project',
          title: 'Data Structures & Algorithms',
          subtitle: 'Interactive Programming Lab & Practical Implementations in Java · Course Instructor: Eng. Abdulhamid Helal Daban',
          tagIcon: 'fa-brands fa-java',
          tagText: 'Java · Data Structures',
          lectures: [
            {
              id: 'ds-lec-01',
              numberTag: 'Lecture 01',
              topicTag: 'Arrays & Big-O',
              title: 'Arrays in Java & Algorithm Complexity Analysis',
              desc: 'In-depth visual guide to 1D & 2D array architecture in physical memory, covering core operations (Access, Update, Sum, Linear Search, Insertion, Deletion with memory shifting, Bubble Sort) and Big-O complexity.',
              meta: [
                { icon: 'fa-solid fa-chalkboard-user', text: 'Course Instructor: Eng. Abdulhamid Daban' },
                { icon: 'fa-solid fa-layer-group', text: 'Memory & Complexity Sim' },
                { icon: 'fa-brands fa-java', text: 'Java SE' }
              ],
              interactiveRoute: '/courses/data-structures/lecture-01',
              pdfUrl: 'courses/data-structures/lecture-01/print-pdf.html'
            },
            {
              id: 'ds-lec-02',
              numberTag: 'Lecture 02',
              topicTag: '2D Arrays & Matrices',
              title: '2D Arrays & Matrices in Java: Memory Architecture & Grid Algorithms',
              desc: 'Interactive simulation of Java Heap Array-of-Arrays vs. Row-Major addressing, Jagged Arrays, and 9 matrix algorithms (Row/Col Sums, Staircase Search in O(R+C), Diagonals in O(N), In-Place Transpose, Flip, and Spiral Traversal).',
              meta: [
                { icon: 'fa-solid fa-chalkboard-user', text: 'Course Instructor: Eng. Abdulhamid Daban' },
                { icon: 'fa-solid fa-table-cells', text: '9 Matrix Algorithms' },
                { icon: 'fa-brands fa-java', text: 'Java SE' }
              ],
              interactiveRoute: '/courses/data-structures/lecture-02',
              pdfUrl: 'courses/data-structures/lecture-02/print-pdf.html'
            }
          ]
        },
        {
          id: 'cyber',
          themeClass: 'theme-cyber',
          icon: 'fa-solid fa-shield-halved',
          title: 'Cybersecurity & Cryptography',
          subtitle: 'Security Algorithms Engineering Lab for 3rd Year CS Students · Course Instructor: Eng. Abdulhamid Helal Daban',
          tagIcon: 'fa-solid fa-shield-cat',
          tagText: 'Java · Cybersecurity',
          lectures: [
            {
              id: 'cyber-lec-01',
              numberTag: 'Lecture 01',
              topicTag: 'Cryptography & Security',
              title: 'Foundations of Cryptography & Security Algorithms',
              desc: 'Advanced interactive study covering CIA triad, Kerckhoffs principle, modular arithmetic, and live simulation of 7 core algorithms (Caesar, OTP, AES, RSA, Diffie-Hellman, SHA-256, Digital Signatures).',
              meta: [
                { icon: 'fa-solid fa-chalkboard-user', text: 'Course Instructor: Eng. Abdulhamid Daban' },
                { icon: 'fa-solid fa-shield-halved', text: '7 Security Algorithms' },
                { icon: 'fa-solid fa-lock', text: 'Block & Stream Ciphers' }
              ],
              interactiveRoute: '/courses/cybersecurity/lecture-01',
              pdfUrl: 'courses/cybersecurity/lecture-01/print-pdf.html'
            }
          ]
        },
        {
          id: 'unity-2d',
          themeClass: 'theme-amber',
          icon: 'fa-brands fa-unity',
          title: 'Unity 2D Game Development',
          subtitle: 'Practical Game Development Lab & 2D Simulations · Course Instructor: Eng. Mohammed Ali',
          tagIcon: 'fa-brands fa-unity',
          tagText: 'Unity 2D · C# & Game Dev',
          lectures: [
            {
              id: 'unity-lec-01',
              numberTag: 'Lecture 01',
              topicTag: 'Tilemap & Rule Tile & 2D Animation',
              title: 'Tilemap Creation, Rule Tile World Building & 2D Sprite Animation',
              desc: 'Comprehensive hands-on lab covering 2D level design: Grid/Tilemap hierarchy, Pixel Art filtering & PPU settings, 3x3 neighbor Rule Tile automation, Composite 2D physics collision, and Sprite Animation clip pipelines.',
              meta: [
                { icon: 'fa-solid fa-chalkboard-user', text: 'Instructor: Eng. Mohammed Ali' },
                { icon: 'fa-solid fa-wand-magic-sparkles', text: 'Interactive Rule Tile & Animation Sim' },
                { icon: 'fa-brands fa-unity', text: 'Unity 2D Engine' }
              ],
              interactiveRoute: '/courses/unity-game-dev/lecture-01',
              pdfUrl: 'courses/unity-game-dev/lecture-01/print-pdf.html'
            }
          ]
        }
      ]
    },
    featuresSection: {
      title: 'What Makes This Academic Platform Unique?',
      subtitle: 'Designed specifically to simplify complex practical computer science concepts and bridge theory with code.',
      items: [
        {
          icon: 'fa-solid fa-chalkboard',
          title: 'Step-by-Step Interactive Simulation',
          desc: 'Live visualization of code execution in memory with real-time operation counters and line highlighting.'
        },
        {
          icon: 'fa-solid fa-print',
          title: 'Print-Ready A4 PDF Handouts',
          desc: 'Clean A4 academic layout free of UI clutter, tailored for direct paper printing or high-quality PDF export.'
        },
        {
          icon: 'fa-solid fa-laptop-file',
          title: 'Clean & Standard Codebase',
          desc: 'Standard documented Java implementations following software engineering best practices and complexity bounds.'
        },
        {
          icon: 'fa-solid fa-mobile-screen-button',
          title: 'Fully Responsive Across Devices',
          desc: 'Fast, adaptive layout running smoothly on smartphones, tablets, and wide laboratory projectors.'
        }
      ]
    },
    footer: {
      badgeKicker: 'Official Academic & Computing Platform',
      logoTitle: 'Programming Lectures & Labs Portal | Eng. Abdulhamid Helal Daban',
      descLine1: 'An open academic resource providing interactive computing environments, algorithm visualizers, and print-ready lecture handouts for computer science and engineering students (AI, CS, IS, IT) · University of Aden.',
      labelEng: 'Architecture, UI & System Engineering:',
      descAuthor: 'Eng. Abdulhamid Helal Daban',
      labelRole: 'Role:',
      descRole: 'B.Sc. in Computer Science · Practical Lab Instructor',
      descYear: 'Academic Year 2026-2027',
      labelCourses: 'Course Curricula & Authoring:',
      instructorsLine: 'Data Structures & Algorithms · Cybersecurity & Cryptography',
      rights: 'All Website, Architectural, Academic & Software Rights Reserved © 2026-2027',
      credits: 'Designed, Engineered & Authored by: Eng. Abdulhamid Helal Daban · University of Aden'
    }
  }
}
