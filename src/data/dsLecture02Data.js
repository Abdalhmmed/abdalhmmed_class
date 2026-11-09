import { Recorder } from '@/core/recorder'

/**
 * Complete Bilingual Data & 9 Interactive 2D Array / Matrix Operations
 * for Data Structures Lecture 02 (2D Arrays & Matrices in Java)
 */

const makeGrid = (N, start = 10, step = 5) =>
  Array.from({ length: N }, (_, r) =>
    Array.from({ length: N }, (_, c) => start + (r * N + c) * step)
  )

export const OPS_2D = [
  // 1. Direct Cell Access & Update O(1)
  {
    key: 'access2d',
    big: 'O(1)',
    spaceBig: 'O(1)',
    benchSizes: [2, 4, 8, 16],
    benchLabel: 'N (N×N)',
    name: { ar: 'الوصول والتعديل 2D', en: '2D Access & Update' },
    head: {
      ar: 'الوصول المباشر للخلية بالإحداثيات m[r][c]',
      en: 'Direct Coordinate Access & Update m[r][c]'
    },
    text: {
      ar: 'نحدد رقم الصف r ورقم العمود c فنقفز مباشرة إلى الخلية المطلوبة في خطوة واحدة ثابتة دون المرور على أي صف أو عمود يسبقها.',
      en: 'By specifying row index r and column index c, the CPU jumps straight to the target cell in O(1) time without scanning prior rows or columns.'
    },
    steps: {
      ar: [
        'نحدد إحداثي الصف r وإحداثي العمود c.',
        'المعالج يجلب مرجع الصف m[r] ثم يقفز للإزاحة + c × 4.',
        'نقرأ القيمة الحالية أو نكتب القيمة الجديدة في نفس الخلية فوراً.'
      ],
      en: [
        'Specify target row index r and column index c.',
        'CPU resolves row reference m[r] and jumps to column offset + c × 4.',
        'Read the current value or overwrite it with a new value in 1 step.'
      ]
    },
    analogy: {
      ar: 'مثل تذكرة السينما التي تحمل «الصف 1، المقعد 2»: تتجه مباشرة لصفك ومقعدك دون تفحّص بقية المقاعد.',
      en: 'Like a movie ticket printed with "Row 1, Seat 2": you walk straight to your row and seat without checking other seats.'
    },
    code: {
      ar: [
        'int[][] m = {…};',
        'int x = m[r][c];     // قراءة مباشرة O(1)',
        'm[r][c] = value;     // تعديل مباشر O(1)'
      ],
      en: [
        'int[][] m = {…};',
        'int x = m[r][c];     // Direct read O(1)',
        'm[r][c] = value;     // Direct update O(1)'
      ]
    },
    inputs: [
      ['r', { ar: 'الصف r', en: 'Row r' }, 1],
      ['c', { ar: 'العمود c', en: 'Col c' }, 2],
      ['value', { ar: 'القيمة الجديدة', en: 'New Value' }, 99]
    ],
    defArr: null,
    validateParams(p, pv) {
      p.r = Math.max(0, Math.min(2, p.r | 0))
      p.c = Math.max(0, Math.min(3, p.c | 0))
      pv.r = p.r
      pv.c = p.c
    },
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const m = [
        [10, 20, 30, 40],
        [50, 60, 70, 80],
        [15, 25, 35, 45]
      ]
      const rec = Recorder({ m }, metricsOnly)
      const r = Math.max(0, Math.min(2, p.r ?? 1))
      const c = Math.max(0, Math.min(3, p.c ?? 2))
      const val = p.value ?? 99
      const key = `${r}-${c}`

      rec.push(
        0,
        en
          ? 'Matrix dimensions: 3 rows (0..2) × 4 columns (0..3).'
          : 'أبعاد المصفوفة: 3 صفوف (0..2) × 4 أعمدة (0..3).'
      )

      rec.c.rd++
      rec.v.r = r
      rec.v.c = c
      rec.v.x = rec.m[r][c]
      rec.push(
        1,
        en
          ? `Read m[${r}][${c}]: jump to Row ${r}, Column ${c} → x = ${rec.m[r][c]} (1 step).`
          : `قراءة m[${r}][${c}]: قفز مباشر للصف ${r} والعمود ${c} ← x = ${rec.m[r][c]} (خطوة واحدة).`,
        {
          cls: { [key]: 'active' },
          ptr: { [key]: `m[${r}][${c}]` }
        }
      )

      rec.m[r][c] = val
      rec.c.wr++
      rec.push(
        2,
        en
          ? `Write m[${r}][${c}] = ${val} in-place (1 step). All other 11 cells untouched.`
          : `كتابة m[${r}][${c}] = ${val} في نفس الخلية مباشرة (خطوة واحدة) دون لمس أي خلية أخرى.`,
        {
          cls: { [key]: 'found' },
          ptr: { [key]: `=${val}` }
        }
      )

      return metricsOnly ? rec.c : rec.S
    },
    sample: (n) => ({ r: n - 1, c: n - 1, value: 99 }),
    cases: {
      ar: [
        ['O(1)', 'الوصول للخلية [0][0] يستغرق خطوة واحدة.'],
        ['O(1)', 'أي خلية في وسط الشبكة تُزار بخطوة واحدة.'],
        ['O(1)', 'حتى آخر خلية [R-1][C-1] نصل لها فوراً بحساب الإزاحة.']
      ],
      en: [
        ['O(1)', 'Accessing cell [0][0] takes 1 constant step.'],
        ['O(1)', 'Any interior cell [r][c] is reached in 1 step.'],
        ['O(1)', 'Even the last cell [R-1][C-1] is reached via direct offset calculation.']
      ]
    },
    time: {
      ar: '<span class="pill p-ok">O(1)</span> في جميع الحالات.',
      en: '<span class="pill p-ok">O(1)</span> in all cases.'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> لا نستهلك أي ذاكرة إضافية.',
      en: '<span class="pill p-ok">O(1)</span> zero auxiliary memory.'
    },
    derive: {
      ar: 'قراءة مرجع الصف + قراءة العمود = عملية ثابتة لا تعتمد على R أو C<div class="formula">T(R, C) = 1  ⇒  O(1)</div>',
      en: 'Row pointer lookup + column offset = constant operations independent of R or C<div class="formula">T(R, C) = 1  ⇒  O(1)</div>'
    },
    take: {
      ar: 'الوصول العشوائي ثنائي الأبعاد m[r][c] يتمتع بنفس سرعة المصفوفة الأحادية O(1).',
      en: '2D coordinate access m[r][c] enjoys the exact same O(1) speed as 1D array indexing.'
    }
  },

  // 2. Row-Major Traversal & Row Sums O(R * C)
  {
    key: 'rowcolsum',
    big: 'O(n²)',
    spaceBig: 'O(1)',
    benchSizes: [2, 3, 4, 6],
    benchLabel: 'N (N×N)',
    secondaryLabel: {
      ar: 'مجاميع الصفوف المستخرجة (rowSums)',
      en: 'Computed Row Sums (rowSums)'
    },
    name: { ar: 'مجموع الشبكة والصفوف', en: 'Grid & Row Sums' },
    head: {
      ar: 'المرور الشامل وحساب مجموع كل صف والمجموع الكلي',
      en: 'Row-Major Traversal: Computing Row Sums & Grand Total'
    },
    text: {
      ar: 'نستخدم حلقة خارجية للصفوف r وحلقة داخلية للأعمدة c. قبل بداية كل صف نصفر متغير rowSum = 0 لجمع عناصر ذلك الصف وحده، مع إضافتها للمجموع الكلي total.',
      en: 'We use an outer loop for rows r and an inner loop for columns c. At the start of each row r, we reset rowSum = 0 to accumulate that row’s total while also adding to total.'
    },
    steps: {
      ar: [
        'نهيّئ المجموع الكلي total = 0.',
        'في بداية كل دورة للصف r: نصفر rowSum = 0.',
        'الحلقة الداخلية تمر على الأعمدة c وتجمع: rowSum += m[r][c].',
        'عند انتهاء أعمدة الصف r نضيف rowSum إلى total ونحفظ مجموع الصف.'
      ],
      en: [
        'Initialize grand total = 0.',
        'At the start of each row r: reset rowSum = 0.',
        'Inner loop scans columns c: rowSum += m[r][c].',
        'After finishing row r, record rowSum and add it to total.'
      ]
    },
    analogy: {
      ar: 'مثل محاسب يجمع فاتورة مبيعات جدولية: يجمع مبيعات اليوم الأول أفقياً ويسجل مجموعها، ثم ينتقل لليوم الثاني.',
      en: 'Like an accountant totaling a spreadsheet: sum Row 1 horizontally and record its subtotal, then move to Row 2.'
    },
    code: [
      'int total = 0;',
      'for (int r = 0; r < m.length; r++) {',
      '    int rowSum = 0;',
      '    for (int c = 0; c < m[r].length; c++) {',
      '        rowSum += m[r][c];',
      '    }',
      '    total += rowSum;',
      '}'
    ],
    inputs: [['size', { ar: 'حجم الشبكة N×N', en: 'Grid Size N×N' }, 3]],
    defArr: null,
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const N = p.size || 3
      const m = makeGrid(N, 5, 5)
      const rec = Recorder({ m }, metricsOnly)
      rec.b = Array(N).fill(null)
      rec.v.total = 0
      rec.c.wr++

      const buildCls = (curR, curC) => {
        if (metricsOnly) return {}
        const cls = {}
        const ptr = {}
        for (let a = 0; a < N; a++) {
          for (let b = 0; b < N; b++) {
            if (a < curR || (a === curR && curC !== undefined && b < curC)) {
              cls[`${a}-${b}`] = 'done'
            } else if (a === curR) {
              cls[`${a}-${b}`] = 'row'
            }
          }
        }
        if (curC !== undefined && curR < N) {
          cls[`${curR}-${curC}`] = 'active'
          ptr[`${curR}-${curC}`] = `r=${curR},c=${curC}`
        }
        return { cls, ptr }
      }

      rec.push(
        0,
        en
          ? `Initialize total = 0 for ${N}×${N} matrix (${N * N} cells).`
          : `نهيّئ المجموع الكلي total = 0 لمصفوفة بحجم ${N}×${N} (${N * N} خلية).`
      )

      for (let r = 0; r < N; r++) {
        rec.c.cmp++
        rec.v.r = r
        rec.v.rowSum = 0
        rec.c.wr++
        delete rec.v.c
        rec.push(
          2,
          en
            ? `Start Row r = ${r}: reset rowSum = 0.`
            : `بداية الصف r = ${r}: نصفر جامع الصف rowSum = 0.`,
          buildCls(r)
        )

        for (let c = 0; c < N; c++) {
          rec.c.cmp++
          rec.c.rd++
          rec.c.wr++
          rec.v.c = c
          const prev = rec.v.rowSum
          rec.v.rowSum += m[r][c]
          rec.push(
            4,
            `rowSum = ${prev} + m[${r}][${c}](${m[r][c]}) = ${rec.v.rowSum}`,
            buildCls(r, c)
          )
        }
        rec.c.cmp++
        rec.v.total += rec.v.rowSum
        rec.c.wr++
        rec.b[r] = rec.v.rowSum
        const bcls = {}
        for (let k = 0; k <= r; k++) bcls[k] = k === r ? 'found' : 'done'
        rec.push(
          6,
          en
            ? `Row ${r} complete: rowSum = ${rec.v.rowSum} → total = ${rec.v.total}`
            : `اكتمل الصف ${r}: مجموع الصف = ${rec.v.rowSum} ← المجموع الكلي total = ${rec.v.total}`,
          {
            ...buildCls(r + 1),
            bcls,
            bptr: { [r]: `Row ${r}` }
          }
        )
      }
      rec.c.cmp++
      return metricsOnly ? rec.c : rec.S
    },
    sample: (n) => ({ size: n }),
    cases: {
      ar: [
        ['O(n²)', 'يجب زيارة جميع خلايا الشبكة N × N بلا استثناء.'],
        ['O(n²)', 'نفس عدد الدورات دائماً R × C.'],
        ['O(n²)', 'في المصفوفة المستطيلة يكتب O(R × C).']
      ],
      en: [
        ['O(n²)', 'Every single cell in the N × N grid must be visited.'],
        ['O(n²)', 'Always the exact same R × C iterations.'],
        ['O(n²)', 'For rectangular matrices, expressed as O(R × C).']
      ]
    },
    time: {
      ar: '<span class="pill p-bad">O(n²)</span> لمصفوفة مربعة N×N (أو O(R·C) عامةً).',
      en: '<span class="pill p-bad">O(n²)</span> for an N×N matrix (or O(R·C) generally).'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> للمجاميع الفورية (أو O(R) إذا خزّنا مجاميع الصفوف).',
      en: '<span class="pill p-ok">O(1)</span> for on-the-fly sums (or O(R) if storing row sums).'
    },
    derive: {
      ar: 'لكل صف من الـ N صفوف، تعمل الحلقة الداخلية N مرات<div class="formula">T(N) = N × N = N²  ⇒  O(n²)</div>',
      en: 'For each of the N rows, the inner loop executes N times<div class="formula">T(N) = N × N = N²  ⇒  O(n²)</div>'
    },
    take: {
      ar: 'انتبه لموضع تصفير rowSum = 0: يجب أن يكون داخل الحلقة الخارجية (قبل الحلقة الداخلية) ليتصفر مع كل صف جديد!',
      en: 'Crucial rule: rowSum = 0 must be placed inside the outer loop (right before the inner loop) so it resets for each new row!'
    }
  },

  // 3. 2D Min & Max with Coordinates O(R * C)
  {
    key: 'minmax2d',
    big: 'O(n²)',
    spaceBig: 'O(1)',
    benchSizes: [2, 3, 4, 6],
    benchLabel: 'N (N×N)',
    name: { ar: 'الأكبر والأصغر بإحداثياتهما', en: '2D Min & Max + Coords' },
    head: {
      ar: 'إيجاد أكبر وأصغر قيمة في المصفوفة الثنائية مع حفظ موقعيهما [r][c]',
      en: 'Finding 2D Maximum & Minimum Values and Their [r][c] Coordinates'
    },
    text: {
      ar: 'نفترض أن الخلية الأولى m[0][0] هي الأكبر والأصغر مبدئياً، ثم نمسح الشبكة بحلقتين متداخلتين ونحفظ القيمة وإحداثيي الصف والعمود عند كل تحديث.',
      en: 'Initialize max and min to m[0][0] at coordinates (0,0), then scan all cells using nested loops and update both value and [r][c] coordinates whenever a larger or smaller cell is found.'
    },
    steps: {
      ar: [
        'نضع max = min = m[0][0] والإحداثيات عند (0, 0).',
        'نمر بحلقتين على كل خلية m[r][c].',
        'إذا كانت m[r][c] > max نحدّث max ونحفظ maxR = r, maxC = c.',
        'إذا كانت m[r][c] < min نحدّث min ونحفظ minR = r, minC = c.'
      ],
      en: [
        'Initialize max = min = m[0][0] at coordinates (0, 0).',
        'Traverse every cell m[r][c] via nested loops.',
        'If m[r][c] > max, update max and record maxR = r, maxC = c.',
        'If m[r][c] < min, update min and record minR = r, minC = c.'
      ]
    },
    analogy: {
      ar: 'مثل مسح خريطة حرارية بالرادار لتحديد أعلى قمة جبلية وأعمق وادٍ مع تسجيل إحداثيات خط العرض والطول لكلٍّ منهما.',
      en: 'Like scanning a topographic elevation map to pinpoint both the highest peak and deepest valley along with their GPS coordinates.'
    },
    code: [
      'int max = m[0][0], maxR = 0, maxC = 0;',
      'int min = m[0][0], minR = 0, minC = 0;',
      'for (int r = 0; r < m.length; r++) {',
      '    for (int c = 0; c < m[r].length; c++) {',
      '        if (m[r][c] > max) { max = m[r][c]; maxR = r; maxC = c; }',
      '        if (m[r][c] < min) { min = m[r][c]; minR = r; minC = c; }',
      '    }',
      '}'
    ],
    inputs: [],
    defArr: null,
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const m = p.m || [
        [24, 15, 42],
        [9, 88, 31],
        [60, 4, 53]
      ]
      const N = m.length
      const rec = Recorder({ m }, metricsOnly)
      let maxR = 0,
        maxC = 0,
        minR = 0,
        minC = 0
      rec.c.rd++
      rec.c.wr += 2
      rec.v.max = m[0][0]
      rec.v.min = m[0][0]
      rec.v.maxPos = '[0][0]'
      rec.v.minPos = '[0][0]'

      const view = (curR, curC) => {
        if (metricsOnly) return {}
        const cls = {}
        const ptr = {}
        for (let r = 0; r < N; r++) {
          for (let c = 0; c < N; c++) {
            if (curR !== undefined && (r < curR || (r === curR && c < curC))) {
              cls[`${r}-${c}`] = 'visited'
            }
          }
        }
        const mxKey = `${maxR}-${maxC}`
        const mnKey = `${minR}-${minC}`
        cls[mxKey] = 'max'
        ptr[mxKey] = 'MAX'
        cls[mnKey] = 'min'
        ptr[mnKey] = mxKey === mnKey ? 'MAX/MIN' : 'MIN'
        if (curR !== undefined) {
          const curKey = `${curR}-${curC}`
          if (curKey !== mxKey && curKey !== mnKey) {
            cls[curKey] = 'active'
          }
          ptr[curKey] = ptr[curKey] ? `${ptr[curKey]} · [${curR}][${curC}]` : `[${curR}][${curC}]`
        }
        return { cls, ptr }
      }

      rec.push(
        0,
        en
          ? `Start at [0][0]: max = min = ${m[0][0]}`
          : `نبدأ من الخلية [0][0]: نفترض max = min = ${m[0][0]}`,
        view()
      )

      for (let r = 0; r < N; r++) {
        rec.c.cmp++
        for (let c = 0; c < N; c++) {
          rec.c.cmp++
          if (r === 0 && c === 0) continue
          rec.c.rd++
          const val = m[r][c]
          rec.c.cmp++
          if (val > rec.v.max) {
            rec.v.max = val
            maxR = r
            maxC = c
            rec.v.maxPos = `[${r}][${c}]`
            rec.c.wr++
            rec.push(
              4,
              en
                ? `m[${r}][${c}] (${val}) > max → new MAX = ${val} at [${r}][${c}]!`
                : `الخلية m[${r}][${c}] (${val}) أكبر من max ← نحدّث MAX = ${val} في [${r}][${c}]!`,
              view(r, c)
            )
          } else {
            rec.c.cmp++
            if (val < rec.v.min) {
              rec.v.min = val
              minR = r
              minC = c
              rec.v.minPos = `[${r}][${c}]`
              rec.c.wr++
              rec.push(
                5,
                en
                  ? `m[${r}][${c}] (${val}) < min → new MIN = ${val} at [${r}][${c}]!`
                  : `الخلية m[${r}][${c}] (${val}) أصغر من min ← نحدّث MIN = ${val} في [${r}][${c}]!`,
                view(r, c)
              )
            } else {
              rec.push(
                4,
                en
                  ? `Inspect m[${r}][${c}] = ${val}: between min(${rec.v.min}) and max(${rec.v.max}).`
                  : `فحص m[${r}][${c}] = ${val}: تقع بين الأصغر (${rec.v.min}) والأكبر (${rec.v.max}).`,
                view(r, c)
              )
            }
          }
        }
        rec.c.cmp++
      }
      rec.c.cmp++
      rec.push(
        6,
        en
          ? `Scan complete: MAX = ${rec.v.max} at ${rec.v.maxPos}, MIN = ${rec.v.min} at ${rec.v.minPos}.`
          : `اكتمل المسح: أكبر قيمة MAX = ${rec.v.max} في ${rec.v.maxPos}، وأصغر قيمة MIN = ${rec.v.min} في ${rec.v.minPos}.`,
        view()
      )
      return metricsOnly ? rec.c : rec.S
    },
    sample: (n) => ({ m: makeGrid(n, 10, 3) }),
    cases: {
      ar: [
        ['O(n²)', 'لابد من فحص كل الخلايا للتأكد من عدم وجود قيمة أكبر أو أصغر.'],
        ['O(n²)', 'نفس عدد الزيارات R × C دائماً.'],
        ['O(n²)', 'يزداد فقط عدد مرات تحديث المتغيرات.']
      ],
      en: [
        ['O(n²)', 'Every cell must be inspected to guarantee global extrema.'],
        ['O(n²)', 'Always scans all R × C cells.'],
        ['O(n²)', 'Only the number of variable updates increases.']
      ]
    },
    time: {
      ar: '<span class="pill p-bad">O(n²)</span> لمصفوفة N×N (أو O(R·C)).',
      en: '<span class="pill p-bad">O(n²)</span> for an N×N matrix (or O(R·C)).'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> متغيرات القيم والإحداثيات فقط.',
      en: '<span class="pill p-ok">O(1)</span> only scalar variables for values and coordinates.'
    },
    derive: {
      ar: 'زيارة R × C خلية مع مقارنتين لكل خلية<div class="formula">T(N) ≈ 2N²  ⇒  O(n²)</div>',
      en: 'Visits R × C cells with up to 2 comparisons per cell<div class="formula">T(N) ≈ 2N²  ⇒  O(n²)</div>'
    },
    take: {
      ar: 'حفظ إحداثيات (maxR, maxC) إلى جانب القيمة max يُمكّننا من العودة للخلية وتعديلها لاحقاً في O(1).',
      en: 'Recording coordinates (maxR, maxC) alongside max allows us to jump back and modify that cell later in O(1).'
    }
  },

  // 4. 2D Linear Search (Unsorted Grid)
  {
    key: 'search2d',
    big: 'O(n²)',
    spaceBig: 'O(1)',
    benchSizes: [2, 3, 4, 6],
    benchLabel: 'N (N×N)',
    name: { ar: 'البحث الخطي 2D', en: '2D Linear Search' },
    head: {
      ar: 'البحث الخطي في مصفوفة ثنائية غير مرتبة',
      en: 'Sequential Linear Search in an Unsorted 2D Matrix'
    },
    text: {
      ar: 'عندما تكون عناصر المصفوفة الثنائية غير مرتبة، نفحص الخلايا صفاً بصف وعموداً بعمود. فور العثور على القيمة المطلوبة target نحفظ إحداثياتها (foundR, foundC) ونخرج من الحلقتين بـ break outer.',
      en: 'When a 2D matrix is unsorted, we scan row by row, column by column. As soon as target is found, we record (foundR, foundC) and exit both loops immediately.'
    },
    steps: {
      ar: [
        'نبدأ بافتراض عدم وجود الهدف: foundR = -1, foundC = -1.',
        'نمر بحلقتين متداخلتين على كل خلية m[r][c].',
        'إذا كانت m[r][c] == target نحفظ r و c ونكسر الحلقتين.',
        'إذا انتهت الشبكة بلا تطابق تبقى الإحداثيات -1.'
      ],
      en: [
        'Assume target is absent: foundR = -1, foundC = -1.',
        'Scan every cell m[r][c] using nested loops.',
        'If m[r][c] == target, save r and c and break out of both loops.',
        'If the entire grid is scanned without a match, coordinates remain -1.'
      ]
    },
    analogy: {
      ar: 'مثل البحث عن مقعد زميلك في قاعة امتحانات عشوائية الجلوس: تتفقد الصف الأول مقعداً مقعداً، ثم الصف الثاني حتى تجده.',
      en: 'Like looking for a friend in an unassigned auditorium: scan Row 1 seat by seat, then Row 2, until you spot them.'
    },
    code: [
      'int foundR = -1, foundC = -1;',
      'outer: for (int r = 0; r < m.length; r++) {',
      '    for (int c = 0; c < m[r].length; c++) {',
      '        if (m[r][c] == target) {',
      '            foundR = r; foundC = c;',
      '            break outer;',
      '        }',
      '    }',
      '}'
    ],
    inputs: [['target', { ar: 'القيمة المطلوبة target', en: 'Target value' }, 35]],
    defArr: null,
    tryCaseFn(caseKey, pv) {
      pv.target = caseKey === 'best' ? 12 : 99
    },
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const m = p.m || [
        [12, 45, 19],
        [28, 35, 61],
        [70, 14, 82]
      ]
      const N = m.length
      const target = p.target ?? 35
      const rec = Recorder({ m }, metricsOnly)
      rec.v.target = target
      rec.v.foundR = -1
      rec.v.foundC = -1
      rec.c.wr += 2

      const markVisited = (uptoR, uptoC, extra = {}) => {
        if (metricsOnly) return {}
        const cls = {}
        for (let a = 0; a < N; a++) {
          for (let b = 0; b < N; b++) {
            if (a < uptoR || (a === uptoR && b < uptoC)) cls[`${a}-${b}`] = 'visited'
          }
        }
        return Object.assign(cls, extra)
      }

      rec.push(
        0,
        en
          ? `Searching for target = ${target} across ${N}×${N} matrix.`
          : `نبحث عن القيمة target = ${target} في مصفوفة ${N}×${N}.`
      )

      for (let r = 0; r < N; r++) {
        rec.c.cmp++
        rec.v.r = r
        for (let c = 0; c < N; c++) {
          rec.c.cmp++
          rec.c.rd++
          rec.c.cmp++
          rec.v.c = c
          const eq = m[r][c] === target
          const key = `${r}-${c}`
          rec.push(
            3,
            en
              ? `Compare m[${r}][${c}](${m[r][c]}) == ${target}? ${eq ? 'Match ✓' : 'No ✗'}`
              : `هل m[${r}][${c}](${m[r][c]}) == ${target} ؟ ${eq ? 'نعم ✓ تطابق!' : 'لا ✗ نكمل'}`,
            {
              cls: markVisited(r, c, { [key]: eq ? 'found' : 'compare' }),
              ptr: { [key]: eq ? 'FOUND ✓' : `[${r}][${c}]` }
            }
          )
          if (eq) {
            rec.v.foundR = r
            rec.v.foundC = c
            rec.c.wr += 2
            rec.push(
              5,
              en
                ? `Found at [${r}][${c}] after ${r * N + c + 1} cell comparison(s)! break outer exits both loops.`
                : `وُجد الهدف في [${r}][${c}] بعد ${r * N + c + 1} مقارنة فقط! نتوقف فوراً بـ break outer.`,
              {
                cls: markVisited(r, c, { [key]: 'found' }),
                ptr: { [key]: `[${r}][${c}] ✓` }
              }
            )
            return metricsOnly ? rec.c : rec.S
          }
        }
        rec.c.cmp++
      }
      rec.c.cmp++
      rec.push(
        1,
        en
          ? `Scanned all ${N * N} cells without match → foundR = -1, foundC = -1 (Worst Case).`
          : `فحصنا جميع الخلايا (${N * N}) دون تطابق ← العنصر غير موجود (أسوأ حالة).`,
        { cls: markVisited(N, 0) }
      )
      return metricsOnly ? rec.c : rec.S
    },
    sample: (n, k) => {
      const m = makeGrid(n, 10, 5)
      return { m, target: k === 'best' ? m[0][0] : -1 }
    },
    cases: {
      ar: [
        ['O(1)', 'العنصر المطلوب في أول خلية m[0][0] ← مقارنة واحدة فقط.', 'best'],
        ['O(n²)', 'العنصر في منتصف الشبكة ← نفحص نصف الخلايا تقريباً (R·C / 2).', 'avg'],
        ['O(n²)', 'العنصر في آخر خلية أو غير موجود ← نفحص كل الـ R × C خلية.', 'worst']
      ],
      en: [
        ['O(1)', 'Target is at the very first cell m[0][0] → 1 comparison.', 'best'],
        ['O(n²)', 'Target is near the center → scans ~(R·C)/2 cells.', 'avg'],
        ['O(n²)', 'Target is at last cell or absent → scans all R × C cells.', 'worst']
      ]
    },
    time: {
      ar: 'أفضل <span class="pill p-ok">O(1)</span> · أسوأ <span class="pill p-bad">O(n²)</span>',
      en: 'Best <span class="pill p-ok">O(1)</span> · Worst <span class="pill p-bad">O(n²)</span>'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> متغيرات الفهارس فقط.',
      en: '<span class="pill p-ok">O(1)</span> index variables only.'
    },
    derive: {
      ar: 'أفضل حالة = 1 مقارنة، أسوأ حالة = R × C مقارنة عناصر<div class="formula">Best = O(1)      Worst = O(R · C) = O(n²)</div>',
      en: 'Best case = 1 comparison, Worst case = R × C cell comparisons<div class="formula">Best = O(1)      Worst = O(R · C) = O(n²)</div>'
    },
    take: {
      ar: 'استخدام التسمية outer: مع break يتيح الخروج من الحلقتين الداخلية والخارجية معاً فور العثور على الهدف.',
      en: 'Using a labeled break (break outer;) exits both inner and outer loops immediately upon finding the target.'
    }
  },

  // 5. Staircase Search in Sorted 2D Matrix O(R + C)
  {
    key: 'staircase',
    big: 'O(n)',
    spaceBig: 'O(1)',
    benchSizes: [2, 4, 8, 16],
    benchLabel: 'N (N×N)',
    name: { ar: 'البحث السُلّمي الذكي O(N)', en: 'Staircase Search O(N)' },
    head: {
      ar: 'البحث السُلّمي في مصفوفة مرتبة صفوفاً وأعمدة بزمن O(R + C)',
      en: 'Staircase Search in a Row & Column Sorted Matrix in O(R + C)'
    },
    text: {
      ar: 'إذا كانت كل صفوف وأعمدة المصفوفة مرتبة تصاعدياً، فلا حاجة لفحص كل الخلايا O(n²)! نبدأ من الزاوية العليا اليمنى (r = 0, c = C-1): إذا كانت الخلية أكبر من الهدف نستبعد العمود كله ونتحرك يساراً (c--)، وإذا كانت أصغر نستبعد الصف كله وننزل للأسفل (r++).',
      en: 'When rows and columns are sorted in ascending order, we avoid O(n²) brute force! Start at the top-right corner (r = 0, c = C-1): if m[r][c] > target, eliminate the entire column (c--); if m[r][c] < target, eliminate the entire row (r++).'
    },
    steps: {
      ar: [
        'نضع المؤشر في الزاوية العليا اليمنى: r = 0 و c = cols - 1.',
        'ما دام r < rows و c >= 0:',
        'إذا كان m[r][c] == target وجدنا الهدف ونتوقف.',
        'إذا كان m[r][c] > target نتحرك خطوة لليسار: c-- (لأن كل ما تحتها أكبر).',
        'إذا كان m[r][c] < target ننزل خطوة للأسفل: r++ (لأن كل ما يسارها أصغر).'
      ],
      en: [
        'Start pointer at top-right corner: r = 0, c = cols - 1.',
        'While r < rows and c >= 0:',
        'If m[r][c] == target, match found!',
        'If m[r][c] > target, move left: c-- (all cells below in column c are even larger).',
        'If m[r][c] < target, move down: r++ (all cells left in row r are even smaller).'
      ]
    },
    analogy: {
      ar: 'مثل نزول درجات السلم: في كل خطوة إما تتقدم درجة لليسار أو تنزل درجة للأسفل، فلا تزور أكثر من (عدد الصفوف + عدد الأعمدة) خطوة أبداً!',
      en: 'Like walking down a staircase across the grid: every comparison steps either 1 cell left or 1 cell down—taking at most R + C steps!'
    },
    code: [
      'int r = 0, c = m[0].length - 1;',
      'while (r < m.length && c >= 0) {',
      '    if (m[r][c] == target) return true;',
      '    else if (m[r][c] > target) c--; // استبعاد العمود',
      '    else r++;                       // استبعاد الصف',
      '}'
    ],
    inputs: [['target', { ar: 'القيمة المطلوبة target', en: 'Target value' }, 29]],
    defArr: null,
    tryCaseFn(caseKey, pv) {
      pv.target = caseKey === 'best' ? 15 : 32
    },
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const m = p.m || [
        [10, 20, 30, 40],
        [15, 25, 35, 45],
        [27, 29, 37, 48],
        [32, 33, 39, 50]
      ]
      const N = m.length
      const C = m[0].length
      const target = p.target ?? 29
      const rec = Recorder({ m }, metricsOnly)
      let r = 0
      let c = C - 1
      rec.v.target = target
      rec.v.r = r
      rec.v.c = c
      const eliminated = {}

      const view = (curCls = 'active', note = '') => {
        if (metricsOnly) return {}
        const cls = { ...eliminated }
        const ptr = {}
        if (r < N && c >= 0) {
          cls[`${r}-${c}`] = curCls
          ptr[`${r}-${c}`] = note || `r=${r},c=${c}`
        }
        return { cls, ptr }
      }

      rec.push(
        0,
        en
          ? `Start at top-right corner: r = 0, c = ${c} (m[0][${c}] = ${m[0][c]}), searching for ${target}.`
          : `نبدأ من الزاوية العليا اليمنى: r = 0, c = ${c} (القيمة ${m[0][c]}) للبحث عن ${target}.`,
        view()
      )

      while (r < N && c >= 0) {
        rec.c.cmp++
        rec.c.rd++
        const cur = m[r][c]
        rec.v.r = r
        rec.v.c = c

        rec.c.cmp++
        if (cur === target) {
          rec.push(
            2,
            en
              ? `m[${r}][${c}] == ${target} ✓ Found target in just ${r + (C - 1 - c) + 1} steps (out of ${N * C} cells)!`
              : `تطابق! m[${r}][${c}] == ${target} ✓ وجدنا الهدف في ${r + (C - 1 - c) + 1} خطوات فقط من أصل ${N * C} خلية!`,
            view('found', 'FOUND ✓')
          )
          return metricsOnly ? rec.c : rec.S
        }

        rec.c.cmp++
        if (cur > target) {
          rec.push(
            3,
            en
              ? `m[${r}][${c}](${cur}) > ${target} → Eliminate rest of Column ${c} & move LEFT (c--).`
              : `بما أن m[${r}][${c}](${cur}) > ${target} ← نستبعد بقية العمود ${c} ونتحرك لليسار (c--).`,
            view('compare', `${cur} > ${target} ⬅`)
          )
          for (let k = r; k < N; k++) eliminated[`${k}-${c}`] = 'visited'
          c--
        } else {
          rec.push(
            4,
            en
              ? `m[${r}][${c}](${cur}) < ${target} → Eliminate rest of Row ${r} & move DOWN (r++).`
              : `بما أن m[${r}][${c}](${cur}) < ${target} ← نستبعد بقية الصف ${r} وننزل للأسفل (r++).`,
            view('compare', `${cur} < ${target} ⬇`)
          )
          for (let k = 0; k <= c; k++) eliminated[`${r}-${k}`] = 'visited'
          r++
        }
      }
      rec.c.cmp++
      rec.push(
        1,
        en
          ? `Pointer exited grid bounds → Target ${target} is not in the matrix (took only ${N + C} steps!).`
          : `خرج المؤشر من حدود الشبكة ← القيمة ${target} غير موجودة (فحصنا ${N + C} خطوة فقط بدلاً من ${N * C}!).`,
        { cls: eliminated }
      )
      return metricsOnly ? rec.c : rec.S
    },
    sample: (n, k) => {
      const m = makeGrid(n, 10, 4)
      return { m, target: k === 'best' ? m[0][n - 1] : m[n - 1][0] }
    },
    cases: {
      ar: [
        ['O(1)', 'الهدف يقع في الزاوية العليا اليمنى m[0][C-1] مباشرة.', 'best'],
        ['O(n)', 'الهدف في وسط الشبكة ← حوالي N خطوة.', 'avg'],
        ['O(n)', 'الهدف في الزاوية السفلى اليسرى أو غير موجود ← أقصى عدد خطوات هو R + C = 2N.', 'worst']
      ],
      en: [
        ['O(1)', 'Target is right at top-right corner m[0][C-1].', 'best'],
        ['O(n)', 'Target is inside grid → ~N steps.', 'avg'],
        ['O(n)', 'Target at bottom-left or absent → at most R + C = 2N steps.', 'worst']
      ]
    },
    time: {
      ar: 'أفضل <span class="pill p-ok">O(1)</span> · أسوأ <span class="pill p-acc">O(R + C) = O(n)</span>',
      en: 'Best <span class="pill p-ok">O(1)</span> · Worst <span class="pill p-acc">O(R + C) = O(n)</span>'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> مؤشران فقط r و c.',
      en: '<span class="pill p-ok">O(1)</span> only two pointers r and c.'
    },
    derive: {
      ar: 'في كل خطوة إما ينقص c بمقدار 1 أو يزداد r بمقدار 1 ← أقصى خطوات = R + C<div class="formula">T(N) ≤ N + N = 2N  ⇒  O(n)  (بدلاً من O(n²)!)</div>',
      en: 'Each step either decrements c or increments r → max steps = R + C<div class="formula">T(N) ≤ N + N = 2N  ⇒  O(n)  (beats O(n²)!)</div>'
    },
    take: {
      ar: 'درس هندسي عظيم: استغلال خاصية «الترتيب» في المصفوفة الثنائية يختصر البحث من مليون خطوة (1000×1000) إلى 2000 خطوة فقط!',
      en: 'Key lesson: exploiting sorted structure in a 1000×1000 matrix cuts worst-case search from 1,000,000 steps down to just 2,000 steps!'
    }
  },

  // 6. Main & Secondary Diagonals in Single Loop O(N)
  {
    key: 'diagonals',
    big: 'O(n)',
    spaceBig: 'O(1)',
    benchSizes: [2, 4, 8, 16],
    benchLabel: 'N (N×N)',
    name: { ar: 'القطر الرئيسي والثانوي O(N)', en: 'Matrix Diagonals O(N)' },
    head: {
      ar: 'جمع القطر الرئيسي والقطر الثانوي بحلقة واحدة فقط O(N)',
      en: 'Summing Main & Secondary Diagonals in a Single O(N) Loop'
    },
    text: {
      ar: 'في المصفوفة المربعة (N×N)، عناصر القطر الرئيسي تقع عند m[i][i] (حيث r == c)، وعناصر القطر الثانوي تقع عند m[i][n - 1 - i]. بدلاً من حلقتين متداخلتين O(n²)، نلتقط القطرين معاً بحلقة واحدة فقط O(n)!',
      en: 'In an N×N square matrix, main diagonal cells lie at m[i][i] and secondary diagonal cells lie at m[i][n - 1 - i]. Instead of a naive O(n²) nested loop, a single loop i = 0..n-1 processes both diagonals in O(n) time!'
    },
    steps: {
      ar: [
        'نبدأ بحلقة واحدة فقط: i من 0 إلى n - 1.',
        'نضيف عنصر القطر الرئيسي: mainSum += m[i][i].',
        'نضيف عنصر القطر الثانوي: secSum += m[i][n - 1 - i].',
        'ملاحظة: إذا طُلب المجموع المشترك دون تكرار المركز (عندما N فردي)، نتحقق أن i != n - 1 - i.'
      ],
      en: [
        'Run a single loop: i from 0 to n - 1.',
        'Add main diagonal element: mainSum += m[i][i].',
        'Add secondary diagonal element: secSum += m[i][n - 1 - i].',
        'Note: When computing combined sum without double-counting the center cell (for odd N), check i != n - 1 - i.'
      ]
    },
    analogy: {
      ar: 'مثل رسم علامة (X) عبر ساحة مربعة: في كل صف تخطو على بلاطة القطر الأيمن وبلاطة القطر الأيسر مباشرة دون المرور على بقية بلاطات الصف.',
      en: 'Like tracing an X across a tiled courtyard: on each row i, you step directly onto tile [i][i] and tile [i][n-1-i] without touching the rest of the row.'
    },
    code: [
      'int mainSum = 0, secSum = 0;',
      'for (int i = 0; i < n; i++) {',
      '    mainSum += m[i][i];             // القطر الرئيسي',
      '    secSum  += m[i][n - 1 - i];     // القطر الثانوي',
      '}'
    ],
    inputs: [['size', { ar: 'حجم المصفوفة المربعة N', en: 'Square Matrix Size N' }, 3]],
    defArr: null,
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const N = p.size || 3
      const m = makeGrid(N, 10, 5)
      const rec = Recorder({ m }, metricsOnly)
      rec.v.mainSum = 0
      rec.v.secSum = 0
      rec.c.wr += 2
      const cls = {}
      const ptr = {}

      rec.push(
        0,
        en
          ? `Square Matrix ${N}×${N}: Single loop i = 0..${N - 1} will visit only ${2 * N} diagonal accesses instead of ${N * N}.`
          : `مصفوفة مربعة ${N}×${N}: سنمر بحلقة واحدة فقط (i = 0..${N - 1}) بدلاً من مسح ${N * N} خلية.`
      )

      for (let i = 0; i < N; i++) {
        rec.c.cmp++
        rec.v.i = i
        const secCol = N - 1 - i
        const mKey = `${i}-${i}`
        const sKey = `${i}-${secCol}`

        // Main diagonal
        rec.c.rd++
        rec.c.wr++
        rec.v.mainSum += m[i][i]
        cls[mKey] = 'active'
        ptr[mKey] = `main [${i}][${i}]`
        rec.push(
          2,
          en
            ? `i = ${i}: Main diagonal m[${i}][${i}] = ${m[i][i]} → mainSum = ${rec.v.mainSum}`
            : `عند i = ${i}: القطر الرئيسي m[${i}][${i}] = ${m[i][i]} ← mainSum = ${rec.v.mainSum}`,
          { cls: { ...cls }, ptr: { ...ptr } }
        )
        cls[mKey] = 'done'

        // Secondary diagonal
        rec.c.rd++
        rec.c.wr++
        rec.v.secSum += m[i][secCol]
        cls[sKey] = 'diag'
        ptr[sKey] = mKey === sKey ? 'CENTER (Both)' : `sec [${i}][${secCol}]`
        rec.push(
          3,
          en
            ? `i = ${i}: Secondary diagonal m[${i}][${secCol}] = ${m[i][secCol]} → secSum = ${rec.v.secSum}`
            : `عند i = ${i}: القطر الثانوي m[${i}][${secCol}] = ${m[i][secCol]} ← secSum = ${rec.v.secSum}`,
          { cls: { ...cls }, ptr: { ...ptr } }
        )
      }
      rec.c.cmp++
      rec.push(
        4,
        en
          ? `Done in ${N} iterations! mainSum = ${rec.v.mainSum}, secSum = ${rec.v.secSum}.`
          : `انتهت الحلقة في ${N} دورات فقط! مجموع الرئيسي = ${rec.v.mainSum}، مجموع الثانوي = ${rec.v.secSum}.`,
        { cls: { ...cls }, ptr: { ...ptr } }
      )
      return metricsOnly ? rec.c : rec.S
    },
    sample: (n) => ({ size: n }),
    cases: {
      ar: [
        ['O(n)', 'حلقة واحدة بطول N مهما كبرت المصفوفة.'],
        ['O(n)', 'قراءتان فقط في كل دورة.'],
        ['O(n)', 'N دورة بالضبط (أسرع بكثير من O(n²)).']
      ],
      en: [
        ['O(n)', 'Single loop of length N regardless of grid size.'],
        ['O(n)', 'Exactly 2 reads per iteration.'],
        ['O(n)', 'Exactly N iterations (vastly faster than O(n²)).']
      ]
    },
    time: {
      ar: '<span class="pill p-acc">O(n)</span> في كل الحالات (حلقة واحدة بطول الصفوف N).',
      en: '<span class="pill p-acc">O(n)</span> in all cases (single loop of length N).'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> متغيرات المجموع والعداد i.',
      en: '<span class="pill p-ok">O(1)</span> scalar accumulators and index i.'
    },
    derive: {
      ar: 'دورة واحدة لكل صف i = 0..N-1 بدون حلقة داخلية<div class="formula">T(N) = 2N  ⇒  O(n)</div>',
      en: 'One iteration per row i = 0..N-1 with no inner loop<div class="formula">T(N) = 2N  ⇒  O(n)</div>'
    },
    take: {
      ar: 'خطأ شائع في الاختبارات: كتابة حلقتين متداخلتين بحجم O(n²) لفحص شرط if (r == c). الحل الاحترافي هو حلقة واحدة m[i][i] بتعقيد O(n)!',
      en: 'Common exam pitfall: writing an O(n²) nested loop with if (r == c). The optimal solution uses a single loop m[i][i] in O(n)!'
    }
  },

  // 7. In-Place Matrix Transpose O(N^2)
  {
    key: 'transpose',
    big: 'O(n²)',
    spaceBig: 'O(1)',
    benchSizes: [2, 3, 4, 6],
    benchLabel: 'N (N×N)',
    name: { ar: 'مدوّر المصفوفة Transpose', en: 'In-Place Transpose' },
    head: {
      ar: 'تدوير المصفوفة المربعة في مكانها (قلب الصفوف أعمدة Aᵀ)',
      en: 'In-Place Square Matrix Transpose (Swapping Rows & Columns Aᵀ)'
    },
    text: {
      ar: 'مدوّر المصفوفة (Transpose) يجعل كل صف عموداً وكل عمود صفاً عبر تبديل الخلية m[r][c] مع نظيرتها m[c][r] حول القطر الرئيسي. السر الهندسي: الحلقة الداخلية تبدأ من c = r + 1 (المثلث العلوي فقط)؛ لأننا لو بدأنا من c = 0 سنبدّل العناصر مرتين فتعود المصفوفة كما كانت!',
      en: 'Transposing flips a matrix across its main diagonal by swapping m[r][c] with m[c][r]. Crucial rule: the inner loop starts at c = r + 1 (upper triangle only); starting at c = 0 would swap every pair twice and undo the transpose!'
    },
    steps: {
      ar: [
        'الحلقة الخارجية تمر على الصفوف r من 0 إلى n - 1.',
        'الحلقة الداخلية تبدأ فوق القطر الرئيسي: c = r + 1 إلى n - 1.',
        'نبدّل m[r][c] مع m[c][r] باستخدام متغير وسيط temp.',
        'عناصر القطر الرئيسي m[r][r] تبقى في مكانها دون لمس.'
      ],
      en: [
        'Outer loop r runs from 0 to n - 1.',
        'Inner loop starts strictly above the main diagonal: c = r + 1 to n - 1.',
        'Swap m[r][c] with its mirror cell m[c][r] using temp.',
        'Main diagonal elements m[r][r] remain fixed in place.'
      ]
    },
    analogy: {
      ar: 'مثل طيّ ورقة مربعة حول قطرها: كل نقطة في المثلث العلوي تتبادل مكانها مع النقطة المقابلة لها في المثلث السفلي.',
      en: 'Like folding a square sheet of paper along its main diagonal: every cell in the upper triangle swaps with its mirror image in the lower triangle.'
    },
    code: [
      'for (int r = 0; r < n; r++) {',
      '    for (int c = r + 1; c < n; c++) {',
      '        int temp = m[r][c];',
      '        m[r][c] = m[c][r];',
      '        m[c][r] = temp;',
      '    }',
      '}'
    ],
    inputs: [['size', { ar: 'حجم المصفوفة N×N', en: 'Matrix Size N×N' }, 3]],
    defArr: null,
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const N = p.size || 3
      const m = makeGrid(N, 10, 5)
      const rec = Recorder({ m }, metricsOnly)
      const donePairs = {}

      const baseCls = () => {
        if (metricsOnly) return {}
        const cls = { ...donePairs }
        for (let d = 0; d < N; d++) cls[`${d}-${d}`] = 'diag'
        return cls
      }

      rec.push(
        0,
        en
          ? `Transpose ${N}×${N} matrix in-place: main diagonal stays fixed; swap upper triangle (c > r) with lower triangle.`
          : `تدوير مصفوفة ${N}×${N} مكانياً: القطر الرئيسي ثابت، ونبدّل عناصر المثلث العلوي (c > r) مع السفلي.`,
        { cls: baseCls() }
      )

      for (let r = 0; r < N; r++) {
        rec.c.cmp++
        rec.v.r = r
        for (let c = r + 1; c < N; c++) {
          rec.c.cmp++
          rec.v.c = c
          const k1 = `${r}-${c}`
          const k2 = `${c}-${r}`

          rec.push(
            1,
            en
              ? `Select mirror pair: m[${r}][${c}](${rec.m[r][c]}) ⇄ m[${c}][${r}](${rec.m[c][r]})`
              : `تحديد الزوج المتناظر حول القطر: m[${r}][${c}](${rec.m[r][c]}) ⇄ m[${c}][${r}](${rec.m[c][r]})`,
            {
              cls: Object.assign(baseCls(), { [k1]: 'compare', [k2]: 'compare' }),
              ptr: { [k1]: `[${r}][${c}]`, [k2]: `[${c}][${r}]` }
            }
          )

          rec.c.rd += 2
          rec.c.wr += 2
          const temp = rec.m[r][c]
          rec.v.temp = temp
          rec.m[r][c] = rec.m[c][r]
          rec.m[c][r] = temp
          donePairs[k1] = 'done'
          donePairs[k2] = 'done'

          rec.push(
            4,
            en
              ? `Swapped! m[${r}][${c}] is now ${rec.m[r][c]} and m[${c}][${r}] is now ${rec.m[c][r]}.`
              : `تم التبديل! أصبحت m[${r}][${c}] = ${rec.m[r][c]} و m[${c}][${r}] = ${rec.m[c][r]}.`,
            {
              cls: Object.assign(baseCls(), { [k1]: 'swap', [k2]: 'swap' }),
              ptr: { [k1]: '⇄', [k2]: '⇄' }
            }
          )
        }
        rec.c.cmp++
      }
      rec.c.cmp++
      rec.push(
        6,
        en
          ? `Transpose complete using only ${(N * (N - 1)) / 2} swaps and O(1) extra memory!`
          : `اكتمل تدوير المصفوفة بتنفيذ ${(N * (N - 1)) / 2} عملية تبديل فقط وبذاكرة إضافية O(1)!`,
        { cls: baseCls() }
      )
      return metricsOnly ? rec.c : rec.S
    },
    sample: (n) => ({ size: n }),
    cases: {
      ar: [
        ['O(n²)', 'نبدّل دائماً عناصر المثلث العلوي وعددها N(N-1)/2.'],
        ['O(n²)', 'ثابت لكل مصفوفة مربعة بحجم N×N.'],
        ['O(n²)', 'N(N-1)/2 تبديل ⇒ O(n²).']
      ],
      en: [
        ['O(n²)', 'Always swaps the N(N-1)/2 upper-triangle pairs.'],
        ['O(n²)', 'Deterministic count for any N×N matrix.'],
        ['O(n²)', 'N(N-1)/2 swaps ⇒ O(n²).']
      ]
    },
    time: {
      ar: '<span class="pill p-bad">O(n²)</span> في كل الحالات.',
      en: '<span class="pill p-bad">O(n²)</span> in all cases.'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> في مكانها (للمصفوفة المربعة N×N).',
      en: '<span class="pill p-ok">O(1)</span> in-place (for square N×N matrices).'
    },
    derive: {
      ar: 'عدد أزواج المثلث العلوي = (N−1) + (N−2) + … + 1 = N(N−1)/2<div class="formula">Swaps = N(N − 1) / 2 ≈ ½N²  ⇒  O(n²)      Space = O(1)</div>',
      en: 'Upper triangle pairs = (N−1) + (N−2) + … + 1 = N(N−1)/2<div class="formula">Swaps = N(N − 1) / 2 ≈ ½N²  ⇒  O(n²)      Space = O(1)</div>'
    },
    take: {
      ar: 'تذكّر: التدوير المكاني O(1) يصلح للمصفوفة المربعة (N×N)، أما المستطيلة (R×C حيث R≠C) فتتطلب حجز مصفوفة جديدة بأبعاد C×R.',
      en: 'Note: In-place O(1) transpose applies to square N×N matrices; non-square R×C matrices require allocating a new C×R matrix.'
    }
  },

  // 8. Horizontal Matrix Reflection (Mirroring Rows) O(R * C)
  {
    key: 'flip',
    big: 'O(n²)',
    spaceBig: 'O(1)',
    benchSizes: [2, 3, 4, 6],
    benchLabel: 'N (N×N)',
    name: { ar: 'عكس الصفوف (مرآة أفقية)', en: 'Horizontal Flip (Mirror)' },
    head: {
      ar: 'عكس المصفوفة الثنائية أفقياً بتقنية المؤشرين لكل صف',
      en: 'In-Place Horizontal Matrix Reflection Using Two Pointers per Row'
    },
    text: {
      ar: 'لعكس مصفوفة ثنائية أفقياً (مثل قلب صورة كمرآة)، نمر على كل صف r ونطبّق عليه خوارزمية المؤشرين (left = 0 و right = C - 1) لتبديل أطراف الصف نحو المركز.',
      en: 'To mirror a 2D matrix horizontally (like flipping an image left-to-right), we iterate over each row r and apply the Two-Pointers swap (left = 0, right = C - 1) inward.'
    },
    steps: {
      ar: [
        'نمر بحلقة خارجية على كل صف r من 0 إلى R - 1.',
        'داخل الصف r نضع مؤشرين: left = 0 و right = m[r].length - 1.',
        'ما دام left < right: نبدّل m[r][left] مع m[r][right] ثم left++ و right--.',
        'ملاحظة: إذا نفّذنا Transpose ثم Horizontal Flip تحصل على دوران المصفوفة 90° مع عقارب الساعة!'
      ],
      en: [
        'Outer loop iterates over each row r from 0 to R - 1.',
        'Initialize two column pointers: left = 0, right = m[r].length - 1.',
        'While left < right: swap m[r][left] with m[r][right], then left++, right--.',
        'Bonus insight: Transpose + Horizontal Flip rotates any square matrix 90° clockwise in-place!'
      ]
    },
    analogy: {
      ar: 'مثل قلب كل سطر من لوحة فسيفساء من اليمين إلى اليسار؛ فتظهر الصورة كاملة معكوسة كما في المرآة.',
      en: 'Like reversing each row of pixels in a digital photo so the entire picture appears mirrored left-to-right.'
    },
    code: [
      'for (int r = 0; r < m.length; r++) {',
      '    int left = 0, right = m[r].length - 1;',
      '    while (left < right) {',
      '        int temp = m[r][left];',
      '        m[r][left] = m[r][right];',
      '        m[r][right] = temp;',
      '        left++; right--;',
      '    }',
      '}'
    ],
    inputs: [],
    defArr: null,
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const N = p.size || 3
      const C = p.size ? p.size : 4
      const m = p.size
        ? makeGrid(N, 10, 5)
        : [
            [10, 20, 30, 40],
            [50, 60, 70, 80],
            [15, 25, 35, 45]
          ]
      const R = m.length
      const rec = Recorder({ m }, metricsOnly)
      const doneRows = {}

      rec.push(
        0,
        en
          ? `Mirror ${R}×${C} matrix horizontally: reverse each row in-place using left & right pointers.`
          : `عكس مصفوفة ${R}×${C} أفقياً: نعكس كل صف في مكانه باستخدام المؤشرين left و right.`
      )

      for (let r = 0; r < R; r++) {
        rec.c.cmp++
        let L = 0
        let Rg = C - 1
        rec.v.r = r
        rec.v.left = L
        rec.v.right = Rg

        while (L < Rg) {
          rec.c.cmp++
          const kL = `${r}-${L}`
          const kR = `${r}-${Rg}`
          rec.c.rd += 2
          rec.c.wr += 2
          const tmp = rec.m[r][L]
          rec.m[r][L] = rec.m[r][Rg]
          rec.m[r][Rg] = tmp
          doneRows[kL] = 'done'
          doneRows[kR] = 'done'

          rec.push(
            4,
            en
              ? `Row ${r}: Swapped m[${r}][${L}] ⇄ m[${r}][${Rg}] → [${rec.m[r][L]}, ${rec.m[r][Rg]}]`
              : `الصف ${r}: تبديل m[${r}][${L}] ⇄ m[${r}][${Rg}] ← [${rec.m[r][L]}, ${rec.m[r][Rg]}]`,
            {
              cls: Object.assign({ ...doneRows }, { [kL]: 'swap', [kR]: 'swap' }),
              ptr: { [kL]: 'left', [kR]: 'right' }
            }
          )
          L++
          Rg--
          rec.v.left = L
          rec.v.right = Rg
        }
        rec.c.cmp++
        for (let c = 0; c < C; c++) doneRows[`${r}-${c}`] = 'done'
      }
      rec.c.cmp++
      rec.push(
        8,
        en
          ? 'Horizontal reflection complete in O(1) extra space!'
          : 'اكتمل العكس الأفقي لجميع الصفوف بذاكرة إضافية O(1)!',
        { cls: { ...doneRows } }
      )
      return metricsOnly ? rec.c : rec.S
    },
    sample: (n) => ({ size: n }),
    cases: {
      ar: [
        ['O(n²)', 'كل صف ينفذ ⌊C/2⌋ تبديل، وبإجمالي R × ⌊C/2⌋.'],
        ['O(n²)', 'لا يعتمد على قيم العناصر.'],
        ['O(n²)', 'نصف عدد خلايا المصفوفة تُبدّل ⇒ O(R · C).']
      ],
      en: [
        ['O(n²)', 'Each row performs ⌊C/2⌋ swaps, totaling R × ⌊C/2⌋.'],
        ['O(n²)', 'Independent of element values.'],
        ['O(n²)', 'Half the grid cells swap pairs ⇒ O(R · C).']
      ]
    },
    time: {
      ar: '<span class="pill p-bad">O(R · C)</span> أو O(n²) للمصفوفة المربعة.',
      en: '<span class="pill p-bad">O(R · C)</span> or O(n²) for square matrices.'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> تبديل مكاني بمتغير temp.',
      en: '<span class="pill p-ok">O(1)</span> in-place swap using temp.'
    },
    derive: {
      ar: 'R صفوف × (C / 2) عملية تبديل لكل صف<div class="formula">Swaps = R · (C / 2) = ½ N²  ⇒  O(n²)</div>',
      en: 'R rows × (C / 2) swaps per row<div class="formula">Swaps = R · (C / 2) = ½ N²  ⇒  O(n²)</div>'
    },
    take: {
      ar: 'بما أن كل صف m[r] في Java هو مصفوفة أحادية، فإن أي خوارزمية تعلمتها في المحاضرة الأولى (مثل العكس أو البحث الثنائي) يمكنك تطبيقها على كل صف!',
      en: 'Because every row m[r] in Java is a 1D array, any 1D algorithm from Lecture 01 (like Two-Pointer Reverse or Binary Search) can be applied row-by-row!'
    }
  },

  // 9. Spiral Boundary Traversal O(R * C)
  {
    key: 'spiral',
    big: 'O(n²)',
    spaceBig: 'O(1)',
    benchSizes: [2, 3, 4, 6],
    benchLabel: 'N (N×N)',
    secondaryLabel: {
      ar: 'ترتيب العناصر المستخرجة حلزونياً (Spiral Output)',
      en: 'Extracted Spiral Sequence (Spiral Output)'
    },
    name: { ar: 'المسح الحلزوني Spiral', en: 'Spiral Matrix Traversal' },
    head: {
      ar: 'المسح الحلزوني للمصفوفة (4 حدود متقلصة: top, bottom, left, right)',
      en: 'Spiral Matrix Traversal Using 4 Shrinking Boundaries'
    },
    text: {
      ar: 'للمرور على المصفوفة بشكل حلزوني مع عقارب الساعة، نعرّف 4 حدود: top, bottom, left, right. في كل دورة نمسح: ① الصف العلوي من اليسار لليمين ثم ننزل top++، ② العمود الأيمن من الأعلى للأسفل ثم نقلّص right--، ③ الصف السفلي من اليمين لليسار ثم bottom--، ④ العمود الأيسر للأعلى ثم left++.',
      en: 'To traverse a matrix in clockwise spiral order, maintain 4 boundaries: top, bottom, left, right. Repeatedly sweep: ① Top row left-to-right (top++), ② Right column top-to-bottom (right--), ③ Bottom row right-to-left (bottom--), ④ Left column bottom-to-top (left++).'
    },
    steps: {
      ar: [
        'نهيّئ الحدود الأربعة: top = 0, bottom = R-1, left = 0, right = C-1.',
        'نمسح الصف top من left إلى right ثم نزيد top++.',
        'نمسح العمود right من top إلى bottom ثم ننقص right--.',
        'نمسح الصف bottom من right إلى left ثم ننقص bottom--، يليه العمود left للأعلى ثم left++.'
      ],
      en: [
        'Initialize 4 boundaries: top = 0, bottom = R-1, left = 0, right = C-1.',
        'Sweep top row from left to right, then increment top++.',
        'Sweep right column from top to bottom, then decrement right--.',
        'Sweep bottom row from right to left (bottom--), then left column upward (left++).'
      ]
    },
    analogy: {
      ar: 'مثل تقشير برتقالة بشكل حلزوني متصل من الإطار الخارجي تدريجياً حتى تصل إلى قلب المركز.',
      en: 'Like peeling an orange in one continuous spiral ribbon from the outer perimeter inward to the center.'
    },
    code: [
      'int top = 0, bottom = R - 1, left = 0, right = C - 1;',
      'while (top <= bottom && left <= right) {',
      '    for (int c = left; c <= right; c++) visit(m[top][c]);',
      '    top++;',
      '    for (int r = top; r <= bottom; r++) visit(m[r][right]);',
      '    right--;',
      '    if (top <= bottom) {',
      '        for (int c = right; c >= left; c--) visit(m[bottom][c]);',
      '        bottom--;',
      '    }',
      '    if (left <= right) {',
      '        for (int r = bottom; r >= top; r--) visit(m[r][left]);',
      '        left++;',
      '    }',
      '}'
    ],
    inputs: [['size', { ar: 'حجم الشبكة N×N', en: 'Grid Size N×N' }, 3]],
    defArr: null,
    gen(p, lang = 'ar', metricsOnly = false) {
      const en = lang === 'en'
      const N = p.size || 3
      const m = Array.from({ length: N }, (_, r) =>
        Array.from({ length: N }, (_, c) => r * N + c + 1)
      )
      const rec = Recorder({ m }, metricsOnly)
      rec.b = []
      const visited = {}
      let top = 0,
        bottom = N - 1,
        left = 0,
        right = N - 1

      const visitCell = (r, c, lineNo, dirLabel) => {
        rec.c.cmp++
        rec.c.rd++
        rec.c.wr++
        rec.v.top = top
        rec.v.bottom = bottom
        rec.v.left = left
        rec.v.right = right
        const key = `${r}-${c}`
        rec.b.push(m[r][c])
        const bIdx = rec.b.length - 1
        const bcls = {}
        for (let k = 0; k <= bIdx; k++) bcls[k] = k === bIdx ? 'active' : 'done'
        rec.push(
          lineNo,
          en
            ? `${dirLabel}: visit m[${r}][${c}] = ${m[r][c]} (step ${rec.b.length}/${N * N})`
            : `${dirLabel}: زيارة الخلية m[${r}][${c}] = ${m[r][c]} (الخطوة ${rec.b.length}/${N * N})`,
          {
            cls: Object.assign({ ...visited }, { [key]: 'active' }),
            ptr: { [key]: `#${rec.b.length}` },
            bcls
          }
        )
        visited[key] = 'done'
      }

      rec.push(
        0,
        en
          ? `Initialize spiral boundaries: top=0, bottom=${bottom}, left=0, right=${right}.`
          : `تهيئة حدود المسح الحلزوني: top=0, bottom=${bottom}, left=0, right=${right}.`
      )

      while (top <= bottom && left <= right) {
        rec.c.cmp++
        for (let c = left; c <= right; c++) {
          visitCell(top, c, 2, en ? 'Top row ➔' : 'الصف العلوي ➔')
        }
        top++

        for (let r = top; r <= bottom; r++) {
          visitCell(r, right, 4, en ? 'Right col ⬇' : 'العمود الأيمن ⬇')
        }
        right--

        if (top <= bottom) {
          for (let c = right; c >= left; c--) {
            visitCell(bottom, c, 7, en ? 'Bottom row ⬅' : 'الصف السفلي ⬅')
          }
          bottom--
        }

        if (left <= right) {
          for (let r = bottom; r >= top; r--) {
            visitCell(r, left, 11, en ? 'Left col ⬆' : 'العمود الأيسر ⬆')
          }
          left++
        }
      }

      rec.push(
        14,
        en
          ? `Spiral traversal complete! Visited all ${N * N} cells in clockwise spiral order.`
          : `اكتمل المسح الحلزوني! زرنا جميع الخلايا الـ ${N * N} باتجاه عقارب الساعة دون تكرار.`,
        { cls: { ...visited } }
      )
      return metricsOnly ? rec.c : rec.S
    },
    sample: (n) => ({ size: n }),
    cases: {
      ar: [
        ['O(n²)', 'كل خلية في الشبكة تُزار مرة واحدة بالضبط.'],
        ['O(n²)', 'R × C خطوة دائماً.'],
        ['O(n²)', 'خطي بالنسبة لإجمالي عدد الخلايا (R·C).']
      ],
      en: [
        ['O(n²)', 'Every cell in the grid is visited exactly once.'],
        ['O(n²)', 'Always R × C steps.'],
        ['O(n²)', 'Optimal linear time relative to total cells (R·C).']
      ]
    },
    time: {
      ar: '<span class="pill p-bad">O(R · C)</span> أو O(n²) للمصفوفة المربعة.',
      en: '<span class="pill p-bad">O(R · C)</span> or O(n²) for square matrices.'
    },
    space: {
      ar: '<span class="pill p-ok">O(1)</span> 4 مؤشرات حدودية فقط.',
      en: '<span class="pill p-ok">O(1)</span> only 4 boundary pointers.'
    },
    derive: {
      ar: 'كل خلية من الـ R × C خلايا تُزار مرة واحدة فقط قبل تقليص الحد<div class="formula">T(R, C) = R × C = N²  ⇒  O(n²)</div>',
      en: 'Each of the R × C cells is visited once before shrinking the boundary<div class="formula">T(R, C) = R × C = N²  ⇒  O(n²)</div>'
    },
    take: {
      ar: 'مؤشرات الحدود الأربعة (top, bottom, left, right) هي المفتاح القياسي لحل مسائل الإطارات وتدوير الحواف في المقابلات البرمجية.',
      en: 'The 4-boundary pattern (top, bottom, left, right) is the standard template for matrix ring and perimeter problems.'
    }
  }
]

OPS_2D.forEach((op, idx) => {
  op.numberPrefix = `3.${idx + 1}`
})
