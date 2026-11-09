<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import CodeViewer from '@/components/lecture/layout/CodeViewer.vue'
import CalloutBox from '@/components/lecture/layout/CalloutBox.vue'

const prefs = usePreferencesStore()

// 2.2 Live 2D Builder & Jagged Array Lab
const DEF = { int: '0', double: '0.0', boolean: 'false', char: "'\\0'", String: 'null' }
const SAMPLE = {
  int: (r, c) => (r + 1) * 10 + (c + 1),
  double: (r, c) => ((r + 1) + (c + 1) * 0.1).toFixed(1),
  boolean: (r, c) => ((r + c) % 2 === 0 ? 'true' : 'false'),
  char: (r, c) => `'${String.fromCharCode(65 + r * 4 + c)}'`,
  String: (r, c) => `"R${r}C${c}"`
}

const bType = ref('int')
const bRows = ref(3)
const bCols = ref(4)
const isJagged = ref(false)
const bLines = ref([])
const bActiveLine = ref(0)
const bGrid = ref([])
const bStatus = ref('allocated')
const activeCellKey = ref('')
let bTimer = null

function buildMatrix() {
  clearTimeout(bTimer)
  const R = Math.max(2, Math.min(4, Number(bRows.value) || 3))
  const C = Math.max(2, Math.min(5, Number(bCols.value) || 4))
  bRows.value = R
  bCols.value = C
  const t = bType.value
  activeCellKey.value = ''
  bStatus.value = 'allocated'

  if (!isJagged.value) {
    bLines.value = [`${t}[][] m = new ${t}[${R}][${C}];`]
    bActiveLine.value = 0
    bGrid.value = Array.from({ length: R }, (_, r) =>
      Array.from({ length: C }, (_, c) => ({
        r,
        c,
        val: DEF[t],
        cls: 'row'
      }))
    )
  } else {
    const rowLengths = [2, 4, 3, 2].slice(0, R)
    bLines.value = [
      `${t}[][] jag = new ${t}[${R}][];`,
      ...rowLengths.map((len, r) => `jag[${r}] = new ${t}[${len}];`)
    ]
    bActiveLine.value = bLines.value.length - 1
    bGrid.value = rowLengths.map((len, r) =>
      Array.from({ length: len }, (_, c) => ({
        r,
        c,
        val: DEF[t],
        cls: 'row'
      }))
    )
  }
}

function fillMatrix() {
  buildMatrix()
  const t = bType.value
  const varName = isJagged.value ? 'jag' : 'm'
  const coords = []
  bGrid.value.forEach((row, r) => {
    row.forEach((_, c) => coords.push([r, c]))
  })

  let stepIdx = 0
  const step = () => {
    if (stepIdx >= coords.length) {
      bGrid.value = bGrid.value.map((row) => row.map((cell) => ({ ...cell, cls: 'done' })))
      activeCellKey.value = ''
      bStatus.value = 'filled'
      return
    }
    const [r, c] = coords[stepIdx]
    const v = SAMPLE[t](r, c)
    bLines.value = [...bLines.value.slice(0, isJagged.value ? bRows.value + 1 : 1), `${varName}[${r}][${c}] = ${v};`]
    bActiveLine.value = bLines.value.length - 1
    activeCellKey.value = `${r}-${c}`
    bStatus.value = 'filling'

    bGrid.value = bGrid.value.map((row, ri) =>
      row.map((cell, ci) => {
        if (ri === r && ci === c) return { ...cell, val: v, cls: 'active' }
        if (ri < r || (ri === r && ci < c)) return { ...cell, cls: 'done' }
        return cell
      })
    )
    stepIdx++
    bTimer = setTimeout(step, 520)
  }
  bTimer = setTimeout(step, 350)
}

// 2.3 Nested Loop Walk Lab (Row-Major vs Column-Major)
const WALK_MAT = [
  [10, 20, 30, 40],
  [50, 60, 70, 80],
  [90, 15, 25, 35]
]
const walkOrder = ref('row') // 'row' | 'col'
const walkR = ref(0)
const walkC = ref(0)
const walkVisited = ref({})
const walkDone = ref(false)
let wTimer = null

