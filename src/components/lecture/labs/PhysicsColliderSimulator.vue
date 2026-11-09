<template>
  <div class="physics-widget">
    <div class="steps-grid">
      <div class="step-card">
        <span class="step-tag red">{{ isEn ? 'Step 1' : 'الخطوة 1' }}</span>
        <h4>Tilemap Collider 2D</h4>
        <p>{{ isEn ? 'Added to Ground_Tilemap; automatically creates a collision boundary around every painted cell.' : 'يضاف إلى Ground_Tilemap؛ يقوم تلقائياً بإنشاء حدود تصادم لكل خلية مرسومة في الخريطة.' }}</p>
      </div>

      <div class="step-card">
        <span class="step-tag green">{{ isEn ? 'Step 2' : 'الخطوة 2' }}</span>
        <h4>Composite Collider 2D</h4>
        <p>{{ isEn ? 'Merges adjacent cell colliders into one seamless polygon to prevent character snagging at seams.' : 'يقوم بدمج حدود الخلايا المتجاورة في مضلع تصادم واحد ناعم، لتجنب تعثر أقدام اللاعب بين الفواصل.' }}</p>
      </div>

      <div class="step-card">
        <span class="step-tag amber">{{ isEn ? 'Step 3' : 'الخطوة 3' }}</span>
        <h4>Rigidbody 2D (Static)</h4>
        <p>{{ isEn ? 'Added automatically alongside Composite Collider; Body Type MUST be set to Static so ground does not fall!' : 'يضاف تلقائياً مع Composite Collider؛ يجب التأكد من ضبط نوعه على Static حتى لا تسقط الأرضية تحت الجاذبية!' }}</p>
      </div>
    </div>

    <!-- Interactive Physics Demo -->
    <div class="physics-sim-box">
      <div class="sim-header">
        <h4 class="sim-title">
          <i class="fa-solid fa-atom"></i>
          <span>{{ isEn ? 'Physics Snagging Simulator (Internal Edge Snagging)' : 'محاكي فحص الفوارق الفيزيائية: تعثر الفواصل (Internal Edge Snagging)' }}</span>
        </h4>
        <button
          type="button"
          class="test-btn"
          :disabled="isTesting"
          @click="runTest"
        >
          <i class="fa-solid fa-play"></i>
          <span>{{ isEn ? 'Test Character Movement' : 'تجربة حركة اللاعب (Test Move)' }}</span>
        </button>
      </div>

      <div class="physics-tabs">
        <button
          type="button"
          class="phys-tab"
          :class="{ active: currentMode === 'seams' }"
          @click="setMode('seams')"
        >
          <i class="fa-solid fa-border-none" style="color:#ef4444;"></i>
          <span>{{ isEn ? '1. Without Composite (Separate Tile Colliders)' : '1. بدون دمج (Tilemap Collider بمفرده)' }}</span>
        </button>

        <button
          type="button"
          class="phys-tab"
          :class="{ active: currentMode === 'composite' }"
          @click="setMode('composite')"
        >
          <i class="fa-solid fa-draw-polygon" style="color:#10b981;"></i>
          <span>{{ isEn ? '2. With Composite (Used by Composite)' : '2. مع دمج (Used by Composite)' }}</span>
        </button>
      </div>

      <!-- Stage Box -->
      <div class="physics-stage-wrapper">
        <!-- Player Sprite -->
        <div
          class="phys-character"
          :class="{ snagged: isSnagged }"
          :style="playerStyle"
        >
          <i class="fa-solid fa-person-running"></i>
        </div>

        <!-- Ground Blocks -->
        <div class="phys-ground-row">
          <div
            v-if="currentMode === 'composite'"
            class="composite-boundary"
          ></div>
          <div
            v-for="i in 8"
            :key="i"
            class="phys-block"
            :class="{ 'seam-mode': currentMode === 'seams' }"
          ></div>
        </div>
      </div>

      <!-- Status Banner -->
      <div
        class="phys-status-banner"
        :class="currentMode === 'seams' ? 'danger' : 'success'"
      >
        <i :class="currentMode === 'seams' ? 'fa-solid fa-triangle-exclamation' : 'fa-solid fa-circle-check'"></i>
        <span v-if="currentMode === 'seams'">
          <b>{{ isEn ? 'Current Mode (No Composite): ' : 'الوضع الحالي (بدون Composite): ' }}</b>
          {{ isEn ? 'Each tile has an individual box collider. Red internal seams will catch the character collider during velocity sweeps.' : 'كل بلاطة تمتلك Box Collider منفصل، وتظهر فواصل حمراء بين البلاطات قد تجعل كوليدر اللاعب يعلق عند الفواصل أثناء الحركة السريعة.' }}
        </span>
        <span v-else>
          <b>{{ isEn ? 'Current Mode (Composite Enabled): ' : 'الوضع الحالي (مفعّل بـ Composite): ' }}</b>
          {{ isEn ? 'Tilemap Collider has [Used By Composite] checked. All 8 tiles form one seamless green physics polygon with zero internal friction.' : 'تم تفعيل Used by Composite؛ دمج المحرك جميع البلاطات في مضلع أخضر ناعم ومتصل، ما يتيح انزلاق اللاعب بكل سلاسة وسرعة.' }}
        </span>
      </div>
    </div>

    <!-- Sorting Layers Table -->
    <h3 class="table-title">
      <i class="fa-solid fa-layer-group"></i>
      <span>{{ isEn ? 'Sorting Layers & Order in Layer Hierarchy Table' : 'جدول ترتيب طبقات الرؤية (Sorting Layers & Order in Layer)' }}</span>
    </h3>
    <div class="table-container">
      <table class="standard-table">
        <thead>
          <tr>
            <th>{{ isEn ? 'Tilemap / Object' : 'اسم الـ Tilemap / الكائن' }}</th>
            <th>{{ isEn ? 'Suggested Sorting Layer' : 'الـ Sorting Layer المقترحة' }}</th>
            <th>Order in Layer</th>
            <th>{{ isEn ? 'Collider Configuration' : 'التصادم الفيزيائي (Collider)' }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Background_Tilemap</code></td>
            <td><span class="layer-tag bg">Background</span></td>
            <td>0</td>
            <td>{{ isEn ? 'No Collider (Pure visuals)' : 'بدون Collider (خلفية بصرية فقط)' }}</td>
          </tr>
          <tr>
            <td><code>Ground_Tilemap</code></td>
            <td><span class="layer-tag def">Default</span></td>
            <td>0</td>
            <td><code>Tilemap Collider</code> + <code>Composite (Static)</code></td>
          </tr>
          <tr>
            <td><code>Decoration_Tilemap</code></td>
            <td><span class="layer-tag def">Default</span></td>
            <td>1</td>
            <td>{{ isEn ? 'No Collider (Flowers & grass)' : 'بدون Collider (أعشاب وحجارة تجميلية)' }}</td>
          </tr>
          <tr>
            <td><code>Player (الشخصية)</code></td>
            <td><span class="layer-tag fg">Foreground</span></td>
            <td>0</td>
            <td><code>Rigidbody 2D (Dynamic)</code> + <code>Capsule Collider</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isEn: { type: Boolean, default: false }
})

