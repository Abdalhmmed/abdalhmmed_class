/**
 * بيانات ومحتوى مختبر الأمن السيبراني (سنة ثالثة علوم حاسوب)
 * إعداد: م. عبدالحميد هلال دعبان
 */

export const CYBER_META = {
  courseTitle: 'مقرر الأمن السيبراني (سنة ثالثة علوم حاسوب)',
  courseTitleEn: 'Cybersecurity Course (3rd Year Computer Science)',
  author: 'م. عبدالحميد هلال دعبان',
  authorEn: 'Eng. Abdulhamid Helal Daban',
  year: '2026-2027م',
  heroH1: 'أسس علم التشفير وهندسة الخوارزميات الأمنية\nمختبر المحاكاة التفاعلي والتحليل الرياضي الشامل',
  heroH1En: 'Foundations of Cryptography & Security Algorithms Engineering\nAdvanced Interactive Simulation & Comprehensive Mathematical Analysis',
  heroP: 'شرح تفاعلي يجمع بين النماذج الرياضية الصارمة (الحساب النمطي، مشكلة اللوغاريتم المنفصل، وتبديلات S-Box) وبين التطبيق البرمجي الحي بلغة Java. كل عملية تشفيرية تُعرض في 3 شرائح: الفكرة والتأصيل الرياضي، التنفيذ البصري خطوة بخطوة، ثم التحليل الأمني ومقاومة الهجمات.',
  heroPEn: 'An advanced interactive laboratory blending rigorous discrete mathematics (Modular Arithmetic, DLP, S-Box SPN substitutions) with live Java cryptographic execution. Each algorithm is broken into 3 slides: mathematical foundation, visual register tracing, and attack resistance analysis.'
}

export const CYBER_FOUNDATIONS = {
  kerckhoffs: {
    title: 'مبدأ كيركهوفس الذهبي (Kerckhoffs\'s Principle)',
    titleEn: 'Kerckhoffs\'s Golden Principle',
    quote: '«يجب أن يكون أمان النظام التشفيري مبنياً بالكامل على سرية المفتاح (Key)، وليس على سرية الخوارزمية (Algorithm).»',
    quoteEn: '"A cryptosystem should be secure even if everything about the system, except the key, is public knowledge."',
    desc: 'في علوم الحاسوب والسايبر، الخوارزميات (مثل AES, RSA, SHA-256) كلها خوارزميات مفتوحة المصدر ومنشورة عالمياً للتدقيق من قبل العلماء ومختبري الاختراق. الأمان الحقيقي هو في حجم وصعوبة تخمين المفتاح السري، وفكرة "الأمان عبر الإخفاء" (Security through Obscurity) هي وهم هندسي خطير.',
    descEn: 'In modern cyber engineering, algorithms like AES, RSA, and SHA are completely open-source and audited by cryptanalysts. Real security relies solely on keyspace size and entropy. Security through Obscurity is a catastrophic anti-pattern.'
  },
  triad: [
    {
      title: 'مثلث الأمان CIA Triad',
      titleEn: 'CIA Security Triad',
      icon: 'fa-shield-cat',
      color: 'var(--brand)',
      desc: '• السرية (Confidentiality): منع غير المصرح لهم من القراءة (التشفير المتماثل وغير المتماثل).\n• السلامة (Integrity): ضمان عدم التلاعب بالبيانات (دوال الهاش SHA).\n• الإتاحة (Availability): توافر النظام دون تعطل.',
      descEn: '• Confidentiality: Protect data from unauthorized viewing (Symmetric & Asymmetric Encryption).\n• Integrity: Prevent unauthorized tampering (SHA Hash functions).\n• Availability: Ensure reliable and timely access.'
    },
    {
      title: 'الحساب النمطي (Modular Arithmetic)',
      titleEn: 'Modular Arithmetic',
      icon: 'fa-clock-rotate-left',
      color: 'var(--accent)',
      desc: 'ساعة الأعداد الدائرية Z_m: إذا تجاوز العدد قيمة m نأخذ باقي القسمة فقط. هو أساس خوارزميات التشفير لأن العمليات الحسابية تظل محصورة داخل مدى محدد دون حدوث فيضان ذاكرة (Overflow).',
      descEn: 'Circular clock arithmetic in Z_m: wrapping values modulo m. It forms the mathematical backbone of cryptography, bounding computation within registers and preventing memory overflow.'
    },
    {
      title: 'عملية XOR (⊕) السحرية',
      titleEn: 'The Magical XOR (⊕) Operation',
      icon: 'fa-bolt',
      color: 'var(--ok)',
      desc: 'العمود الفقري لتشفير التدفق والكتل: A ⊕ B ⊕ B = A. إذا شفرنا النص بالمفتاح عبر XOR، فإن إعادة تطبيق XOR بالمفتاح نفسه تعيد النص الأصلي فوراً بسرعة فائقة في مسجلات المعالج.',
      descEn: 'The cornerstone of stream and block ciphers: A ⊕ B ⊕ B = A. Re-applying XOR with the exact same key immediately restores the original plaintext at CPU register clock speeds.'
    }
  ]
}

