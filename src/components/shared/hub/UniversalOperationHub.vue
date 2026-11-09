<script setup>
import { computed } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import { useSimulationInstance } from '@/core/useSimulationInstance'
import CodeViewer from '@/components/lecture/layout/CodeViewer.vue'
import Array1DStage from '@/components/lecture/simulation/Array1DStage.vue'
import Matrix2DStage from '@/components/lecture/simulation/Matrix2DStage.vue'
import CryptoArrayStage from '@/components/lecture/simulation/CryptoArrayStage.vue'
import SimulationPlayer from '@/components/lecture/simulation/SimulationPlayer.vue'

const props = defineProps({
  op: { type: Object, required: true },
  opIndex: { type: Number, required: true },
  prevOp: { type: Object, default: null },
  nextOp: { type: Object, default: null },
  isEn: { type: Boolean, default: null },
  themeClass: { type: String, default: '' },
  stageType: { type: String, default: 'auto' } // 'auto' | '1d' | '2d' | 'crypto' | 'custom'
})

const emit = defineEmits(['activate'])

const prefs = usePreferencesStore()
const activeEn = computed(() => (props.isEn !== null ? props.isEn : prefs.isEn))
const langKey = computed(() => (activeEn.value ? 'en' : 'ar'))

const sim = useSimulationInstance(props.op, props.opIndex)

// Localized helper to extract property either from [prefs.lang] or { ar, en }
function getLoc(field) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[langKey.value] || field.ar || field.en || ''
}

const opName = computed(() => getLoc(props.op.name))
const opHead = computed(() => getLoc(props.op.head))
const opText = computed(() => getLoc(props.op.text))
const opAnalogy = computed(() => getLoc(props.op.analogy))
const opTake = computed(() => getLoc(props.op.take))
const opBadge = computed(() => props.op.badge || props.op.big || 'O(1)')

const opSteps = computed(() => {
  const stepsField = props.op.steps
  if (!stepsField) return []
  if (Array.isArray(stepsField)) return stepsField
  return stepsField[langKey.value] || stepsField.ar || stepsField.en || []
})

const opCode = computed(() => {
  const codeField = props.op.code
  if (!codeField) return []
  if (Array.isArray(codeField)) return codeField
  return codeField[langKey.value] || codeField.ar || codeField.en || []
})

function pillClass(badge) {
  if (badge === 'O(1)') return 'p-ok'
  if (badge === 'O(n)' || badge === 'O(R+C)' || badge === 'O(N)') return 'p-acc'
  if (badge && (badge.includes('n²') || badge.includes('2^') || badge.includes('O(R×C)'))) return 'p-bad'
  return 'p-ok'
}

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// Cases normalization (supports both array and object format)
const normalizedCases = computed(() => {
  if (!props.op.cases) return []
  const casesData = props.op.cases[langKey.value] || props.op.cases
  if (Array.isArray(casesData)) {
    return casesData.map((c, idx) => {
      if (Array.isArray(c)) {
        return {
          title: c[0],
          desc: c[1],
          badge: c[0],
          typeKey: idx === 0 ? 'best' : idx === 1 ? 'avg' : 'worst'
        }
      }
      return {
        title: c.title ? getLoc(c.title) : (idx === 0 ? 'Best' : idx === 1 ? 'Average' : 'Worst'),
        desc: c.desc ? getLoc(c.desc) : '',
        badge: c.badge || '',
        typeKey: idx === 0 ? 'best' : idx === 1 ? 'avg' : 'worst'
      }
    })
  }
  return []
})

function defaultCountOps(op, n, caseKey) {
  if (typeof op.gen === 'function' && typeof op.sample === 'function') {
    try {
      const c = op.gen(op.sample(n, caseKey), 'ar', true)
      if (c && typeof c === 'object') {
        return (c.cmp || 0) + (c.rd || 0) + (c.wr || 0)
      }
    } catch {
      return 0
    }
  }
  return 0
}

