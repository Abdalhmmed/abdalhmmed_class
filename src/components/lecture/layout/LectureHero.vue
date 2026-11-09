<script setup>
import { usePreferencesStore } from '@/stores/usePreferencesStore'

defineProps({
  badge: {
    type: Object,
    default: () => ({
      ar: 'مختبر هياكل البيانات والخوارزميات (Java) · إعداد: م. عبدالحميد هلال دعبان',
      en: 'Data Structures & Algorithms Lab (Java) · Instructor: Eng. Abdulhamid Helal Daban'
    })
  },
  titleHtml: {
    type: Object,
    default: () => ({
      ar: 'المصفوفات (Arrays) في Java<br />شرح تفاعلي وتحليل كامل لكل عملية',
      en: 'Arrays in Java<br />Interactive Visual Simulation &amp; In-Depth Complexity Analysis'
    })
  },
  descHtml: {
    type: Object,
    default: () => ({
      ar: 'كل عملية تُعرض في ثلاث شرائح: <b>① الفكرة</b> بأسلوب مبسّط، ثم <b>② التنفيذ خطوة بخطوة</b> مع تظليل سطر الكود المنفَّذ وتتبع المتغيرات وعدّاد العمليات، ثم <b>③ التحليل</b>: أفضل ومتوسط وأسوأ حالة، والتعقيد الزمني والمكاني مع قياس فعلي.',
      en: 'Every operation is presented across three interactive slides: <b>① Concept &amp; Idea</b>, <b>② Step-by-Step Execution</b> with active line highlighting, variable watch, and live operation counters, and <b>③ Complexity Analysis</b> covering Best, Average, and Worst cases with real empirical benchmarks.'
    })
  },
  chips: {
    type: Array,
    default: () => [
      {
        icon: 'fa-solid fa-user-tie',
        ar: 'إعداد: م. عبدالحميد هلال دعبان',
        en: 'By: Eng. Abdulhamid Helal Daban'
      },
      {
        icon: 'fa-solid fa-microchip',
        ar: '9 عمليات برمجية',
        en: '9 Array Operations'
      },
      {
        icon: 'fa-solid fa-stopwatch',
        ar: 'عدّاد عمليات حي',
        en: 'Live Operation Counters'
      },
      {
        icon: 'fa-solid fa-chart-simple',
        ar: 'Best / Average / Worst',
        en: 'Best / Average / Worst'
      },
      {
        icon: 'fa-solid fa-graduation-cap',
        ar: '2026-2027م',
        en: '2026-2027'
      }
    ]
  }
})

const prefs = usePreferencesStore()
</script>

<template>
  <section class="card lecture-hero">
    <div style="font-size: 12.5px; color: #dbeafe; font-weight: 800; margin-bottom: 6px">
      {{ badge[prefs.lang] }}
    </div>
    <h1 v-html="titleHtml[prefs.lang]"></h1>
    <p v-html="descHtml[prefs.lang]"></p>
    <div class="chips">
      <span v-for="(chip, idx) in chips" :key="idx">
        <i :class="chip.icon"></i>
        {{ chip[prefs.lang] }}
      </span>
    </div>
  </section>
</template>
