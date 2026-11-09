import { Recorder } from '@/core/recorder'

/**
 * بيانات ومحاكاة خوارزميات التشفير السبع لمقرر الأمن السيبراني (Vue 3 Architecture)
 */

export const CYBER_OPS = [
  {
    key: 'caesar',
    name: { ar: 'شفرة قيصر والتحليل التكراري', en: 'Caesar Cipher & Frequency Analysis' },
    badge: 'Historical / Shift',
    big: 'O(n)',
    head: {
      ar: 'شفرة قيصر (Caesar Cipher): الإزاحة النمطية C = (P + k) mod 26',
      en: 'Caesar Cipher: Modular Shift C = (P + k) mod 26'
    },
    text: {
      ar: 'أقدم شفرة تاريخية بديلة، تُزاح فيها حروف النص الصريح بمقدار ثابت k في حلقة الأبجدية (26 حرفاً).',
      en: 'The classic substitution cipher shifting plaintext characters by a fixed displacement k in the 26-letter modulo alphabet.'
    },
    steps: {
      ar: [
        'تحويل الحرف إلى رقمه الترتيبي: A=0, B=1, ... Z=25.',
        'إضافة المفتاح السري k مع تطبيق باقي القسمة: C = (P + k) mod 26.',
        'تحويل الرقم الناتج مرة أخرى إلى الحرف المشفر المقابل.',
        'فك التشفير يتم بعكس العملية: P = (C - k + 26) mod 26.'
      ],
      en: [
        'Convert character to alphabetical index: A=0, B=1, ... Z=25.',
        'Add secret key k under modulo 26: C = (P + k) mod 26.',
        'Convert the resulting integer back to ciphertext character.',
        'Decryption inverts the shift: P = (C - k + 26) mod 26.'
      ]
    },
    analogy: {
      ar: 'مثل قرص ساعة يحتوي 26 حرفاً: تدير المؤشر للأمام بمقدار k خطوة لكل حرف، ولإعادته تديره للخلف بنفس المقدار.',
      en: 'Like a 26-position clock face: advance the needle by k ticks for each letter; rewind by k ticks to decrypt.'
    },
    code: {
      ar: [
        'public static String encryptCaesar(String text, int k) {',
        '    StringBuilder result = new StringBuilder();',
        '    for (char c : text.toCharArray()) {',
        '        int p = c - \'A\';',
        '        int cVal = (p + k) % 26;',
        '        result.append((char) (\'A\' + cVal));',
        '    }',
        '    return result.toString();',
        '}'
      ],
      en: [
        'public static String encryptCaesar(String text, int k) {',
        '    StringBuilder result = new StringBuilder();',
        '    for (char c : text.toCharArray()) {',
        '        int p = c - \'A\';',
        '        int cVal = (p + k) % 26;',
        '        result.append((char) (\'A\' + cVal));',
        '    }',
        '    return result.toString();',
        '}'
      ]
    },
    inputs: [
      ['text', { ar: 'النص الصريح (A-Z)', en: 'Plaintext (A-Z)' }, 'SECURITY'],
      ['k', { ar: 'المفتاح k (الإزاحة)', en: 'Shift Key k' }, 3]
    ],
    gen(p, lang = 'ar') {
      const isEn = lang === 'en'
      const txt = (p.text || 'SECURITY').toUpperCase().replace(/[^A-Z]/g, '') || 'SECURITY'
      const k = (((p.k || 3) % 26) + 26) % 26
      const r = Recorder({ a: txt.split(''), b: Array(txt.length).fill('?') })
      r.v.k = k
      r.push(0, isEn ? `Begin encrypting plaintext "${txt}" with shift key k = ${k}.` : `نبدأ تشفير النص "${txt}" بمفتاح إزاحة k = ${k}.`)

      for (let i = 0; i < txt.length; i++) {
        const ch = txt[i]
        const pVal = ch.charCodeAt(0) - 65
        const cVal = (pVal + k) % 26
        const cChar = String.fromCharCode(65 + cVal)
        r.c.ops++
        r.v.char = ch
        r.v.p = pVal
        r.v.c = cVal

        r.push(3, isEn ? `Character '${ch}' has value P = ${pVal}. Applying formula (${pVal} + ${k}) mod 26.` : `الحرف '${ch}' رقمه P = ${pVal}. نطبق القانون (${pVal} + ${k}) mod 26.`, {
          cls: { [i]: 'active' },
          ptr: { [i]: `P=${pVal}` }
        })

        r.b[i] = cChar
        r.push(5, isEn ? `Result = ${cVal} mapped to '${cChar}'. Ciphertext character placed.` : `الناتج = ${cVal} المقابل للحرف '${cChar}'. أصبح الحرف المشفر جاهزاً.`, {
          cls: { [i]: 'done' },
          ptr: { [i]: ch },
          bcls: { [i]: 'found' },
          bptr: { [i]: cChar }
        })
      }
      r.push(7, isEn ? `Ciphertext generated successfully ➔ "${r.b.join('')}". Keyspace is only 25, trivially cracked in milliseconds.` : `اكتمل تشفير النص بالكامل ➔ "${r.b.join('')}". فضاء المفاتيح هو 25 فقط مما يجعلها عرضة للكسر في ثوانٍ.`, {
        bcls: Object.fromEntries(txt.split('').map((_, idx) => [idx, 'found']))
      })
      return r.S
    },
    cases: [
      {
        title: { ar: 'O(n) - خطي', en: 'O(n) - Linear' },
        desc: {
          ar: 'تشفير كل حرف يتم بزمن ثابت O(1)، لذا التعقيد الكلي خطي بالنسبة لطول النص.',
          en: 'Constant time O(1) per character; overall computational complexity is strictly O(n).'
        }
      },
      {
        title: { ar: 'O(26) = O(1) فضاء المفاتيح', en: 'O(26) Keyspace' },
        desc: {
          ar: 'فضاء المفاتيح صغير جداً (25 تجربة فقط) مما يجعل الهجوم بالقوة الغاشمة لحظياً.',
          en: 'Trivially small keyspace of 25 shifts; broken instantaneously via brute-force exhaustive search.'
        }
      },
      {
        title: { ar: 'التحليل التكراري (Frequency Analysis)', en: 'Frequency Analysis' },
        desc: {
          ar: 'تكرار الحروف لا يتغير: الحرف الأكثر تكراراً في الإنجليزية (E) يكشف المفتاح فوراً دون تجربة.',
          en: 'Letter frequency distribution is preserved; peak letter E immediately reveals the shift.'
        }
      }
    ],
    security: {
      ar: 'غير آمنة بتاتاً في العصر الحديث؛ وتستخدم فقط لتعليم مفاهيم الحساب النمطي لطلبة الحاسوب.',
      en: 'Completely obsolete for security; preserved strictly for discrete modular arithmetic pedagogy.'
    }
  },
  {
    key: 'otp_xor',
    name: { ar: 'تشفير التدفق ونظرية لوحة المرة الواحدة', en: 'Stream Cipher & One-Time Pad (OTP)' },
    badge: 'Stream / OTP',
    big: 'O(n)',
    head: {
      ar: 'تشفير التدفق (One-Time Pad & Stream XOR Cipher)',
      en: 'Stream XOR Cipher & One-Time Pad'
    },
    text: {
      ar: 'تطبيق عملية الجمع البتي XOR (⊕) بين بتات النص الصريح ومفتاح عشوائي حقيقي بنفس الطول.',
      en: 'Bitwise exclusive-OR (XOR ⊕) between plaintext bytes and a true random key stream of identical length.'
    },
    steps: {
      ar: [
        'تحويل الحرف إلى تمثيله الثنائي (Binary ASCII 8-bit).',
        'توليد بتات مفتاح عشوائي حقيقي (Pseudorandom / TRNG).',
        'إجراء عملية XOR بتياً: C_i = P_i ⊕ K_i.',
        'فك التشفير بمطابقة XOR ثانية: P_i = C_i ⊕ K_i.'
      ],
      en: [
        'Convert characters into 8-bit binary ASCII representation.',
        'Generate true random key stream bytes (TRNG).',
        'Execute bitwise XOR: C_i = P_i ⊕ K_i.',
        'Invert symmetrically via second XOR: P_i = C_i ⊕ K_i.'
      ]
    },
    analogy: {
      ar: 'مثل قفل سحري ثنائي: إذا كان بت المفتاح 1 يقلب البت (0 يصبح 1 و 1 يصبح 0)، وعند تطبيقه ثانية يعود لأصله.',
      en: 'A binary toggle lock: XORing with 1 inverts the bit; applying it a second time perfectly restores the original state.'
    },
    code: {
      ar: [
        'public static byte[] xorCipher(byte[] data, byte[] key) {',
        '    byte[] cipher = new byte[data.length];',
        '    for (int i = 0; i < data.length; i++) {',
        '        cipher[i] = (byte) (data[i] ^ key[i]); // XOR خطوة واحدة',
        '    }',
        '    return cipher;',
        '}'
      ],
      en: [
        'public static byte[] xorCipher(byte[] data, byte[] key) {',
        '    byte[] cipher = new byte[data.length];',
        '    for (int i = 0; i < data.length; i++) {',
        '        cipher[i] = (byte) (data[i] ^ key[i]); // Single-cycle XOR',
        '    }',
        '    return cipher;',
        '}'
      ]
    },
    inputs: [
      ['text', { ar: 'النص الصريح', en: 'Plaintext' }, 'CYBER']
    ],
    gen(p, lang = 'ar') {
      const isEn = lang === 'en'
      const txt = (p.text || 'CYBER').slice(0, 6)
      const keys = [0x5a, 0x1f, 0xc3, 0x77, 0x2e, 0x9d]
      const r = Recorder({ a: txt.split(''), b: Array(txt.length).fill('?') })
      r.push(0, isEn ? `OTP Stream Cipher with XOR for "${txt}". Each character is 8 bits.` : `تشفير التدفق OTP بالـ XOR للنص "${txt}". كل حرف يُمثل بـ 8 بتات.`)

      for (let i = 0; i < txt.length; i++) {
        const pByte = txt.charCodeAt(i)
        const kByte = keys[i % keys.length]
        const cByte = pByte ^ kByte
        const pBin = pByte.toString(2).padStart(8, '0')
        const kBin = kByte.toString(2).padStart(8, '0')
        const cBin = cByte.toString(2).padStart(8, '0')

        r.c.ops += 8
        r.v.char = txt[i]
        r.v.pBin = pBin
        r.v.kBin = kBin
        r.v.cBin = cBin
        r.push(3, isEn ? `Character '${txt[i]}' in binary: ${pBin} with key K = ${kBin}.` : `الحرف '${txt[i]}' ثنائياً: ${pBin} والمفتاح K = ${kBin}.`, {
          cls: { [i]: 'active' },
          ptr: { [i]: 'P' }
        })

        r.b[i] = '0x' + cByte.toString(16).toUpperCase()
        r.push(4, isEn ? `${pBin} ⊕ ${kBin} = ${cBin} (Hex: ${r.b[i]}). Instant hardware XOR execution in ALU registers!` : `${pBin} ⊕ ${kBin} = ${cBin} (الست عشري: ${r.b[i]}). عملية فورية في مسجلات المعالج!`, {
          cls: { [i]: 'done' },
          bcls: { [i]: 'found' },
          bptr: { [i]: r.b[i] }
        })
      }
      r.push(6, isEn ? 'Stream encryption complete. Shannon (1949) mathematically proved OTP achieves Perfect Secrecy.' : 'اكتمل تشفير التدفق. برهن العالم كلود شانون (1949) أن شفرة OTP تحقق السرية التامة رياضياً (Perfect Secrecy).')
      return r.S
    },
    cases: [
      {
        title: { ar: 'أمان مطلق رياضياً', en: 'Information-Theoretic Security' },
        desc: {
          ar: 'إذا كان المفتاح عشوائياً حقيقياً، بطول الرسالة، ولا يُستخدم إلا مرة واحدة (One-Time).',
          en: 'Shannon proved OTP provides unconditional security assuming keys are truly random, equal in length, and never reused.'
        }
      },
      {
        title: { ar: 'كارثة إعادة الاستخدام (Key Reuse Disaster)', en: 'Key Reuse Vulnerability' },
        desc: {
          ar: 'إذا شُفرت رسالتان بنفس المفتاح: C₁ ⊕ C₂ = P₁ ⊕ P₂، مما يحذف المفتاح ويكشف الرسائل!',
          en: 'Reusing a pad cancels the key stream: C1 ⊕ C2 = P1 ⊕ P2, exposing plaintexts to statistical cryptanalysis.'
        }
      },
      {
        title: { ar: 'سرعة المعالجة O(n)', en: 'Hardware Acceleration O(n)' },
        desc: {
          ar: 'تعتمد على تعليمة XOR المادية في المعالج التي تستغرق 1 Clock Cycle فقط لكل كلمة.',
          en: 'Executes via native 1-cycle CPU bitwise hardware instructions at gigabit line rates.'
        }
      }
    ],
    security: {
      ar: 'المعيار النظري الأعلى للأمان في العالم، وتستخدم في الخطوط الحمراء الاستخباراتية وشبكات التشفير الكمومي (QKD).',
      en: 'The mathematical gold standard of cryptography, deployed in nuclear hotlines and Quantum Key Distribution (QKD).'
    }
  },
  {
    key: 'aes_block',
    name: { ar: 'مصفوفات التبديل والخلط في AES', en: 'AES Block Cipher (SubBytes & ShiftRows)' },
    badge: 'Block Cipher / AES',
    big: 'O(1)',
    head: {
      ar: 'معمارية تشفير الكتل AES: جولة التبديل SubBytes وإزاحة الصفوف ShiftRows',
      en: 'AES Block Architecture: SubBytes & ShiftRows'
    },
    text: {
      ar: 'يعتمد معيار التشفير المتقدم (AES) على شبكة الاستبدال والتبديل (SPN) بمصفوفة 4×4 بايت لتحقيق مبدأي الشانون: التشويش (Confusion) والانتشار (Diffusion).',
      en: 'Advanced Encryption Standard (AES) operates on a 4x4 State Matrix of 16 bytes over Galois Field GF(2^8) achieving Shannon\'s Confusion and Diffusion.'
    },
    steps: {
      ar: [
        'تمثيل كتلة 128-بت كمصفوفة حالة 4×4 من البايتات (State Matrix).',
        'مرحلة SubBytes: استبدال غير خطي لكل بايت عبر جدول S-Box لإحباط التحليل الخطي.',
        'مرحلة ShiftRows: إزاحة صفوف المصفوفة دائرياً (الصف 0: 0، الصف 1: 1، الصف 2: 2، الصف 3: 3).',
        'مرحلة MixColumns وإضافة مفتاح الجولة AddRoundKey.'
      ],
      en: [
        'Organize 128-bit block into a 4x4 byte State Matrix.',
        'SubBytes: Non-linear byte substitution using cryptographic S-Box to defeat linear cryptanalysis.',
        'ShiftRows: Cyclically rotate rows (Row 0: 0, Row 1: 1, Row 2: 2, Row 3: 3).',
        'MixColumns matrix multiplication in GF(2^8) followed by AddRoundKey.'
      ]
    },
    analogy: {
      ar: 'مثل خلط مكعب روبيك وصبغه بألوان جديدة: كل تحريك يخلط خلايا المصفوفة حتى يستحيل تتبع المكان الأصلي للبايت.',
      en: 'Like scrambling and repainting a Rubik\'s Cube: every round diffuses state bytes until original bits are unlocatable.'
    },
    code: {
      ar: [
        '// جولة AES النموذجية (Round Transformation)',
        'subBytes(state);    // استبدال غير خطي (Confusion)',
        'shiftRows(state);   // إزاحة الصفوف دورياً (Diffusion)',
        'mixColumns(state);  // خلط الأعمدة في حقل غالوا GF(2^8)',
        'addRoundKey(state, roundKey); // دمج مفتاح الجولة بـ XOR'
      ],
      en: [
        '// Standard AES Round Transformation',
        'subBytes(state);    // Non-linear S-Box (Confusion)',
        'shiftRows(state);   // Cyclic Row Shift (Diffusion)',
        'mixColumns(state);  // Matrix Mix in GF(2^8)',
        'addRoundKey(state, roundKey); // Bitwise XOR Subkey'
      ]
    },
    inputs: [],
    gen(p, lang = 'ar') {
      const isEn = lang === 'en'
      const initBytes = ['43', '59', '42', '45', '52', '53', '45', '43', '55', '52', '49', '54', '59', '32', '30', '32']
      const sboxMap = { '43': '1A', '59': 'CB', '42': '2C', '45': '6E', '52': '00', '53': 'ED', '55': 'FC', '49': '3B', '54': '20', '32': '23', '30': '04' }
      const r = Recorder({ a: initBytes })
      r.push(0, isEn ? 'Initial state array for 16-byte (128-bit) block represented in hexadecimal (Hex).' : 'مصفوفة الحالة الابتدائية لكتلة 16 بايت (128 بت) ممثلة بالنظام الست عشري (Hex).')

      r.push(1, isEn ? 'SubBytes Phase: Non-linear substitution of every byte via cryptographic S-Box to defeat differential cryptanalysis.' : 'مرحلة SubBytes: استبدال غير خطي لكل بايت باستخدام S-Box التشفيري لمنع التحليل التفاضلي.', {
        cls: { 0: 'active', 1: 'active', 2: 'active', 3: 'active' }
      })
      const subbed = initBytes.map(b => sboxMap[b] || 'A7')
      r.a = subbed
      r.c.ops += 16
      r.push(1, isEn ? 'All 16 state bytes successfully substituted through S-Box (maximum Confusion achieved).' : 'تم استبدال جميع البايتات الـ 16 بنجاح عبر S-Box (تحقيق Confusion عالي).', {
        cls: Object.fromEntries(subbed.map((_, i) => [i, 'done']))
      })

      r.push(2, isEn ? 'ShiftRows Phase: Row 0 shifted 0, Row 1 shifted 1 left, Row 2 shifted 2 left, Row 3 shifted 3 left.' : 'مرحلة ShiftRows: إزاحة الصف الأول 0 خانات، والصف الثاني خانة لليسار، والثالث خانتين، والرابع 3 خانات.', {
        cls: { 4: 'swap', 5: 'swap', 6: 'swap', 7: 'swap' }
      })
      const shifted = r.a.slice()
      shifted[1] = r.a[5]
      shifted[5] = r.a[9]
      shifted[9] = r.a[13]
      shifted[13] = r.a[1]
      r.a = shifted
      r.c.ops += 4
      r.push(2, isEn ? 'Cyclic row shifts complete! Bytes thoroughly diffused across columns (Diffusion).' : 'اكتملت إزاحة الصفوف دورياً! انتشرت البايتات بين الأعمدة (Diffusion).', {
        cls: { 1: 'found', 5: 'found', 9: 'found', 13: 'found' }
      })

      r.push(4, isEn ? 'After 10 or 14 repeated rounds, every ciphertext bit becomes nonlinearly dependent on all plaintext & key bits.' : 'بعد 10 أو 14 جولة متكررة، يصبح كل بت من النص المشفر معتمداً بطريقة معقدة على كل بت من النص والمفتاح.')
      return r.S
    },
    cases: [
      {
        title: { ar: 'معيار NIST العالمي', en: 'NIST FIPS 197 Standard' },
        desc: {
          ar: 'AES-128 يحتاج 10 جولات، AES-256 يحتاج 14 جولة؛ ولا يوجد هجوم عملي أسرع من القوة الغاشمة.',
          en: '10 rounds for 128-bit, 14 rounds for 256-bit; no known shortcut attack outpaces exhaustive key search.'
        }
      },
      {
        title: { ar: 'الانتشار والتشويش', en: 'Confusion & Diffusion' },
        desc: {
          ar: 'تبديل بايت واحد في النص الأصلي يؤدي إلى تغيير 50% من بايتات الكتلة بالكامل بعد جولتين فقط.',
          en: 'Flipping 1 plaintext byte cascades into altering over 50% of the entire block within 2 rounds.'
        }
      },
      {
        title: { ar: 'تسريع عتادي AES-NI', en: 'Hardware AES-NI Acceleration' },
        desc: {
          ar: 'معالجات Intel و AMD و ARM تحتوي تعليمات مدمجة لتنفيذ الجولة في دورات ساعة معدودة.',
          en: 'Modern CPUs embed dedicated AES instruction extensions processing gigabytes per second.'
        }
      }
    ],
    security: {
      ar: 'المعيار الحكومي والمصرفي الرسمي لحماية البيانات الحساسة على مستوى العالم.',
      en: 'The worldwide gold standard for enterprise, banking, and top-secret classified communications.'
    }
  },
  {
    key: 'rsa_math',
    name: { ar: 'خوارزمية التشفير غير المتماثل RSA', en: 'RSA Asymmetric Cryptosystem' },
    badge: 'Asymmetric / RSA',
    big: 'O(log n)³',
    head: {
      ar: 'خوارزمية RSA: صميم الحسابات الرياضية والمفتاح العام والخاص',
      en: 'RSA Algorithm: Prime Factorization & Modular Exponentiation'
    },
    text: {
      ar: 'أشهر خوارزمية مفتاح عام في تاريخ البشرية (ريفست، شامير، وأدلمان 1977)، تعتمد على صعوبة تحليل الأعداد الكبيرة لعواملها الأولية (Factoring Problem).',
      en: 'The pioneering public-key algorithm (Rivest, Shamir, Adleman 1977) deriving hardness from the prime factorization of large composite integers.'
    },
    steps: {
      ar: [
        'اختيار عددين أوليين سريين p و q، وحساب n = p × q.',
        'حساب دالة أويلر: φ(n) = (p-1)(q-1).',
        'اختيار المفتاح العام e بحيث يكون أولياً نسبياً مع φ(n) (غالباً 65537).',
        'حساب المفتاح الخاص السري d = e⁻¹ mod φ(n) باستخدام خوارزمية إقليدس الموسعة.',
        'التشفير: C = M^e mod n | فك التشفير: M = C^d mod n.'
      ],
      en: [
        'Select secret primes p, q; compute composite modulus n = p * q.',
        'Calculate Euler\'s totient: φ(n) = (p - 1) * (q - 1).',
        'Choose coprime public exponent e (commonly 65537).',
        'Derive private key d = e⁻¹ mod φ(n) using the Extended Euclidean Algorithm.',
        'Encrypt: C = M^e mod n | Decrypt: M = C^d mod n.'
      ]
    },
    analogy: {
      ar: 'مثل قفل مفتوح يوزعه الشخص على الناس (مفتاح عام): يستطيع أي إنسان وضع رسالته وإقفال الصندوق، لكن الشخص صاحب المفتاح الخاص فقط هو من يستطيع فتحه.',
      en: 'An open padlock handed out publicly: anyone can deposit a letter and snap it shut, but only the owner possessing the physical key can unlock it.'
    },
    code: {
      ar: [
        '// التشفير وفك التشفير في RSA بحساب الموديلار',
        'BigInteger C = M.modPow(e, n); // التشفير بالمفتاح العام (e, n)',
        'BigInteger M = C.modPow(d, n); // فك التشفير بالمفتاح الخاص (d, n)',
        '// إيجاد d عبر المعكوس الضربي:',
        'BigInteger d = e.modInverse(phi);'
      ],
      en: [
        '// RSA Modular Exponentiation',
        'BigInteger C = M.modPow(e, n); // Encrypt with Public Key (e, n)',
        'BigInteger M = C.modPow(d, n); // Decrypt with Private Key (d, n)',
        '// Compute private modular inverse:',
        'BigInteger d = e.modInverse(phi);'
      ]
    },
    inputs: [
      ['m', { ar: 'الرسالة الرقمية M (عدد أصغر من n=3233)', en: 'Integer Message M (< 3233)' }, 65]
    ],
    gen(p, lang = 'ar') {
      const isEn = lang === 'en'
      const M = Math.max(2, Math.min(2000, p.m || 65))
      const n = 3233
      const phi = 3120
      const e = 17
      const d = 2753
      const r = Recorder({ a: [M], b: ['?'] })
      r.v.p = 61
      r.v.q = 53
      r.v.n = n
      r.v.phi = phi
      r.v.e = e
      r.v.d = d

      r.push(0, isEn ? `Parameters generated: p=61, q=53 ➔ Public modulus n = 3233 and Euler's totient φ(n) = 3120.` : `تم توليد المعاملات: p=61, q=53 ➔ المعامل العام n = 3233 ودالة أويلر φ(n) = 3120.`)
      r.push(3, isEn ? `Public exponent e = 17. Private exponent d = 17⁻¹ mod 3120 ➔ d = 2753 via Extended Euclidean algorithm.` : `المفتاح العام e = 17. حساب المفتاح الخاص d = 17⁻¹ mod 3120 ➔ d = 2753 عبر إقليدس الموسع.`)

      const C = 2790
      r.c.ops += 17
      r.b[0] = C
      r.push(1, isEn ? `Encryption: C = ${M}^${e} mod ${n} = ${C}. The ciphertext is now a protected integer.` : `التشفير: C = ${M}^${e} mod ${n} = ${C}. أصبح النص المشفر الآن رقماً معقداً.`, {
        cls: { 0: 'active' },
        bcls: { 0: 'found' },
        bptr: { 0: `C=${C}` }
      })

      r.c.ops += 2753
      r.push(2, isEn ? `Decryption: M = ${C}^${d} mod ${n} = ${M}. Plaintext message perfectly recovered using secret private key!` : `فك التشفير: M = ${C}^${d} mod ${n} = ${M}. تم استرجاع الرسالة الأصلية بنجاح عبر المفتاح الخاص السري!`, {
        cls: { 0: 'done' },
        bcls: { 0: 'done' },
        ptr: { 0: `M=${M}` }
      })
      return r.S
    },
    cases: [
      {
        title: { ar: 'معضلة التفكيك الرياضي', en: 'Integer Factorization Problem' },
        desc: {
          ar: 'معرفة n=p×q سهلة، لكن تفكيك n إلى p و q عند حجم 2048-بت يستغرق مليارات السنين بالحواسيب التقليدية.',
          en: 'Computing n=p*q is trivial; reverse-factoring a 2048-bit modulus takes billions of years on classical supercomputers.'
        }
      },
      {
        title: { ar: 'بطء الأداء مقارنة بـ AES', en: '1000x Slower Than AES' },
        desc: {
          ar: 'العمليات الحسابية للأعداد الضخمة تجعل RSA أبطأ بـ 1000 مرة من AES؛ لذا يُستخدم فقط للتشفير الهجين (Hybrid).',
          en: 'Large modular arithmetic renders RSA ~1000x slower than symmetric AES, limiting it to key exchange and signatures.'
        }
      },
      {
        title: { ar: 'تهديد الحوسبة الكمومية', en: 'Quantum Threat (Shor\'s Algorithm)' },
        desc: {
          ar: 'خوارزمية شور قادرة نظرياً على تفكيك n في زمن متعدد الحدود، مما يدفع العالم نحو التشفير ما بعد الكم (PQC).',
          en: 'Shor\'s quantum algorithm will factor RSA moduli in polynomial time, driving the global migration to Post-Quantum Cryptography.'
        }
      }
    ],
    security: {
      ar: 'مفاتيح RSA-2048 معتمدة وآمنة حتى سنة 2030م وفق إرشادات NIST، مع التوصية بالانتقال لمفاتيح 3072 أو خوارزميات ECC و PQC.',
      en: 'RSA-2048 remains NIST-compliant through 2030, with recommendations to migrate to 3072-bit, ECC, and lattice-based PQC.'
    }
  },
  {
    key: 'diffie_hellman',
    name: { ar: 'تبادل المفاتيح الآمن ديفي-هيلمان', en: 'Diffie-Hellman Key Exchange (DH/ECDH)' },
    badge: 'Key Exchange / DH',
    big: 'O(log p)',
    head: {
      ar: 'بروتوكول تبادل المفاتيح ديفي-هيلمان (Diffie-Hellman Key Exchange)',
      en: 'Diffie-Hellman Key Exchange Protocol'
    },
    text: {
      ar: 'أول بروتوكول مكّن طرفين (أليس وبوب) من الاتفاق على مفتاح سري مشترك عبر قناة اتصال عامة ومكشوفة بالكامل للتنصت دون إرسال المفتاح نفسه إطلاقاً.',
      en: 'The breakthrough protocol allowing two parties to negotiate a shared secret over an insecure, monitored channel without transmitting the key.'
    },
    steps: {
      ar: [
        'الاتفاق علناً على أساس g وعدد أولي ضخم p.',
        'أليس تختار سراً a وتحسب العام A = g^a mod p وترسله لبوب.',
        'بوب يختار سراً b ويحسب العام B = g^b mod p ويرسله لأليس.',
        'المفتاح المشترك يحسبه الطرفان بنفس النتيجة: K = B^a mod p = A^b mod p = g^(ab) mod p.'
      ],
      en: [
        'Agree publicly on prime modulus p and generator base g.',
        'Alice picks secret a, computes public A = g^a mod p, and sends it to Bob.',
        'Bob picks secret b, computes public B = g^b mod p, and sends it to Alice.',
        'Both derive the identical secret key: K = B^a mod p = A^b mod p = g^(ab) mod p.'
      ]
    },
    analogy: {
      ar: 'مثل خلط الألوان: يتفقان على لون أساسي عام (أصفر)، يضيف كل منهما لوناً سرياً خاصاً به (أزرق وأحمر). يتبادلان المزيج علناً، ثم يضيف كل طرف لونه السري، فيحصل كلاهما على نفس اللون البني المشترك دون أن يعرف المتنصت التركيبة السرية!',
      en: 'Color mixing analogy: Alice and Bob start with public yellow, add their secret red and blue paints, exchange the murky mixtures publicly, and add their private color again to reach the identical secret brown.'
    },
    code: {
      ar: [
        '// طرف أليس (Alice):',
        'BigInteger A = g.modPow(a, p); // ترسل A لبوب',
        'BigInteger secretKeyAlice = B.modPow(a, p); // تحسب المفتاح المشترك',
        '// طرف بوب (Bob):',
        'BigInteger B = g.modPow(b, p); // يرسل B لأليس',
        'BigInteger secretKeyBob = A.modPow(b, p); // يحسب نفس المفتاح!'
      ],
      en: [
        '// Alice side:',
        'BigInteger A = g.modPow(a, p); // Transmit A to Bob',
        'BigInteger secretKeyAlice = B.modPow(a, p); // Derive shared key',
        '// Bob side:',
        'BigInteger B = g.modPow(b, p); // Transmit B to Alice',
        'BigInteger secretKeyBob = A.modPow(b, p); // Arrive at identical key!'
      ]
    },
    inputs: [],
    gen(p, lang = 'ar') {
      const isEn = lang === 'en'
      const prime = 23
      const g = 5
      const a = 6
      const b = 15
      const A = 8
      const B = 19
      const K = 2
      const r = Recorder({ a: [isEn ? 'Alice: a=6' : 'أليس: a=6'], b: [isEn ? 'Bob: b=15' : 'بوب: b=15'] })
      r.v.p = prime
      r.v.g = g
      r.v.a = a
      r.v.b = b
      r.v.A = A
      r.v.B = B

      r.push(0, isEn ? `Public parameters broadcast openly: prime p = ${prime} and base generator g = ${g}. Eve sees both clearly.` : `المعاملات المعلنة للجميع: العدد الأولي p = ${prime} والأساس g = ${g}. المتنصت يراها بكل وضوح.`)
      r.c.ops++
      r.push(1, isEn ? `Alice calculates public value: A = ${g}^${a} mod ${prime} = ${A}, and transmits it over public channel to Bob.` : `أليس تحسب قيمتها العامة: A = ${g}^${a} mod ${prime} = ${A}، وترسلها لبوب في القناة العامة.`, {
        cls: { 0: 'active' },
        ptr: { 0: `A=${A}` }
      })
      r.c.ops++
      r.push(3, isEn ? `Bob calculates public value: B = ${g}^${b} mod ${prime} = ${B}, and transmits it publicly to Alice.` : `بوب يحسب قيمته العامة: B = ${g}^${b} mod ${prime} = ${B}، ويرسلها لأليس علناً.`, {
        bcls: { 0: 'active' },
        bptr: { 0: `B=${B}` }
      })

      r.c.ops += 2
      r.v.K = K
      r.a = [isEn ? `Alice's Key: ${K}` : `مفتاح أليس: ${K}`]
      r.b = [isEn ? `Bob's Key: ${K}` : `مفتاح بوب: ${K}`]
      r.push(2, isEn ? `Mathematical Elegance: Alice computes B^a mod p = ${B}^${a} mod ${prime} = ${K}. Bob computes A^b mod p = ${A}^${b} mod ${prime} = ${K}. Both share identical secret key ${K}!` : `السحر الرياضي: أليس تحسب B^a mod p = ${B}^${a} mod ${prime} = ${K}. وبوب يحسب A^b mod p = ${A}^${b} mod ${prime} = ${K}. كلاهما توصلا لنفس المفتاح السري ${K}!`, {
        cls: { 0: 'found' },
        bcls: { 0: 'found' },
        ptr: { 0: 'K=2' },
        bptr: { 0: 'K=2' }
      })
      return r.S
    },
    cases: [
      {
        title: { ar: 'مشكلة اللوغاريتم المنفصل (DLP)', en: 'Discrete Logarithm Problem (DLP)' },
        desc: {
          ar: 'المتنصت يعرف g و p و A و B، لكن إيجاد a من A = g^a mod p عملية مستحيلة حسابياً في الأعداد الضخمة.',
          en: 'Solving for private exponent a given g^a mod p is computationally intractable for 2048-bit primes.'
        }
      },
      {
        title: { ar: 'هجوم رجل في المنتصف (MitM)', en: 'Man-in-the-Middle (MitM)' },
        desc: {
          ar: 'بروتوكول DH المجرد لا يوفر التحقق من الهوية؛ ويجب دمجه مع شهادات وتواقيع رقمية لمنع انتحال الشخصية.',
          en: 'Pure DH lacks authentication; it must be bound with digital certificates to foil active MitM interception.'
        }
      },
      {
        title: { ar: 'السرية الأمامية التامة (PFS)', en: 'Perfect Forward Secrecy (PFS)' },
        desc: {
          ar: 'استخدام مفاتيح DH سريعة الزوال (ECDHE) يضمن أنه حتى لو كُشف المفتاح الخاص للسيرفر مستقبلاً، فلن يتمكن المهاجم من فك الجلسات السابقة.',
          en: 'Ephemeral ECDHE generates fresh keypairs per session, safeguarding recorded traffic against future key compromise.'
        }
      }
    ],
    security: {
      ar: 'المحرك الأساسي لبروتوكولات TLS 1.3 وتشفير المحادثات الفورية في WhatsApp و Signal.',
      en: 'The security backbone of modern TLS 1.3, SSH, WireGuard, and end-to-end messaging encryption.'
    }
  },
  {
    key: 'sha256_hash',
    name: { ar: 'دوال الهاش التشفيرية وانهيار الجليد', en: 'Cryptographic Hash (SHA-256 Avalanche)' },
    badge: 'One-Way / SHA-256',
    big: 'O(n)',
    head: {
      ar: 'دوال الهاش التشفيرية وأثر الانهيار الثلجي (SHA-256 & Avalanche Effect)',
      en: 'Cryptographic Hash Functions & Avalanche Effect'
    },
    text: {
      ar: 'دالة رياضية أحادية الاتجاه تأخذ أي مدخل مهما كان حجمه وتنتج بصمة رقمية بطول ثابت (256 بت). أي تغيير في بت واحد يؤدي إلى تغيير نصف بتات الهاش كلياً.',
      en: 'A deterministic one-way mapping taking variable input and producing a fixed 256-bit digest with extreme avalanche sensitivity.'
    },
    steps: {
      ar: [
        'تقطيع الرسالة إلى كتل بحجم 512-بت وإضافة الحشوة وطول النص.',
        'تهيئة 8 متغيرات حالة أولية مستمدة من الجذور التربيعية للأعداد الأولية الأولى.',
        'تنفيذ 64 جولة من العمليات المنطقية الدائرية (Bitwise ROTR, SHR, XOR, AND).',
        'إنتاج البصمة التشفيرية النهائية بطول 256 بت (64 حرفاً ست عشرياً).'
      ],
      en: [
        'Pad and format input into 512-bit message blocks.',
        'Initialize 8 state registers from fractional parts of prime square roots.',
        'Execute 64 rounds of non-linear logic (ROTR, SHR, Ch, Maj, XOR, ADD).',
        'Output immutable 256-bit hex digest (64 hexadecimal characters).'
      ]
    },
    analogy: {
      ar: 'مثل ماكينة فرم اللحم أو العصارة: تضع الفواكه وتخلطها فتحصل على مزيج فريد، لكن يستحيل تماماً إعادة المزيج إلى فواكهه الأصلية السليمة.',
      en: 'Like a meat grinder or food processor: ingredients combine into an unrecognizable homogeneous blend that can never be reversed.'
    },
    code: {
      ar: [
        'import java.security.MessageDigest;',
        'MessageDigest md = MessageDigest.getInstance("SHA-256");',
        'byte[] hash = md.digest("Cyber".getBytes()); // بصمة 32 بايت (256 بت)',
        '// تحويل البصمة إلى نص ست عشري (Hex String):',
        'StringBuilder hex = new StringBuilder();',
        'for (byte b : hash) hex.append(String.format("%02x", b));'
      ],
      en: [
        'import java.security.MessageDigest;',
        'MessageDigest md = MessageDigest.getInstance("SHA-256");',
        'byte[] hash = md.digest("Cyber".getBytes()); // 32-byte digest',
        '// Format digest into 64-char Hex string:',
        'StringBuilder hex = new StringBuilder();',
        'for (byte b : hash) hex.append(String.format("%02x", b));'
      ]
    },
    inputs: [],
    gen(p, lang = 'ar') {
      const isEn = lang === 'en'
      const input1 = 'Cyber'
      const hash1 = 'f729abbf1227241982861257964f79f3edde2a3a5d4bddc477ed478548166936'
      const input2 = 'cyber'
      const hash2 = 'b4bf5d7e5fcf89ef8adb64ec9c624db850d10f2afef020ed9ef23892df0833af'

      const r = Recorder({ a: [input1], b: [hash1.slice(0, 24) + '...'] })
      r.push(0, isEn ? `Computing SHA-256 hash for "${input1}". Produces a 64-hex-character (256-bit) digest.` : `حساب هاش النص "${input1}". ينتج بصمة ست عشرية طولها 64 خانة (256 بت).`)
      r.c.ops += 64
      r.push(2, isEn ? `Digest of "${input1}" = ${hash1.slice(0, 32)}...` : `بصمة "${input1}" = ${hash1.slice(0, 32)}...`)

      r.a = [input2]
      r.b = [hash2.slice(0, 24) + '...']
      r.c.ops += 64
      r.c.flips = 137
      r.push(2, isEn ? `Now mutate 1 single character: from "${input1}" to "${input2}". Observe completely new digest: ${hash2.slice(0, 32)}...` : `الآن نغير حرفاً واحداً فقط: من "${input1}" إلى "${input2}". انظر للبصمة الجديدة بالكامل: ${hash2.slice(0, 32)}...`, {
        cls: { 0: 'swap' },
        bcls: { 0: 'compare' }
      })
      r.push(4, isEn ? `Avalanche Effect: Changing just 1 single bit flipped 137 bits (53.5%) in the hash! Computationally impossible to reverse or correlate.` : `أثر الانهيار الثلجي (Avalanche Effect): تغير بت واحد فقط أدى إلى انقلاب 137 بتاً (53.5%) في البصمة! يستحيل توقع العلاقة رياضياً.`)
      return r.S
    },
    cases: [
      {
        title: { ar: 'مقاومة الصورة العكسية (Preimage)', en: 'Preimage Resistance' },
        desc: {
          ar: 'معرفة H(M) لا تمكن المهاجم إطلاقاً من استنتاج M؛ عملية اتجاه واحد حتمية (One-Way).',
          en: 'Given hash H(M), it is computationally impossible to infer the underlying message M.'
        }
      },
      {
        title: { ar: 'مقاومة التصادم (Collision)', en: 'Collision Resistance' },
        desc: {
          ar: 'يستحيل عملياً إيجاد رسالتين مختلفتين M₁ ≠ M₂ تنتجان نفس الهاش H(M₁) = H(M₂).',
          en: 'Virtually impossible to find two distinct inputs yielding identical hash digests.'
        }
      },
      {
        title: { ar: 'مسألة عيد الميلاد (Birthday Attack)', en: 'Birthday Attack Bound (2¹²⁸)' },
        desc: {
          ar: 'فضاء البحث للتصادم في دالة 256-بت هو 2¹²⁸، وهو رقم فلكي يفوق عدد ذرات المجرة.',
          en: 'Collision search space sits at 2¹²⁸ operations, far exceeding global computational capabilities.'
        }
      }
    ],
    security: {
      ar: 'تستخدم في التحقق من سلامة تحميل البرمجيات، تخزين كلمات السر المملحة، وتأمين سلاسل الكتل (Blockchain Bitcoin).',
      en: 'Secures operating system software updates, salted credential hashing, and Bitcoin Proof-of-Work.'
    }
  },
  {
    key: 'dig_sig',
    name: { ar: 'التوقيع الرقمي وإثبات عدم الإنكار', en: 'Digital Signatures & Non-Repudiation' },
    badge: 'Signature / ECDSA',
    big: 'O(log n)³',
    head: {
      ar: 'التوقيع الرقمي والتحقق من الهوية (Digital Signatures & Non-Repudiation)',
      en: 'Digital Signatures & Authentication'
    },
    text: {
      ar: 'دمج دوال الهاش مع التشفير غير المتماثل لإثبات مصدر الرسالة وصحتها، وتوفير خاصية عدم الإنكار (Non-Repudiation) التي تجعل الموقع عاجزاً عن إنكار صدور الوثيقة منه قانونياً وبرمجياً.',
      en: 'Cryptographic binding of asymmetric private keys with SHA-256 digests ensuring origin authenticity, integrity, and legal Non-Repudiation.'
    },
    steps: {
      ar: [
        'المرسل يحسب بصمة الهاش للوثيقة الأصلية H = SHA-256(M).',
        'المرسل يوقع الهاش باستخدام مفتاحه الخاص السري: S = Sign_Priv(H).',
        'المرسل يرسل الوثيقة M مع التوقيع S إلى المستقبل.',
        'المستقبل يحسب الهاش للوثيقة بنفسه، ويفك التوقيع بمفتاح المرسل العام للتحقق من التطابق.'
      ],
      en: [
        'Sender computes document hash digest H = SHA-256(M).',
        'Sender signs hash with their private key: S = Sign_Priv(H).',
        'Sender transmits original message M alongside signature S.',
        'Receiver computes hash independently and validates against sender\'s public key.'
      ]
    },
    analogy: {
      ar: 'مثل ختم الشمع الملكي الخاص: الملك فقط يملك الخاتم لطبعه، لكن أي حارس أو مواطن في المملكة يستطيع مقارنة شكل الختم للتأكد من أنه صادر من الملك شخصياً ولم يتم فضه أو تزويره.',
      en: 'The royal wax seal: only the monarch possesses the signet ring to impress it, yet any guard or citizen can inspect and verify its authenticity.'
    },
    code: {
      ar: [
        'Signature signer = Signature.getInstance("SHA256withRSA");',
        'signer.initSign(privateKey); // التوقيع بالمفتاح الخاص',
        'signer.update(documentBytes);',
        'byte[] signature = signer.sign();',
        '// التحقق لدى الطرف الآخر بالمفتاح العام:',
        'Signature verifier = Signature.getInstance("SHA256withRSA");',
        'verifier.initVerify(publicKey);',
        'verifier.update(receivedDocBytes);',
        'boolean isValid = verifier.verify(signature); // true إذا كانت أصلية ولم تُعدل'
      ],
      en: [
        'Signature signer = Signature.getInstance("SHA256withRSA");',
        'signer.initSign(privateKey); // Sign using Private Key',
        'signer.update(documentBytes);',
        'byte[] signature = signer.sign();',
        '// Verification on receiver side using Public Key:',
        'Signature verifier = Signature.getInstance("SHA256withRSA");',
        'verifier.initVerify(publicKey);',
        'verifier.update(receivedDocBytes);',
        'boolean isValid = verifier.verify(signature); // true if intact'
      ]
    },
    inputs: [],
    gen(p, lang = 'ar') {
      const isEn = lang === 'en'
      const doc = isEn ? 'Wire Transfer: $10,000' : 'تحويل مالي: 10,000$'
      const r = Recorder({ a: [doc], b: [isEn ? 'Pending Signature' : 'في انتظار التوقيع'] })
      r.push(0, isEn ? `Document awaiting digital signature: "${doc}".` : `الوثيقة المراد توقيعها: "${doc}".`)

      r.c.ops++
      r.v.hash = '0x89E3...A12F'
      r.push(2, isEn ? `Phase 1: Compute cryptographic digest of document: H = SHA-256(M) = ${r.v.hash}.` : `المرحلة 1: حساب بصمة الهاش للوثيقة: H = SHA-256(M) = ${r.v.hash}.`, {
        cls: { 0: 'active' }
      })

      r.c.ops += 10
      r.b = [isEn ? 'Signature: SIG_7F90B1' : 'التوقيع: SIG_7F90B1']
      r.push(3, isEn ? `Phase 2: Encrypt hash with Bank's Private Key ➔ Produce Digital Signature S. Document officially signed.` : `المرحلة 2: تشفير الهاش بالمفتاح الخاص للبنك ➔ إنتاج التوقيع الرقمي S. الوثيقة الآن موثقة رسمياً.`, {
        bcls: { 0: 'found' },
        bptr: { 0: isEn ? 'Signed' : 'موثق رسمياً' }
      })

      r.push(8, isEn ? `Recipient verifies signature with Bank's Public Key; matching digest proves document integrity & signer identity 100% (Valid Signature).` : `المستقبل يفك التوقيع بمفتاح البنك العام؛ تطابق الهاش يثبت صحة الوثيقة وهوية الموقع 100% (Valid Signature).`, {
        cls: { 0: 'done' },
        bcls: { 0: 'done' }
      })
      return r.S
    },
    cases: [
      {
        title: { ar: 'المصادقة (Authentication)', en: 'Origin Authentication' },
        desc: {
          ar: 'يثبت بما لا يدع مجالاً للشك هوية صاحب المفتاح الخاص الذي أصدر الوثيقة.',
          en: 'Irrefutably confirms identity of the private keyholder who authored the document.'
        }
      },
      {
        title: { ar: 'عدم الإنكار (Non-Repudiation)', en: 'Non-Repudiation' },
        desc: {
          ar: 'لا يستطيع الموقع الادعاء بأن شخصاً آخر أصدر الوثيقة لأن مفتاحه الخاص سري ومحمي لديه فقط.',
          en: 'Signer cannot deny authorship because the signing key is uniquely held by them.'
        }
      },
      {
        title: { ar: 'السلامة الحتمية (Integrity)', en: 'Tamper-Evident Integrity' },
        desc: {
          ar: 'أي تغيير ولو في فاصلة واحدة داخل الوثيقة يجعل الهاش مختلفاً، فيفشل التحقق فوراً ويُكشف التزوير.',
          en: 'Altering even a single punctuation mark corrupts the hash verification, immediately flagging forgery.'
        }
      }
    ],
    security: {
      ar: 'الأساس القانوني والتقني للهويات الرقمية، البريد المشفر S/MIME، وتحديثات أنظمة التشغيل الآمنة.',
      en: 'The legal and algorithmic foundation of national digital IDs, code-signing, and secure smart contracts.'
    }
  }
]

