<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import CodeViewer from '@/components/lecture/layout/CodeViewer.vue'
import CalloutBox from '@/components/lecture/layout/CalloutBox.vue'

const prefs = usePreferencesStore()

const codeWithoutArray = computed(() => [
  'int mark1 = 85;',
  'int mark2 = 92;',
  'int mark3 = 78;',
  'int mark4 = 64;',
  'int mark5 = 90;',
  prefs.isEn ? '// To compute sum:' : '// لحساب المجموع:',
  'int sum = mark1 + mark2 + mark3 + mark4 + mark5;'
])

const codeWithArray = [
  'int[] marks = {85, 92, 78, 64, 90};',
  '',
  'int sum = 0;',
  'for (int i = 0; i < marks.length; i++) {',
  '    sum += marks[i];',
  '}'
]

const codeForLoop = computed(() => [
  'for (int i = 0; i < marks.length; i++) {',
  prefs.isEn
    ? '    System.out.println("Element at [" + i + "] = " + marks[i]);'
    : '    System.out.println("العنصر في الفهرس [" + i + "] = " + marks[i]);',
  prefs.isEn
    ? '    marks[i] += 5; // Direct read & write via index i!'
    : '    marks[i] += 5; // يمكننا القراءة والتعديل على الخانة مباشرة عبر الفهرس i!',
  '}'
])

// 2.2 Memory Anatomy Strip State
const MARKS = [85, 92, 78, 64, 90]
const selectedAnatIdx = ref(-1)

function selectAnatomy(idx) {
  selectedAnatIdx.value = idx
}

function hexAddr(idx) {
  return '0x' + (0x1000 + idx * 4).toString(16).toUpperCase()
}

// 2.3 Live Builder Lab State
const DEF = { int: '0', double: '0.0', boolean: 'false', char: "'\\u0000'", String: 'null' }
const SAMPLE = {
  int: (i) => (i + 1) * 10,
  double: (i) => ((i + 1) * 1.5).toFixed(1),
  boolean: (i) => (i % 2 === 0 ? 'true' : 'false'),
  char: (i) => `'${String.fromCharCode(65 + i)}'`,
  String: (i) => `"${['Ali', 'Sara', 'Omar', 'Lina', 'Zaid', 'Noor', 'Hadi', 'Rami'][i]}"`
}

const bType = ref('int')
const bSize = ref(5)
const bLines = ref(['int[] arr = new int[5];'])
const bActiveLine = ref(0)
const bCells = ref([])
const bMsgKey = ref('allocated')
const bFillStepIdx = ref(-1)
let bTimer = null

function buildArr() {
  clearTimeout(bTimer)
  const n = Math.max(1, Math.min(8, Number(bSize.value) || 5))
  bSize.value = n
  const t = bType.value
  bLines.value = [`${t}[] arr = new ${t}[${n}];`]
  bActiveLine.value = 0
  bCells.value = Array.from({ length: n }, (_, i) => ({
    idx: i,
    val: DEF[t],
    ptr: '',
    cls: 'new'
  }))
  bMsgKey.value = 'allocated'
  bFillStepIdx.value = -1
}

function fillArr() {
  buildArr()
  const t = bType.value
  const n = bSize.value
  let i = 0
  const step = () => {
    if (i >= n) {
      bCells.value = bCells.value.map((c) => ({ ...c, cls: 'done' }))
      bMsgKey.value = 'filled'
      return
    }
    const v = SAMPLE[t](i)
    bLines.value = [...bLines.value, `arr[${i}] = ${v};`]
    bActiveLine.value = bLines.value.length - 1
    bCells.value = bCells.value.map((c, idx) => ({
      ...c,
      val: idx === i ? v : c.val,
      ptr: idx === i ? `arr[${i}]` : c.ptr,
      cls: idx === i ? 'active' : idx < i ? 'done' : 'new'
    }))
    bFillStepIdx.value = i
    bMsgKey.value = 'filling'
    i++
    bTimer = setTimeout(step, 800)
  }
  bTimer = setTimeout(step, 500)
}

// 2.4 Walk Lab State
const walkIdx = ref(0)
const walkFinished = ref(false)
let wTimer = null

function runWalk() {
  clearTimeout(wTimer)
  walkFinished.value = false
  let i = 0
  const step = () => {
    if (i >= MARKS.length) {
      walkIdx.value = MARKS.length
      walkFinished.value = true
      return
    }
    walkIdx.value = i
    i++
    wTimer = setTimeout(step, 850)
  }
  step()
}

