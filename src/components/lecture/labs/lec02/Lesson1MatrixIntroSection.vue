<script setup>
import { ref, computed } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import CodeViewer from '@/components/lecture/layout/CodeViewer.vue'
import CalloutBox from '@/components/lecture/layout/CalloutBox.vue'

const prefs = usePreferencesStore()

const codeWithout2D = computed(() => [
  '// درجات 3 طلاب في 4 مواد: مصفوفات منفصلة!',
  'int[] student0 = {85, 90, 78, 92};',
  'int[] student1 = {88, 76, 95, 84};',
  'int[] student2 = {91, 89, 82, 96};',
  prefs.isEn
    ? '// Impossible to loop over all students by index!'
    : '// لا يمكن المرور على كل الطلاب بحلقة واحدة!'
])

const codeWith2D = computed(() => [
  'int[][] grades = {',
  '    {85, 90, 78, 92},',
  '    {88, 76, 95, 84},',
  '    {91, 89, 82, 96}',
  '};',
  'int val = grades[1][2]; // 95 (O(1))'
])

// Interactive 3x4 Matrix Anatomy Lab
const GRID = [
  [85, 90, 78, 92],
  [88, 76, 95, 84],
  [91, 89, 82, 96]
]
const ROWS = 3
const COLS = 4
const ROW_BASES = [0x2000, 0x2040, 0x2080]

const selR = ref(1)
const selC = ref(2)
const memMode = ref('java') // 'java' (Array of Arrays) | 'rowmajor' (Flat Row-Major)

function selectCell(r, c) {
  selR.value = r
  selC.value = c
}

function toHex(num) {
  return '0x' + num.toString(16).toUpperCase()
}

const javaRowBaseHex = computed(() => toHex(ROW_BASES[selR.value]))
const javaCellAddrHex = computed(() => toHex(ROW_BASES[selR.value] + selC.value * 4))
const flatIndex = computed(() => selR.value * COLS + selC.value)
const rowMajorAddrHex = computed(() => toHex(0x1000 + flatIndex.value * 4))
</script>