const emit = defineEmits(['notify'])

const currentMode = ref('seams')
const isTesting = ref(false)
const isSnagged = ref(false)
const playerLeft = ref('20px')
const playerTransition = ref('none')

const playerStyle = computed(() => ({
  left: playerLeft.value,
  transition: playerTransition.value
}))

function setMode(mode) {
  currentMode.value = mode
  resetPlayer()
}

function resetPlayer() {
  isSnagged.value = false
  playerTransition.value = 'none'
  playerLeft.value = '20px'
}

function runTest() {
  if (isTesting.value) return
  isTesting.value = true
  resetPlayer()

  setTimeout(() => {
    if (currentMode.value === 'seams') {
      // Snag at 42%
      playerTransition.value = 'left 1.1s cubic-bezier(0.2, 0.8, 0.2, 1)'
      playerLeft.value = '42%'
      setTimeout(() => {
        isSnagged.value = true
        emit('notify', props.isEn ? '⚠️ Player snagged on internal collider seam!' : '⚠️ تعثر اللاعب عند الفاصل الداخلي!')
        setTimeout(() => {
          isSnagged.value = false
          isTesting.value = false
        }, 1200)
      }, 1100)
    } else {
      // Smooth run to end
      playerTransition.value = 'left 2.2s cubic-bezier(0.25, 1, 0.5, 1)'
      playerLeft.value = 'calc(100% - 60px)'
      setTimeout(() => {
        emit('notify', props.isEn ? '✅ Smooth movement with Composite Collider 2D!' : '✅ انزلاق ناعم ومثالي بفضل Composite Collider!')
        isTesting.value = false
      }, 2300)
    }
  }, 50)
}
</script>

<style scoped>
.physics-widget {
  width: 100%;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 18px 0 24px;
}
@media (max-width: 800px) {
  .steps-grid {
    grid-template-columns: 1fr;
  }
}

