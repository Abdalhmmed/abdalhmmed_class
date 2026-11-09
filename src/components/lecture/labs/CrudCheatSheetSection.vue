<script setup>
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import { crudMethodsData, mainDemoProgram } from '@/data/dsCrudData'
import CodeViewer from '@/components/lecture/layout/CodeViewer.vue'
import ComplexityPill from '@/components/lecture/layout/ComplexityPill.vue'

defineProps({
  methods: { type: Array, default: () => crudMethodsData },
  mainProgram: { type: Object, default: () => mainDemoProgram },
  mainFileName: { type: String, default: 'Main.java' },
  kicker: {
    type: Object,
    default: () => ({
      ar: 'مرجع الأكواد الأساسية (CRUD Operations)',
      en: 'Core Code Reference (CRUD Operations)'
    })
  },
  heading: {
    type: Object,
    default: () => ({
      ar: 'أكواد العمليات الأربع الرئيسية على المصفوفة (دوال جاهزة مع الشرح)',
      en: 'Ready-to-Use Java Methods for the 4 Core Array Operations'
    })
  },
  lead: {
    type: Object,
    default: () => ({
      ar: 'دليل عملي سريع يحتوي على الدوال البرمجية (Methods) النموذجية المكتوبة بلغة Java للعمليات الأربع: الإضافة، التعديل، الحذف، والبحث، مع شرح مدخلات ومخرجات كل دالة وما تفعله بالتفصيل.',
      en: 'A quick practical reference containing standard Java methods for Insertion, Update, Deletion, and Linear Search, plus a complete Main program.'
    })
  },
  mainTitle: {
    type: Object,
    default: () => ({
      ar: 'برنامج متكامل في Main يجرّب العمليات الأربع معاً:',
      en: 'Complete Main Program Combining All 4 Operations:'
    })
  }
})

const prefs = usePreferencesStore()
</script>

<template>
  <section id="crud-codes" class="card">
    <div style="font-size: 13px; color: var(--brand); font-weight: 800; letter-spacing: 0.5px">
      <i class="fa-solid fa-laptop-code" style="color: var(--primary)"></i>
      {{ kicker[prefs.lang] }}
    </div>
    <h2 style="margin-top: 6px">
      {{ heading[prefs.lang] }}
    </h2>
    <p class="lead">
      {{ lead[prefs.lang] }}
    </p>

    <!-- Method Cards -->
    <div
      v-for="method in methods"
      :key="method.id"
      class="crud-method-box"
    >
      <div class="crud-method-head">
        <h3>
          <i :class="method.icon" :style="{ color: method.iconColor }"></i>
          {{ method.title[prefs.lang] }}
        </h3>
        <ComplexityPill
          :complexity="method.complexityLabel[prefs.lang]"
          :variant="method.badgeVariant"
        />
      </div>
      <p class="crud-method-desc">
        {{ method.desc[prefs.lang] }}
      </p>
      <CodeViewer :lines="method.code[prefs.lang]" />
    </div>

    <!-- MAIN DEMO PROGRAM -->
    <div style="margin-top: 28px">
      <div class="panel-title" style="font-size: 15px; color: var(--ink)">
        <i class="fa-solid fa-star" style="color: var(--accent)"></i>
        {{ mainTitle[prefs.lang] }}
      </div>
      <CodeViewer :lines="mainProgram[prefs.lang]" :lang-label="mainFileName" />
    </div>
  </section>
</template>
