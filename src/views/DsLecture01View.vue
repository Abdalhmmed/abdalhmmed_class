<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import { OPS } from '@/data/dsLecture01Data'
import DrawingCanvas from '@/components/lecture/layout/DrawingCanvas.vue'
import LectureTopBar from '@/components/lecture/layout/LectureTopBar.vue'
import LectureHero from '@/components/lecture/layout/LectureHero.vue'
import Lesson1BigOSection from '@/components/lecture/labs/Lesson1BigOSection.vue'
import Lesson2MemorySection from '@/components/lecture/labs/Lesson2MemorySection.vue'
import OperationHubCard from '@/components/lecture/simulation/OperationHubCard.vue'
import CrudCheatSheetSection from '@/components/lecture/labs/CrudCheatSheetSection.vue'
import SummaryTableSection from '@/components/lecture/labs/SummaryTableSection.vue'

const prefs = usePreferencesStore()
const opCardRefs = ref([])

watchEffect(() => {
  document.title = prefs.isEn
    ? 'Arrays in Java | Interactive Simulation & Complexity - Eng. Abdulhamid Helal Daban'
    : 'المصفوفات في Java | شرح تفاعلي وتحليل كامل للتعقيد - م. عبدالحميد هلال دعبان'
})

function pillCls(c) {
  return c === 'O(1)' ? 'p-ok' : c === 'O(n)' ? 'p-acc' : 'p-bad'
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

    <LectureTopBar pdf-url="courses/data-structures/lecture-01/print-pdf.html" />

    <div class="wrap">
      <!-- HERO -->
      <LectureHero />

      <!-- 1. BIG-O & COMPLEXITY -->
      <Lesson1BigOSection />

      <!-- 2. ARRAY ARCHITECTURE & MEMORY -->
      <Lesson2MemorySection />

      <!-- 3. OPERATIONS INDEX -->
      <section id="ops-index" class="card">
        <h2>
          {{
            prefs.isEn
              ? '3. Operations on Arrays'
              : '3. العمليات على المصفوفة'
          }}
        </h2>
        <p v-if="!prefs.isEn" class="lead">
          كل عملية في قسم مستقل خاص بها، ولكل قسم ثلاث شرائح: <b>① الفكرة</b> ←
          <b>② التنفيذ خطوة بخطوة</b> ← <b>③ التحليل والتعقيد</b>. اختصارات لوحة المفاتيح تعمل على القسم الذي يقف عليه مؤشر الفأرة:
          <b>←</b> التالي · <b>→</b> السابق · <b>مسافة</b> تشغيل/إيقاف.
        </p>
        <p v-else class="lead">
          Each operation resides in its own dedicated module with three slides:
          <b>① Concept &amp; Idea</b> → <b>② Step-by-Step Execution</b> → <b>③ Complexity Analysis</b>.
          Keyboard shortcuts work on whichever operation card your mouse hovers over:
          <b>→</b> Next · <b>←</b> Previous · <b>Space</b> Play/Pause.
        </p>

        <div class="toc">
          <a
            v-for="(o, idx) in OPS"
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

      <!-- 9 INTERACTIVE OPERATION SECTIONS -->
      <div id="opsSections">
        <OperationHubCard
          v-for="(op, idx) in OPS"
          :key="op.key"
          ref="opCardRefs"
          :op="op"
          :op-index="idx"
          :prev-op="idx > 0 ? OPS[idx - 1] : null"
          :next-op="idx < OPS.length - 1 ? OPS[idx + 1] : null"
        />
      </div>

      <!-- CRUD CHEAT SHEET & SUMMARY TABLE -->
      <CrudCheatSheetSection />
      <SummaryTableSection />
    </div>
  </div>
</template>