const codeNestedLoop = computed(() => {
  if (walkOrder.value === 'row') {
    return [
      prefs.isEn
        ? '// Row-Major Traversal: Outer = Row (r), Inner = Column (c)'
        : '// المرور صفاً بصف (Row-Major): الخارجية للصف r والداخلية للعمود c',
      'for (int r = 0; r < m.length; r++) {',
      '    for (int c = 0; c < m[r].length; c++) {',
      '        System.out.print(m[r][c] + " ");',
      '    }',
      '}'
    ]
  }
  return [
    prefs.isEn
      ? '// Column-Major Traversal: Outer = Column (c), Inner = Row (r)'
      : '// المرور عموداً بعمود (Column-Major): الخارجية للعمود c والداخلية للصف r',
    'for (int c = 0; c < m[0].length; c++) {',
    '    for (int r = 0; r < m.length; r++) {',
    '        System.out.print(m[r][c] + " ");',
    '    }',
    '}'
  ]
})

function runNestedWalk(mode = walkOrder.value) {
  clearTimeout(wTimer)
  walkOrder.value = mode
  walkVisited.value = {}
  walkDone.value = false

  const R = WALK_MAT.length
  const C = WALK_MAT[0].length
  const seq = []
  if (mode === 'row') {
    for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) seq.push([r, c])
  } else {
    for (let c = 0; c < C; c++) for (let r = 0; r < R; r++) seq.push([r, c])
  }

  let idx = 0
  const step = () => {
    if (idx >= seq.length) {
      walkDone.value = true
      return
    }
    const [r, c] = seq[idx]
    walkR.value = r
    walkC.value = c
    if (idx > 0) {
      const [pr, pc] = seq[idx - 1]
      walkVisited.value = { ...walkVisited.value, [`${pr}-${pc}`]: true }
    }
    idx++
    wTimer = setTimeout(step, 550)
  }
  step()
}

buildMatrix()
runNestedWalk('row')

onUnmounted(() => {
  clearTimeout(bTimer)
  clearTimeout(wTimer)
})
</script>

