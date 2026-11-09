<script setup>
import { ref, computed } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'

const prefs = usePreferencesStore()
const nVal = ref(10)

const logVal = computed(() => Math.max(1, Math.ceil(Math.log2(nVal.value))))
const n2Val = computed(() => nVal.value * nVal.value)

const barOlogWidth = computed(() => Math.min(100, (logVal.value / 6) * 100) + '%')
const barOnWidth = computed(() => Math.min(100, (nVal.value / 40) * 100) + '%')
const barOn2Width = computed(() => Math.min(100, (n2Val.value / 1600) * 100) + '%')

// SVG Cartesian Plot Coordinates
const cx = computed(() => 70 + (nVal.value / 40) * 540)
const cyO1 = 289
const cyOlog = computed(() => 290 - (logVal.value / 6) * 15)
const cyOn = computed(() => 290 - (nVal.value / 40) * 65)
const cyOn2 = computed(() => Math.max(25, 290 - (n2Val.value / 1600) * 260))
</script>

<template>
  <section id="complexity" class="card">
    <h2>
      {{
        prefs.isEn
          ? 'Lesson 1: What is Big-O Notation & How Do We Measure Code Efficiency?'
          : 'الدرس 1: ما هو رمز Big-O وكيف نقيس كفاءة الكود؟'
      }}
    </h2>

    <div
      class="mini"
      style="border-inline-start: 5px solid var(--brand); background: var(--brand-soft); margin-bottom: 18px; padding: 16px 20px"
    >
      <h3 style="margin: 0 0 8px; color: var(--brand); font-size: 19px">
        <i class="fa-solid fa-lightbulb" style="color: var(--accent)"></i>
        {{ prefs.isEn ? 'What does Big-O stand for?' : 'ما هو وما هو اختصار له؟' }}
      </h3>
      <p v-if="!prefs.isEn" style="margin: 0; font-size: 15px; line-height: 1.8">
        الحرف <b>O</b> يرمز لكلمة <b>"Order of Growth"</b> (رتبة أو معدل النمو)، ويُعرف بـ
        <b>Big-O Notation</b>.<br />
        هو مقياس رياضي عالمي يجيب عن السؤال:
        <br />
        <span style="font-size: 16px; font-weight: 800; color: var(--ink)">
          «إذا كبُرت البيانات وزادت في البرنامج (n)، فبأي وتيرة وسرعة سيزداد عدد الخطوات التي يحتاجها الحاسوب لتنفيذ الكود؟»
        </span>
      </p>
      <p v-else style="margin: 0; font-size: 15px; line-height: 1.8">
        The letter <b>O</b> stands for <b>"Order of Growth"</b>, universally known as
        <b>Big-O Notation</b>.<br />
        It is a mathematical metric that answers a fundamental question:
        <br />
        <span style="font-size: 16px; font-weight: 800; color: var(--ink)">
          “As the input size (n) grows larger, at what rate will the number of operations required by the CPU increase?”
        </span>
      </p>
    </div>

    <div class="grid g3">
      <div class="mini" style="border-top: 4px solid var(--bad)">
        <h4>
          <i class="fa-solid fa-circle-xmark" style="color: var(--bad)"></i>
          {{ prefs.isEn ? 'Why not measure in seconds?' : 'لماذا لا نقيس الكفاءة بالثواني؟' }}
        </h4>
        <p>
          {{
            prefs.isEn
              ? 'Wall-clock seconds depend on CPU speed, OS, and hardware load. The same code may take 0.1s on a supercomputer and 4s on an old phone.'
              : 'لأن الثواني خادعة وتعتمد على قوة المعالج، نوع نظام التشغيل وسرعة الجهاز. نفس الكود قد يستغرق 0.1 ثانية على حاسوب حديث و 4 ثوانٍ على هاتف قديم.'
          }}
        </p>
      </div>
      <div class="mini" style="border-top: 4px solid var(--ok)">
        <h4>
          <i class="fa-solid fa-circle-check" style="color: var(--ok)"></i>
          {{ prefs.isEn ? 'Why use Big-O Notation?' : 'لماذا نستخدم رمز Big-O؟' }}
        </h4>
        <p>
          {{
            prefs.isEn
              ? 'Because it counts hardware-independent logical steps, giving us a fair, universal, and reliable benchmark of algorithmic efficiency.'
              : 'لأنه يقيس الخطوات والعمليات المنطقية المستقلة عن العتاد، ويعطينا حكماً ثابتاً وعادلاً وموثوقاً على كفاءة الخوارزمية.'
          }}
        </p>
      </div>
      <div class="mini" style="border-top: 4px solid var(--accent)">
        <h4>
          <i class="fa-solid fa-magnifying-glass" style="color: var(--primary)"></i>
          {{ prefs.isEn ? 'What does (n) mean?' : 'ماذا يعني الحرف (n)؟' }}
        </h4>
        <p>
          {{
            prefs.isEn
              ? 'n represents the input size (Number of elements). If an array holds 5 elements then n = 5; if it holds 1000 elements then n = 1000.'
              : 'n يمثل حجم المدخلات (Number of elements). في المصفوفات: إذا كانت المصفوفة تحتوي على 5 عناصر فإن n = 5، وإذا احتوت على 1000 عنصر فإن n = 1000.'
          }}
        </p>
      </div>
    </div>

    <!-- Interactive Big-O Visual Curve & Graph (XY Plot) -->
    <div class="builder" style="margin: 20px 0; background: var(--bg)">
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
        <h3 style="margin: 0; color: var(--brand)">
          <i class="fa-solid fa-chart-line" style="color: var(--primary)"></i>
          {{
            prefs.isEn
              ? 'Cartesian Plot (X & Y): How Operations Grow as Input Size n Increases'
              : 'رسم بياني ديكارتي (X و Y): كيف تنمو العمليات مع زيادة حجم البيانات n؟'
          }}
        </h3>
        <span class="pill p-brand">
          {{ prefs.isEn ? 'Interactive X & Y Axes' : 'محاور X و Y تفاعلية' }}
        </span>
      </div>
      <p style="font-size: 14px; color: var(--muted); margin-top: 0">
        {{
          prefs.isEn
            ? 'The horizontal axis (X) represents input size n, and the vertical axis (Y) represents required operations. Drag the slider to see how each complexity curve accelerates:'
            : 'المحور الأفقي (X) يمثل حجم البيانات n، والمحور الرأسي (Y) يمثل عدد العمليات المطلوبة. حرّك المؤشر لمشاهدة حركة النقطة على كل منحنى ومقارنة تسارع النمو:'
        }}
      </p>

      <div class="inputs" style="background: var(--paper); padding: 12px 18px">
        <label style="font-weight: 800; font-size: 15px">
          {{ prefs.isEn ? 'Input Size (X = n) =' : 'حجم البيانات (X = n) =' }}
          <b class="mono" style="color: var(--brand); font-size: 18px; margin: 0 4px">{{ nVal }}</b>
          {{ prefs.isEn ? 'elements' : 'عنصر' }}
        </label>
        <input
          v-model.number="nVal"
          type="range"
          min="1"
          max="40"
          style="width: 240px; accent-color: var(--brand); direction: ltr"
        />
      </div>

      <!-- Real SVG Cartesian Coordinate Plot (X & Y) -->
      <div
        style="
          background: var(--paper);
          border: 1.5px solid var(--line);
          border-radius: 14px;
          padding: 16px;
          margin-top: 14px;
          direction: ltr;
        "
      >
        <div style="display: flex; justify-content: center">
          <svg
            viewBox="0 0 650 360"
            style="width: 100%; max-width: 680px; height: auto; font-family: 'Fira Code', Consolas, sans-serif"
          >
            <defs>
              <pattern id="gridPattern" width="40" height="30" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 30"
                  fill="none"
                  stroke="var(--line)"
                  stroke-width="0.7"
                  opacity="0.6"
                />
              </pattern>
            </defs>
            <rect x="70" y="20" width="540" height="270" fill="url(#gridPattern)" />

            <!-- Y Axis -->
            <line x1="70" y1="20" x2="70" y2="290" stroke="var(--ink)" stroke-width="2.5" />
            <polygon points="66,20 74,20 70,10" fill="var(--ink)" />
            <text x="65" y="15" fill="var(--ink)" font-size="12" font-weight="bold" text-anchor="end">
              Y (Operations)
            </text>

            <!-- Y Axis Ticks -->
            <text x="60" y="293" fill="var(--muted)" font-size="10" text-anchor="end">0</text>
            <text x="60" y="228" fill="var(--muted)" font-size="10" text-anchor="end">100</text>
            <text x="60" y="163" fill="var(--muted)" font-size="10" text-anchor="end">400</text>
            <text x="60" y="98" fill="var(--muted)" font-size="10" text-anchor="end">900</text>
            <text x="60" y="33" fill="var(--muted)" font-size="10" text-anchor="end">1600</text>

            <!-- X Axis -->
            <line x1="70" y1="290" x2="615" y2="290" stroke="var(--ink)" stroke-width="2.5" />
            <polygon points="615,286 615,294 625,290" fill="var(--ink)" />
            <text x="625" y="315" fill="var(--ink)" font-size="12" font-weight="bold" text-anchor="end">
              X (Input Size n)
            </text>

            <!-- X Axis Ticks -->
            <text x="70" y="308" fill="var(--muted)" font-size="11" text-anchor="middle">0</text>
            <text x="205" y="308" fill="var(--muted)" font-size="11" text-anchor="middle">10</text>
            <text x="340" y="308" fill="var(--muted)" font-size="11" text-anchor="middle">20</text>
            <text x="475" y="308" fill="var(--muted)" font-size="11" text-anchor="middle">30</text>
            <text x="610" y="308" fill="var(--muted)" font-size="11" text-anchor="middle">40</text>

            <!-- Curve 1: O(1) -->
            <line x1="70" y1="288.5" x2="610" y2="288.5" stroke="var(--ok)" stroke-width="3" stroke-linecap="round" />
            <text x="615" y="285" fill="var(--ok)" font-size="11" font-weight="bold">O(1)</text>

            <!-- Curve 2: O(log n) -->
            <path
              d="M 70 290 Q 150 285, 230 282 T 400 279 T 610 277"
              fill="none"
              stroke="var(--brand)"
              stroke-width="3"
              stroke-linecap="round"
            />
            <text x="615" y="274" fill="var(--brand)" font-size="11" font-weight="bold">O(log n)</text>

            <!-- Curve 3: O(n) -->
            <line x1="70" y1="290" x2="610" y2="225" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" />
            <text x="615" y="220" fill="#d97706" font-size="11" font-weight="bold">O(n)</text>

            <!-- Curve 4: O(n^2) -->
            <path
              d="M 70 290 Q 300 285, 450 200 T 610 30"
              fill="none"
              stroke="var(--bad)"
              stroke-width="3.5"
              stroke-linecap="round"
            />
            <text x="595" y="25" fill="var(--bad)" font-size="11" font-weight="bold">O(n²)</text>

            <!-- Dynamic Guide Line for Current X (n) -->
            <line
              :x1="cx"
              y1="20"
              :x2="cx"
              y2="290"
              stroke="var(--ink)"
              stroke-width="1.8"
              stroke-dasharray="4,4"
              opacity="0.75"
            />

            <!-- Dynamic Current Position Dots -->
            <circle :cx="cx" :cy="cyO1" r="5.5" fill="var(--ok)" stroke="#fff" stroke-width="1.5" />
            <circle :cx="cx" :cy="cyOlog" r="5.5" fill="var(--brand)" stroke="#fff" stroke-width="1.5" />
            <circle :cx="cx" :cy="cyOn" r="5.5" fill="var(--accent)" stroke="#fff" stroke-width="1.5" />
            <circle :cx="cx" :cy="cyOn2" r="6" fill="var(--bad)" stroke="#fff" stroke-width="1.5" />
          </svg>
        </div>

        <!-- Legend -->
        <div
          style="
            display: flex;
            justify-content: center;
            gap: 18px;
            margin-top: 10px;
            flex-wrap: wrap;
            font-size: 12.5px;
            font-weight: 700;
          "
        >
          <span style="color: var(--ok)">● O(1) {{ prefs.isEn ? 'Constant' : 'ثابت' }}</span>
          <span style="color: var(--brand)">● O(log n) {{ prefs.isEn ? 'Logarithmic' : 'لوغاريتمي' }}</span>
          <span style="color: #d97706">● O(n) {{ prefs.isEn ? 'Linear' : 'خطي' }}</span>
          <span style="color: var(--bad)">● O(n²) {{ prefs.isEn ? 'Quadratic' : 'تربيعي' }}</span>
        </div>
      </div>

      <!-- Curves Bars Comparison Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; margin-top: 14px">
        <div style="background: var(--paper); border: 1.5px solid var(--line); border-radius: 12px; padding: 14px">
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span class="pill p-ok">O(1) · {{ prefs.isEn ? 'Constant' : 'ثابت' }}</span>
            <span class="mono" style="font-weight: 900; font-size: 18px">1</span>
          </div>
          <small style="color: var(--muted); display: block; margin: 6px 0">
            {{ prefs.isEn ? 'Y = 1 always regardless of X' : 'Y = 1 دائماً مهما زاد X' }}
          </small>
          <div style="height: 10px; background: var(--line); border-radius: 6px; overflow: hidden">
            <div style="height: 100%; width: 3%; background: var(--ok)"></div>
          </div>
        </div>

        <div style="background: var(--paper); border: 1.5px solid var(--line); border-radius: 12px; padding: 14px">
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span class="pill p-brand">O(log n) · {{ prefs.isEn ? 'Log' : 'لوغاريتمي' }}</span>
            <span class="mono" style="font-weight: 900; font-size: 18px">{{ logVal }}</span>
          </div>
          <small style="color: var(--muted); display: block; margin: 6px 0">
            {{ prefs.isEn ? 'Y = ⌈log₂ X⌉ very slow growth' : 'Y = ⌈log₂ X⌉ نمو بطيء جداً' }}
          </small>
          <div style="height: 10px; background: var(--line); border-radius: 6px; overflow: hidden">
            <div :style="{ height: '100%', width: barOlogWidth, background: 'var(--brand)', transition: 'width .3s' }"></div>
          </div>
        </div>

        <div style="background: var(--paper); border: 1.5px solid var(--line); border-radius: 12px; padding: 14px">
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span class="pill p-acc">O(n) · {{ prefs.isEn ? 'Linear' : 'خطي' }}</span>
            <span class="mono" style="font-weight: 900; font-size: 18px">{{ nVal }}</span>
          </div>
          <small style="color: var(--muted); display: block; margin: 6px 0">
            {{ prefs.isEn ? 'Y = X proportional line' : 'Y = X خط مستقيم متناسب' }}
          </small>
          <div style="height: 10px; background: var(--line); border-radius: 6px; overflow: hidden">
            <div :style="{ height: '100%', width: barOnWidth, background: 'var(--accent)', transition: 'width .3s' }"></div>
          </div>
        </div>

        <div style="background: var(--paper); border: 1.5px solid var(--line); border-radius: 12px; padding: 14px">
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span class="pill p-bad">O(n²) · {{ prefs.isEn ? 'Quadratic' : 'تربيعي' }}</span>
            <span class="mono" style="font-weight: 900; font-size: 18px">{{ n2Val }}</span>
          </div>
          <small style="color: var(--muted); display: block; margin: 6px 0">
            {{ prefs.isEn ? 'Y = X² steep upward curve' : 'Y = X² منحنى يصعد كالسهم' }}
          </small>
          <div style="height: 10px; background: var(--line); border-radius: 6px; overflow: hidden">
            <div :style="{ height: '100%', width: barOn2Width, background: 'var(--bad)', transition: 'width .3s' }"></div>
          </div>
        </div>
      </div>

      <div class="msg" style="margin-top: 14px; min-height: auto; font-size: 14px">
        <template v-if="!prefs.isEn">
          عند X = {{ nVal }} ➔
          <span style="color: var(--ok)">O(1)</span> Y = 1 |
          <span style="color: var(--brand)">O(log n)</span> Y ≈ {{ logVal }} |
          <span style="color: #d97706">O(n)</span> Y = {{ nVal }} |
          <span style="color: var(--bad)">O(n²)</span> Y = {{ n2Val }} (قفزة هائلة في المحور الرأسي Y)!
        </template>
        <template v-else>
          At X = {{ nVal }} ➔
          <span style="color: var(--ok)">O(1)</span> Y = 1 |
          <span style="color: var(--brand)">O(log n)</span> Y ≈ {{ logVal }} |
          <span style="color: #d97706">O(n)</span> Y = {{ nVal }} |
          <span style="color: var(--bad)">O(n²)</span> Y = {{ n2Val }} (steep vertical jump on Y-axis)!
        </template>
      </div>
    </div>

    <h3>
      {{
        prefs.isEn
          ? 'What Exactly Do We Count Inside Code? (The Live Simulation Counters)'
          : 'ماذا نعدّ بالضبط داخل الكود؟ (العدّادات التي ستراها في المحاكاة)'
      }}
    </h3>
    <div class="grid g4">
      <div class="mini">
        <h4>
          <i class="fa-solid fa-code-compare" style="color: var(--primary)"></i>
          {{ prefs.isEn ? 'Comparisons' : 'مقارنة (Comparisons)' }}
        </h4>
        <p>
          {{
            prefs.isEn
              ? 'Every condition evaluated by the CPU: i < n or arr[i] == target or arr[j] > arr[j+1].'
              : 'كل شرط يُفحص في المعالج: i < n أو arr[i] == target أو arr[j] > arr[j+1].'
          }}
        </p>
      </div>
      <div class="mini">
        <h4>
          <i class="fa-solid fa-book-open" style="color: var(--primary)"></i>
          {{ prefs.isEn ? 'Reads' : 'قراءة (Reads)' }}
        </h4>
        <p>
          {{
            prefs.isEn
              ? 'Every access to read an element value from an array slot in memory: arr[i].'
              : 'كل وصول لقيمة عنصر من خانات المصفوفة في الذاكرة: arr[i].'
          }}
        </p>
      </div>
      <div class="mini">
        <h4>
          <i class="fa-solid fa-pen-to-square" style="color: var(--accent)"></i>
          {{ prefs.isEn ? 'Writes' : 'كتابة (Writes)' }}
        </h4>
        <p>
          {{
            prefs.isEn
              ? 'Every assignment storing a value into an array cell or variable: arr[i] = x or sum += …'
              : 'كل إسناد وتخزين قيمة في خانة أو متغير: arr[i] = x أو sum += ….'
          }}
        </p>
      </div>
      <div class="mini">
        <h4>
          <i class="fa-solid fa-calculator"></i>
          {{ prefs.isEn ? 'Total Operations' : 'المجموع الفعلي' }}
        </h4>
        <p>
          {{
            prefs.isEn
              ? 'The sum of all three counters, from which we derive the growth formula T(n) and simplify to Big-O.'
              : 'مجموع العمليات الثلاث معاً، ومنه نستخرج معادلة النمو ونختصرها إلى Big-O.'
          }}
        </p>
      </div>
    </div>

    <h3>
      {{
        prefs.isEn
          ? 'The Three Evaluation Cases (Why a Single Number Is Not Enough)'
          : 'الحالات الثلاث في تقييم الخوارزمية (لماذا لا يكفي رقم واحد؟)'
      }}
    </h3>
    <table>
      <thead>
        <tr>
          <th>{{ prefs.isEn ? 'Case' : 'الحالة' }}</th>
          <th>{{ prefs.isEn ? 'Scientific Meaning' : 'المعنى العلمي' }}</th>
          <th>{{ prefs.isEn ? 'Linear Search Example' : 'مثال من البحث الخطي' }}</th>
          <th>{{ prefs.isEn ? 'Importance' : 'الأهمية' }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span class="pill p-ok">{{ prefs.isEn ? 'Best Case' : 'أفضل حالة Best Case' }}</span>
          </td>
          <td>
            {{
              prefs.isEn
                ? 'Favorable input requiring the minimum possible operations.'
                : 'أسهل سيناريو مدخلات ممكن، وأقل عدد عمليات ينفذه الكود.'
            }}
          </td>
          <td>
            {{
              prefs.isEn
                ? 'Target element is found right at the first cell arr[0].'
                : 'العنصر المطلوب يقع في أول خانة arr[0] مباشرة.'
            }}
          </td>
          <td>{{ prefs.isEn ? 'Shows peak possible speed.' : 'توضح أقصى كفاءة ممكنة.' }}</td>
        </tr>
        <tr>
          <td>
            <span class="pill p-acc">{{ prefs.isEn ? 'Average Case' : 'الحالة المتوسطة Average' }}</span>
          </td>
          <td>
            {{
              prefs.isEn
                ? 'Expected operations on typical random inputs.'
                : 'العدد المتوقع للعمليات عند تشغيل البرنامج على مدخلات عشوائية طبيعية.'
            }}
          </td>
          <td>
            {{
              prefs.isEn
                ? 'Target element is near the middle of the array (n/2).'
                : 'العنصر المطلوب في منتصف المصفوفة تقريباً (n/2).'
            }}
          </td>
          <td>{{ prefs.isEn ? 'Reflects everyday real-world behavior.' : 'تعكس الأداء اليومي الواقعي.' }}</td>
        </tr>
        <tr>
          <td>
            <span class="pill p-bad">{{ prefs.isEn ? 'Worst Case' : 'أسوأ حالة Worst Case' }}</span>
          </td>
          <td>
            {{
              prefs.isEn
                ? 'Hardest input scenario giving the strict upper bound of operations.'
                : 'أصعب سيناريو مدخلات ممكن، وأقصى حد أعلى للعمليات (Upper Bound).'
            }}
          </td>
          <td>
            {{
              prefs.isEn
                ? 'Target is at the very last cell or not present at all.'
                : 'العنصر المطلوب في آخر خانة أو غير موجود في المصفوفة إطلاقاً.'
            }}
          </td>
          <td>
            <b>{{ prefs.isEn ? 'Most critical for system guarantees.' : 'الأهم في الحسابات لضمان أمان النظام.' }}</b>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="note">
      <template v-if="!prefs.isEn">
        <b>قاعدة الاختصار الذهبية في Big-O:</b>
        نهمل الثوابت والمعاملات والحدود الصغيرة ونركز فقط على <b>العنصر المسيطر الأسرع نمواً</b>.<br />
        مثال: إذا كان المجموع الدقيق لعمليات حلقة هو <code>3n + 5</code>، فإننا نحذف الرقم 5 ومعامل الضرب 3، ونقول أن التعقيد هو
        <b>O(n)</b>. وإذا كان <code>½n² + 3n</code> نكتفي بـ <b>O(n²)</b>.
      </template>
      <template v-else>
        <b>Golden Simplification Rule in Big-O:</b>
        Drop constants, multipliers, and lower-order terms—keep only the <b>fastest-growing dominant term</b>.<br />
        Example: If exact loop operations equal <code>3n + 5</code>, drop 5 and coefficient 3 to get <b>O(n)</b>. For
        <code>½n² + 3n</code>, we simplify to <b>O(n²)</b>.
      </template>
    </div>
  </section>
</template>
