import { Recorder, fill, range } from '@/core/recorder'

/**
 * Complete Bilingual Data & 9 Interactive Operations for Data Structures Lecture 01 (Arrays in Java)
 * Exact 100% logic & pedagogical content from courses/data-structures/lecture-01/interactive.html
 */

export const OPS = [
  {
    key: 'access',
    big: 'O(1)',
    spaceBig: 'O(1)',
    name: { ar: 'الوصول والتعديل', en: 'Access & Update' },
    head: { ar: 'الوصول المباشر بالفهرس arr[i]', en: 'Direct Indexed Access arr[i]' },
    text: {
      ar: 'نذهب إلى الخانة مباشرة باستخدام رقمها، دون المرور على أي خانة قبلها.',
      en: 'We jump directly to the cell using its index number, without visiting any preceding cell.'
    },
    steps: {
      ar: [
        'نحدد رقم الخانة (الفهرس) i.',
        'المعالج يحسب العنوان: base + i × 4.',
        'نقرأ القيمة أو نكتب قيمة جديدة في نفس الخطوة.'
      ],
      en: [
        'Specify the target cell index i.',
        'CPU computes the physical address: base + i × 4.',
        'Read the value or write a new value in a single step.'
      ]
    },
    analogy: {
      ar: 'مثل خزائن مرقمة في ممر: إذا عرفت رقم الخزانة تذهب إليها مباشرة، ولا تحتاج فتح الخزائن التي قبلها.',
      en: 'Like numbered lockers in a hallway: if you know the locker number, you walk straight to it without opening previous lockers.'
    },
    code: {
      ar: [
        'int[] arr = {…};',
        'int x = arr[i];      // قراءة العنصر في خطوة واحدة O(1)',
        'arr[i] = value;      // تعديل القيمة في خطوة واحدة O(1)'
      ],
      en: [
        'int[] arr = {…};',
        'int x = arr[i];      // Read element in 1 step O(1)',
        'arr[i] = value;      // Update value in 1 step O(1)'
      ]
    },
    inputs: [
      ['i', { ar: 'الفهرس i', en: 'Index i' }, 2],
      ['value', { ar: 'القيمة الجديدة', en: 'New Value' }, 99]
    ],
    defArr: [10, 20, 30, 40, 50],
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const r = Recorder({ a: p.arr }, metricsOnly)
      const n = p.arr.length
      const i = Math.max(0, Math.min(n - 1, p.i | 0))
      r.push(
        0,
        en
          ? `Array has ${n} elements; valid indices are 0 to ${n - 1}.`
          : `المصفوفة بها ${n} عناصر، والفهارس المتاحة من 0 إلى ${n - 1}.`
      )
      r.c.rd++
      r.v.i = i
      r.v.x = r.a[i]
      r.push(
        1,
        en
          ? `Read arr[${i}]: address = base + ${i}×4 → direct jump → x = ${r.a[i]} (1 step).`
          : `قراءة arr[${i}]: العنوان = base + ${i}×4، فنصل مباشرة → x = ${r.a[i]} (خطوة واحدة).`,
        { cls: { [i]: 'active' }, ptr: { [i]: `arr[${i}]` } }
      )
      r.a[i] = p.value
      r.c.wr++
      r.push(
        2,
        en
          ? `Write arr[${i}] = ${p.value} directly into the same cell (1 step). No other element touched.`
          : `كتابة arr[${i}] = ${p.value} في نفس الخانة مباشرة (خطوة واحدة). لم نلمس أي عنصر آخر.`,
        { cls: { [i]: 'found' }, ptr: { [i]: `arr[${i}]` } }
      )
      return metricsOnly ? r.c : r.S
    },
    sample: (n) => ({ arr: range(n), i: n - 1, value: 1 }),
    cases: {
      ar: [
        ['O(1)', 'أي فهرس: قراءة واحدة أو كتابة واحدة.'],
        ['O(1)', 'لا يعتمد على مكان العنصر.'],
        ['O(1)', 'حتى آخر عنصر نصل له بعملية حسابية واحدة.']
      ],
      en: [
        ['O(1)', 'Any index: a single read or single write.'],
        ['O(1)', 'Independent of element position.'],
        ['O(1)', 'Even the last element is reached via one arithmetic calculation.']
      ]
    },
    time: {
      ar: '<span class="pill p-ok">O(1)</span> في كل الحالات.',
      en: '<span class="pill p-ok">O(1)</span> in all cases.'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> لا نحتاج ذاكرة إضافية.',
      en: '<span class="pill p-ok">O(1)</span> no extra memory needed.'
    },
    derive: {
      ar: 'قراءة = 1 ، كتابة = 1 ← عدد ثابت لا يحتوي n<div class="formula">T(n) = 1  ⇒  O(1)</div>',
      en: 'Reads = 1, Writes = 1 → Constant count independent of n<div class="formula">T(n) = 1  ⇒  O(1)</div>'
    },
    take: {
      ar: 'هذه أقوى ميزة في المصفوفة: الوصول العشوائي (Random Access) بزمن ثابت.',
      en: 'This is the array’s strongest advantage: constant-time Random Access O(1).'
    }
  },
  {
    key: 'sum',
    big: 'O(n)',
    spaceBig: 'O(1)',
    name: { ar: 'المرور والمجموع', en: 'Traversal & Sum' },
    head: { ar: 'المرور على كل العناصر (المجموع والمتوسط)', en: 'Traversing All Elements (Sum & Average)' },
    text: {
      ar: 'نستخدم متغيراً «مُجمِّعاً» يبدأ من صفر، ونضيف إليه كل عنصر أثناء المرور بالحلقة.',
      en: 'We use an accumulator variable starting at 0 and add each element as we iterate through the loop.'
    },
    steps: {
      ar: [
        'نبدأ sum = 0.',
        'الحلقة تبدأ من i = 0 وتستمر ما دام i < length.',
        'في كل دورة: sum += arr[i].',
        'بعد الحلقة: average = sum / length.'
      ],
      en: [
        'Initialize accumulator sum = 0.',
        'Loop starts at i = 0 and continues while i < length.',
        'In each iteration: sum += arr[i].',
        'After the loop: average = (double) sum / length.'
      ]
    },
    analogy: {
      ar: 'مثل أمين صندوق يعدّ النقود ورقةً ورقة: لا بد أن يلمس كل ورقة مرة واحدة ليعرف المجموع.',
      en: 'Like a cashier counting bills one by one: every single note must be touched once to know the total.'
    },
    code: [
      'int sum = 0;',
      'for (int i = 0; i < arr.length; i++) {',
      '    sum += arr[i];',
      '}',
      'double avg = (double) sum / arr.length;'
    ],
    inputs: [],
    defArr: [5, 10, 15, 20, 8],
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const r = Recorder({ a: p.arr }, metricsOnly)
      const n = p.arr.length
      r.v.sum = 0
      r.c.wr++
      r.push(0, en ? 'Initialize accumulator: sum = 0.' : 'نهيّئ المجمِّع: sum = 0.')
      for (let i = 0; i < n; i++) {
        r.v.i = i
        r.c.cmp++
        r.push(
          1,
          en ? `Condition ${i} < ${n} is true → enter loop.` : `الشرط ${i} < ${n} صحيح ← ندخل الدورة.`,
          { cls: fill(0, i, 'done', { [i]: 'active' }), ptr: { [i]: 'i' } }
        )
        const old = r.v.sum
        r.v.sum += r.a[i]
        r.c.rd++
        r.c.wr++
        r.push(
          2,
          `sum = ${old} + arr[${i}](${r.a[i]}) = ${r.v.sum}`,
          { cls: fill(0, i, 'done', { [i]: 'active' }), ptr: { [i]: 'i' } }
        )
      }
      r.v.i = n
      r.c.cmp++
      r.push(
        1,
        en
          ? `Condition ${n} < ${n} is false → exit loop. Visited all (${n}) elements.`
          : `الشرط ${n} < ${n} خاطئ ← نخرج من الحلقة. زرنا كل العناصر (${n}).`,
        { cls: fill(0, n, 'done') }
      )
      r.v.avg = +(r.v.sum / n).toFixed(2)
      r.push(
        4,
        en
          ? `Average = ${r.v.sum} / ${n} = ${r.v.avg} (cast to double to preserve fraction).`
          : `المتوسط = ${r.v.sum} / ${n} = ${r.v.avg} (حوّلنا إلى double حتى لا نفقد الكسر).`,
        { cls: fill(0, n, 'done') }
      )
      return metricsOnly ? r.c : r.S
    },
    sample: (n) => ({ arr: range(n) }),
    cases: {
      ar: [
        ['O(n)', 'يجب زيارة كل العناصر حتى لو كانت أصفاراً.'],
        ['O(n)', 'نفس عدد الدورات دائماً.'],
        ['O(n)', 'n دورة بالضبط.']
      ],
      en: [
        ['O(n)', 'Every element must be visited even if all are zeros.'],
        ['O(n)', 'Always the exact same number of iterations.'],
        ['O(n)', 'Exactly n iterations.']
      ]
    },
    time: {
      ar: '<span class="pill p-acc">O(n)</span> في كل الحالات.',
      en: '<span class="pill p-acc">O(n)</span> in all cases.'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> متغيران فقط sum و i.',
      en: '<span class="pill p-ok">O(1)</span> only two variables: sum and i.'
    },
    derive: {
      ar: 'مقارنات الحلقة = n + 1 ، قراءات = n ، كتابات = n + 1<div class="formula">T(n) = 3n + 2  ⇒  O(n)</div>',
      en: 'Loop comparisons = n + 1, reads = n, writes = n + 1<div class="formula">T(n) = 3n + 2  ⇒  O(n)</div>'
    },
    take: {
      ar: 'أي عملية تحتاج «النظر إلى كل عنصر» لا يمكن أن تكون أسرع من O(n).',
      en: 'Any operation that must inspect every element cannot be faster than O(n).'
    }
  },
  {
    key: 'search',
    big: 'O(n)',
    spaceBig: 'O(1)',
    name: { ar: 'البحث الخطي', en: 'Linear Search' },
    head: { ar: 'البحث الخطي Linear Search', en: 'Linear Search (Sequential Scan)' },
    text: {
      ar: 'نفحص العناصر واحداً تلو الآخر من البداية. عند أول تطابق نحفظ الموقع ونتوقف فوراً بـ break.',
      en: 'We inspect elements one by one from the start. On the first match, we save the index and stop immediately using break.'
    },
    steps: {
      ar: [
        'نفترض أن العنصر غير موجود: foundIndex = -1.',
        'نقارن arr[i] بالقيمة المطلوبة target.',
        'إذا تطابقا: foundIndex = i ثم break.',
        'إذا انتهت الحلقة دون تطابق يبقى foundIndex = -1.'
      ],
      en: [
        'Assume the target is not found: foundIndex = -1.',
        'Compare arr[i] with target.',
        'If equal: foundIndex = i then break.',
        'If the loop finishes without a match, foundIndex remains -1.'
      ]
    },
    analogy: {
      ar: 'مثل البحث عن اسم صديقك في قائمة غير مرتبة: تقرأ الأسماء من الأعلى حتى تجده أو تنتهي القائمة.',
      en: 'Like looking for a friend’s name on an unsorted roster: you scan from the top until you find it or reach the end.'
    },
    code: [
      'int foundIndex = -1;',
      'for (int i = 0; i < arr.length; i++) {',
      '    if (arr[i] == target) {',
      '        foundIndex = i;',
      '        break;',
      '    }',
      '}'
    ],
    inputs: [['target', { ar: 'القيمة المطلوبة target', en: 'Target value' }, 9]],
    defArr: [12, 7, 25, 9, 18],
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const r = Recorder({ a: p.arr }, metricsOnly)
      const n = p.arr.length
      const t = p.target
      r.v.target = t
      r.v.foundIndex = -1
      r.c.wr++
      r.push(
        0,
        en
          ? `Searching for ${t}. Start by assuming not found: foundIndex = -1.`
          : `نبحث عن ${t}. نبدأ بافتراض أنه غير موجود: foundIndex = -1.`
      )
      for (let i = 0; i < n; i++) {
        r.v.i = i
        r.c.cmp++
        r.push(
          1,
          en ? `Condition ${i} < ${n} is true.` : `الشرط ${i} < ${n} صحيح.`,
          { cls: fill(0, i, 'visited', { [i]: 'active' }), ptr: { [i]: 'i' } }
        )
        r.c.rd++
        r.c.cmp++
        const eq = r.a[i] === t
        r.push(
          2,
          en
            ? `Is arr[${i}] (${r.a[i]}) == ${t}? ${eq ? 'Yes ✓' : 'No ✗ move to next'}`
            : `هل arr[${i}] (${r.a[i]}) == ${t} ؟ ${eq ? 'نعم ✓' : 'لا ✗ ننتقل للتالي'}`,
          { cls: fill(0, i, 'visited', { [i]: eq ? 'found' : 'compare' }), ptr: { [i]: 'i' } }
        )
        if (eq) {
          r.v.foundIndex = i
          r.c.wr++
          r.push(3, `foundIndex = ${i}`, { cls: fill(0, i, 'visited', { [i]: 'found' }), ptr: { [i]: '✓' } })
          r.push(
            4,
            en
              ? `break: stopped after ${i + 1} comparison(s) ${i === 0 ? '— Best Case!' : ''} skipping ${n - i - 1} remaining element(s).`
              : `break: توقفنا بعد ${i + 1} مقارنة فقط ${i === 0 ? '— هذه أفضل حالة!' : ''} ولم نفحص ${n - i - 1} عنصر متبقٍ.`,
            { cls: fill(0, i, 'visited', { [i]: 'found' }), ptr: { [i]: '✓' } }
          )
          return metricsOnly ? r.c : r.S
        }
      }
      r.v.i = n
      r.c.cmp++
      r.push(
        1,
        en
          ? `Loop ended without match → foundIndex = -1. Checked all (${n}) elements — Worst Case.`
          : `انتهت الحلقة دون تطابق ← foundIndex = -1. فحصنا كل العناصر (${n}) — هذه أسوأ حالة.`,
        { cls: fill(0, n, 'visited') }
      )
      return metricsOnly ? r.c : r.S
    },
    sample: (n, k) => ({ arr: range(n), target: k === 'best' ? 10 : -1 }),
    cases: {
      ar: [
        ['O(1)', 'العنصر في الخانة الأولى ← مقارنة واحدة.', 'best'],
        ['O(n)', 'العنصر في المنتصف تقريباً ← n/2 مقارنة، ونهمل ½.', 'avg'],
        ['O(n)', 'العنصر في آخر خانة أو غير موجود ← n مقارنة.', 'worst']
      ],
      en: [
        ['O(1)', 'Target is at index 0 → only 1 comparison.', 'best'],
        ['O(n)', 'Target is near the middle → ~n/2 comparisons (½ dropped).', 'avg'],
        ['O(n)', 'Target is at the last cell or absent → n comparisons.', 'worst']
      ]
    },
    time: {
      ar: 'أفضل <span class="pill p-ok">O(1)</span> · أسوأ <span class="pill p-acc">O(n)</span>',
      en: 'Best <span class="pill p-ok">O(1)</span> · Worst <span class="pill p-acc">O(n)</span>'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> متغيرا i و foundIndex.',
      en: '<span class="pill p-ok">O(1)</span> variables i and foundIndex.'
    },
    derive: {
      ar: 'أفضل: مقارنة عنصر واحدة. أسوأ: n مقارنة عناصر + (n + 1) مقارنة حلقة + n قراءة<div class="formula">Best = O(1)    Worst: T(n) ≈ 3n  ⇒  O(n)</div>',
      en: 'Best: 1 comparison. Worst: n element comps + (n + 1) loop comps + n reads<div class="formula">Best = O(1)    Worst: T(n) ≈ 3n  ⇒  O(n)</div>'
    },
    take: {
      ar: 'البحث الخطي لا يشترط أن تكون المصفوفة مرتبة، لكنه في أسوأ حالة يفحص كل العناصر.',
      en: 'Linear search works on unsorted arrays, but in the worst case it scans every element.'
    }
  },
  {
    key: 'minmax',
    big: 'O(n)',
    spaceBig: 'O(1)',
    name: { ar: 'الأكبر والأصغر', en: 'Min & Max' },
    head: { ar: 'إيجاد أكبر وأصغر قيمة', en: 'Finding Maximum and Minimum Values' },
    text: {
      ar: 'نعتبر أول عنصر هو الأكبر والأصغر مؤقتاً، ثم نقارن به بقية العناصر ونحدّث عند الحاجة.',
      en: 'Treat the first element as both temporary max and min, then compare remaining elements and update when needed.'
    },
    steps: {
      ar: [
        'max = arr[0] و min = arr[0].',
        'نبدأ الحلقة من i = 1 (لأن العنصر 0 استُخدم).',
        'إذا arr[i] > max نحدّث max.',
        'إذا arr[i] < min نحدّث min.'
      ],
      en: [
        'Set max = arr[0] and min = arr[0].',
        'Start loop from i = 1 (since index 0 is already used).',
        'If arr[i] > max, update max.',
        'If arr[i] < min, update min.'
      ]
    },
    analogy: {
      ar: 'مثل اختيار أطول طالب في الصف: تُوقف الأول، ثم تقارن كل طالب بمن يقف، وتستبدله إذا كان أطول.',
      en: 'Like picking the tallest student in class: ask the first to stand, compare each next student, and replace if taller.'
    },
    code: [
      'int max = arr[0], min = arr[0];',
      'for (int i = 1; i < arr.length; i++) {',
      '    if (arr[i] > max) max = arr[i];',
      '    if (arr[i] < min) min = arr[i];',
      '}'
    ],
    inputs: [],
    defArr: [14, 6, 28, 3, 19],
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const r = Recorder({ a: p.arr }, metricsOnly)
      const n = p.arr.length
      let mx = 0
      let mn = 0
      const view = (i, cur) => {
        if (metricsOnly) return {}
        const cls = {}
        const ptr = {}
        for (let k = 0; k < i; k++) cls[k] = 'visited'
        if (cur !== undefined) {
          cls[cur] = 'active'
          ptr[cur] = 'i'
        }
        cls[mx] = (cls[mx] === 'active' ? 'active ' : '') + 'max'
        cls[mn] = (cls[mn] || '').replace('visited', '') + ' min'
        ptr[mx] = (ptr[mx] ? ptr[mx] + ' ' : '') + 'max'
        ptr[mn] = (ptr[mn] ? ptr[mn] + ' ' : '') + 'min'
        return { cls, ptr }
      }
      r.c.rd++
      r.c.wr += 2
      r.v.max = r.a[0]
      r.v.min = r.a[0]
      r.push(
        0,
        en ? `Initialize: max = min = arr[0] = ${r.a[0]}` : `نبدأ: max = min = arr[0] = ${r.a[0]}`,
        view(0)
      )
      for (let i = 1; i < n; i++) {
        r.v.i = i
        r.c.cmp++
        r.push(1, en ? `Condition ${i} < ${n} is true.` : `الشرط ${i} < ${n} صحيح.`, view(i, i))
        r.c.rd++
        r.c.cmp++
        if (r.a[i] > r.v.max) {
          r.v.max = r.a[i]
          mx = i
          r.c.wr++
          r.push(
            2,
            en
              ? `${r.a[i]} > previous max → max = ${r.a[i]}`
              : `${r.a[i]} > max السابق ← max = ${r.a[i]}`,
            view(i, i)
          )
        } else {
          r.push(
            2,
            en
              ? `${r.a[i]} > ${r.v.max}? No → max remains unchanged.`
              : `${r.a[i]} > ${r.v.max} ؟ لا ← max يبقى كما هو.`,
            view(i, i)
          )
        }
        r.c.cmp++
        if (r.a[i] < r.v.min) {
          r.v.min = r.a[i]
          mn = i
          r.c.wr++
          r.push(
            3,
            en
              ? `${r.a[i]} < previous min → min = ${r.a[i]}`
              : `${r.a[i]} < min السابق ← min = ${r.a[i]}`,
            view(i, i)
          )
        } else {
          r.push(
            3,
            en
              ? `${r.a[i]} < ${r.v.min}? No → min remains unchanged.`
              : `${r.a[i]} < ${r.v.min} ؟ لا ← min يبقى كما هو.`,
            view(i, i)
          )
        }
      }
      r.v.i = n
      r.c.cmp++
      r.push(
        1,
        en
          ? `Loop finished: max = ${r.v.max}, min = ${r.v.min} after ${2 * (n - 1)} element comparisons.`
          : `انتهت الحلقة: max = ${r.v.max} ، min = ${r.v.min} بعد ${2 * (n - 1)} مقارنة عناصر.`,
        view(n)
      )
      return metricsOnly ? r.c : r.S
    },
    sample: (n, k) => ({ arr: k === 'best' ? range(n).reverse() : range(n) }),
    cases: {
      ar: [
        ['O(n)', 'حتى لو كان الأكبر في البداية يجب التأكد من الجميع.'],
        ['O(n)', '2(n-1) مقارنة عناصر دائماً.'],
        ['O(n)', 'نفس عدد المقارنات، يزيد فقط عدد التحديثات.']
      ],
      en: [
        ['O(n)', 'Even if max is at index 0, all elements must be verified.'],
        ['O(n)', 'Always 2(n-1) element comparisons.'],
        ['O(n)', 'Same comparison count; only variable updates increase.']
      ]
    },
    time: {
      ar: '<span class="pill p-acc">O(n)</span> في كل الحالات.',
      en: '<span class="pill p-acc">O(n)</span> in all cases.'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> المتغيرات max و min و i.',
      en: '<span class="pill p-ok">O(1)</span> variables max, min, and i.'
    },
    derive: {
      ar: 'مقارنات العناصر = 2(n − 1) ، مقارنات الحلقة = n ، قراءات = n ، تحديثات ≤ n<div class="formula">T(n) ≈ 4n  ⇒  O(n)</div>',
      en: 'Element comps = 2(n − 1), loop comps = n, reads = n, updates ≤ n<div class="formula">T(n) ≈ 4n  ⇒  O(n)</div>'
    },
    take: {
      ar: 'الفرق بين أفضل وأسوأ حالة هنا هو عدد «التحديثات» فقط، أما المقارنات فثابتة؛ لذلك تبقى O(n).',
      en: 'The difference between best and worst case is only the number of updates; comparisons are fixed at O(n).'
    }
  },
  {
    key: 'reverse',
    big: 'O(n)',
    spaceBig: 'O(1)',
    name: { ar: 'عكس المصفوفة', en: 'Reverse Array' },
    head: { ar: 'عكس المصفوفة في مكانها (مؤشران)', en: 'In-Place Array Reversal (Two Pointers)' },
    text: {
      ar: 'مؤشر left في البداية ومؤشر right في النهاية. نبدّل العنصرين ثم نقرّب المؤشرين حتى يلتقيا في المنتصف.',
      en: 'Place a left pointer at the start and a right pointer at the end. Swap both elements and move pointers inward until they meet.'
    },
    steps: {
      ar: [
        'left = 0 و right = length - 1.',
        'ما دام left < right:',
        'نحفظ arr[left] في temp حتى لا يضيع.',
        'arr[left] = arr[right] ثم arr[right] = temp.',
        'left++ و right--.'
      ],
      en: [
        'Set left = 0 and right = length - 1.',
        'While left < right:',
        'Save arr[left] in temp so it is not lost.',
        'Set arr[left] = arr[right], then arr[right] = temp.',
        'Advance left++ and right--.'
      ]
    },
    analogy: {
      ar: 'مثل صف طلاب يتبادلون الأماكن: الأول مع الأخير، الثاني مع قبل الأخير… حتى يصلوا للمنتصف.',
      en: 'Like a row of students swapping seats: first with last, second with second-to-last, until reaching the center.'
    },
    code: [
      'int left = 0, right = arr.length - 1;',
      'while (left < right) {',
      '    int temp = arr[left];',
      '    arr[left] = arr[right];',
      '    arr[right] = temp;',
      '    left++; right--;',
      '}'
    ],
    inputs: [],
    defArr: [10, 20, 30, 40, 50],
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const r = Recorder({ a: p.arr }, metricsOnly)
      const n = p.arr.length
      let L = 0
      let R = n - 1
      const view = (c = {}) => {
        if (metricsOnly) return {}
        const cls = {}
        const ptr = {}
        for (let k = 0; k < n; k++) if (k < L || k > R) cls[k] = 'done'
        if (L < R) {
          cls[L] = cls[L] || 'active'
          cls[R] = cls[R] || 'active'
          ptr[L] = 'left'
          ptr[R] = 'right'
        }
        Object.assign(cls, c)
        return { cls, ptr }
      }
      r.v.left = L
      r.v.right = R
      r.push(0, `left = 0 , right = ${R}`, view())
      while (true) {
        r.c.cmp++
        if (!(L < R)) {
          r.push(
            1,
            en
              ? `${L} < ${R}? No → stop. Performed only ${Math.floor(n / 2)} swaps (half of n).`
              : `${L} < ${R} ؟ لا ← توقف. نفّذنا ${Math.floor(n / 2)} تبديل فقط (نصف n).`,
            { cls: fill(0, n, 'done') }
          )
          break
        }
        r.push(1, en ? `${L} < ${R}? Yes → swap.` : `${L} < ${R} ؟ نعم ← نبدّل.`, view())
        r.c.rd++
        r.v.temp = r.a[L]
        r.push(2, `temp = arr[${L}] = ${r.v.temp}`, view())
        r.c.rd++
        r.c.wr++
        r.a[L] = r.a[R]
        r.push(3, `arr[${L}] = arr[${R}] = ${r.a[L]}`, view({ [L]: 'swap' }))
        r.c.wr++
        r.a[R] = r.v.temp
        r.push(4, `arr[${R}] = temp = ${r.a[R]}`, view({ [L]: 'swap', [R]: 'swap' }))
        L++
        R--
        r.v.left = L
        r.v.right = R
        r.push(
          5,
          en ? `Move pointers inward: left = ${L}, right = ${R}` : `نقرّب المؤشرين: left = ${L} ، right = ${R}`,
          view()
        )
      }
      return metricsOnly ? r.c : r.S
    },
    sample: (n) => ({ arr: range(n) }),
    cases: {
      ar: [
        ['O(n)', '⌊n/2⌋ تبديل دائماً.'],
        ['O(n)', 'لا يعتمد على القيم.'],
        ['O(n)', '⌊n/2⌋ تبديل، ونهمل ½.']
      ],
      en: [
        ['O(n)', 'Always ⌊n/2⌋ swaps.'],
        ['O(n)', 'Independent of element values.'],
        ['O(n)', '⌊n/2⌋ swaps (the ½ constant is dropped).']
      ]
    },
    time: {
      ar: '<span class="pill p-acc">O(n)</span> في كل الحالات.',
      en: '<span class="pill p-acc">O(n)</span> in all cases.'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> فقط temp و left و right — لا مصفوفة ثانية.',
      en: '<span class="pill p-ok">O(1)</span> only temp, left, and right — no second array.'
    },
    derive: {
      ar: 'عدد التبديلات = ⌊n/2⌋ ، كل تبديل = 2 قراءة + 2 كتابة + مقارنة<div class="formula">T(n) ≈ 5 · n/2  ⇒  O(n)      Space = O(1)</div>',
      en: 'Swaps = ⌊n/2⌋, each swap = 2 reads + 2 writes + 1 comparison<div class="formula">T(n) ≈ 5 · n/2  ⇒  O(n)      Space = O(1)</div>'
    },
    take: {
      ar: 'أسلوب المؤشرين (Two Pointers) يوفّر الذاكرة: نعكس المصفوفة دون إنشاء نسخة جديدة.',
      en: 'The Two-Pointers technique saves memory: we reverse the array in-place without allocating a copy.'
    }
  },
  {
    key: 'insert',
    big: 'O(n)',
    spaceBig: 'O(n)',
    name: { ar: 'الإدراج', en: 'Insertion' },
    head: {
      ar: 'إدراج عنصر في موقع pos محدد (ثلاث مراحل واضحة)',
      en: 'Inserting an Element at Position pos (3 Clear Stages)'
    },
    text: {
      ar: 'لأن حجم المصفوفة ثابت في الذاكرة، تتم الإضافة عبر 3 مراحل متتالية: ① حجز مصفوفة جديدة ونسخ العناصر السابقة لموقع الإدراج، ② غرس العنصر الجديد في موقع pos، ③ نسخ العناصر اللاحقة مع إزاحتها خانة لليمين (+1).',
      en: 'Because Java arrays have fixed size in memory, insertion takes 3 stages: ① Allocate result[n+1] and copy elements before pos, ② Place the new value at result[pos], ③ Copy remaining elements shifted right by +1.'
    },
    steps: {
      ar: [
        'المرحلة 1 (النسخ المباشر): إنشاء result[n + 1] ونسخ arr[0 … pos-1] إلى نفس الفهارس.',
        'المرحلة 2 (وضع القيمة): وضع القيمة الجديدة في مكانها المخصص: result[pos] = value.',
        'المرحلة 3 (الإزاحة لليمين): نسخ arr[pos … n-1] ونقل كل عنصر إلى result[i + 1].',
        'إسناد المصفوفة الجديدة: arr = result.'
      ],
      en: [
        'Stage 1 (Direct Copy): Allocate result[n + 1] and copy arr[0 … pos-1] to the same indices.',
        'Stage 2 (Insert Value): Place the new value at its target slot: result[pos] = value.',
        'Stage 3 (Shift Right): Copy arr[pos … n-1] into result[i + 1].',
        'Reassign reference: arr = result.'
      ]
    },
    analogy: {
      ar: 'مثل إضافة كرسي في صف مسرح ممتلئ: لا يمكن حشره، فننقل الجميع لصف جديد أطول، يجلس الذين قبل الكرسي، ثم نضع الكرسي الجديد، ثم يجلس البقية متقدمين مقعداً لليمين.',
      en: 'Like adding a chair to a full theater row: we move everyone to a new longer row, seat those before pos, place the new guest at pos, and shift the rest one seat right.'
    },
    code: {
      ar: [
        '// المرحلة 1: حجز مصفوفة جديدة ونسخ ما قبل pos',
        'int[] result = new int[arr.length + 1];',
        'for (int i = 0; i < pos; i++) {',
        '    result[i] = arr[i];',
        '}',
        '// المرحلة 2: وضع القيمة الجديدة في الخانة pos',
        'result[pos] = value;',
        '// المرحلة 3: نسخ العناصر المتبقية مع إزاحتها لليمين (+1)',
        'for (int i = pos; i < arr.length; i++) {',
        '    result[i + 1] = arr[i];',
        '}',
        'arr = result;'
      ],
      en: [
        '// Stage 1: Allocate new array & copy elements before pos',
        'int[] result = new int[arr.length + 1];',
        'for (int i = 0; i < pos; i++) {',
        '    result[i] = arr[i];',
        '}',
        '// Stage 2: Insert the new value at index pos',
        'result[pos] = value;',
        '// Stage 3: Copy remaining elements shifted right (+1)',
        'for (int i = pos; i < arr.length; i++) {',
        '    result[i + 1] = arr[i];',
        '}',
        'arr = result;'
      ]
    },
    inputs: [
      ['pos', { ar: 'الموقع pos', en: 'Position pos' }, 1],
      ['value', { ar: 'القيمة', en: 'Value' }, 99]
    ],
    defArr: [10, 20, 30, 40],
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const r = Recorder({ a: p.arr }, metricsOnly)
      const n = p.arr.length
      const pos = Math.max(0, Math.min(n, p.pos | 0))
      r.b = Array(n + 1).fill(null)
      r.v.pos = pos
      r.v.value = p.value
      r.push(
        1,
        en
          ? `Stage 1: Allocate new array result of length ${n + 1}. First copy elements before pos (0 to ${pos - 1}).`
          : `المرحلة 1: حجز مصفوفة جديدة result بطول ${n + 1}. سنقوم أولاً بنسخ العناصر السابقة لموقع الإدراج (0 إلى ${pos - 1}).`
      )
      const bdone = (k) => fill(0, k, 'done')
      for (let i = 0; i < pos; i++) {
        r.c.cmp++
        r.c.rd++
        r.c.wr++
        r.b[i] = r.a[i]
        r.v.i = i
        r.push(
          3,
          en
            ? `Stage 1 (Direct copy): arr[${i}](${r.a[i]}) ➔ result[${i}] at same index.`
            : `المرحلة 1 (نسخ مباشر): arr[${i}](${r.a[i]}) ➔ result[${i}] بنفس الفهرس بدون إزاحة.`,
          { cls: { [i]: 'active' }, ptr: { [i]: 'i' }, bcls: bdone(i + 1), bptr: { [i]: `result[${i}]` } }
        )
      }
      r.c.cmp++
      r.c.wr++
      r.b[pos] = p.value
      r.push(
        6,
        en
          ? `Stage 2 (Insert new element): result[${pos}] = ${p.value} at its target slot.`
          : `المرحلة 2 (غرس العنصر الجديد): result[${pos}] = ${p.value} في الخانة المخصصة له.`,
        {
          bcls: fill(0, pos, 'done', { [pos]: 'found' }),
          bptr: { [pos]: en ? '★ new' : '★ جديد' }
        }
      )
      for (let i = pos; i < n; i++) {
        r.c.cmp++
        r.c.rd++
        r.c.wr++
        r.b[i + 1] = r.a[i]
        r.v.i = i
        r.push(
          9,
          en
            ? `Stage 3 (Shift right): arr[${i}](${r.a[i]}) ➔ moves to result[${i + 1}] (index +1).`
            : `المرحلة 3 (إزاحة لليمين): arr[${i}](${r.a[i]}) ➔ ينتقل إلى result[${i + 1}] (الفهرس زاد +1).`,
          {
            cls: { [i]: 'active' },
            ptr: { [i]: 'i' },
            bcls: fill(0, i + 2, 'done', { [pos]: 'found', [i + 1]: 'new' }),
            bptr: { [i + 1]: en ? 'shift ➔' : 'إزاحة ➔' }
          }
        )
      }
      r.c.cmp++
      r.a = r.b.slice()
      r.b = null
      r.push(
        11,
        en
          ? `Insertion complete! arr now points to the new array after copying ${n} elements and shifting ${n - pos} right.`
          : `اكتملت الإضافة بنجاح! arr تشير الآن للمصفوفة الجديدة بعد نسخ جميع العناصر (${n}) وإزاحة ${n - pos} عنصر لليمين.`,
        { cls: { [pos]: 'found' } }
      )
      return metricsOnly ? r.c : r.S
    },
    sample: (n, k) => ({ arr: range(n), pos: k === 'best' ? n : 0, value: 1 }),
    cases: {
      ar: [
        ['O(n)', 'الإدراج في النهاية: لا توجد إزاحة للعناصر، لكن نسخ الـ n عنصر للمصفوفة الجديدة إلزامي.', 'best'],
        ['O(n)', 'الإدراج في المنتصف: نسخ n عنصر كاملة، منها n/2 إزاحة تقريباً.', 'avg'],
        ['O(n)', 'الإدراج في البداية (pos = 0): كل العناصر بلا استثناء تُزاح لليمين خانة واحدة.', 'worst']
      ],
      en: [
        ['O(n)', 'Insert at end: 0 shifts, but copying all n elements to the new array is mandatory.', 'best'],
        ['O(n)', 'Insert at middle: copies all n elements, shifting ~n/2 elements.', 'avg'],
        ['O(n)', 'Insert at start (pos = 0): every single element is shifted one slot right.', 'worst']
      ]
    },
    time: {
      ar: '<span class="pill p-acc">O(n)</span> في كل الحالات (بسبب حتمية نسخ المصفوفة الجديدة).',
      en: '<span class="pill p-acc">O(n)</span> in all cases (due to mandatory allocation & copy).'
    },
    space: {
      ar: '<span class="pill p-acc">O(n)</span> مصفوفة جديدة بحجم n + 1.',
      en: '<span class="pill p-acc">O(n)</span> new array of size n + 1.'
    },
    derive: {
      ar: 'مرحلة 1: نسخ pos عنصر + مرحلة 2: كتابة واحدة + مرحلة 3: إزاحة ونسخ (n − pos) عنصر<div class="formula">T(n) = pos + 1 + (n − pos) = n + 1  ⇒  O(n)      Space = O(n)</div>',
      en: 'Stage 1: copy pos items + Stage 2: 1 write + Stage 3: shift & copy (n − pos) items<div class="formula">T(n) = pos + 1 + (n − pos) = n + 1  ⇒  O(n)      Space = O(n)</div>'
    },
    take: {
      ar: 'ثبات حجم مصفوفات Java في الذاكرة هو السبب في أن الإضافة عملية مكلفة O(n) وتتطلب بناء مصفوفة جديدة وإزاحات.',
      en: 'Fixed array size in Java memory is why insertion costs O(n) time and space.'
    }
  },
  {
    key: 'delete',
    big: 'O(n)',
    spaceBig: 'O(n)',
    name: { ar: 'الحذف', en: 'Deletion' },
    head: {
      ar: 'حذف عنصر من موقع pos محدد (ثلاث مراحل واضحة)',
      en: 'Deleting an Element at Position pos (3 Clear Stages)'
    },
    text: {
      ar: 'لأن المصفوفة لا يمكن تصغيرها في مكانها، يتم الحذف عبر 3 مراحل: ① حجز مصفوفة جديدة بحجم n-1 ونسخ ما قبل pos، ② تخطي وتجاهل العنصر المطلوب حذفه، ③ نسخ العناصر اللاحقة مع إزاحتها خانة لليسار (-1) لملء الفراغ.',
      en: 'Since an array cannot shrink in-place, deletion takes 3 stages: ① Allocate result[n-1] and copy before pos, ② Skip arr[pos], ③ Copy elements after pos shifted left by -1.'
    },
    steps: {
      ar: [
        'المرحلة 1 (النسخ المباشر): إنشاء result[n - 1] ونسخ arr[0 … pos-1] إلى نفس الفهارس.',
        'المرحلة 2 (التخطي): تجاهل العنصر arr[pos] وعدم نسخه للمصفوفة الجديدة.',
        'المرحلة 3 (الإزاحة لليسار): نسخ arr[pos+1 … n-1] ونقل كل عنصر إلى result[i - 1].',
        'إسناد المصفوفة الجديدة: arr = result.'
      ],
      en: [
        'Stage 1 (Direct Copy): Allocate result[n - 1] and copy arr[0 … pos-1] to the same indices.',
        'Stage 2 (Skip Target): Ignore arr[pos] so it is not copied.',
        'Stage 3 (Shift Left): Copy arr[pos+1 … n-1] into result[i - 1] to close the gap.',
        'Reassign reference: arr = result.'
      ]
    },
    analogy: {
      ar: 'مثل خروج شخص من طابور: كل الأشخاص الذين كانوا يقفون خلفه يتقدمون خطوة واحدة للأمام لملء الفراغ.',
      en: 'Like someone leaving a queue: everyone standing behind steps forward one spot to close the gap.'
    },
    code: {
      ar: [
        '// المرحلة 1: حجز مصفوفة أصغر بخانة ونسخ ما قبل pos',
        'int[] result = new int[arr.length - 1];',
        'for (int i = 0; i < pos; i++) {',
        '    result[i] = arr[i];',
        '}',
        '// المرحلة 2: تخطي العنصر arr[pos] (لا يتم نسخه)',
        '// المرحلة 3: نسخ ما بعد pos مع إزاحته لليسار (-1)',
        'for (int i = pos + 1; i < arr.length; i++) {',
        '    result[i - 1] = arr[i];',
        '}',
        'arr = result;'
      ],
      en: [
        '// Stage 1: Allocate smaller array & copy elements before pos',
        'int[] result = new int[arr.length - 1];',
        'for (int i = 0; i < pos; i++) {',
        '    result[i] = arr[i];',
        '}',
        '// Stage 2: Skip target element arr[pos] (not copied)',
        '// Stage 3: Copy subsequent elements shifted left (-1)',
        'for (int i = pos + 1; i < arr.length; i++) {',
        '    result[i - 1] = arr[i];',
        '}',
        'arr = result;'
      ]
    },
    inputs: [['pos', { ar: 'الموقع pos', en: 'Position pos' }, 2]],
    defArr: [10, 20, 30, 40, 50],
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const r = Recorder({ a: p.arr }, metricsOnly)
      const n = p.arr.length
      const pos = Math.max(0, Math.min(n - 1, p.pos | 0))
      r.b = Array(n - 1).fill(null)
      r.v.pos = pos
      r.v.deleted = r.a[pos]
      r.push(
        1,
        en
          ? `Stage 1: Allocate result of length ${n - 1}. We will delete arr[${pos}] = ${r.a[pos]} and copy preceding items.`
          : `المرحلة 1: حجز result بطول ${n - 1}. سنحذف arr[${pos}] = ${r.a[pos]} ونبدأ بنسخ ما قبله.`,
        { cls: { [pos]: 'removed' } }
      )
      for (let i = 0; i < pos; i++) {
        r.c.cmp++
        r.c.rd++
        r.c.wr++
        r.b[i] = r.a[i]
        r.v.i = i
        r.push(
          3,
          en
            ? `Stage 1 (Direct copy): arr[${i}](${r.a[i]}) ➔ result[${i}] at same index.`
            : `المرحلة 1 (نسخ مباشر): arr[${i}](${r.a[i]}) ➔ result[${i}] بنفس موقعه دون إزاحة.`,
          {
            cls: { [i]: 'active', [pos]: 'removed' },
            ptr: { [i]: 'i' },
            bcls: fill(0, i + 1, 'done'),
            bptr: { [i]: `result[${i}]` }
          }
        )
      }
      r.c.cmp++
      r.push(
        5,
        en
          ? `Stage 2 (Skip): Skipped cell arr[${pos}] (${r.a[pos]}); not copied to result.`
          : `المرحلة 2 (التخطي): تم تجاوز الخانة arr[${pos}] (${r.a[pos]}) ولم تُنسخ للمصفوفة الجديدة.`,
        { cls: { [pos]: 'removed' }, ptr: { [pos]: en ? '✗ deleted' : '✗ محذوف' } }
      )
      for (let i = pos + 1; i < n; i++) {
        r.c.cmp++
        r.c.rd++
        r.c.wr++
        r.b[i - 1] = r.a[i]
        r.v.i = i
        r.push(
          8,
          en
            ? `Stage 3 (Shift left): arr[${i}](${r.a[i]}) ➔ moves to result[${i - 1}] to close the gap.`
            : `المرحلة 3 (إزاحة لليسار): arr[${i}](${r.a[i]}) ➔ ينتقل إلى result[${i - 1}] لملء الفراغ.`,
          {
            cls: { [i]: 'active', [pos]: 'removed' },
            ptr: { [i]: 'i' },
            bcls: fill(0, i, 'done', { [i - 1]: 'new' }),
            bptr: { [i - 1]: en ? '⬅ shift' : '⬅ إزاحة' }
          }
        )
      }
      r.c.cmp++
      r.a = r.b.slice()
      r.b = null
      r.push(
        10,
        en
          ? `Deletion complete! Copied ${n - 1} items and shifted ${n - 1 - pos} items left.`
          : `اكتمل الحذف بنجاح! نُسخ ${n - 1} عنصر، وتمت إزاحة ${n - 1 - pos} عنصر لليسار وتخلّصنا من الخانة.`,
        { cls: {} }
      )
      return metricsOnly ? r.c : r.S
    },
    sample: (n, k) => ({ arr: range(n), pos: k === 'best' ? n - 1 : 0 }),
    cases: {
      ar: [
        ['O(n)', 'حذف العنصر الأخير: لا توجد إزاحات، لكن يجب نسخ الـ n − 1 عنصر.', 'best'],
        ['O(n)', 'حذف عنصر من المنتصف: نسخ n − 1 عنصر، وإزاحة نصف العناصر تقريباً.', 'avg'],
        ['O(n)', 'حذف العنصر الأول (pos = 0): كل العناصر المتبقية تُزاح خطوة للأمام لملء الفراغ.', 'worst']
      ],
      en: [
        ['O(n)', 'Delete last item: 0 shifts, but copying n − 1 elements is still required.', 'best'],
        ['O(n)', 'Delete middle item: copies n − 1 elements, shifting ~n/2 elements.', 'avg'],
        ['O(n)', 'Delete first item (pos = 0): all remaining elements shift one slot left.', 'worst']
      ]
    },
    time: {
      ar: '<span class="pill p-acc">O(n)</span> في كل الحالات (بسبب نسخ المصفوفة الجديدة).',
      en: '<span class="pill p-acc">O(n)</span> in all cases (due to copying to new array).'
    },
    space: {
      ar: '<span class="pill p-acc">O(n)</span> مصفوفة جديدة بحجم n − 1.',
      en: '<span class="pill p-acc">O(n)</span> new array of size n − 1.'
    },
    derive: {
      ar: 'مرحلة 1: نسخ pos عنصر + مرحلة 2: تخطي الخانة + مرحلة 3: إزاحة (n − 1 − pos) عنصر<div class="formula">T(n) = pos + (n − 1 − pos) = n − 1  ⇒  O(n)      Space = O(n)</div>',
      en: 'Stage 1: copy pos items + Stage 2: skip + Stage 3: shift (n − 1 − pos) items<div class="formula">T(n) = pos + (n − 1 − pos) = n − 1  ⇒  O(n)      Space = O(n)</div>'
    },
    take: {
      ar: 'الحذف في مصفوفات Java الثابتة يتطلب إنشاء مصفوفة أصغر ونقل العناصر لليسار، مما يجعله خطياً O(n).',
      en: 'Deletion in fixed Java arrays requires allocating a smaller array and shifting left, making it O(n).'
    }
  },
  {
    key: 'bubble',
    big: 'O(n²)',
    spaceBig: 'O(1)',
    name: { ar: 'الترتيب الفقاعي', en: 'Bubble Sort' },
    head: { ar: 'الترتيب الفقاعي Bubble Sort', en: 'Bubble Sort (Pairwise Swapping)' },
    text: {
      ar: 'نقارن كل عنصرين متجاورين ونبدّلهما إذا كانا بترتيب خاطئ. في نهاية كل دورة «تطفو» أكبر قيمة إلى آخر المصفوفة. إذا مرّت دورة كاملة بلا تبديل فالمصفوفة مرتبة ونتوقف.',
      en: 'Compare adjacent pairs and swap if out of order. At the end of each pass, the largest value bubbles to the end. If a full pass makes no swaps, we break early.'
    },
    steps: {
      ar: [
        'الحلقة الخارجية i تمثل رقم الدورة.',
        'الحلقة الداخلية j تقارن arr[j] و arr[j+1].',
        'إذا arr[j] > arr[j+1] نبدّلهما ونضع swapped = true.',
        'آخر i عنصر أصبحت في مكانها النهائي فلا نقارنها.',
        'إذا لم يحدث تبديل في دورة: break.'
      ],
      en: [
        'Outer loop i represents the pass number.',
        'Inner loop j compares adjacent elements arr[j] and arr[j+1].',
        'If arr[j] > arr[j+1], swap them and set swapped = true.',
        'The last i elements are already in their final sorted positions.',
        'If no swap occurs during a pass: break early.'
      ]
    },
    analogy: {
      ar: 'مثل فقاعات الهواء في الماء: الفقاعة الأكبر تصعد للأعلى أولاً في كل جولة.',
      en: 'Like air bubbles in water: the largest bubble rises to the top first during each pass.'
    },
    code: [
      'for (int i = 0; i < n - 1; i++) {',
      '    boolean swapped = false;',
      '    for (int j = 0; j < n - 1 - i; j++) {',
      '        if (arr[j] > arr[j + 1]) {',
      '            int temp = arr[j];',
      '            arr[j] = arr[j + 1];',
      '            arr[j + 1] = temp;',
      '            swapped = true;',
      '        }',
      '    }',
      '    if (!swapped) break;',
      '}'
    ],
    inputs: [['preset', { ar: 'نوع المدخلات', en: 'Input Preset' }, null]],
    defArr: [50, 20, 40, 15, 35],
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const r = Recorder({ a: p.arr }, metricsOnly)
      const n = p.arr.length
      let sorted = n
      const base = () => (metricsOnly ? {} : fill(sorted, n, 'done'))
      for (let i = 0; i < n - 1; i++) {
        r.c.cmp++
        r.v.i = i
        r.v.swapped = false
        delete r.v.j
        r.push(1, en ? `Pass ${i + 1}: swapped = false` : `الدورة ${i + 1}: swapped = false`, { cls: base() })
        let sw = false
        for (let j = 0; j < n - 1 - i; j++) {
          r.c.cmp++
          r.v.j = j
          r.c.rd += 2
          r.c.cmp++
          const g = r.a[j] > r.a[j + 1]
          r.push(
            3,
            en
              ? `Is arr[${j}](${r.a[j]}) > arr[${j + 1}](${r.a[j + 1]})? ${g ? 'Yes → swap' : 'No → order ok'}`
              : `هل arr[${j}](${r.a[j]}) > arr[${j + 1}](${r.a[j + 1]}) ؟ ${g ? 'نعم ← تبديل' : 'لا ← الترتيب صحيح'}`,
            {
              cls: Object.assign(base(), { [j]: 'compare', [j + 1]: 'compare' }),
              ptr: { [j]: 'j', [j + 1]: 'j+1' }
            }
          )
          if (g) {
            const t = r.a[j]
            r.a[j] = r.a[j + 1]
            r.a[j + 1] = t
            r.c.wr += 2
            sw = true
            r.v.swapped = true
            r.push(
              5,
              en ? `Swapped → [${r.a[j]}, ${r.a[j + 1]}]` : `تم التبديل ← [${r.a[j]}, ${r.a[j + 1]}]`,
              {
                cls: Object.assign(base(), { [j]: 'swap', [j + 1]: 'swap' }),
                ptr: { [j]: 'j', [j + 1]: 'j+1' }
              }
            )
          }
        }
        r.c.cmp++
        sorted = n - 1 - i
        r.c.cmp++
        if (!sw) {
          r.push(
            10,
            en
              ? 'No swaps in this pass → array is sorted, early break!'
              : 'لم يحدث أي تبديل في هذه الدورة ← المصفوفة مرتبة، break مبكر!',
            { cls: fill(0, n, 'done') }
          )
          return metricsOnly ? r.c : r.S
        }
        r.push(
          10,
          en
            ? `End of pass ${i + 1}: value ${r.a[n - 1 - i]} settled in its final position.`
            : `انتهت الدورة ${i + 1}: القيمة ${r.a[n - 1 - i]} استقرت في مكانها النهائي.`,
          { cls: base() }
        )
      }
      r.push(11, en ? 'Sorting complete in ascending order.' : 'اكتمل الترتيب تصاعدياً.', {
        cls: fill(0, n, 'done')
      })
      return metricsOnly ? r.c : r.S
    },
    sample: (n, k) => ({ arr: k === 'best' ? range(n) : range(n).reverse() }),
    cases: {
      ar: [
        ['O(n)', 'المصفوفة مرتبة مسبقاً: دورة واحدة (n − 1 مقارنة) بلا تبديل ثم break.', 'best'],
        ['O(n²)', 'ترتيب عشوائي: حوالي نصف الأزواج تحتاج تبديل.', 'avg'],
        ['O(n²)', 'مرتبة عكسياً: كل مقارنة تنتج تبديلاً.', 'worst']
      ],
      en: [
        ['O(n)', 'Already sorted: 1 pass (n − 1 comparisons) with 0 swaps then early break.', 'best'],
        ['O(n²)', 'Random order: roughly half of the pairs require swapping.', 'avg'],
        ['O(n²)', 'Reverse sorted: every single comparison triggers a swap.', 'worst']
      ]
    },
    time: {
      ar: 'أفضل <span class="pill p-acc">O(n)</span> · متوسط وأسوأ <span class="pill p-bad">O(n²)</span>',
      en: 'Best <span class="pill p-acc">O(n)</span> · Avg & Worst <span class="pill p-bad">O(n²)</span>'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> الترتيب يتم داخل نفس المصفوفة (in-place).',
      en: '<span class="pill p-ok">O(1)</span> in-place sorting within the same array.'
    },
    derive: {
      ar: 'أسوأ حالة: مقارنات = (n−1) + (n−2) + … + 1 = n(n−1)/2 وكل منها تبديل<div class="formula">Worst: n(n−1)/2 ≈ n²/2  ⇒  O(n²)      Best: n − 1  ⇒  O(n)</div>',
      en: 'Worst case: comparisons = (n−1) + (n−2) + … + 1 = n(n−1)/2<div class="formula">Worst: n(n−1)/2 ≈ n²/2  ⇒  O(n²)      Best: n − 1  ⇒  O(n)</div>'
    },
    take: {
      ar: 'لاحظ في القياس: عند مضاعفة n تتضاعف عمليات أسوأ حالة حوالي 4 مرات — هذه علامة O(n²). المتغير swapped هو ما يجعل أفضل حالة O(n).',
      en: 'Notice in benchmarks: doubling n quadruples worst-case operations (4×) — the signature of O(n²). The swapped flag makes best case O(n).'
    }
  },
  {
    key: 'matrix',
    big: 'O(n²)',
    spaceBig: 'O(1)',
    name: { ar: 'المصفوفة ثنائية الأبعاد', en: '2D Array (Matrix)' },
    head: { ar: 'المرور على مصفوفة ثنائية الأبعاد', en: 'Traversing a 2D Array (Matrix)' },
    text: {
      ar: 'المصفوفة ثنائية الأبعاد هي «مصفوفة من المصفوفات»: كل صف هو مصفوفة. نصل للعنصر بـ m[r][c]، ونمر على الكل بحلقتين: الخارجية للصفوف والداخلية للأعمدة.',
      en: 'A 2D array is an array of arrays: each row is a 1D array. We access elements via m[r][c] using nested loops: outer for rows, inner for columns.'
    },
    steps: {
      ar: [
        'm.length = عدد الصفوف.',
        'm[r].length = عدد أعمدة الصف r.',
        'الحلقة الداخلية تكمل كل أعمدة الصف قبل الانتقال للصف التالي.',
        'عدد العناصر = صفوف × أعمدة.'
      ],
      en: [
        'm.length = number of rows.',
        'm[r].length = number of columns in row r.',
        'Inner loop completes all columns of row r before moving to row r+1.',
        'Total elements = rows × columns.'
      ]
    },
    analogy: {
      ar: 'مثل قراءة صفحة كتاب: تقرأ السطر الأول كلمةً كلمة حتى نهايته، ثم تنزل للسطر التالي.',
      en: 'Like reading a page in a book: read line 1 word by word to the end, then move down to line 2.'
    },
    code: [
      'int sum = 0;',
      'for (int r = 0; r < m.length; r++) {',
      '    for (int c = 0; c < m[r].length; c++) {',
      '        sum += m[r][c];',
      '    }',
      '}'
    ],
    inputs: [['size', { ar: 'الحجم', en: 'Grid Size' }, 3]],
    defArr: null,
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const N = p.size || 3
      const m = Array.from({ length: N }, (_, r) => Array.from({ length: N }, (_, c) => r * N + c + 1))
      const r = Recorder({ m }, metricsOnly)
      r.v.sum = 0
      r.c.wr++
      const view = (R, C) => {
        if (metricsOnly) return {}
        const cls = {}
        for (let a = 0; a < N; a++) {
          for (let b = 0; b < N; b++) {
            if (a < R || (a === R && b < C)) cls[a + '-' + b] = 'done'
            else if (a === R) cls[a + '-' + b] = 'row'
          }
        }
        if (C !== undefined && R < N) cls[R + '-' + C] = 'active'
        return { cls }
      }
      r.push(
        0,
        en ? `Matrix ${N}×${N} = ${N * N} elements. sum = 0` : `مصفوفة ${N}×${N} = ${N * N} عنصر. sum = 0`
      )
      for (let R = 0; R < N; R++) {
        r.c.cmp++
        r.v.r = R
        delete r.v.c
        r.push(1, en ? `Row r = ${R}` : `الصف r = ${R}`, view(R))
        for (let C = 0; C < N; C++) {
          r.c.cmp++
          r.c.rd++
          r.c.wr++
          r.v.c = C
          const o = r.v.sum
          r.v.sum += m[R][C]
          r.push(3, `sum = ${o} + m[${R}][${C}](${m[R][C]}) = ${r.v.sum}`, view(R, C))
        }
        r.c.cmp++
      }
      r.c.cmp++
      r.v.r = N
      r.push(
        1,
        en
          ? `Traversal finished: visited ${N}×${N} = ${N * N} elements. Total sum = ${r.v.sum}`
          : `انتهى المرور: زرنا ${N}×${N} = ${N * N} عنصر. المجموع = ${r.v.sum}`,
        view(N)
      )
      return metricsOnly ? r.c : r.S
    },
    sample: (n) => ({ size: n }),
    cases: {
      ar: [
        ['O(n²)', 'يجب زيارة كل الـ n × n عنصر.'],
        ['O(n²)', 'نفس العدد دائماً.'],
        ['O(n²)', 'n × n زيارة. وللمصفوفة غير المربعة r × c ⇒ O(r·c).']
      ],
      en: [
        ['O(n²)', 'Must visit all n × n elements.'],
        ['O(n²)', 'Always the exact same count.'],
        ['O(n²)', 'n × n visits. For non-square matrices: O(r · c).']
      ]
    },
    time: {
      ar: '<span class="pill p-bad">O(n²)</span> لمصفوفة n × n ، و O(r × c) عموماً.',
      en: '<span class="pill p-bad">O(n²)</span> for an n × n matrix, and O(r × c) in general.'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> المتغيرات sum و r و c.',
      en: '<span class="pill p-ok">O(1)</span> variables sum, r, and c.'
    },
    derive: {
      ar: 'الحلقة الداخلية تعمل n مرة لكل دورة من الخارجية التي تعمل n مرة<div class="formula">T(n) = n × n = n²  ⇒  O(n²)</div>',
      en: 'Inner loop runs n times for each of the n outer loop iterations<div class="formula">T(n) = n × n = n²  ⇒  O(n²)</div>'
    },
    take: {
      ar: 'O(n²) هنا ليست «سيئة»: هي خطية بالنسبة لعدد العناصر (n²). الحلقتان المتداخلتان تعني n² فقط لأن البيانات نفسها n².',
      en: 'O(n²) here is optimal because the input itself has n² elements—we touch each element once.'
    }
  }
]

OPS.forEach((op, idx) => {
  op.numberPrefix = `3.${idx + 1}`
})

// Fast benchmark counter using metricsOnly mode (0 allocations!)
export function countOpsFast(op, n, caseKey) {
  const c = op.gen(op.sample(n, caseKey), 'ar', true)
  return c.cmp + c.rd + c.wr
}
