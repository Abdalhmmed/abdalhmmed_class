<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import { OPS_2D } from '@/data/dsLecture02Data'
import { matrixMethodsData, matrixMainProgram } from '@/data/dsLecture02CrudData'
import DrawingCanvas from '@/components/lecture/layout/DrawingCanvas.vue'
import LectureTopBar from '@/components/lecture/layout/LectureTopBar.vue'
import LectureHero from '@/components/lecture/layout/LectureHero.vue'
import Lesson1MatrixIntroSection from '@/components/lecture/labs/lec02/Lesson1MatrixIntroSection.vue'
import Lesson2MatrixMemorySection from '@/components/lecture/labs/lec02/Lesson2MatrixMemorySection.vue'
import OperationHubCard from '@/components/lecture/simulation/OperationHubCard.vue'
import CrudCheatSheetSection from '@/components/lecture/labs/CrudCheatSheetSection.vue'
import SummaryTableSection from '@/components/lecture/labs/SummaryTableSection.vue'

const prefs = usePreferencesStore()
const opCardRefs = ref([])

const heroBadge = {
  ar: 'مختبر هياكل البيانات والخوارزميات (Java) · الدرس 02 · إعداد: م. عبدالحميد هلال دعبان',
  en: 'Data Structures & Algorithms Lab (Java) · Lecture 02 · Instructor: Eng. Abdulhamid Helal Daban'
}

const heroTitle = {
  ar: 'المصفوفات ثنائية الأبعاد (2D Arrays &amp; Matrices) في Java<br />محاكاة الذاكرة الشجرية والمسارات الشبكية وتحليل التعقيد',
  en: '2D Arrays &amp; Matrices in Java<br />Memory Architecture, Grid Traversals &amp; Complexity Analysis'
}

const heroDesc = {
  ar: 'رحلة تفاعلية عميقة داخل معمارية المصفوفات ثنائية الأبعاد: كيف تُخزّنها Java كـ <b>مصفوفة من المصفوفات (Array of Arrays)</b> مقارنة بـ <b>التخزين الخطي المتصل (Row-Major Order)</b>، مع محاكاة <b>9 خوارزميات شبكية</b> (الجمع، البحث، البحث السُّلَّمي في $O(R+C)$، الأقطار في $O(N)$، التدوير، القلب، والمسار الحلزوني).',
  en: 'An interactive deep dive into 2D matrix architecture: how Java stores matrices as an <b>Array of Arrays</b> on the Heap versus <b>Flat Row-Major Order</b>, complete with live simulation of <b>9 grid algorithms</b> (Row/Col Sums, 2D Search, Staircase Search in $O(R+C)$, Diagonals in $O(N)$, In-Place Transpose, Horizontal Flip, and Spiral Traversal).'
}

const heroChips = [
  {
    icon: 'fa-solid fa-user-tie',
    ar: 'إعداد: م. عبدالحميد هلال دعبان',
    en: 'By: Eng. Abdulhamid Helal Daban'
  },
  {
    icon: 'fa-solid fa-table-cells',
    ar: '9 خوارزميات شبكية 2D',
    en: '9 Matrix Algorithms'
  },
  {
    icon: 'fa-solid fa-diagram-project',
    ar: 'Jagged & Rectangular',
    en: 'Jagged & Rectangular'
  },
  {
    icon: 'fa-solid fa-bolt',
    ar: 'O(1) · O(N) · O(R+C) · O(R×C)',
    en: 'O(1) · O(N) · O(R+C) · O(R×C)'
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    ar: '2026-2027م',
    en: '2026-2027'
  }
]

const crudKicker = {
  ar: 'مرجع الأكواد القياسية للمصفوفات الثنائية (Matrix Code Reference)',
  en: 'Standard 2D Matrix Code Reference (Ready-to-Use Methods)'
}

const crudHeading = {
  ar: 'أهم 4 دوال برمجية للتعامل مع المصفوفات ثنائية الأبعاد في Java',
  en: '4 Essential Java Methods for 2D Array & Matrix Processing'
}

const crudLead = {
  ar: 'دليل برمجي جاهز يضم الدوال الأربع الأكثر استخداماً في اختبارات ومشاريع هياكل البيانات: طباعة المصفوفة ومجاميع الصفوف، البحث وإرجاع الإحداثيات {r, c}، تدوير المصفوفة المربعة في مكانها (Transpose)، وجمع القطرين بحلقة واحدة O(N).',
  en: 'A practical reference featuring the four most essential 2D matrix methods in Data Structures labs: printing row sums, searching and returning {r, c} coordinates, in-place transpose, and single-loop O(N) diagonal summation.'
}

const crudMainTitle = {
  ar: 'برنامج متكامل في MatrixMain يختبر الدوال الأربع بالترتيب:',
  en: 'Complete MatrixMain Program Testing All 4 Methods Sequentially:'
}

const summaryTakeaway = {
  ar: '<b>الخلاصة الهندسية:</b> الوصول المباشر بالإحداثيين <code>m[r][c]</code> يتم في <b>O(1)</b>، وجمع القطرين في مصفوفة مربعة يحتاج <b>O(N)</b> فقط بحلقة واحدة، والبحث في مصفوفة مرتبة يتم بذكاء عبر البحث السُّلَّمي في <b>O(R+C)</b>، بينما المسح الكامل والتدوير والقلب والمسار الحلزوني يتطلب <b>O(R×C)</b> للمرور على كافة الخلايا.',
  en: '<b>Engineering Takeaway:</b> Direct coordinate access <code>m[r][c]</code> runs in <b>O(1)</b>, summing both diagonals takes only <b>O(N)</b> via a single loop, searching a sorted matrix via Staircase Search takes <b>O(R+C)</b>, while full traversal, transpose, horizontal flip, and spiral order require <b>O(R×C)</b>.'
}