export const CYBER_FLASHCARDS = [
  {
    question: 'س1: لماذا يعتبر مبدأ كيركهوفس (Kerckhoffs\'s Principle) حجر الزاوية في التشفير الحديث؟',
    questionEn: 'Q1: Why is Kerckhoffs\'s Principle considered the cornerstone of modern cryptography?',
    answer: 'لأن خوارزميات التشفير (مثل AES و RSA) تكون منشورة ومفتوحة المصدر عالمياً لتدقيقها واختبارها. يرتكز الأمان بالكامل على سرية المفتاح (Key)، فإذا سُرقت الخوارزمية لا يخترق النظام، بينما الاعتماد على إخفاء الخوارزمية (Security through Obscurity) وهم خطير يسقط فور الهندسة العكسية.',
    answerEn: 'Because cryptographic algorithms (e.g., AES, RSA) are globally public and peer-audited. System security rests entirely on key secrecy. If the code is leaked or reverse-engineered, security is unaffected—unlike the flawed "Security through Obscurity" doctrine.',
    iconColor: 'var(--brand)'
  },
  {
    question: 'س2: ما الفرق الجوهري في التطبيق بين التشفير المتماثل (AES) والتشفير غير المتماثل (RSA)؟',
    questionEn: 'Q2: What is the fundamental operational difference between Symmetric (AES) and Asymmetric (RSA) encryption?',
    answer: 'يستخدم <b>AES</b> نفس المفتاح السري المشترك للتشفير وفك التشفير، ويتميز بسرعة معالجة هائلة تناسب البيانات الضخمة (Gigabytes). أما <b>RSA</b> فيستخدم زوج مفاتيح (عام للتشفير وخاص لفك التشفير)، وهو أبطأ بنحو 1000 مرة، لذا يُستخدم فقط في تبادل مفاتيح الجلسة أو التوقيع الرقمي (Hybrid Cryptography).',
    answerEn: '<b>AES</b> uses one shared secret key for encryption and decryption with immense throughput ideal for bulk payload. <b>RSA</b> uses a mathematically linked keypair (public to encrypt, private to decrypt) but is ~1000x slower, making it tailored for key exchange and digital signatures (Hybrid Cryptography).',
    iconColor: 'var(--accent)'
  },
  {
    question: 'س3: ما هو أثر الانهيار الثلجي (Avalanche Effect) في دوال الهاش مثل SHA-256؟',
    questionEn: 'Q3: What is the Avalanche Effect in cryptographic hash functions like SHA-256?',
    answer: 'خاصية تشفيرية تعني أن أي تغيير طفيف في المدخلات (ولو كان بتاً واحداً فقط أو حرفاً صغيراً بدلاً من كبير) يؤدي إلى تغيير جذري وغير متوقع في أكثر من 50% من بتات الهاش الناتجة، مما يمنع المهاجم من التنبؤ بأي نمط بين الرسائل وبصماتها.',
    answerEn: 'A vital cryptographic property where flipping even a single input bit causes over 50% of output digest bits to mutate pseudo-randomly, completely frustrating pattern prediction and differential cryptanalysis.',
    iconColor: 'var(--ok)'
  }
]

export const CYBER_QUIZ_QUESTIONS = [
  {
    title: 'ما الخوارزمية الوحيدة التي أثبت كلود شانون أنها تحقق السرية المطلقة رياضياً (Perfect Secrecy)؟',
    titleEn: 'Which is the only cipher mathematically proven by Claude Shannon to achieve Perfect Secrecy?',
    options: [
      { text: 'شفرة قيصر (Caesar Cipher)', textEn: 'Caesar Cipher', correct: false },
      { text: 'لوحة المرة الواحدة (One-Time Pad / XOR)', textEn: 'One-Time Pad (OTP / XOR)', correct: true },
      { text: 'خوارزمية RSA-2048', textEn: 'RSA-2048 Algorithm', correct: false },
      { text: 'معيار DES القديم', textEn: 'Legacy DES Standard', correct: false }
    ]
  },
  {
    title: 'في التوقيع الرقمي (Digital Signature)، بأي مفتاح يوقع المرسل بصمة الوثيقة لضمان عدم الإنكار؟',
    titleEn: 'In Digital Signatures, which key must the sender use to sign the document hash for Non-Repudiation?',
    options: [
      { text: 'بالمفتاح العام للمستقبل (Receiver Public Key)', textEn: 'Receiver\'s Public Key', correct: false },
      { text: 'بمفتاح AES المتماثل السري المشترك', textEn: 'Shared Symmetric AES Key', correct: false },
      { text: 'بالمفتاح الخاص السري للمرسل (Sender Private Key)', textEn: 'Sender\'s Private Key', correct: true },
      { text: 'بالمفتاح العام للمرسل (Sender Public Key)', textEn: 'Sender\'s Public Key', correct: false }
    ]
  },
  {
    title: 'ما الهدف الأساسي من تطبيق مرحلة SubBytes في كل جولة من معيار التشفير المتقدم AES؟',
    titleEn: 'What is the primary cryptographic purpose of the SubBytes transformation in AES rounds?',
    options: [
      { text: 'إحداث استبدال غير خطي يحقق التشويش (Confusion) ضد التحليل الخطي', textEn: 'Non-linear S-Box substitution achieving Confusion against linear cryptanalysis', correct: true },
      { text: 'إزاحة الصفوف وتشتيت البتات لتحقيق الانتشار (Diffusion)', textEn: 'Row shifting for bit Diffusion', correct: false },
      { text: 'ضغط حجم الكتلة من 256 بت إلى 128 بت', textEn: 'Compressing block size from 256 to 128 bits', correct: false },
      { text: 'توليد مفاتيح عشوائية جديدة للجولات', textEn: 'Generating dynamic round subkeys', correct: false }
    ]
  }
]