CYBER_OPS.forEach((op, idx) => {
  op.numberPrefix = `2.${idx + 1}`
})

export const CYBER_OPS_NAV = {
  caesar: {
    icon: 'fa-solid fa-scroll',
    color: '#d97706',
    colorBg: 'rgba(217, 119, 6, 0.12)',
    badgeAr: 'تشفير تاريخي / إزاحة',
    badgeEn: 'Historical / Shift',
    mathAr: 'C = (P + k) mod 26 · خوارزمية إبدال بسيطة',
    mathEn: 'C = (P + k) mod 26 · Monoalphabetic Substitution',
    complexity: 'O(n)'
  },
  otp_xor: {
    icon: 'fa-solid fa-bolt',
    color: '#059669',
    colorBg: 'rgba(5, 150, 105, 0.12)',
    badgeAr: 'تشفير تدفقي / سرية تامة',
    badgeEn: 'Stream / OTP',
    mathAr: 'C = P ⊕ K · سرية شانون المطلقة (Entropy = ∞)',
    mathEn: 'C = P ⊕ K · Shannon Perfect Secrecy (Entropy = ∞)',
    complexity: 'O(n)'
  },
  aes_block: {
    icon: 'fa-solid fa-cubes',
    color: '#ea580c',
    colorBg: 'rgba(234, 88, 12, 0.12)',
    badgeAr: 'تشفير كتل متماثل / SPN',
    badgeEn: 'Block Cipher / AES',
    mathAr: 'حقل غالوا GF(2⁸) · شبكة الاستبدال والتبديل SPN',
    mathEn: 'Galois Field GF(2⁸) · Substitution-Permutation Network',
    complexity: 'O(1) Block'
  },
  rsa_math: {
    icon: 'fa-solid fa-key',
    color: '#4f46e5',
    colorBg: 'rgba(79, 70, 229, 0.12)',
    badgeAr: 'تشفير غير متماثل / باب خلفي',
    badgeEn: 'Asymmetric / RSA',
    mathAr: 'مؤشر أويلر φ(n) · الرفع النمطي C = Mᵉ mod n',
    mathEn: 'Euler\'s Totient φ(n) · Trapdoor Modular Exp C = Mᵉ mod n',
    complexity: 'O(k³)'
  },
  diffie_hellman: {
    icon: 'fa-solid fa-handshake',
    color: '#0284c7',
    colorBg: 'rgba(2, 132, 199, 0.12)',
    badgeAr: 'تبادل مفاتيح / قناة غير آمنة',
    badgeEn: 'Key Exchange / DH',
    mathAr: 'مشكلة اللوغاريتم المنفصل (DLP) · K = gᵃᵇ mod p',
    mathEn: 'Discrete Logarithm Problem (DLP) · K = gᵃᵇ mod p',
    complexity: 'O(k³)'
  },
  sha256_hash: {
    icon: 'fa-solid fa-fingerprint',
    color: '#7c3aed',
    colorBg: 'rgba(124, 58, 237, 0.12)',
    badgeAr: 'دالة اتجاه واحد / بصمة رقمية',
    badgeEn: 'One-Way / SHA-256',
    mathAr: 'تأثير الانهيار (Avalanche) · ضغط كتل 512 بت إلى 256 بت',
    mathEn: 'Avalanche Effect (50% Flip) · 512-bit Compression',
    complexity: 'O(n)'
  },
  dig_sig: {
    icon: 'fa-solid fa-file-signature',
    color: '#0d9488',
    colorBg: 'rgba(13, 148, 136, 0.12)',
    badgeAr: 'توقيع رقمي / عدم إنكار',
    badgeEn: 'Signature / ECDSA',
    mathAr: 'S = Sign_Prv(H) · التحقق بالمفتاح العام Verify_Pub(S, H)',
    mathEn: 'S = Sign_Prv(H) · Verification via Verify_Pub(S, H)',
    complexity: 'O(k³)'
  }
}