// Initialize labs
buildArr()
runWalk()

onUnmounted(() => {
  clearTimeout(bTimer)
  clearTimeout(wTimer)
})
</script>

<template>
  <section id="memory" class="card">
    <div style="font-size: 13px; color: var(--brand); font-weight: 800; letter-spacing: 0.5px">
      <i class="fa-solid fa-boxes-stacked" style="color: var(--primary)"></i>
      {{
        prefs.isEn
          ? 'Unit 2: Array Architecture & Memory Layout'
          : 'الوحدة الثانية: ماهية المصفوفة (المفهوم والتصميم)'
      }}
    </div>
    <h2 style="margin-top: 6px">
      {{
        prefs.isEn
          ? 'Lesson 2: What is an Array and Why Do We Need It?'
          : 'الدرس 2: ما هي المصفوفة ولماذا نحتاجها؟'
      }}
    </h2>

    <h3>
      {{
        prefs.isEn
          ? '2.1 The Problem of Separate Variables vs. The Array Solution'
          : '2.1 مشكلة المتغيرات المنفصلة وحلها بالمصفوفة'
      }}
    </h3>
    <p>
      {{
        prefs.isEn
          ? 'Suppose we want to store grades for 5 students. Without an array we need 5 separate variables—and for 100 students we would need 100 variables with no way to loop over them.'
          : 'لنفترض أننا نريد تخزين درجات 5 طلاب. بدون مصفوفة نحتاج 5 متغيرات منفصلة، ولو زادوا إلى 100 طالب نحتاج 100 متغير ولا نستطيع المرور عليها بحلقة تكرار.'
      }}
    </p>
    <div class="grid g3">
      <div class="mini" style="border-top: 4px solid var(--bad)">
        <h4>
          <i class="fa-solid fa-circle-xmark" style="color: var(--bad)"></i>
          {{ prefs.isEn ? 'Without Array (Coding Nightmare)' : 'بدون مصفوفة (كابوس برمجي)' }}
        </h4>
        <CodeViewer :lines="codeWithoutArray" compact />
        <p style="margin-top: 8px">
          {{
            prefs.isEn
              ? 'Scattered variables, impossible to iterate with a loop, and code grows with every new student.'
              : 'متغيرات متفرقة، لا يمكن المرور عليها بحلقة، والكود يطول مع كل طالب جديد.'
          }}
        </p>
      </div>

      <div class="mini" style="border-top: 4px solid var(--ok)">
        <h4>
          <i class="fa-solid fa-circle-check" style="color: var(--ok)"></i>
          {{ prefs.isEn ? 'With an Array (Smart Solution)' : 'مع مصفوفة (الحل الذكي)' }}
        </h4>
        <CodeViewer :lines="codeWithArray" compact />
        <p style="margin-top: 8px">
          {{
            prefs.isEn
              ? 'One unified identifier, and a two-line loop sums 5 students or 1 million students!'
              : 'اسم واحد جامع، وحلقة واحدة من سطرين تجمع درجات 5 طلاب أو حتى مليون طالب!'
          }}
        </p>
      </div>
    </div>

    <CalloutBox type="note">
      <template v-if="!prefs.isEn">
        <b>التعريف الأساسي:</b> المصفوفة هي <b>بنية بيانات خطية تخزن مجموعة عناصر متجانسة (من نفس النوع)</b>، في
        <b>خانات متجاورة</b> في الذاكرة تحت <b>اسم واحد</b>، ونصل لكل عنصر عبر رقمه الترتيبي (<b>الفهرس Index</b>) الذي يبدأ دائماً من <code>0</code>.
      </template>
      <template v-else>
        <b>Core Definition:</b> An Array is a <b>linear data structure storing homogeneous elements (of the same type)</b> in
        <b>contiguous memory locations</b> under a <b>single identifier</b>, accessed via a zero-based <b>Index</b> starting at <code>0</code>.
      </template>
    </CalloutBox>

    <h3>
      {{
        prefs.isEn
          ? '2.2 Array Layout in Physical Memory: Contiguous Cells, Base Address, and Why Index Starts at 0'
          : '2.2 هيكل المصفوفة في الذاكرة: خانات متجاورة، عنوان البداية (Base)، ولماذا الفهرس يبدأ من 0؟'
      }}
    </h3>
    <p>
      {{
        prefs.isEn
          ? 'In physical RAM, the computer only stores the address of the first cell (Base Address). Because all cells have identical byte size and sit back-to-back without gaps, the Index is actually the Offset from the base address:'
          : 'الحاسوب في الذاكرة يعرف عنوان أول خانة فقط (Base Address). ولأن كل الخانات بنفس الحجم ومتلاصقة تماماً بدون أي فراغ، فإن الفهرس (Index) ليس مجرد رقم ترتيبي؛ بل هو مقدار الإزاحة (Offset) عن نقطة البداية:'
      }}
    </p>

    <div class="formula">
      {{
        prefs.isEn
          ? 'Physical Cell Address = Base_Address + (Index × Element_Size_in_Bytes)'
          : 'العنوان الفيزيائي للخانة = Base + (Index × نوع_البيانات_حجم)'
      }}
    </div>

    <!-- Interactive Memory Anatomy Strip -->
    <div class="anatomy">
      <div class="mem">
        <div
          v-for="(val, idx) in MARKS"
          :key="idx"
          class="anat"
          :class="{ sel: selectedAnatIdx === idx }"
          @click="selectAnatomy(idx)"
        >
          <div class="addr">{{ hexAddr(idx) }}</div>
          <div class="box">{{ val }}</div>
          <div class="ix">[{{ idx }}]</div>
        </div>
      </div>

      <div class="anat-labels">
        <span>
          <b class="mono">marks</b>
          {{ prefs.isEn ? 'Reference to first cell (Base Address)' : 'مرجع لأول خانة (Base Address)' }}
        </span>
        <span>
          <b class="mono">[i]</b>
          {{ prefs.isEn ? 'Index: from 0 to length − 1' : 'الفهرس: من 0 إلى length − 1' }}
        </span>
        <span>
          <b class="mono">marks[i]</b>
          {{ prefs.isEn ? 'Value stored in cell' : 'القيمة المخزنة في الخانة' }}
        </span>
        <span>
          <b class="mono">marks.length</b>
          {{ prefs.isEn ? 'Length =' : 'عدد الخانات =' }} <b>5</b>
        </span>
      </div>

      <div class="msg">
        <template v-if="selectedAnatIdx < 0">
          {{
            prefs.isEn
              ? 'Click any memory cell above to see how the CPU calculates its physical address in O(1) time.'
              : 'اضغط على أي خانة أعلاه لترى كيف يحسب المعالج عنوانها الفيزيائي في خطوة واحدة O(1).'
          }}
        </template>
        <template v-else-if="!prefs.isEn">
          marks[{{ selectedAnatIdx }}] ← العنوان = 0x1000 + {{ selectedAnatIdx }} × 4 =
          <b>{{ hexAddr(selectedAnatIdx) }}</b> ← القيمة <b>{{ MARKS[selectedAnatIdx] }}</b> — خطوة واحدة دون المرور على الخانات السابقة.
        </template>
        <template v-else>
          marks[{{ selectedAnatIdx }}] → Address = 0x1000 + {{ selectedAnatIdx }} × 4 =
          <b>{{ hexAddr(selectedAnatIdx) }}</b> → Value <b>{{ MARKS[selectedAnatIdx] }}</b> — 1 direct step without scanning prior cells.
        </template>
      </div>
    </div>

    <p v-if="!prefs.isEn" style="margin-top: 10px">
      • أول خانة: إزاحتها 0 خانات عن البداية، لذلك نكتب <code>Base + 0 = Base</code> ومن هنا جاء الفهرس <b>0</b>.<br />
      • ثاني خانة: إزاحتها 1 خانة عن البداية → <code>Base + 1 × 4</code>.<br />
      <b>النتيجة العظيمة:</b> لأن المعالج يضرب الفهرس ويجمعه في دورة ساعة واحدة، فإن
      <b>الوصول وقراءة أي خانة في المصفوفة يستغرق دائماً زمن ثابت O(1)!</b>
    </p>
    <p v-else style="margin-top: 10px">
      • First cell: offset is 0 cells from Base → <code>Base + 0 = Base</code>, which is why indexing starts at <b>0</b>.<br />
      • Second cell: offset is 1 cell from Base → <code>Base + 1 × 4</code>.<br />
      <b>Key Takeaway:</b> Because the CPU multiplies and adds in a single clock cycle,
      <b>reading or writing any array index always takes constant time O(1)!</b>
    </p>

    <h3>
      {{
        prefs.isEn
          ? '2.3 Array Lifecycle in Java: Declaration → Allocation (new) → Initialization'
          : '2.3 مراحل حياة المصفوفة في Java: التصريح (Declaration) ← الحجز (new) ← التعبئة'
      }}
    </h3>
    <div class="grid g3">
      <div class="mini" style="border-top: 3px solid var(--brand)">
        <span class="pill p-brand">{{ prefs.isEn ? 'Stage 1' : 'المرحلة 1' }}</span>
        <h4>{{ prefs.isEn ? 'Declaration' : 'التصريح (Declaration)' }}</h4>
        <code>int[] marks;</code>
        <p style="margin-top: 6px">
          {{
            prefs.isEn
              ? 'Declares a reference variable name. No cells are allocated in memory yet (reference is null).'
              : 'نعلن فقط عن اسم سيكون مصفوفة. في الذاكرة: لم تُحجز أي خانة بعد (المرجع قيمته null).'
          }}
        </p>
      </div>
      <div class="mini" style="border-top: 3px solid var(--accent)">
        <span class="pill p-acc">{{ prefs.isEn ? 'Stage 2' : 'المرحلة 2' }}</span>
        <h4>{{ prefs.isEn ? 'Heap Allocation (via new)' : 'الحجز في الـ Heap (بواسطة new)' }}</h4>
        <code>marks = new int[5];</code>
        <p style="margin-top: 6px">
          {{
            prefs.isEn
              ? 'Immediately reserves 5 contiguous slots in Heap memory, initialized with default values (0 for numbers, false for boolean).'
              : 'تُحجز 5 خانات متتالية في الـ Heap فوراً، وتأخذ قيماً افتراضية تلقائية (0 للأعداد، false للـ boolean).'
          }}
        </p>
      </div>
      <div class="mini" style="border-top: 3px solid var(--ok)">
        <span class="pill p-ok">{{ prefs.isEn ? 'Stage 3' : 'المرحلة 3' }}</span>
        <h4>{{ prefs.isEn ? 'Initialization' : 'التعبئة (Initialization)' }}</h4>
        <code>marks[0] = 85; marks[1] = 92;</code>
        <p style="margin-top: 6px">
          {{
            prefs.isEn
              ? 'Replaces default values with actual values by index, or combines all 3 stages: int[] marks = {85, 92, ...};'
              : 'نستبدل القيم الافتراضية بالقيم الحقيقية عبر الفهرس، أو ندمج المراحل الثلاث بسطر واحد: int[] marks = {85, 92, ...};'
          }}
        </p>
      </div>
    </div>

    <!-- Live Builder Lab -->
    <div class="builder">
      <div class="inputs">
        <b>
          <i class="fa-solid fa-screwdriver-wrench" style="color: var(--primary)"></i>
          {{ prefs.isEn ? 'Live Allocation & Initialization Lab:' : 'مختبر الإنشاء والحجز المباشر:' }}
        </b>
        <label>
          {{ prefs.isEn ? 'Type:' : 'النوع:' }}
          <select v-model="bType" @change="buildArr()">
            <option>int</option>
            <option>double</option>
            <option>boolean</option>
            <option>char</option>
            <option>String</option>
          </select>
        </label>
        <label>
          {{ prefs.isEn ? 'Size:' : 'الحجم:' }}
          <input v-model.number="bSize" class="num" type="number" min="1" max="8" />
        </label>
        <button type="button" class="btn" @click="buildArr()">
          {{ prefs.isEn ? 'Run new (Allocate)' : 'نفّذ new (حجز)' }}
        </button>
        <button type="button" class="btn acc" @click="fillArr()">
          {{ prefs.isEn ? 'Fill Values Step-by-Step' : 'عبّئ القيم خطوة بخطوة' }}
        </button>
      </div>

      <CodeViewer :lines="bLines" :active-line="bActiveLine" />

      <div class="stage" style="min-height: 120px; margin-top: 12px">
        <div class="arr-row">
          <div
            v-for="c in bCells"
            :key="c.idx"
            class="cell"
            :class="c.cls"
          >
            <div class="ptr">{{ c.ptr }}</div>
            <div class="box" style="font-size: 13px; width: 66px">{{ c.val }}</div>
            <div class="ix">[{{ c.idx }}]</div>
          </div>
        </div>
      </div>

      <div class="msg">
        <template v-if="bMsgKey === 'allocated'">
          {{
            prefs.isEn
              ? `Allocated ${bSize} contiguous cells of type ${bType}; each initialized to default value ${DEF[bType]}. Valid indices: 0 to ${bSize - 1}.`
              : `حُجزت ${bSize} خانات متجاورة من النوع ${bType}، وكل خانة أخذت القيمة الافتراضية ${DEF[bType]}. الفهارس من 0 إلى ${bSize - 1} و arr.length = ${bSize}.`
          }}
        </template>
        <template v-else-if="bMsgKey === 'filling' && bFillStepIdx >= 0">
          {{
            prefs.isEn
              ? `arr[${bFillStepIdx}] = ${bCells[bFillStepIdx]?.val} → Writing directly into cell index ${bFillStepIdx}.`
              : `arr[${bFillStepIdx}] = ${bCells[bFillStepIdx]?.val}  ← نكتب في الخانة رقم ${bFillStepIdx} مباشرة.`
          }}
        </template>
        <template v-else>
          {{
            prefs.isEn
              ? 'Initialization complete! Every cell now holds our assigned value.'
              : 'اكتملت التعبئة. كل خانة الآن تحمل قيمة نحن اخترناها.'
          }}
        </template>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>{{ prefs.isEn ? 'Data Type' : 'النوع (Data Type)' }}</th>
          <th>{{ prefs.isEn ? 'Default Value After new' : 'القيمة الافتراضية بعد new مباشرة' }}</th>
          <th>{{ prefs.isEn ? 'Cell Size in Memory' : 'حجم الخانة في الذاكرة' }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>int</code></td>
          <td><code>0</code></td>
          <td>{{ prefs.isEn ? '4 Bytes' : '4 بايت' }}</td>
        </tr>
        <tr>
          <td><code>double</code></td>
          <td><code>0.0</code></td>
          <td>{{ prefs.isEn ? '8 Bytes' : '8 بايت' }}</td>
        </tr>
        <tr>
          <td><code>boolean</code></td>
          <td><code>false</code></td>
          <td>{{ prefs.isEn ? '1 Byte' : '1 بايت' }}</td>
        </tr>
        <tr>
          <td><code>char</code></td>
          <td><code>'\u0000'</code> ({{ prefs.isEn ? 'null char' : 'حرف فارغ' }})</td>
          <td>{{ prefs.isEn ? '2 Bytes' : '2 بايت' }}</td>
        </tr>
        <tr>
          <td><code>String</code> ({{ prefs.isEn ? 'or any Object' : 'أو أي كائن' }})</td>
          <td><code>null</code></td>
          <td>{{ prefs.isEn ? '4 or 8 Bytes (Reference)' : '4 أو 8 بايت (مرجع)' }}</td>
        </tr>
      </tbody>
    </table>

    <h3>
      {{
        prefs.isEn
          ? '2.4 Traversing Array Elements: Standard Indexed for Loop'
          : '2.4 المرور على عناصر المصفوفة: حلقة for التقليدية بالفهرس'
      }}
    </h3>
    <div style="background: var(--bg); border: 1px solid var(--line); border-radius: 16px; padding: 24px; margin-bottom: 20px">
      <CodeViewer :lines="codeForLoop" />
      <p style="margin: 14px 0 0; font-size: 15px; line-height: 1.8">
        {{
          prefs.isEn
            ? 'How it works: Counter i starts at 0 (first cell) and increments by 1 each iteration until length - 1. Knowing the exact index i lets us read, modify in-place, or traverse in reverse.'
            : 'آلية العمل: المتغير i يبدأ من 0 (أول خانة) ويزداد بمقدار 1 في كل دورة حتى يصل إلى length - 1. ميزتها الأساسية أننا نعرف موقع كل عنصر في الذاكرة بدقة، مما يمكننا من القراءة، التعديل المباشر، أو المرور بالعكس.'
        }}
      </p>
    </div>

    <!-- Walk Lab -->
    <div class="lab-mini">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 10px;
        "
      >
        <b style="font-size: 15px">
          <i class="fa-solid fa-play" style="color: var(--primary); margin-inline-end: 6px"></i>
          {{ prefs.isEn ? 'Live Simulation of Standard for Loop:' : 'محاكاة حية للمرور بحلقة for التقليدية:' }}
        </b>
        <button type="button" class="btn" @click="runWalk()">
          {{ prefs.isEn ? '▶ Run Loop Trace (i = 0 to 4)' : '▶ تشغيل تتبع الحلقة (i = 0 إلى 4)' }}
        </button>
      </div>
      <div class="stage" style="min-height: 110px; margin-top: 10px">
        <div class="arr-row">
          <div
            v-for="(val, k) in MARKS"
            :key="k"
            class="cell"
            :class="[k < walkIdx ? 'done' : '', k === walkIdx ? 'active' : '']"
          >
            <div class="ptr">{{ k === walkIdx ? 'i = ' + k : '' }}</div>
            <div class="box">{{ val }}</div>
            <div class="ix">[{{ k }}]</div>
          </div>
        </div>
      </div>
      <div class="msg">
        <template v-if="walkFinished">
          {{
            prefs.isEn
              ? 'Loop terminated when condition i < marks.length became false (i = 5).'
              : 'انتهت الحلقة عندما أصبح الشرط i < marks.length خاطئاً (i = 5).'
          }}
        </template>
        <template v-else>
          {{
            prefs.isEn
              ? `Iteration i = ${walkIdx}: Directly accessing cell marks[${walkIdx}] = ${MARKS[walkIdx]} via index.`
              : `الدورة i = ${walkIdx}: نصل إلى الخانة marks[${walkIdx}] = ${MARKS[walkIdx]} مباشرة عبر الفهرس.`
          }}
        </template>
      </div>
    </div>

    <h3>
      {{
        prefs.isEn
          ? '2.5 Array Characteristics: Strengths vs. Limitations'
          : '2.5 خصائص المصفوفة: ما الذي تجيده وما الذي تعجز عنه؟'
      }}
    </h3>
    <div class="grid g3">
      <div class="mini" style="border-top: 4px solid var(--ok)">
        <h4>
          <i class="fa-solid fa-circle-check" style="color: var(--ok)"></i>
          {{ prefs.isEn ? 'Strengths & Advantages' : 'المزايا والقوة' }}
        </h4>
        <p v-if="!prefs.isEn">
          • وصول مباشر فوري لأي عنصر O(1)<br />
          • تخزين متجاور وسريع في الذاكرة (Cache friendly)<br />
          • حجز مساحة محددة دون استهلاك ذاكرة إضافية للروابط
        </p>
        <p v-else>
          • Instant O(1) random access by index<br />
          • Contiguous &amp; CPU cache-friendly layout<br />
          • Zero memory overhead for pointers
        </p>
      </div>
      <div class="mini" style="border-top: 4px solid var(--bad)">
        <h4>
          <i class="fa-solid fa-triangle-exclamation" style="color: var(--bad)"></i>
          {{ prefs.isEn ? 'Limitations & Drawbacks' : 'القيود والعيوب' }}
        </h4>
        <p v-if="!prefs.isEn">
          • الحجم ثابت ولا يمكن تمديده أو تقليصه<br />
          • الإدراج والحذف مكلفان O(n) ويتطلبان بناء مصفوفة جديدة وإزاحة العناصر<br />
          • نوع البيانات موحد ولا يقبل خلط أنواع
        </p>
        <p v-else>
          • Fixed size; cannot grow or shrink dynamically<br />
          • Insertion &amp; deletion cost O(n) due to copying &amp; shifting<br />
          • Homogeneous type only
        </p>
      </div>
      <div class="mini" style="border-top: 4px solid var(--brand)">
        <h4>
          <i class="fa-solid fa-bullseye" style="color: var(--primary)"></i>
          {{ prefs.isEn ? 'When to Prefer Arrays?' : 'متى نفضل استخدامها؟' }}
        </h4>
        <p v-if="!prefs.isEn">
          • عندما يكون عدد العناصر معروفاً مسبقاً<br />
          • عندما نحتاج للقراءة والتعديل السريع بالموقع<br />
          • كبنية أساسية لبناء هياكل أخرى (مثل Stack, Queue, Tables)
        </p>
        <p v-else>
          • When element count is known in advance<br />
          • When fast indexed reads/updates dominate<br />
          • As a building block for Stacks, Queues, and Hash Tables
        </p>
      </div>
    </div>

    <div class="warn">
      <template v-if="!prefs.isEn">
        <b>تذكّر دائماً لتجنب خطأ الحدود (IndexOutOfBoundsException):</b> لأن الفهرس يبدأ من <code>0</code>، فإن آخر خانة دائماً هي
        <code>length - 1</code>. لذلك نكتب شرط الحلقة دائماً <code>i &lt; arr.length</code> وليس <code>i &lt;= arr.length</code>.
      </template>
      <template v-else>
        <b>Always Remember to Avoid IndexOutOfBoundsException:</b> Because indexing starts at <code>0</code>, the last valid index is always
        <code>length - 1</code>. Always write the loop condition as <code>i &lt; arr.length</code>, never <code>i &lt;= arr.length</code>.
      </template>
    </div>
  </section>
</template>