const summaryFooterSub = {
  ar: 'مختبر هياكل البيانات بلغة Java (الدرس 02: المصفوفات ثنائية الأبعاد) · العام الجامعي 2026-2027م',
  en: 'Data Structures Lab in Java (Lecture 02: 2D Arrays & Matrices) · Academic Year 2026-2027'
}

watchEffect(() => {
  document.title = prefs.isEn
    ? '2D Arrays & Matrices in Java | Interactive Simulation & Complexity - Eng. Abdulhamid Helal Daban'
    : 'المصفوفات ثنائية الأبعاد في Java | شرح تفاعلي وتحليل للتعقيد - م. عبدالحميد هلال دعبان'
})

function pillCls(c) {
  if (c === 'O(1)' || c === 'O(N)' || c === 'O(R+C)') return 'p-ok'
  if (c === 'O(R×C)' || c === 'O(N²)') return 'p-acc'
  return 'p-bad'
}

function scrollToOp(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function handleKeyDown(e) {
  const activeTag = document.activeElement?.tagName
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(activeTag) || document.activeElement?.isContentEditable) return
  const activeIdx = prefs.activeOpIndex
  const cardComp = opCardRefs.value[activeIdx]
  if (!cardComp || !cardComp.sim) return
  const sim = cardComp.sim
  if (sim.currentSlide.value !== 1) return

  const forwardKey = prefs.isEn ? 'ArrowRight' : 'ArrowLeft'
  const backwardKey = prefs.isEn ? 'ArrowLeft' : 'ArrowRight'

  if (e.key === forwardKey) {
    e.preventDefault()
    sim.stop()
    sim.next()
  } else if (e.key === backwardKey) {
    e.preventDefault()
    sim.prev()
  } else if (e.key === ' ') {
    e.preventDefault()
    sim.togglePlay()
  }
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="lecture-page theme-ds">
    <DrawingCanvas />

    <LectureTopBar pdf-url="courses/data-structures/lecture-02/print-pdf.html" />

    <div class="wrap">
      <!-- HERO -->
      <LectureHero
        :badge="heroBadge"
        :title-html="heroTitle"
        :desc-html="heroDesc"
        :chips="heroChips"
      />

      <!-- 1. 2D MATRIX CONCEPT & MEMORY ARCHITECTURE -->
      <Lesson1MatrixIntroSection />

      <!-- 2. LIFECYCLE, JAGGED ARRAYS & NESTED LOOPS -->
      <Lesson2MatrixMemorySection />

      <!-- 3. OPERATIONS INDEX -->
      <section id="ops-index" class="card">
        <h2>
          {{
            prefs.isEn
              ? '3. Interactive Operations & Algorithms on 2D Matrices'
              : '3. العمليات والخوارزميات التفاعلية على المصفوفات ثنائية الأبعاد'
          }}
        </h2>
        <p v-if="!prefs.isEn" class="lead">
          كل خوارزمية ثنائية الأبعاد معروضة في ثلاث شرائح: <b>① الفكرة والتشبيه</b> ←
          <b>② التنفيذ الحي خطوة بخطوة على الشبكة</b> ← <b>③ اشتقاق التعقيد والقياس الفعلي</b>. اختصارات لوحة المفاتيح تعمل على البطاقة النشطة:
          <b>←</b> التالي · <b>→</b> السابق · <b>مسافة</b> تشغيل/إيقاف.
        </p>
        <p v-else class="lead">
          Every 2D matrix algorithm is presented across three interactive slides:
          <b>① Concept &amp; Analogy</b> → <b>② Live Step-by-Step Grid Execution</b> → <b>③ Complexity Derivation &amp; Empirical Benchmark</b>.
          Keyboard shortcuts work on whichever operation card your mouse hovers over:
          <b>→</b> Next · <b>←</b> Previous · <b>Space</b> Play/Pause.
        </p>

        <div class="toc">
          <a
            v-for="(o, idx) in OPS_2D"
            :key="o.key"
            :href="'#op-' + o.key"
            @click.prevent="scrollToOp('op-' + o.key)"
          >
            <span class="num">3.{{ idx + 1 }}</span>
            {{ o.name[prefs.lang] }}
            <span class="pill" :class="pillCls(o.big)">{{ o.big }}</span>
          </a>
        </div>
      </section>

      <!-- 9 INTERACTIVE 2D OPERATION SECTIONS -->
      <div id="opsSections">
        <OperationHubCard
          v-for="(op, idx) in OPS_2D"
          :key="op.key"
          ref="opCardRefs"
          :op="op"
          :op-index="idx"
          :prev-op="idx > 0 ? OPS_2D[idx - 1] : null"
          :next-op="idx < OPS_2D.length - 1 ? OPS_2D[idx + 1] : null"
        />
      </div>

      <!-- MATRIX CODE REFERENCE & SUMMARY TABLE -->
      <CrudCheatSheetSection
        :methods="matrixMethodsData"
        :main-program="matrixMainProgram"
        main-file-name="MatrixMain.java"
        :kicker="crudKicker"
        :heading="crudHeading"
        :lead="crudLead"
        :main-title="crudMainTitle"
      />

      <SummaryTableSection
        :ops="OPS_2D"
        :takeaway-html="summaryTakeaway"
        :footer-sub="summaryFooterSub"
      />
    </div>
  </div>
</template>