.step-card {
  background: var(--surface, #ffffff);
  border: 1.5px solid var(--border, #fef08a);
  border-radius: var(--radius-sm, 10px);
  padding: 18px;
  position: relative;
}
.step-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 10px;
  border-radius: 12px;
  margin-bottom: 8px;
}
.step-tag.red {
  background: #fee2e2;
  color: #dc2626;
}
[data-theme="dark"] .step-tag.red {
  background: rgba(220, 38, 38, 0.25);
  color: #fca5a5;
}
.step-tag.green {
  background: #dcfce7;
  color: #16a34a;
}
[data-theme="dark"] .step-tag.green {
  background: rgba(22, 163, 74, 0.25);
  color: #86efac;
}
.step-tag.amber {
  background: var(--brand-soft, #fef3c7);
  color: var(--brand, #b45309);
}

.step-card h4 {
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 6px;
  color: var(--text-main, #1c1917);
}
.step-card p {
  font-size: 13px;
  color: var(--text-muted, #57534e);
  line-height: 1.6;
  margin: 0;
}

/* Simulation Box */
.physics-sim-box {
  background: var(--brand-soft, #fefce8);
  border: 1.5px solid var(--brand-border, #fef08a);
  border-radius: var(--radius-md, 14px);
  padding: 22px;
  margin: 20px 0;
}

.sim-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}
.sim-title {
  font-size: 15px;
  font-weight: 800;
  color: var(--text-main, #1c1917);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}
.sim-title i {
  color: var(--brand, #d97706);
}

.test-btn {
  background: var(--brand, #d97706);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm, 8px);
  padding: 8px 18px;
  font-family: inherit;
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}
.test-btn:hover:not(:disabled) {
  background: var(--brand-mid, #b45309);
  transform: translateY(-1px);
}
.test-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.physics-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.phys-tab {
  flex: 1;
  min-width: 220px;
  padding: 10px 16px;
  background: var(--surface, #ffffff);
  border: 2px solid var(--border, #fef08a);
  border-radius: var(--radius-sm, 8px);
  cursor: pointer;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  color: var(--text-muted, #57534e);
}
.phys-tab:hover {
  border-color: var(--brand, #d97706);
  color: var(--text-main, #1c1917);
}
.phys-tab.active {
  background: var(--brand-soft, #fef3c7);
  border-color: var(--brand, #d97706);
  color: var(--brand, #d97706);
}

.physics-stage-wrapper {
  position: relative;
  background: #0f172a;
  border: 2px solid #334155;
  border-radius: var(--radius-sm, 10px);
  height: 180px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 16px 16px;
  margin-bottom: 16px;
  direction: ltr !important;
}

.phys-character {
  position: absolute;
  bottom: 60px;
  width: 40px;
  height: 48px;
  background: #f59e0b;
  border: 2px solid #b45309;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 22px;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
  z-index: 20;
}
.phys-character.snagged {
  background: #ef4444;
  border-color: #7f1d1d;
  color: #fff;
  animation: snagShake 0.3s ease infinite;
}

@keyframes snagShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px) rotate(-6deg); }
  75% { transform: translateX(4px) rotate(6deg); }
}

.phys-ground-row {
  display: flex;
  gap: 2px;
  position: relative;
  z-index: 10;
  width: 100%;
}

.composite-boundary {
  position: absolute;
  inset: -3px;
  border: 3.5px solid #10b981;
  border-radius: 4px;
  pointer-events: none;
  z-index: 15;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
}

.phys-block {
  flex: 1;
  height: 48px;
  background-image: url('/assets/dirt_tile.jpg');
  background-size: cover;
  background-position: center;
  border-top: 6px solid #22c55e;
  position: relative;
  box-sizing: border-box;
}
.phys-block.seam-mode {
  outline: 2px dashed #ef4444;
  outline-offset: -2px;
}

.phys-status-banner {
  padding: 12px 16px;
  border-radius: var(--radius-sm, 8px);
  font-size: 13px;
  line-height: 1.6;
  display: flex;
  align-items: center;
  gap: 10px;
}
.phys-status-banner.danger {
  background: #fee2e2;
  border: 1px solid #f87171;
  color: #991b1b;
}
[data-theme="dark"] .phys-status-banner.danger {
  background: rgba(220, 38, 38, 0.25);
  border-color: #ef4444;
  color: #fca5a5;
}
.phys-status-banner.success {
  background: #dcfce7;
  border: 1px solid #4ade80;
  color: #166534;
}
[data-theme="dark"] .phys-status-banner.success {
  background: rgba(22, 163, 74, 0.25);
  border-color: #22c55e;
  color: #86efac;
}

/* Tables */
.table-title {
  font-size: 16px;
  font-weight: 800;
  margin: 24px 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-main, #1c1917);
}
.table-title i {
  color: var(--brand, #d97706);
}

.table-container {
  overflow-x: auto;
}
.standard-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid var(--border, #fef08a);
  border-radius: var(--radius-sm, 10px);
  overflow: hidden;
  font-size: 13px;
  background: var(--surface, #ffffff);
}
.standard-table th, .standard-table td {
  padding: 10px 14px;
  text-align: right;
  border-bottom: 1px solid var(--border, #fef08a);
}
.standard-table th {
  background: var(--brand-soft, #fef3c7);
  font-weight: 800;
  color: var(--brand, #d97706);
}
.standard-table td {
  color: var(--text-main, #1c1917);
}
.standard-table tr:last-child td {
  border-bottom: none;
}
.standard-table tr:hover td {
  background: var(--brand-soft, #fefce8);
}

.layer-tag {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
}
.layer-tag.bg {
  background: var(--surface, #f1f5f9);
  color: var(--text-muted, #475569);
  border: 1px solid var(--border, #cbd5e1);
}
.layer-tag.def {
  background: var(--brand-soft, #fef3c7);
  color: var(--brand, #b45309);
  border: 1px solid var(--brand-border, #fcd34d);
}
.layer-tag.fg {
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
}
[data-theme="dark"] .layer-tag.fg {
  background: rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
  border-color: rgba(16, 185, 129, 0.35);
}
</style>