<template>
  <section id="matrix-lifecycle" class="card">
    <div style="font-size: 13px; color: var(--brand); font-weight: 800; letter-spacing: 0.5px">
      <i class="fa-solid fa-layer-group" style="color: var(--primary)"></i>
      {{
        prefs.isEn
          ? 'Unit 2: 2D Lifecycle, Jagged Arrays & Nested Loop Mechanics'
          : 'الوحدة الثانية: مراحل الإنشاء، المصفوفات المتعرجة، وميكانيكا الحلقات المتداخلة'
      }}
    </div>
    <h2 style="margin-top: 6px">
      {{
        prefs.isEn
          ? 'Lesson 2: Allocating 2D Arrays, Jagged Rows & Nested for-Loops'
          : 'الدرس 2: حجز المصفوفة ثنائية الأبعاد، المصفوفات المتعرجة، والحلقات المتداخلة'
      }}
    </h2>

    <h3>
      {{
        prefs.isEn
          ? '2.1 The 3 Lifecycle Stages of a 2D Array in Java'
          : '2.1 مراحل حياة المصفوفة ثنائية الأبعاد في Java'
      }}
    </h3>
    <div class="grid g3">
      <div class="mini" style="border-top: 3px solid var(--brand)">
        <span class="pill p-brand">{{ prefs.isEn ? 'Stage 1' : 'المرحلة 1' }}</span>
        <h4>{{ prefs.isEn ? 'Declaration' : 'التصريح (Declaration)' }}</h4>
        <code>int[][] matrix;</code>
        <p style="margin-top: 6px">
          {{
            prefs.isEn
              ? 'Creates a 2D reference variable on the Stack initialized to null. No rows or columns exist yet.'
              : 'حجز اسم مرجعي لمصفوفة ثنائية على الـ Stack قيمته المبدئية null. لم تُحجز أي صفوف أو أعمدة بعد.'
          }}
        </p>
      </div>
      <div class="mini" style="border-top: 3px solid var(--accent)">
        <span class="pill p-acc">{{ prefs.isEn ? 'Stage 2' : 'المرحلة 2' }}</span>
        <h4>{{ prefs.isEn ? 'Heap Allocation (new)' : 'الحجز في الـ Heap (بواسطة new)' }}</h4>
        <code>matrix = new int[3][4];</code>
        <p style="margin-top: 6px">
          {{
            prefs.isEn
              ? 'Allocates 3 rows and 4 columns per row (12 cells total), all automatically filled with default values (0).'
              : 'يحجز 3 صفوف و 4 أعمدة في كل صف (12 خلية)، وتأخذ جميعها القيمة الافتراضية تلقائياً (0 للأعداد).'
          }}
        </p>
      </div>
      <div class="mini" style="border-top: 3px solid var(--ok)">
        <span class="pill p-ok">{{ prefs.isEn ? 'Stage 3' : 'المرحلة 3' }}</span>
        <h4>{{ prefs.isEn ? 'Initialization' : 'التعبئة (Initialization)' }}</h4>
        <code>matrix[0][1] = 25;</code>
        <p v-if="prefs.isEn" style="margin-top: 6px">
          Assign values by <code>[r][c]</code> coordinates, or initialize inline:
          <code v-pre>int[][] m = {{1, 2}, {3, 4}};</code>
        </p>
        <p v-else style="margin-top: 6px">
          تعبئة الخلايا بالإحداثيات <code>[r][c]</code>، أو دمج المراحل الثلاث بسطر واحد:
          <code v-pre>int[][] m = {{1, 2}, {3, 4}};</code>
        </p>
      </div>
    </div>

    <!-- 2.2 Live 2D & Jagged Array Builder Lab -->
    <h3>
      {{
        prefs.isEn
          ? '2.2 Interactive 2D Allocation & Jagged Array (Ragged Rows) Lab'
          : '2.2 مختبر الحجز المباشر والمصفوفات المتعرجة (Jagged Arrays)'
      }}
    </h3>
    <p>
      {{
        prefs.isEn
          ? 'Because Java stores each row as an independent 1D array, rows do NOT have to be the same length! A 2D array where rows have different column counts is called a Jagged (or Ragged) Array. Try both Rectangular and Jagged modes below:'
          : 'بما أن Java تخزّن كل صف كمصفوفة أحادية مستقلة، فلا يُشترط أن تكون جميع الصفوف بنفس الطول! المصفوفة التي تختلف أطوال صفوفها تُسمى «المصفوفة المتعرجة» (Jagged Array). جرّب الوضع المستطيل والوضع المتعرج أدناه:'
      }}
    </p>

    <div class="builder">
      <div class="inputs">
        <label>
          {{ prefs.isEn ? 'Type:' : 'النوع:' }}
          <select v-model="bType" @change="buildMatrix()">
            <option>int</option>
            <option>double</option>
            <option>boolean</option>
            <option>char</option>
            <option>String</option>
          </select>
        </label>
        <label v-if="!isJagged">
          {{ prefs.isEn ? 'Rows (R):' : 'الصفوف (R):' }}
          <input v-model.number="bRows" class="num" type="number" min="2" max="4" />
        </label>
        <label v-if="!isJagged">
          {{ prefs.isEn ? 'Cols (C):' : 'الأعمدة (C):' }}
          <input v-model.number="bCols" class="num" type="number" min="2" max="5" />
        </label>
        <button
          type="button"
          class="btn ghost"
          :style="isJagged ? 'border-color: var(--brand); color: var(--brand)' : ''"
          @click="isJagged = !isJagged; buildMatrix()"
        >
          <i class="fa-solid fa-bars-staggered"></i>
          {{
            isJagged
              ? prefs.isEn
                ? 'Mode: Jagged Array (ON)'
                : 'الوضع: مصفوفة متعرجة (مفعّل)'
              : prefs.isEn
                ? 'Switch to Jagged Array'
                : 'تفعيل المصفوفة المتعرجة (Jagged)'
          }}
        </button>
        <button type="button" class="btn" @click="buildMatrix()">
          {{ prefs.isEn ? 'Allocate (new)' : 'نفّذ new (حجز)' }}
        </button>
        <button type="button" class="btn acc" @click="fillMatrix()">
          {{ prefs.isEn ? 'Fill Cells Step-by-Step' : 'عبّئ الخلايا خطوة بخطوة' }}
        </button>
      </div>

      <CodeViewer :lines="bLines" :active-line="bActiveLine" />

      <div class="stage" style="min-height: 170px; margin-top: 12px; align-items: center">
        <div style="display: flex; flex-direction: column; gap: 8px; direction: ltr">
          <div
            v-for="(row, r) in bGrid"
            :key="'br-' + r"
            style="display: flex; align-items: center; gap: 8px"
          >
            <span
              class="mono"
              style="font-size: 12px; font-weight: 800; color: var(--muted); width: 64px; text-align: right"
            >
              row [{{ r }}]:
            </span>
            <div
              v-for="cell in row"
              :key="'bc-' + cell.r + '-' + cell.c"
              class="mcell"
              :class="cell.cls"
              style="width: 64px; min-height: 54px; font-size: 14px"
            >
              <span>{{ cell.val }}</span>
              <small>[{{ cell.r }}][{{ cell.c }}]</small>
            </div>
          </div>
        </div>
      </div>

      <div class="msg">
        <template v-if="bStatus === 'allocated'">
          {{
            isJagged
              ? prefs.isEn
                ? `Allocated a Jagged Array with ${bGrid.length} rows of varying column lengths ([2, 4, 3]); each cell holds default value ${DEF[bType]}.`
                : `تم حجز مصفوفة متعرجة (Jagged Array) مكوّنة من ${bGrid.length} صفوف بأطوال أعمدة مختلفة ([2, 4, 3])، وكل خلية تحمل القيمة الافتراضية ${DEF[bType]}.`
              : prefs.isEn
                ? `Allocated a ${bRows}×${bCols} rectangular matrix (${bRows * bCols} cells) initialized to default value ${DEF[bType]}.`
                : `تم حجز مصفوفة مستطيلة بأبعاد ${bRows}×${bCols} (${bRows * bCols} خلية) وجميعها مهيأة بالقيمة الافتراضية ${DEF[bType]}.`
          }}
        </template>
        <template v-else-if="bStatus === 'filling'">
          {{
            prefs.isEn
              ? `Writing value into cell [${activeCellKey.replace('-', '][')}] directly in O(1) time.`
              : `نكتب القيمة مباشرة في الخلية [${activeCellKey.replace('-', '][')}] بزمن ثابت O(1).`
          }}
        </template>
        <template v-else>
          {{
            prefs.isEn
              ? 'All 2D array cells have been populated!'
              : 'اكتملت تعبئة جميع خلايا المصفوفة ثنائية الأبعاد بنجاح!'
          }}
        </template>
      </div>
    </div>

    <!-- 2.3 Nested Loops Walk Lab -->
    <h3>
      {{
        prefs.isEn
          ? '2.3 Mechanics of Nested Loops: Row-Major vs. Column-Major Traversal'
          : '2.3 تشريح الحلقتين المتداخلتين: المرور صفاً بصف مقابل عموداً بعمود'
      }}
    </h3>
    <p>
      {{
        prefs.isEn
          ? 'To visit every cell in a 2D array, we use two nested loops. In Row-Major order, the outer loop holds row r steady while the inner loop sweeps across all columns c from 0 to m[r].length - 1. In Column-Major order, the roles are reversed:'
          : 'للمرور على جميع خلايا مصفوفة ثنائية الأبعاد نستخدم حلقتين متداخلتين (Nested Loops). في المرور الصفي (Row-Major)، تثبت الحلقة الخارجية على الصف r بينما تمسح الحلقة الداخلية كل أعمدته c من اليسار لليمين. أما في المرور العمودي فتنعكس الأدوار:'
      }}
    </p>

    <div class="lab-mini">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        "
      >
        <b style="font-size: 15px">
          <i class="fa-solid fa-play" style="color: var(--primary); margin-inline-end: 6px"></i>
          {{
            prefs.isEn
              ? 'Compare Traversal Orders Live:'
              : 'قارن عملياً بين طريقتي التجوال في الشبكة:'
          }}
        </b>
        <div style="display: flex; gap: 8px; flex-wrap: wrap">
          <button
            type="button"
            class="btn"
            :class="{ ghost: walkOrder !== 'row' }"
            @click="runNestedWalk('row')"
          >
            <i class="fa-solid fa-arrow-right-long"></i>
            {{ prefs.isEn ? 'Row-by-Row (Row-Major)' : 'صفاً بصف (Row-Major)' }}
          </button>
          <button
            type="button"
            class="btn"
            :class="{ ghost: walkOrder !== 'col' }"
            @click="runNestedWalk('col')"
          >
            <i class="fa-solid fa-arrow-down-long"></i>
            {{ prefs.isEn ? 'Column-by-Column (Col-Major)' : 'عموداً بعمود (Col-Major)' }}
          </button>
        </div>
      </div>

      <div class="run-grid" style="align-items: center">
        <div class="stage" style="min-height: 180px">
          <div class="matrix" style="grid-template-columns: repeat(4, 66px)">
            <template v-for="(row, r) in WALK_MAT" :key="'wr-' + r">
              <div
                v-for="(val, c) in row"
                :key="'wc-' + r + '-' + c"
                class="mcell"
                :class="{
                  active: !walkDone && walkR === r && walkC === c,
                  done: walkDone || walkVisited[r + '-' + c],
                  row:
                    !walkDone &&
                    ((walkOrder === 'row' && walkR === r && walkC !== c) ||
                      (walkOrder === 'col' && walkC === c && walkR !== r))
                }"
              >
                <span v-if="!walkDone && walkR === r && walkC === c" class="mptr">
                  r={{ r }},c={{ c }}
                </span>
                <span>{{ val }}</span>
                <small>[{{ r }}][{{ c }}]</small>
              </div>
            </template>
          </div>
        </div>

        <div>
          <CodeViewer :lines="codeNestedLoop" :active-line="walkDone ? -1 : 3" />
          <div class="vars" style="margin-top: 10px">
            <span class="var">r = <b>{{ walkR }}</b></span>
            <span class="var">c = <b>{{ walkC }}</b></span>
            <span class="var">m[{{ walkR }}][{{ walkC }}] = <b>{{ WALK_MAT[walkR][walkC] }}</b></span>
          </div>
        </div>
      </div>

      <div class="msg">
        <template v-if="walkDone">
          {{
            prefs.isEn
              ? `Completed ${walkOrder === 'row' ? 'Row-Major' : 'Column-Major'} traversal across all 3 × 4 = 12 cells!`
              : `اكتمل المرور ${walkOrder === 'row' ? 'صفاً بصف' : 'عموداً بعمود'} على جميع الخلايا الـ 12 (3 × 4)!`
          }}
        </template>
        <template v-else>
          {{
            walkOrder === 'row'
              ? prefs.isEn
                ? `Row-Major: Outer r = ${walkR} stays fixed while inner c = ${walkC} moves across row ${walkR} → m[${walkR}][${walkC}] = ${WALK_MAT[walkR][walkC]}.`
                : `المرور بالصفوف: المؤشر الخارجي مثبت عند الصف r = ${walkR} والداخلي يتحرك عند العمود c = ${walkC} ← نقرأ m[${walkR}][${walkC}] = ${WALK_MAT[walkR][walkC]}.`
              : prefs.isEn
                ? `Column-Major: Outer c = ${walkC} stays fixed while inner r = ${walkR} moves down column ${walkC} → m[${walkR}][${walkC}] = ${WALK_MAT[walkR][walkC]}.`
                : `المرور بالأعمدة: المؤشر الخارجي مثبت عند العمود c = ${walkC} والداخلي ينزل عند الصف r = ${walkR} ← نقرأ m[${walkR}][${walkC}] = ${WALK_MAT[walkR][walkC]}.`
          }}
        </template>
      </div>
    </div>

    <CalloutBox type="warn">
      <template v-if="!prefs.isEn">
        <b>ملاحظة هندسية هامة (CPU Cache Locality):</b> في Java، المرور <b>صفاً بصف (Row-Major)</b> أسرع عملياً على المعالج من المرور عموداً بعمود؛ لأن عناصر الصف الواحد <code>m[r]</code> متجاورة في الذاكرة فتُجلب معاً إلى ذاكرة الكاش السريعة (L1 Cache)، بينما القفز بين الصفوف في كل خطوة يسبب <i>Cache Misses</i>.
      </template>
      <template v-else>
        <b>Hardware Performance Note (CPU Cache Locality):</b> In Java, <b>Row-Major traversal</b> is significantly faster in practice than Column-Major traversal because elements of a single row <code>m[r]</code> are contiguous in RAM and pre-fetched into L1 CPU Cache, whereas jumping across different row arrays causes frequent cache misses.
      </template>
    </CalloutBox>
  </section>
</template>