<template>
  <section id="matrix-intro" class="card">
    <div style="font-size: 13px; color: var(--brand); font-weight: 800; letter-spacing: 0.5px">
      <i class="fa-solid fa-table-cells" style="color: var(--primary)"></i>
      {{
        prefs.isEn
          ? 'Unit 1: From 1D Lists to 2D Grids & Memory Architecture'
          : 'الوحدة الأولى: من القوائم الخطية إلى الشبكات ثنائية الأبعاد ومعمارية الذاكرة'
      }}
    </div>
    <h2 style="margin-top: 6px">
      {{
        prefs.isEn
          ? 'Lesson 1: What is a 2D Array & How Does Java Store It in Memory?'
          : 'الدرس 1: ما هي المصفوفة ثنائية الأبعاد وكيف تخزّنها Java في الذاكرة؟'
      }}
    </h2>

    <h3>
      {{
        prefs.isEn
          ? '1.1 The Problem of Separate 1D Arrays vs. The 2D Matrix Solution'
          : '1.1 مشكلة المصفوفات الأحادية المنفصلة وحلها بالمصفوفة ثنائية الأبعاد'
      }}
    </h3>
    <p>
      {{
        prefs.isEn
          ? 'Real-world data is rarely a single flat line: student gradebooks, digital images (pixels), chessboard grids, and seating charts all have Rows and Columns. Using separate 1D arrays for each row makes it impossible to iterate over rows dynamically or process columns.'
          : 'البيانات في الواقع نادراً ما تكون سطراً واحداً؛ فكشوفات درجات الطلاب، الصور الرقمية (البكسلات)، رقعة الشطرنج، وجداول المقاعد كلها تتكون من صفوف (Rows) وأعمدة (Columns). استخدام مصفوفة أحادية منفصلة لكل صف يمنعنا من المرور على الصفوف بحلقة أو جمع عناصر عمود كامل.'
      }}
    </p>

    <div class="grid g3">
      <div class="mini" style="border-top: 4px solid var(--bad)">
        <h4>
          <i class="fa-solid fa-circle-xmark" style="color: var(--bad)"></i>
          {{
            prefs.isEn
              ? 'Without 2D Array (Disconnected Rows)'
              : 'بدون مصفوفة ثنائية (صفوف متفرقة)'
          }}
        </h4>
        <CodeViewer :lines="codeWithout2D" compact />
        <p style="margin-top: 8px">
          {{
            prefs.isEn
              ? 'Separate 1D variables cannot be indexed by row number r, nor can we easily compute the average of Exam 2 across all students.'
              : 'متغيرات منفصلة لا يمكن الوصول إليها برقم الصف r، ويستحيل تمريرها كجدول موحد أو حساب مجموع عمود بمرونة.'
          }}
        </p>
      </div>

      <div class="mini" style="border-top: 4px solid var(--ok)">
        <h4>
          <i class="fa-solid fa-circle-check" style="color: var(--ok)"></i>
          {{
            prefs.isEn
              ? 'With a 2D Array (Unified Grid Table)'
              : 'مع مصفوفة ثنائية الأبعاد (جدول موحّد)'
          }}
        </h4>
        <CodeViewer :lines="codeWith2D" compact />
        <p style="margin-top: 8px">
          {{
            prefs.isEn
              ? 'One unified identifier where every cell is pinpointed by two zero-based coordinates: Row [r] and Column [c] in O(1) time!'
              : 'اسم واحد جامع يربط كل الصفوف والأعمدة، ونصل لأي خلية فوراً عبر إحداثيين: رقم الصف [r] ورقم العمود [c] بزمن ثابت O(1)!'
          }}
        </p>
      </div>
    </div>

    <CalloutBox type="note">
      <template v-if="!prefs.isEn">
        <b>التعريف الأكاديمي:</b> المصفوفة ثنائية الأبعاد (<b>2D Array / Matrix</b>) هي بنية بيانات جدولية تخزن عناصر متجانسة مرتبة في
        <b>صفوف أفقية (Rows = R)</b> و<b>أعمدة رأسية (Columns = C)</b>، ونصل لكل خلية عبر زوج الفهارس
        <code>matrix[r][c]</code> حيث يبدأ كلٌّ من فهرس الصف <code>r</code> وفهرس العمود <code>c</code> من <code>0</code>.
      </template>
      <template v-else>
        <b>Core Definition:</b> A Two-Dimensional Array (<b>2D Array / Matrix</b>) is a tabular data structure storing homogeneous elements organized into
        <b>horizontal Rows (R)</b> and <b>vertical Columns (C)</b>, accessed via a pair of zero-based indices
        <code>matrix[r][c]</code> where <code>0 &le; r &lt; R</code> and <code>0 &le; c &lt; C</code>.
      </template>
    </CalloutBox>

    <h3>
      {{
        prefs.isEn
          ? '1.2 Interactive Lab: How Java Actually Stores 2D Arrays in Heap Memory'
          : '1.2 مختبر تفاعلي: كيف تخزّن Java المصفوفة ثنائية الأبعاد في الذاكرة الفيزيائية؟'
      }}
    </h3>
    <p>
      {{
        prefs.isEn
          ? 'Unlike C/C++ (which stores a 2D array as one flat contiguous block), Java implements a 2D array as an "Array of Arrays": the main variable holds a 1D spine array of row references, and each element grades[r] points to a contiguous 1D array of columns in Heap memory! Click any cell below to inspect both memory models:'
          : 'على عكس لغات مثل C التي تحجز المصفوفة الثنائية كقطعة واحدة مسطحة، تبني Java المصفوفة الثنائية باعتبارها «مصفوفة من المصفوفات» (Array of Arrays): المتغير الأساسي يشير إلى مصفوفة مراجع للصفوف، وكل خانة فيها grades[r] تشير إلى مصفوفة أحادية متجاورة تمثل أعمدة ذلك الصف! اضغط على أي خلية في الجدول أدناه:'
      }}
    </p>

    <div class="builder">
      <div class="inputs" style="justify-content: space-between">
        <div>
          <i class="fa-solid fa-microchip" style="color: var(--primary); margin-inline-end: 6px"></i>
          <b>
            {{
              prefs.isEn
                ? 'Select Memory Representation Model:'
                : 'اختر نموذج تمثيل الذاكرة الفيزيائية:'
            }}
          </b>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap">
          <button
            type="button"
            class="btn"
            :class="{ ghost: memMode !== 'java' }"
            @click="memMode = 'java'"
          >
            <i class="fa-brands fa-java"></i>
            {{
              prefs.isEn
                ? '1. Java Heap (Array of Arrays)'
                : '1. معمارية Java الحقيقية (Array of Arrays)'
            }}
          </button>
          <button
            type="button"
            class="btn"
            :class="{ ghost: memMode !== 'rowmajor' }"
            @click="memMode = 'rowmajor'"
          >
            <i class="fa-solid fa-ruler-horizontal"></i>
            {{
              prefs.isEn
                ? '2. Flat Row-Major Formula'
                : '2. التخطيط الخطي بالصفوف (Row-Major Formula)'
            }}
          </button>
        </div>
      </div>

      <!-- Top Part: Logical 2D Grid + Step-by-Step Resolution Pipeline -->
      <div class="run-grid" style="align-items: stretch; margin-top: 16px">
        <!-- Left: Interactive 2D Grid -->
        <div class="stage" style="padding: 20px; justify-content: center">
          <div class="row-label">
            {{
              prefs.isEn
                ? 'Logical 2D Grid: grades[3][4] (Click any cell [r][c])'
                : 'الجدول المنطقي: grades[3][4] (اضغط على أي خلية [r][c])'
            }}
          </div>
          <div
            class="matrix"
            style="grid-template-columns: repeat(4, minmax(60px, 68px)); margin-top: 8px"
          >
            <template v-for="(row, r) in GRID" :key="'gr-' + r">
              <div
                v-for="(val, c) in row"
                :key="r + '-' + c"
                class="mcell"
                :class="{
                  active: selR === r && selC === c,
                  row: selR === r && selC !== c
                }"
                style="cursor: pointer"
                @click="selectCell(r, c)"
              >
                <span v-if="selR === r && selC === c" class="mptr">grades[{{ r }}][{{ c }}]</span>
                <span>{{ val }}</span>
                <small>[{{ r }}][{{ c }}]</small>
              </div>
            </template>
          </div>

          <div class="anat-labels" style="margin-top: 12px">
            <span>
              <b class="mono">grades.length</b> = <b>{{ ROWS }}</b> ({{
                prefs.isEn ? 'Rows' : 'عدد الصفوف'
              }})
            </span>
            <span>
              <b class="mono">grades[{{ selR }}].length</b> = <b>{{ COLS }}</b> ({{
                prefs.isEn ? `Cols in Row ${selR}` : `أعمدة الصف ${selR}`
              }})
            </span>
            <span>
              <b class="mono">Total</b> = <b>{{ ROWS }} &times; {{ COLS }} = 12</b>
            </span>
          </div>
        </div>

        <!-- Right: 3-Step Pointer Resolution Breakdown Card -->
        <div
          style="
            background: var(--paper);
            border: 1px solid var(--line);
            border-radius: 16px;
            padding: 20px 22px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <div>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 8px;
                flex-wrap: wrap;
                margin-bottom: 12px;
              "
            >
              <span style="font-weight: 800; color: var(--brand); font-size: 15px">
                <i class="fa-solid fa-route" style="margin-inline-end: 6px"></i>
                {{
                  memMode === 'java'
                    ? prefs.isEn
                      ? 'How JVM Resolves grades[' + selR + '][' + selC + '] in 3 Steps:'
                      : 'كيف تصل Java للخلية grades[' + selR + '][' + selC + '] في 3 خطوات:'
                    : prefs.isEn
                      ? 'Row-Major Address Calculation for grades[' + selR + '][' + selC + ']:'
                      : 'حساب العنوان الفيزيائي بالترتيب الصفي للخلية grades[' + selR + '][' + selC + ']:'
                }}
              </span>
              <span class="pill p-ok">O(1) Constant Time</span>
            </div>

            <template v-if="memMode === 'java'">
              <div class="heap-steps-pipeline">
                <div class="heap-step-item">
                  <span class="heap-step-badge">1</span>
                  <div>
                    <div class="heap-step-title">
                      {{
                        prefs.isEn
                          ? 'Stack Variable → Outer Spine Array'
                          : 'من متغير الـ Stack إلى مصفوفة مراجع الصفوف'
                      }}
                    </div>
                    <div class="heap-step-desc">
                      <code class="mono">grades</code>
                      {{
                        prefs.isEn
                          ? 'points to Spine Array at'
                          : 'يشير إلى مصفوفة المراجع الأم في العنوان'
                      }}
                      <code class="mono">0x1000</code>
                    </div>
                  </div>
                </div>

                <div class="heap-step-item active-step">
                  <span class="heap-step-badge">2</span>
                  <div>
                    <div class="heap-step-title">
                      {{
                        prefs.isEn
                          ? `Fetch Row Reference grades[${selR}]`
                          : `جلب مرجع الصف المطلوب grades[${selR}]`
                      }}
                    </div>
                    <div class="heap-step-desc">
                      <code class="mono">grades[{{ selR }}]</code>
                      {{
                        prefs.isEn
                          ? 'stores the base address of Row ' + selR + ':'
                          : 'يحتوي على عنوان بداية مصفوفة الصف ' + selR + ':'
                      }}
                      <b class="mono" style="color: var(--brand)">{{ javaRowBaseHex }}</b>
                    </div>
                  </div>
                </div>

                <div class="heap-step-item target-step">
                  <span class="heap-step-badge">3</span>
                  <div>
                    <div class="heap-step-title">
                      {{
                        prefs.isEn
                          ? `Jump to Column Offset [c = ${selC}]`
                          : `القفز لإزاحة العمود [c = ${selC}] داخل الصف ${selR}`
                      }}
                    </div>
                    <div class="heap-step-desc">
                      <span class="mono">
                        {{ javaRowBaseHex }} + ({{ selC }} &times; 4B) =
                        <b>{{ javaCellAddrHex }}</b> &rarr;
                        <b style="color: var(--accent)">{{ GRID[selR][selC] }}</b>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <p style="font-size: 13.5px; color: var(--muted); margin: 0 0 12px">
                {{
                  prefs.isEn
                    ? `To reach row r = ${selR}, we skip ${selR} complete rows (${selR} × ${COLS} = ${selR * COLS} cells), then advance c = ${selC} cells inside row ${selR}:`
                    : `للوصول إلى الصف r = ${selR} نتخطى ${selR} صفوف كاملة (${selR} × ${COLS} = ${selR * COLS} خانات)، ثم نتقدم بمقدار العمود c = ${selC}:`
                }}
              </p>
              <div class="formula" style="font-size: 13px; margin: 0">
                1) Linear_Index = (r &times; Cols) + c = ({{ selR }} &times; {{ COLS }}) + {{ selC }} =
                <b>{{ flatIndex }}</b><br />
                2) Address = Base(0x1000) + ({{ flatIndex }} &times; 4B) =
                <b>{{ rowMajorAddrHex }}</b> &rarr; Value = <b>{{ GRID[selR][selC] }}</b>
              </div>
            </template>
          </div>

          <div
            v-if="memMode === 'java'"
            class="formula"
            style="margin: 12px 0 0; font-size: 12.5px; padding: 10px 14px"
          >
            Addr(grades[{{ selR }}][{{ selC }}]) = Base(grades[{{ selR }}]) + ({{ selC }} &times; 4)
            = {{ javaRowBaseHex }} + {{ selC * 4 }} = <b>{{ javaCellAddrHex }}</b>
          </div>
        </div>
      </div>

      <!-- Bottom Full-Width Architectural Diagram -->
      <div class="heap-arch-board">
        <!-- Mode 1: Java Heap Array of Arrays -->
        <template v-if="memMode === 'java'">
          <div class="heap-arch-header">
            <div class="heap-arch-title">
              <i class="fa-solid fa-sitemap"></i>
              <span>
                {{
                  prefs.isEn
                    ? 'Java Heap Memory Architecture: Spine Array of Row References → Contiguous 1D Row Arrays'
                    : 'ذاكرة الـ Heap في Java: مصفوفة مراجع الصفوف ← تشير لمصفوفات الصفوف المتجاورة'
                }}
              </span>
            </div>
            <div class="heap-arch-legend">
              <span class="legend-chip stack-chip">
                <i class="fa-solid fa-layer-group"></i> Stack Ref
              </span>
              <span class="legend-chip spine-chip">
                <i class="fa-solid fa-code-branch"></i> Spine Array (int[][])
              </span>
              <span class="legend-chip row-chip">
                <i class="fa-solid fa-memory"></i> Contiguous Row (int[])
              </span>
            </div>
          </div>

          <!-- Interactive Architecture Diagram (LTR for Hardware Memory Accuracy) -->
          <div class="heap-diagram-scroll" dir="ltr">
            <!-- Top Stack Reference Banner -->
            <div class="heap-stack-bar">
              <div class="stack-var-pill">
                <span class="stack-badge">STACK</span>
                <span class="mono">int[][] <b>grades</b> = <span class="hex-hl">0x1000</span></span>
              </div>
              <div class="stack-arrow-label">
                <i class="fa-solid fa-arrow-turn-down"></i>
                <span>
                  {{
                    prefs.isEn
                      ? 'Points to outer Spine Array of 3 Row References in Heap (0x1000)'
                      : 'يشير إلى مصفوفة مراجع الصفوف (Spine Array) في الـ Heap عند 0x1000'
                  }}
                </span>
              </div>
            </div>

            <!-- 3 Row Lanes: Spine Slot -> Connector -> Contiguous 1D Row Object -->
            <div class="heap-lanes">
              <div
                v-for="(row, r) in GRID"
                :key="'heap-r-' + r"
                class="heap-lane"
                :class="{ 'is-active-row': selR === r }"
              >
                <!-- Left: Spine Slot Card -->
                <div
                  class="spine-slot-card"
                  :class="{ active: selR === r }"
                  @click="selectCell(r, selC)"
                >
                  <div class="spine-slot-head">
                    <span class="spine-addr">{{ toHex(0x1000 + r * 8) }}</span>
                    <span class="spine-tag">Spine[{{ r }}]</span>
                  </div>
                  <div class="spine-slot-name">grades[{{ r }}]</div>
                  <div class="spine-slot-ptr">
                    <i class="fa-solid fa-link"></i>
                    <span>{{ toHex(ROW_BASES[r]) }}</span>
                  </div>
                </div>

                <!-- Middle: Animated Pointer Connector -->
                <div class="heap-connector" :class="{ active: selR === r }">
                  <div class="connector-line"></div>
                  <span class="connector-badge">{{ toHex(ROW_BASES[r]) }}</span>
                  <i class="fa-solid fa-caret-right connector-head"></i>
                </div>

                <!-- Right: Contiguous 1D Row Array Object on Heap -->
                <div class="heap-row-container" :class="{ active: selR === r }">
                  <div class="heap-row-bar">
                    <span class="heap-row-title">
                      <i class="fa-solid fa-cubes-stacked"></i>
                      Heap 1D Array: <code>int[{{ COLS }}]</code> (Row {{ r }})
                    </span>
                    <span class="heap-row-meta">
                      Base: <b>{{ toHex(ROW_BASES[r]) }}</b> · Length: <b>{{ row.length }}</b> (16 Bytes Contiguous)
                    </span>
                  </div>

                  <div class="heap-row-cells">
                    <div
                      v-for="(val, c) in row"
                      :key="'hc-' + c"
                      class="heap-cell-box"
                      :class="{
                        'is-selected': selR === r && selC === c,
                        'is-in-selected-row': selR === r && selC !== c
                      }"
                      @click="selectCell(r, c)"
                    >
                      <div class="heap-cell-addr">
                        <span>{{ toHex(ROW_BASES[r] + c * 4) }}</span>
                        <span class="heap-cell-offset">+{{ c * 4 }}B</span>
                      </div>
                      <div class="heap-cell-val">{{ val }}</div>
                      <div class="heap-cell-coord">
                        grades[{{ r }}][{{ c }}]
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Mode 2: Flat Row-Major Order -->
        <template v-else>
          <div class="heap-arch-header">
            <div class="heap-arch-title">
              <i class="fa-solid fa-grip-lines"></i>
              <span>
                {{
                  prefs.isEn
                    ? 'Row-Major Linearization: All Rows Laid Out Back-to-Back in One Contiguous Block'
                    : 'التخطيط الخطي بالصفوف (Row-Major): رصّ الصفوف واحداً تلو الآخر في كتلة ذاكرة متصلة'
                }}
              </span>
            </div>
          </div>

          <div
            style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(82px, 1fr));
              gap: 8px;
              direction: ltr;
              margin-top: 12px;
            "
          >
            <template v-for="(row, r) in GRID" :key="'flat-r-' + r">
              <div
                v-for="(val, c) in row"
                :key="'flat-' + r + '-' + c"
                class="heap-cell-box"
                :class="{
                  'is-selected': selR === r && selC === c,
                  'is-in-selected-row': selR === r && selC !== c
                }"
                @click="selectCell(r, c)"
              >
                <div class="heap-cell-addr">
                  <span>{{ toHex(0x1000 + (r * COLS + c) * 4) }}</span>
                  <span class="heap-cell-offset">#{{ r * COLS + c }}</span>
                </div>
                <div class="heap-cell-val">{{ val }}</div>
                <div class="heap-cell-coord">
                  [{{ r }}][{{ c }}]
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>

      <div class="msg">
        <template v-if="memMode === 'java'">
          {{
            prefs.isEn
              ? `Selected grades[${selR}][${selC}] = ${GRID[selR][selC]}: Step 1 fetches row reference grades[${selR}] (${javaRowBaseHex}), Step 2 jumps to offset +${selC}×4 = ${javaCellAddrHex} in O(1) constant time!`
              : `الخلية المحددة grades[${selR}][${selC}] = ${GRID[selR][selC]}: الخطوة 1 تقرأ عنوان الصف grades[${selR}] (${javaRowBaseHex})، والخطوة 2 تقفز للإزاحة +${selC}×4 = ${javaCellAddrHex} بزمن ثابت O(1)!`
          }}
        </template>
        <template v-else>
          {{
            prefs.isEn
              ? `Row-Major Formula for grades[${selR}][${selC}]: Linear position = (${selR} × ${COLS}) + ${selC} = ${flatIndex} → Physical Address = 0x1000 + ${flatIndex * 4} = ${rowMajorAddrHex}.`
              : `معادلة الترتيب الصفي للخلية grades[${selR}][${selC}]: الترتيب الخطي = (${selR} × ${COLS}) + ${selC} = ${flatIndex} ← العنوان الفيزيائي = 0x1000 + ${flatIndex * 4} = ${rowMajorAddrHex}.`
          }}
        </template>
      </div>
    </div>

    <div class="grid g3">
      <div class="mini" style="border-top: 4px solid var(--brand)">
        <h4>
          <i class="fa-solid fa-arrows-up-down" style="color: var(--primary)"></i>
          <code>matrix.length</code>
        </h4>
        <p>
          {{
            prefs.isEn
              ? 'Always returns the number of ROWS (R) in the 2D array (length of the outer spine array).'
              : 'يعطينا دائماً عدد الصفوف (Rows = R) في المصفوفة ثنائية الأبعاد (طول مصفوفة المراجع الخارجية).'
          }}
        </p>
      </div>
      <div class="mini" style="border-top: 4px solid var(--accent)">
        <h4>
          <i class="fa-solid fa-arrows-left-right" style="color: var(--accent)"></i>
          <code>matrix[r].length</code>
        </h4>
        <p>
          {{
            prefs.isEn
              ? 'Returns the number of COLUMNS (C) inside row r specifically (crucial for rectangular and jagged arrays).'
              : 'يعطينا عدد الأعمدة (Columns = C) داخل الصف رقم r تحديداً (ضروري للمصفوفات المستطيلة والمتعرجة).'
          }}
        </p>
      </div>
      <div class="mini" style="border-top: 4px solid var(--ok)">
        <h4>
          <i class="fa-solid fa-bolt" style="color: var(--ok)"></i>
          {{ prefs.isEn ? 'Total Elements = R × C' : 'إجمالي الخلايا = R × C' }}
        </h4>
        <p>
          {{
            prefs.isEn
              ? 'In a rectangular R × C matrix, visiting every cell once takes R × C operations: O(R · C), or O(n²) when R = C = n.'
              : 'في مصفوفة مستطيلة أبعادها R × C، زيارة كل الخانات تتطلب R × C خطوة أي O(R · C)، وتُكتب O(n²) عندما تكون مربعة (R = C = n).'
          }}
        </p>
      </div>
    </div>
  </section>
</template>
