
<template>
  <div class="lecture-page theme-cyber">
    <!-- Interactive Drawing Canvas -->
    <DrawingCanvas />

    <!-- Topbar Navigation -->
    <LectureTopBar
      pdf-url="courses/cybersecurity/lecture-01/print-pdf.html"
      author-name-ar="م. عبدالحميد هلال دعبان"
      author-name-en="Eng. Abdulhamid Helal Daban"
    />

    <div class="wrap" :class="{ 'big-view': prefs.isBigMode }">
      <!-- HERO SECTION -->
      <section class="card lecture-hero hero">
        <div class="sub-lead">
          {{ isEn ? CYBER_META.courseTitleEn : CYBER_META.courseTitle }} · {{ isEn ? CYBER_META.authorEn : CYBER_META.author }}
        </div>
        <h1>{{ isEn ? CYBER_META.heroH1En : CYBER_META.heroH1 }}</h1>
        <p>{{ isEn ? CYBER_META.heroPEn : CYBER_META.heroP }}</p>
        <div class="chips">
          <span><i class="fa-solid fa-shield-halved"></i> {{ isEn ? 'Cybersecurity' : 'مادة الأمن السيبراني' }}</span>
          <span><i class="fa-solid fa-user-graduate"></i> {{ isEn ? '3rd Year Computer Science' : 'سنة ثالثة علوم حاسوب' }}</span>
          <span><i class="fa-solid fa-key"></i> {{ isEn ? '7 Crypto Simulations' : '7 خوارزميات محاكاة' }}</span>
          <span><i class="fa-solid fa-microchip"></i> Bitwise &amp; Modular Math</span>
          <span><i class="fa-solid fa-certificate"></i> {{ CYBER_META.year }}</span>
        </div>
      </section>

      <!-- 1. SECURITY PRINCIPLES & MATH FOUNDATIONS -->
      <section class="card" id="crypto-foundations">
        <h2>{{ isEn ? '1. Foundational Cybersecurity Principles & Discrete Cryptographic Math' : '1. المبادئ التأسيسية للأمن السيبراني والرياضيات المتقطعة للتشفير' }}</h2>
        
        <div class="kerckhoffs-card">
          <h3 class="kerckhoffs-title">
            <i class="fa-solid fa-unlock-keyhole"></i>
            <span>{{ isEn ? CYBER_FOUNDATIONS.kerckhoffs.titleEn : CYBER_FOUNDATIONS.kerckhoffs.title }}</span>
          </h3>
          <p class="kerckhoffs-quote">
            <b>{{ isEn ? CYBER_FOUNDATIONS.kerckhoffs.quoteEn : CYBER_FOUNDATIONS.kerckhoffs.quote }}</b>
          </p>
          <p class="kerckhoffs-desc">
            {{ isEn ? CYBER_FOUNDATIONS.kerckhoffs.descEn : CYBER_FOUNDATIONS.kerckhoffs.desc }}
          </p>
        </div>

        <div class="grid g3">
          <div
            v-for="(item, idx) in CYBER_FOUNDATIONS.triad"
            :key="idx"
            class="mini-card"
            :style="{ borderTop: '4px solid ' + item.color }"
          >
            <h4>
              <i :class="'fa-solid ' + item.icon" :style="{ color: item.color }"></i>
              <span>{{ isEn ? item.titleEn : item.title }}</span>
            </h4>
            <p>{{ isEn ? item.descEn : item.desc }}</p>
          </div>
        </div>

        <!-- Interactive Keyspace Explorer Component -->
        <KeyspaceExplorer :is-en="isEn" />
      </section>

      <!-- 2. OPERATIONS INDEX (CURRICULUM ROADMAP) -->
      <section class="card ops-curriculum-card" id="ops-index">
        <div class="curriculum-header">
          <div class="curriculum-title-wrap">
            <span class="academic-badge-tag">
              <i class="fa-solid fa-layer-group"></i>
              <span>{{ isEn ? 'Laboratory Curriculum Roadmap' : 'خارطة المسار المعملي الشامل' }}</span>
            </span>
            <h2>{{ isEn ? '2. Seven Core Cryptographic Algorithms in Detail' : '2. خوارزميات التشفير السبع المشروحة بالتفصيل' }}</h2>
            <p class="lead">
              {{ isEn
                ? 'Each algorithm is decoupled into 3 pedagogical slides: 1. Mathematical Foundation → 2. Visual Execution & Tracing → 3. Security Analysis:'
                : 'تم تفكيك كل خوارزمية بيداغوجياً إلى ثلاث شرائح: ① الفكرة والتأصيل الرياضي ← ② التنفيذ البصري وتتبع الحالات الحية ← ③ التحليل الأمني ومقاومة الهجمات.'
              }}
            </p>
          </div>

          <div class="curriculum-toolbar">
            <div class="curriculum-stats">
              <span class="stat-pill">
                <i class="fa-solid fa-cube"></i>
                <b>7</b> {{ isEn ? 'Algorithms' : 'خوارزميات' }}
              </span>
              <span class="stat-pill">
                <i class="fa-solid fa-chart-line"></i>
                <b>21</b> {{ isEn ? 'Slides' : 'شريحة' }}
              </span>
            </div>

            <div class="view-switch" role="group" :aria-label="isEn ? 'View Mode' : 'نمط العرض'">
              <button
                type="button"
                class="view-btn"
                :class="{ active: viewMode === 'list' }"
                :title="isEn ? 'Structured Track View' : 'عرض المسار المتكامل'"
                @click="viewMode = 'list'"
              >
                <i class="fa-solid fa-bars-staggered"></i>
                <span>{{ isEn ? 'Track List' : 'مسار متكامل' }}</span>
              </button>
              <button
                type="button"
                class="view-btn"
                :class="{ active: viewMode === 'grid' }"
                :title="isEn ? 'Balanced Grid View' : 'عرض الشبكة المتوازنة'"
                @click="viewMode = 'grid'"
              >
                <i class="fa-solid fa-table-cells-large"></i>
                <span>{{ isEn ? 'Card Grid' : 'شبكة بطاقات' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- TRACK LIST VIEW (Default, 100% Uniform & Consistent) -->
        <div v-if="viewMode === 'list'" class="cyber-roadmap-list">
          <a
            v-for="(op, idx) in CYBER_OPS"
            :key="op.key"
            :href="'#op-' + op.key"
            class="roadmap-row"
            :style="{ '--accent': CYBER_OPS_NAV[op.key]?.color || 'var(--brand)' }"
            @click.prevent="scrollToOp('op-' + op.key)"
          >
            <!-- Left / Start: Index + Distinct Icon -->
            <div class="roadmap-lead">
              <span class="roadmap-num">2.{{ idx + 1 }}</span>
              <div class="roadmap-icon-wrap" :style="{ backgroundColor: CYBER_OPS_NAV[op.key]?.colorBg }">
                <i :class="CYBER_OPS_NAV[op.key]?.icon" :style="{ color: CYBER_OPS_NAV[op.key]?.color }"></i>
              </div>
            </div>

            <!-- Middle: Title, Secondary Name, and Math Formulation -->
            <div class="roadmap-info">
              <div class="roadmap-title-row">
                <span class="roadmap-title">{{ isEn ? op.name.en : op.name.ar }}</span>
                <span class="roadmap-alt-title">{{ isEn ? op.name.ar : op.name.en }}</span>
              </div>
              <div class="roadmap-math-row">
                <i class="fa-solid fa-square-root-variable"></i>
                <code class="roadmap-formula">{{ isEn ? CYBER_OPS_NAV[op.key]?.mathEn : CYBER_OPS_NAV[op.key]?.mathAr }}</code>
              </div>
            </div>

            <!-- Right / End: Badge + Complexity + Interactive Launch -->
            <div class="roadmap-trailing">
              <span class="roadmap-category-pill" :style="{ color: CYBER_OPS_NAV[op.key]?.color, borderColor: CYBER_OPS_NAV[op.key]?.color }">
                {{ isEn ? (CYBER_OPS_NAV[op.key]?.badgeEn || op.badge) : (CYBER_OPS_NAV[op.key]?.badgeAr || op.badge) }}
              </span>
              <span class="roadmap-complexity-pill">{{ op.big }}</span>
              <div class="roadmap-launch-btn">
                <span>{{ isEn ? 'Launch Lab' : 'فتح المعمل' }}</span>
                <i :class="isEn ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'"></i>
              </div>
            </div>
          </a>
        </div>

        <!-- BALANCED CARD GRID VIEW -->
        <div v-else class="cyber-roadmap-grid">
          <a
            v-for="(op, idx) in CYBER_OPS"
            :key="op.key"
            :href="'#op-' + op.key"
            class="roadmap-grid-card"
            :class="{ 'capstone-card': idx === 6 }"
            :style="{ '--accent': CYBER_OPS_NAV[op.key]?.color || 'var(--brand)' }"
            @click.prevent="scrollToOp('op-' + op.key)"
          >
            <div class="card-header">
              <span class="roadmap-num">2.{{ idx + 1 }}</span>
              <span class="roadmap-category-pill" :style="{ color: CYBER_OPS_NAV[op.key]?.color, borderColor: CYBER_OPS_NAV[op.key]?.color }">
                {{ isEn ? (CYBER_OPS_NAV[op.key]?.badgeEn || op.badge) : (CYBER_OPS_NAV[op.key]?.badgeAr || op.badge) }}
              </span>
            </div>

            <div class="card-body">
              <div class="card-icon-wrap" :style="{ backgroundColor: CYBER_OPS_NAV[op.key]?.colorBg }">
                <i :class="CYBER_OPS_NAV[op.key]?.icon" :style="{ color: CYBER_OPS_NAV[op.key]?.color }"></i>
              </div>
              <div class="card-text">
                <h4 class="card-title">{{ isEn ? op.name.en : op.name.ar }}</h4>
                <p class="card-alt-title">{{ isEn ? op.name.ar : op.name.en }}</p>
              </div>
            </div>

            <div class="card-math">
              <i class="fa-solid fa-square-root-variable"></i>
              <code class="roadmap-formula">{{ isEn ? CYBER_OPS_NAV[op.key]?.mathEn : CYBER_OPS_NAV[op.key]?.mathAr }}</code>
            </div>

            <div class="card-footer">
              <span class="roadmap-complexity-pill">{{ op.big }}</span>
              <span class="card-action">
                <span>{{ isEn ? 'Open Lab' : 'بدء المحاكاة' }}</span>
                <i :class="isEn ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'"></i>
              </span>
            </div>
          </a>
        </div>
      </section>

      <!-- 3. SEVEN DYNAMIC INTERACTIVE CRYPTO MODULES -->
      <div id="opsSections">
        <CryptoOperationHubCard
          v-for="(op, idx) in CYBER_OPS"
          :key="op.key"
          ref="opCardRefs"
          :op="op"
          :op-index="idx"
          :prev-op="idx > 0 ? CYBER_OPS[idx - 1] : null"
          :next-op="idx < CYBER_OPS.length - 1 ? CYBER_OPS[idx + 1] : null"
          :is-en="isEn"
          @activate="activeOpIndex = idx"
        />
      </div>

      <!-- 4. JAVA CRYPTOGRAPHY ARCHITECTURE REFERENCE (JCA) -->
      <section class="card" id="java-crypto-codes">
        <JavaCryptoCodeReference :is-en="isEn" />
      </section>

      <!-- 5. SUMMARY MATRIX & TABLE -->
      <section class="card" id="crypto-matrix">
        <h2>{{ isEn ? '5. Cryptographic Algorithms Comparison & Status Matrix' : '5. جدول المقارنة والتقييم الشامل لخوارزميات التشفير' }}</h2>
        <p class="lead">
          {{ isEn ? 'A comprehensive evaluation of the core 7 ciphers: from classical Caesar to military-grade AES-256 and Quantum-threatened RSA:' : 'تقييم منهجي شامل ومقارنة بين الخوارزميات السبع من قيصر التاريخية وحتى AES-256 والتشفير غير المتماثل:' }}
        </p>
        <CryptoSummaryMatrix :is-en="isEn" />
      </section>

      <!-- 6. INTERACTIVE SELF-CHECK FLASHCARDS & QUIZ -->
      <section class="card" id="crypto-selfcheck">
        <h2>{{ isEn ? '6. Oral Review Flashcards & Interactive Assessment Quiz' : '6. بطاقات المراجعة الشفوية والاختبار التقييمي السريع' }}</h2>
        <p class="lead">
          {{ isEn ? 'Test your conceptual understanding before laboratory code execution:' : 'اختبر استيعابك للمفاهيم الرياضية والأمنية قبل الانتقال للتطبيق البرمجي:' }}
        </p>

        <!-- Flashcards -->
        <h3 class="section-subtitle">
          <i class="fa-solid fa-layer-group"></i>
          <span>{{ isEn ? 'Oral Flashcards (Answer mentally first):' : 'بطاقات الفحص السريع (حاول الإجابة ذهنياً أولاً):' }}</span>
        </h3>
        <InteractiveFlashcard
          v-for="(fc, idx) in CYBER_FLASHCARDS"
          :key="idx"
          :question="fc.question"
          :question-en="fc.questionEn"
          :answer="fc.answer"
          :answer-en="fc.answerEn"
          :icon-color="fc.iconColor"
          :is-en="isEn"
        />

        <!-- Self-Check Quiz Widget -->
        <SelfCheckQuizWidget
          :title="isEn ? 'Cybersecurity Foundations Self-Check Quiz' : 'اختبار الفحص الذاتي لأسس الأمن السيبراني والتشفير'"
          :title-en="'Cybersecurity Foundations Self-Check Quiz'"
          :questions="CYBER_QUIZ_QUESTIONS"
          :is-en="isEn"
          @quiz-completed="onQuizCompleted"
        />
      </section>

      <!-- ACADEMIC FOOTER -->
      <footer class="academic-footer">
        <p>
          <b>{{ isEn ? 'Programming Lectures & Laboratories Portal' : 'بوابة الملازم والمختبرات البرمجية' }}</b> ({{ isEn ? 'University of Aden' : 'جامعة عدن' }}) · {{ isEn ? 'Cybersecurity Course' : 'مقرر الأمن السيبراني' }}<br>
          {{ isEn ? 'Course Instructor: ' : 'أستاذ المقرر: ' }}<b>{{ isEn ? 'Eng. Abdulhamid Helal Daban' : 'م. عبدالحميد هلال دعبان' }}</b> · {{ CYBER_META.year }}<br>
          {{ isEn ? 'All Academic, Intellectual, Design & Software Rights Reserved ©' : 'جميع حقوق الموقع والتصميم والمحتوى الأكاديمي والبرمجي محفوظة ©' }}
        </p>
      </footer>
    </div>

    <!-- Floating Back to Top Button -->
    <FloatingBackTop :is-en="isEn" />

    <!-- Toast Notification -->
    <div class="toast" :class="{ show: toast.show }">
      <i class="fa-solid fa-circle-check"></i>
      <span>{{ toast.msg }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watchEffect } from 'vue'
import {
  CYBER_META,
  CYBER_FOUNDATIONS,
  CYBER_FLASHCARDS,
  CYBER_QUIZ_QUESTIONS
} from '@/data/cyberLecture01Data.js'
import { CYBER_OPS, CYBER_OPS_NAV } from '@/data/cyberOpsData.js'

import KeyspaceExplorer from '@/components/lecture/labs/KeyspaceExplorer.vue'
import CryptoSummaryMatrix from '@/components/lecture/labs/CryptoSummaryMatrix.vue'
import CryptoOperationHubCard from '@/components/lecture/simulation/CryptoOperationHubCard.vue'
import JavaCryptoCodeReference from '@/components/lecture/labs/JavaCryptoCodeReference.vue'
import InteractiveFlashcard from '@/components/common/InteractiveFlashcard.vue'
import SelfCheckQuizWidget from '@/components/common/SelfCheckQuizWidget.vue'
import FloatingBackTop from '@/components/common/FloatingBackTop.vue'
import DrawingCanvas from '@/components/lecture/layout/DrawingCanvas.vue'
import LectureTopBar from '@/components/lecture/layout/LectureTopBar.vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'

const prefs = usePreferencesStore()
const isEn = computed(() => prefs.isEn)
const activeOpIndex = ref(0)
const opCardRefs = ref([])
const viewMode = ref('list')

const toast = reactive({
  show: false,
  msg: ''
})
let toastTimer = null

function showToast(msg) {
  toast.msg = msg
  toast.show = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.show = false
  }, 2600)
}