// Benchmark data calculation (only if benchmark sizes exist or countOpsFast is available)
const benchmarkData = computed(() => {
  if (sim.currentSlide.value !== 2) return { rows: [], maxWorst: 1 }
  const ns = props.op.benchSizes || (props.op.key === 'matrix' ? [2, 4, 8, 16] : [5, 10, 20, 40])
  const countFn = props.op.countOpsFast || (props.op.gen && props.op.sample ? defaultCountOps : null)
  if (!countFn || typeof countFn !== 'function') return { rows: [], maxWorst: 1 }

  const rows = ns.map((n) => ({
    n,
    best: countFn(props.op, n, 'best') || 0,
    worst: countFn(props.op, n, 'worst') || 0
  }))
  const maxWorst = Math.max(...rows.map((r) => r.worst), 1)
  return { rows, maxWorst }
})

const caseMeta = [
  { key: 'best', ar: 'أفضل حالة', en: 'Best' },
  { key: 'avg', ar: 'الحالة المتوسطة', en: 'Average' },
  { key: 'worst', ar: 'أسوأ حالة', en: 'Worst' }
]

defineExpose({
  sim
})
</script>

<template>
  <section
    :id="'op-' + op.key"
    class="card hub op-sec"
    :class="themeClass"
    @mouseenter="emit('activate', opIndex); prefs.activeOpIndex = opIndex"
  >
    <!-- 1. Hub Header -->
    <slot name="header" :op="op" :op-index="opIndex" :is-en="activeEn">
      <div class="hub-head sec-head">
        <div>
          <h2>
            {{ op.numberPrefix || (opIndex + 1) + '.' }} {{ opName }}
            <span class="pill" :class="pillClass(opBadge)">{{ opBadge }}</span>
          </h2>
          <p>{{ opHead }}</p>
        </div>
        <div class="tools">
          <a
            v-if="prevOp"
            class="tool"
            :href="'#op-' + prevOp.key"
            @click.prevent="scrollToId('op-' + prevOp.key)"
          >
            {{ activeEn ? '← ' + (prevOp.name.en || prevOp.name) : '→ ' + (prevOp.name.ar || prevOp.name) }}
          </a>
          <a
            class="tool"
            href="#ops-index"
            @click.prevent="scrollToId('ops-index')"
          >
            <i class="fa-solid fa-bars-staggered"></i>
            {{ activeEn ? 'Index' : 'الفهرس' }}
          </a>
          <a
            v-if="nextOp"
            class="tool"
            :href="'#op-' + nextOp.key"
            @click.prevent="scrollToId('op-' + nextOp.key)"
          >
            {{ activeEn ? (nextOp.name.en || nextOp.name) + ' →' : (nextOp.name.ar || nextOp.name) + ' ←' }}
          </a>
        </div>
      </div>
    </slot>

    <!-- 2. Slides Navigation Tabs -->
    <div class="slides-nav">
      <button
        type="button"
        class="sl-btn"
        :class="{ on: sim.currentSlide.value === 0 }"
        @click="sim.goSlide(0)"
      >
        <span class="n">1</span>
        <span>{{ activeEn ? 'Concept & Mathematical Foundation' : 'الفكرة والتأصيل العلمي' }}</span>
      </button>
      <button
        type="button"
        class="sl-btn"
        :class="{ on: sim.currentSlide.value === 1 }"
        @click="sim.goSlide(1)"
      >
        <span class="n">2</span>
        <span>{{ activeEn ? 'Step-by-Step Live Execution' : 'التنفيذ وتتبع الحالات خطوة بخطوة' }}</span>
      </button>
      <button
        type="button"
        class="sl-btn"
        :class="{ on: sim.currentSlide.value === 2 }"
        @click="sim.goSlide(2)"
      >
        <span class="n">3</span>
        <span>{{ op.security ? (activeEn ? 'Security & Threat Analysis' : 'التحليل الأمني ومقاومة الهجمات') : (activeEn ? 'Complexity & Performance Analysis' : 'التحليل والتعقيد الحسابي') }}</span>
      </button>
    </div>

    <!-- SLIDE 0: IDEA & CONCEPT -->
    <div v-show="sim.currentSlide.value === 0" class="slide on">
      <div class="idea-grid">
        <div>
          <h3>{{ opHead }}</h3>
          <p>{{ opText }}</p>
          <ol v-if="opSteps.length > 0" class="idea-steps">
            <li v-for="(s, sIdx) in opSteps" :key="sIdx">{{ s }}</li>
          </ol>
          <slot name="idea-extra" :op="op" :is-en="activeEn"></slot>
        </div>
        <div>
          <div v-if="opAnalogy" class="analogy">
            <b>
              <i class="fa-solid fa-brain" style="color: var(--violet, #7c3aed)"></i>
              {{ activeEn ? 'Real-World Concept Analogy' : 'تشبيه يقرّب الفكرة' }}
            </b>
            <p style="margin: 6px 0 0">{{ opAnalogy }}</p>
          </div>
          <div class="panel-title">{{ activeEn ? 'Standard Reference Code' : 'الكود البرمجي الكامل' }}</div>
          <CodeViewer :lines="opCode" :active-line="-1" />
        </div>
      </div>
      <div class="next-hint" style="margin-top: 20px;">
        <button type="button" class="btn" @click="sim.goSlide(1)">
          {{ activeEn ? 'Start Step-by-Step Execution →' : 'ابدأ التنفيذ خطوة بخطوة ←' }}
        </button>
      </div>
    </div>

    <!-- SLIDE 1: STEP-BY-STEP SIMULATION -->
    <div v-show="sim.currentSlide.value === 1" class="slide on">
      <!-- Dynamic Inputs Bar -->
      <slot name="inputs" :sim="sim" :op="op" :is-en="activeEn">
        <div v-if="op.defArr || (op.inputs && op.inputs.length > 0)" class="inputs">
          <label v-if="op.defArr">
            {{ activeEn ? 'Array Elements:' : 'عناصر المصفوفة:' }}
            <input v-model="sim.arrInput.value" class="arr" />
          </label>

          <template v-for="[paramKey, labelObj, defVal] in (op.inputs || [])" :key="paramKey">
            <label v-if="paramKey === 'preset'">
              {{ getLoc(labelObj) }}:
              <select v-model="sim.presetInput.value" @change="sim.applyPreset()">
                <option value="custom">{{ activeEn ? 'Custom' : 'كما هي' }}</option>
                <option value="best">{{ activeEn ? 'Sorted (Best Case)' : 'مرتبة (أفضل حالة)' }}</option>
                <option value="worst">{{ activeEn ? 'Reversed (Worst Case)' : 'معكوسة (أسوأ حالة)' }}</option>
                <option value="rand">{{ activeEn ? 'Random (Average)' : 'عشوائية (متوسط)' }}</option>
              </select>
            </label>

            <label v-else-if="paramKey === 'size'">
              {{ getLoc(labelObj) }}:
              <select v-model.number="sim.paramValues.value.size" @change="sim.rebuild()">
                <option :value="2">2</option>
                <option :value="3">3</option>
                <option :value="4">4</option>
              </select>
            </label>

            <label v-else-if="typeof defVal === 'string'">
              {{ getLoc(labelObj) }}:
              <input v-model="sim.paramValues.value[paramKey]" type="text" style="min-width: 140px;" />
            </label>

            <label v-else>
              {{ getLoc(labelObj) }}:
              <input v-model.number="sim.paramValues.value[paramKey]" class="num" type="number" />
            </label>
          </template>

          <button type="button" class="btn" @click="sim.rebuild()">
            <i class="fa-solid fa-rotate-right"></i> {{ activeEn ? 'Apply & Restart' : 'تطبيق وإعادة التشغيل' }}
          </button>

          <span v-if="op.key === 'search'" style="color: var(--muted); font-weight: 600">
            {{ activeEn ? 'Try 12 (Best Case) then 99 (Worst Case)' : 'جرّب 12 (أفضل حالة) ثم 99 (أسوأ حالة)' }}
          </span>
        </div>
      </slot>

      <!-- Execution Grid -->
      <div v-if="sim.currentStep.value" class="run-grid">
        <div>
          <!-- Visual Stage Area: Slot with Smart Fallback -->
          <div class="stage">
            <slot
              name="stage"
              :step="sim.currentStep.value"
              :sim="sim"
              :is-en="activeEn"
              :op="op"
            >
              <!-- Auto-fallback based on step data -->
              <CryptoArrayStage
                v-if="stageType === 'crypto' || op.isCrypto || sim.currentStep.value.cipher"
                :step="sim.currentStep.value"
                :is-en="activeEn"
              />
              <Matrix2DStage
                v-else-if="sim.currentStep.value.m"
                :matrix="sim.currentStep.value.m"
                :cls="sim.currentStep.value.cls"
                :ptr="sim.currentStep.value.ptr"
                :secondary-arr="sim.currentStep.value.b"
                :secondary-cls="sim.currentStep.value.bcls"
                :secondary-ptr="sim.currentStep.value.bptr"
                :secondary-label="op.secondaryLabel"
              />
              <Array1DStage
                v-else
                :arr="sim.currentStep.value.a"
                :cls="sim.currentStep.value.cls"
                :ptr="sim.currentStep.value.ptr"
                :secondary-arr="sim.currentStep.value.b"
                :secondary-cls="sim.currentStep.value.bcls"
                :secondary-ptr="sim.currentStep.value.bptr"
              />
            </slot>
          </div>

          <!-- Step Message / Narration -->
          <div class="msg">{{ sim.currentStep.value.msg }}</div>

          <!-- Reusable Player Controls -->
          <SimulationPlayer
            :step-index="sim.stepIndex.value"
            :total-steps="sim.steps.value.length"
            :is-playing="sim.isPlaying.value"
            :progress-percent="sim.progressPercent.value"
            :speed="sim.speed.value"
            @first="sim.first()"
            @prev="sim.prev()"
            @toggle-play="sim.togglePlay()"
            @next="sim.stop(); sim.next()"
            @last="sim.last()"
            @update:speed="sim.speed.value = $event"
          />
        </div>

        <div>
          <div class="panel-title">
            {{ activeEn ? 'Executing Instruction in Processor' : 'الكود — السطر المظلّل هو الذي يُنفَّذ الآن' }}
          </div>
          <CodeViewer :lines="opCode" :active-line="sim.currentStep.value.line" />

          <div class="panel-title">{{ activeEn ? 'Variables & Register Watch' : 'المتغيرات' }}</div>
          <div class="vars">
            <template v-if="sim.currentStep.value.vars && Object.keys(sim.currentStep.value.vars).length > 0">
              <span
                v-for="(val, varKey) in sim.currentStep.value.vars"
                :key="varKey"
                class="var"
                :class="{ chg: sim.prevStepVars.value && sim.prevStepVars.value[varKey] !== val }"
              >
                {{ varKey }} = <b>{{ val }}</b>
              </span>
            </template>
            <span v-else class="var">—</span>
          </div>

          <!-- Dynamic Counters (Auto-detects Crypto vs Data Structures) -->
          <div class="panel-title">
            {{ activeEn ? 'Operation Workload Counters (Cumulative)' : 'عدّاد العمليات (يتراكم مع كل خطوة)' }}
          </div>
          <slot name="counters" :step="sim.currentStep.value" :is-en="activeEn">
            <!-- If Crypto counters -->
            <div v-if="sim.currentStep.value.c && sim.currentStep.value.c.ops !== undefined" class="counters">
              <div class="counter">
                <div class="v">{{ sim.currentStep.value.c.ops }}</div>
                <div class="l"><i class="fa-solid fa-rotate"></i> {{ activeEn ? 'Bitwise Ops' : 'عمليات بتية' }}</div>
              </div>
              <div class="counter">
                <div class="v">{{ sim.currentStep.value.c.keys }}</div>
                <div class="l"><i class="fa-solid fa-key"></i> {{ activeEn ? 'Key Space' : 'احتمالات المفتاح' }}</div>
              </div>
              <div class="counter">
                <div class="v">{{ sim.currentStep.value.c.flips }}</div>
                <div class="l"><i class="fa-solid fa-bolt"></i> {{ activeEn ? 'Bits Flipped' : 'بتات متقلبة' }}</div>
              </div>
              <div class="counter total">
                <div class="v">{{ (sim.currentStep.value.c.ops || 0) + (sim.currentStep.value.c.keys || 0) + (sim.currentStep.value.c.flips || 0) }}</div>
                <div class="l">{{ activeEn ? 'Total Effort Σ' : 'Σ المجهود الكلي' }}</div>
              </div>
            </div>

            <!-- If Data Structures counters -->
            <div v-else-if="sim.currentStep.value.c" class="counters">
              <div class="counter">
                <div class="v">{{ sim.currentStep.value.c.cmp }}</div>
                <div class="l">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  {{ activeEn ? 'Comparisons' : 'مقارنات' }}
                </div>
              </div>
              <div class="counter">
                <div class="v">{{ sim.currentStep.value.c.rd }}</div>
                <div class="l">
                  <i class="fa-solid fa-book-open"></i>
                  {{ activeEn ? 'Reads' : 'قراءات' }}
                </div>
              </div>
              <div class="counter">
                <div class="v">{{ sim.currentStep.value.c.wr }}</div>
                <div class="l">
                  <i class="fa-solid fa-pen"></i>
                  {{ activeEn ? 'Writes' : 'كتابات' }}
                </div>
              </div>
              <div class="counter total">
                <div class="v">
                  {{
                    (sim.currentStep.value.c.cmp || 0) +
                    (sim.currentStep.value.c.rd || 0) +
                    (sim.currentStep.value.c.wr || 0)
                  }}
                </div>
                <div class="l">Σ {{ activeEn ? 'Total' : 'المجموع' }}</div>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>

    <!-- SLIDE 2: ANALYSIS & EVALUATION -->
    <div v-show="sim.currentSlide.value === 2" class="slide on">
      <slot
        name="analysis"
        :op="op"
        :sim="sim"
        :is-en="activeEn"
        :cases="normalizedCases"
        :benchmark-data="benchmarkData"
      >
        <!-- Security Analysis branch -->
        <template v-if="op.security">
          <div class="cases">
            <div
              v-for="(c, cIdx) in (op.cases || [])"
              :key="cIdx"
              class="case"
              :class="cIdx === 0 ? 'best' : cIdx === 1 ? 'avg' : 'worst'"
            >
              <h4>
                <i class="fa-solid fa-shield-halved" style="color: var(--brand, #059669);"></i>
                <span>{{ getLoc(c.title) }}</span>
              </h4>
              <p>{{ getLoc(c.desc) }}</p>
            </div>
          </div>

          <div class="note" style="margin-top: 20px;">
            <b>
              <i class="fa-solid fa-shield-halved" style="color: var(--brand, #059669);"></i>
              {{ activeEn ? 'Security Evaluation & Attack Resistance Summary:' : 'خلاصة تقييم الأمان والمناعة السيبرانية:' }}
            </b><br>
            <span>{{ getLoc(op.security) }}</span>
          </div>
        </template>

        <!-- Complexity Analysis branch -->
        <template v-else>
          <div class="cases">
            <div
              v-for="(cItem, k) in normalizedCases"
              :key="k"
              class="case"
              :class="cItem.typeKey"
            >
              <h4>
                {{ activeEn ? caseMeta[k]?.en + ' Case' : caseMeta[k]?.ar }}
                <small v-if="!activeEn" style="color: var(--muted)">{{ caseMeta[k]?.en }}</small>
                <span class="pill" :class="pillClass(cItem.badge)">{{ cItem.badge }}</span>
              </h4>
              <p>{{ cItem.desc }}</p>
              <div
                v-if="
                  (op.tryCaseFn || ['search', 'bubble', 'insert', 'delete'].includes(op.key)) &&
                  cItem.typeKey !== 'avg'
                "
                class="try"
              >
                <button
                  type="button"
                  class="btn ghost"
                  @click="sim.tryCase(cItem.typeKey)"
                >
                  <i class="fa-solid fa-play" style="font-size: 10px"></i>
                  {{ activeEn ? 'Watch in Simulator' : 'شاهدها في التنفيذ' }}
                </button>
              </div>
            </div>
          </div>

          <div v-if="op.time || op.space" class="grid g3" style="margin-top: 14px">
            <div v-if="op.time" class="mini">
              <h4>
                <i class="fa-solid fa-clock" style="color: var(--primary)"></i>
                {{ activeEn ? 'Time Complexity' : 'التعقيد الزمني' }}
              </h4>
              <div v-html="getLoc(op.time)"></div>
            </div>
            <div v-if="op.space" class="mini">
              <h4>
                <i class="fa-solid fa-hard-drive" style="color: var(--accent)"></i>
                {{ activeEn ? 'Space Complexity' : 'التعقيد المكاني' }}
              </h4>
              <div v-html="getLoc(op.space)"></div>
            </div>
          </div>

          <template v-if="op.derive">
            <h3>
              <i class="fa-solid fa-calculator" style="color: var(--primary)"></i>
              {{ activeEn ? 'How Did We Derive This? (Operation Count)' : 'كيف وصلنا للنتيجة؟ (عدّ العمليات)' }}
            </h3>
            <div v-html="getLoc(op.derive)"></div>
          </template>

          <template v-if="benchmarkData.rows.length > 0">
            <h3>
              <i class="fa-solid fa-chart-column" style="color: var(--primary)"></i>
              {{ activeEn ? 'Empirical Benchmark: Operation Count as n Grows' : 'قياس فعلي: عدد العمليات عند تكبير n' }}
            </h3>
            <p class="lead" style="font-size: 14px; margin: 0">
              {{ activeEn ? 'Numbers measured by running the exact algorithm on increasing array sizes in Best and Worst cases.' : 'الأرقام ناتجة من تشغيل نفس الكود فعلياً على مصفوفات بأحجام مختلفة، في أفضل حالة وأسوأ حالة.' }}
            </p>

            <div class="bars">
              <div class="bar-row" style="font-family: Cairo, Inter, sans-serif">
                <b>{{ op.benchLabel || (op.key === 'matrix' ? 'n (n×n)' : 'n') }}</b>
                <b style="color: var(--ok)">{{ activeEn ? 'Best Case' : 'أفضل حالة' }}</b>
                <b style="color: var(--bad)">{{ activeEn ? 'Worst Case' : 'أسوأ حالة' }}</b>
              </div>
              <div v-for="row in benchmarkData.rows" :key="row.n" class="bar-row">
                <b>n={{ row.n }}</b>
                <div class="bar b">
                  <div :style="{ width: (row.best / benchmarkData.maxWorst) * 100 + '%' }"></div>
                  <span>{{ row.best }}</span>
                </div>
                <div class="bar w">
                  <div :style="{ width: (row.worst / benchmarkData.maxWorst) * 100 + '%' }"></div>
                  <span>{{ row.worst }}</span>
                </div>
              </div>
            </div>
          </template>

          <div v-if="opTake" class="note">
            <i class="fa-solid fa-lightbulb" style="color: var(--accent); margin-inline-end: 6px"></i>
            {{ opTake }}
          </div>
        </template>
      </slot>
    </div>
  </section>
</template>