function scrollToOp(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function onQuizCompleted(res) {
  showToast(prefs.isEn ? `Quiz completed: ${res.totalCorrect} / ${res.totalQuestions}` : `أنهيت الاختبار الذاتي: ${res.totalCorrect} من ${res.totalQuestions}`)
}

function handleKeyDown(e) {
  const activeTag = document.activeElement?.tagName
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(activeTag) || document.activeElement?.isContentEditable) return
  const cardComp = opCardRefs.value[activeOpIndex.value]
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

watchEffect(() => {
  document.title = prefs.isEn
    ? 'Cryptography & Cybersecurity Foundations | Advanced Interactive Lab - Eng. Abdulhamid Helal Daban'
    : 'أسس التشفير والأمن السيبراني | مختبر تفاعلي متقدم - م. عبدالحميد هلال دعبان'
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
/* Card Specific Styling */
.card.hero {
  background: linear-gradient(140deg, #022013 0%, #064e3b 50%, #059669 100%);
  color: #fff;
  border: none;
  position: relative;
  overflow: hidden;
  padding: 50px 52px;
}
.sub-lead {
  font-size: 13px;
  color: #a7f3d0;
  font-weight: 800;
  margin-bottom: 8px;
}
.card.hero h1 {
  font-size: 32px;
  margin: 10px 0 16px;
  line-height: 1.45;
  font-weight: 900;
  color: #fff;
}
.card.hero p {
  color: #d1fae5;
  max-width: 860px;
  font-size: 16px;
  line-height: 1.9;
}
.chips {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chips span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  border-radius: 24px;
  padding: 5px 16px;
  font-size: 12.5px;
  font-weight: 700;
  color: #fff;
}

.section-subtitle {
  color: #059669;
  font-size: 18px;
  margin: 26px 0 14px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Kerckhoffs Card */
.kerckhoffs-card {
  background: var(--brand-soft, #ecfdf5);
  border-right: 5px solid #059669;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 22px;
}
:global(html[dir="ltr"]) .kerckhoffs-card {
  border-right: none;
  border-left: 5px solid #059669;
}
.kerckhoffs-title {
  margin: 0 0 10px;
  color: #059669;
  font-size: 18px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
}
.kerckhoffs-quote {
  margin: 0 0 10px;
  font-size: 15.5px;
  line-height: 1.8;
  color: var(--ink, #0f172a);
}
.kerckhoffs-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: var(--muted, #64748b);
}

/* Grids & Mini Cards */
.grid.g3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 22px 0;
}
.mini-card {
  background: var(--bg, #f8fafc);
  border: 1px solid var(--line, #e2e8f0);
  border-radius: 14px;
  padding: 20px 22px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.mini-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px -6px rgba(5, 150, 105, 0.12);
}
.mini-card h4 {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
}
.mini-card p {
  margin: 0;
  font-size: 14px;
  color: var(--muted, #64748b);
  line-height: 1.8;
  white-space: pre-line;
}

.academic-footer {
  text-align: center;
  color: var(--muted, #64748b);
  font-size: 13.5px;
  padding-top: 24px;
  line-height: 1.9;
  border-top: 1px solid var(--line, #e2e8f0);
}

/* Toast */
.toast {
  position: fixed;
  bottom: 30px;
  right: 50%;
  transform: translateX(50%) translateY(30px);
  background: rgba(6, 21, 16, 0.95);
  backdrop-filter: blur(8px);
  color: #fff;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid #10b981;
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 10px;
}
.toast.show {
  opacity: 1;
  transform: translateX(50%) translateY(0);
  pointer-events: auto;
}
</style>
