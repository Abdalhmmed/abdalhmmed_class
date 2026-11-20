<template>
  <div class="rule-sim-widget">
    <div class="sim-grid">
      <!-- 3x3 Matrix Interaction -->
      <div class="matrix-card">
        <h4 class="card-title">
          <i class="fa-solid fa-compass"></i>
          <span>{{ isEn ? '3×3 Neighbor Inspection Matrix' : 'شبكة فحص الجيران (Neighbor Matrix)' }}</span>
        </h4>
        <p class="card-desc">
          {{
            isEn
              ? 'Click any neighbor cell to cycle condition: Connected (This) / Empty (Not This) / Ignore (Don\'t Care):'
              : 'انقر على أي خلية مجاورة للتبديل بين الحالات: متصل This / غير متصل Not This / لا يهم Don\'t Care:'
          }}
        </p>

        <div class="matrix-3x3">
          <div class="matrix-cell" :class="state.NW" @click="cycle('NW')">
            <span>NW</span><small>{{ getCellLabel('NW') }}</small>
          </div>
          <div class="matrix-cell" :class="state.N" @click="cycle('N')">
            <span>N</span><small>{{ getCellLabel('N') }}</small>
          </div>
          <div class="matrix-cell" :class="state.NE" @click="cycle('NE')">
            <span>NE</span><small>{{ getCellLabel('NE') }}</small>
          </div>

          <div class="matrix-cell" :class="state.W" @click="cycle('W')">
            <span>W</span><small>{{ getCellLabel('W') }}</small>
          </div>
          <div class="matrix-cell center-cell">
            <img :src="centerTileImg" alt="Grass Tile" class="center-tile-thumb" />
            <span class="center-badge">X</span>
            <small class="center-lbl">{{ isEn ? 'Center Tile' : 'القطعة الحالية' }}</small>
          </div>
          <div class="matrix-cell" :class="state.E" @click="cycle('E')">
            <span>E</span><small>{{ getCellLabel('E') }}</small>
          </div>

          <div class="matrix-cell" :class="state.SW" @click="cycle('SW')">
            <span>SW</span><small>{{ getCellLabel('SW') }}</small>
          </div>
          <div class="matrix-cell" :class="state.S" @click="cycle('S')">
            <span>S</span><small>{{ getCellLabel('S') }}</small>
          </div>
          <div class="matrix-cell" :class="state.SE" @click="cycle('SE')">
            <span>SE</span><small>{{ getCellLabel('SE') }}</small>
          </div>
        </div>

        <!-- Presets Buttons -->
        <div class="presets-row">
          <button class="preset-btn" @click="applyPreset('top')">{{ isEn ? 'Top Edge' : 'حافة علوية' }}</button>
          <button class="preset-btn" @click="applyPreset('right')">{{ isEn ? 'Right Edge' : 'حافة يمنى' }}</button>
          <button class="preset-btn" @click="applyPreset('corner')">{{ isEn ? 'Top Corner' : 'زاوية علوية' }}</button>
          <button class="preset-btn" @click="applyPreset('center')">{{ isEn ? 'Center Dirt' : 'وسط الأرض' }}</button>
          <button class="preset-btn" @click="applyPreset('single')">{{ isEn ? 'Floating Block' : 'قطعة منفردة' }}</button>
        </div>
      </div>

      <!-- Result Sprite Preview -->
      <div class="result-card">
        <h4 class="card-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>{{ isEn ? 'Automatically Selected Sprite' : 'النتيجة التلقائية المحسوبة' }}</span>
        </h4>

        <div class="sprite-preview" :class="ruleResult.className">
          <div class="preview-tile-graphic" :class="ruleResult.className">
            <img
              :src="ruleResult.image"
              :alt="isEn ? ruleResult.titleEn : ruleResult.title"
              class="preview-tile-img"
            />
            <span class="preview-edge-badge" :title="isEn ? ruleResult.titleEn : ruleResult.title">
              <i :class="ruleResult.icon"></i>
            </span>
          </div>
        </div>
        <div class="preview-file-tag">
          <i class="fa-regular fa-image"></i>
          <span>{{ ruleResult.assetTag }}</span>
        </div>

        <div class="rule-name">{{ isEn ? ruleResult.titleEn : ruleResult.title }}</div>
        <div class="rule-desc">{{ isEn ? ruleResult.descEn : ruleResult.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import grassTileUrl from '@/../assets/grass_tile.jpg'
import dirtTileUrl from '@/../assets/dirt_tile.jpg'

const props = defineProps({
  isEn: { type: Boolean, default: false }
})

const centerTileImg = grassTileUrl

const state = reactive({
  NW: 'dont-care',
  N: 'not-this',
  NE: 'dont-care',
  W: 'this',
  E: 'this',
  SW: 'dont-care',
  S: 'this',
  SE: 'dont-care'
})

const cycleOrder = ['dont-care', 'this', 'not-this']

function cycle(key) {
  const currentIdx = cycleOrder.indexOf(state[key])
  state[key] = cycleOrder[(currentIdx + 1) % cycleOrder.length]
}

function getCellLabel(key) {
  const st = state[key]
  const symbol = st === 'this' ? '✓' : (st === 'not-this' ? '✕' : '—')
  return symbol
}

function applyPreset(type) {
  if (type === 'top') {
    state.N = 'not-this'; state.S = 'this'; state.E = 'this'; state.W = 'this'
  } else if (type === 'right') {
    state.N = 'this'; state.S = 'this'; state.W = 'this'; state.E = 'not-this'
  } else if (type === 'corner') {
    state.N = 'not-this'; state.W = 'not-this'; state.E = 'this'; state.S = 'this'
  } else if (type === 'center') {
    state.N = 'this'; state.S = 'this'; state.E = 'this'; state.W = 'this'
  } else if (type === 'single') {
    state.N = 'not-this'; state.S = 'not-this'; state.E = 'not-this'; state.W = 'not-this'
  }
}

const ruleResult = computed(() => {
  const { N, S, E, W } = state

  if (N === 'not-this' && W === 'not-this' && E === 'this' && S === 'this') {
    return {
      className: 'corner-tl',
      image: grassTileUrl,
      assetTag: 'grass_tile.jpg · Top-Left Corner',
      icon: 'fa-solid fa-turn-up',
      title: 'زاوية علوية يسرى (Top-Left Corner)',
      titleEn: 'Top-Left Corner Tile',
      desc: 'الجانب العلوي والأيسر فارغان؛ يختار Rule Tile قطعة الزاوية العشبية المنحنية.',
      descEn: 'Top and Left neighbors are empty; Unity automatically places the top-left grass corner sprite.'
    }
  }

  if (N === 'not-this' && E === 'not-this' && W === 'this' && S === 'this') {
    return {
      className: 'corner-tr',
      image: grassTileUrl,
      assetTag: 'grass_tile.jpg · Top-Right Corner',
      icon: 'fa-solid fa-turn-up fa-flip-horizontal',
      title: 'زاوية علوية يمنى (Top-Right Corner)',
      titleEn: 'Top-Right Corner Tile',
      desc: 'الجانب العلوي والأيمن فارغان؛ يختار المحرك زاوية الحافة العشبية اليمنى.',
      descEn: 'Top and Right neighbors are empty; Unity places the top-right grass corner sprite.'
    }
  }

  if (N === 'this' && S === 'this' && E === 'not-this' && W === 'this') {
    return {
      className: 'edge-right',
      image: dirtTileUrl,
      assetTag: 'dirt_tile.jpg · Right Cliff Edge',
      icon: 'fa-solid fa-arrow-right',
      title: 'حافة يمنى (Right Edge Tile)',
      titleEn: 'Right Edge Tile',
      desc: 'الجهة اليمنى فارغة بينما الأعلى متصل؛ يضع Rule Tile جدار الحافة اليمنى للأرضية.',
      descEn: 'Right neighbor is empty while top is connected; places the right dirt cliff edge.'
    }
  }

  if (N === 'this' && S === 'this' && E === 'this' && W === 'this') {
    return {
      className: 'dirt-center',
      image: dirtTileUrl,
      assetTag: 'dirt_tile.jpg · Inner Center',
      icon: 'fa-solid fa-border-all',
      title: 'وسط الأرضية (Inner Center Dirt)',
      titleEn: 'Inner Center Dirt Tile',
      desc: 'كل الجيران الأربعة متصلون بالكامل؛ يتم استبدال العشب بقطعة التراب الداخلية العميقة.',
      descEn: 'All cardinal neighbors are connected; Unity switches from grass to deep inner dirt.'
    }
  }

  if (N === 'not-this' && S === 'not-this' && E === 'not-this' && W === 'not-this') {
    return {
      className: 'single-float',
      image: grassTileUrl,
      assetTag: 'grass_tile.jpg · Floating Block',
      icon: 'fa-solid fa-cube',
      title: 'قطعة عشبية منفردة معلقة (Floating Block)',
      titleEn: 'Floating Single Grass Block',
      desc: 'لا يوجد أي جار متصل؛ يعرض المحرك قطعة عشب حرة منفردة محاطة بالحواف من كل الجهات.',
      descEn: 'No adjacent neighbors are connected; Unity renders an isolated floating grass block.'
    }
  }

  return {
    className: 'grass-top',
    image: grassTileUrl,
    assetTag: 'grass_tile.jpg · Walkable Top Surface',
    icon: 'fa-solid fa-arrow-up',
    title: 'حافة علوية عشبية (Top Grass Edge Tile)',
    titleEn: 'Top Grass Edge Tile',
    desc: 'الأرض متصلة من الجوانب والأسفل والأعلى فارغ؛ يختار المحرك بلاطة أرضية العشب كسطح للمشي.',
    descEn: 'Bottom and side neighbors connected with top empty; default walkable grass ground surface.'
  }
})
</script>

<style scoped>
.rule-sim-widget {
  background: var(--brand-soft, #fefce8);
  border: 1.5px solid var(--brand-border, #fef08a);
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
}
.sim-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
}
@media (max-width: 800px) {
  .sim-grid {
    grid-template-columns: 1fr;
  }
}
.matrix-card, .result-card {
  background: var(--surface, #fff);
  border: 1px solid var(--border, #fef08a);
  border-radius: 14px;
  padding: 22px;
  display: flex;
  flex-direction: column;
}
.card-title {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 800;
  color: var(--brand, #b45309);
  display: flex;
  align-items: center;
  gap: 8px;
}
.card-desc {
  font-size: 13px;
  color: var(--text-muted, #57534e);
  margin-bottom: 16px;
  line-height: 1.6;
}
.matrix-3x3 {
  display: grid;
  grid-template-columns: repeat(3, 76px);
  gap: 10px;
  justify-content: center;
  margin: 10px 0 16px;
}
.matrix-cell {
  height: 74px;
  border: 2px solid var(--border, #fef08a);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
  font-weight: 800;
  font-size: 13px;
  background: var(--surface, #fff);
  color: var(--text-main, #1c1917);
}
.matrix-cell:hover {
  transform: scale(1.04);
}
.matrix-cell.this {
  background: #dcfce7;
  border-color: #16a34a;
  color: #15803d;
}
[data-theme="dark"] .matrix-cell.this {
  background: rgba(22, 163, 74, 0.25);
  border-color: #22c55e;
  color: #86efac;
}
.matrix-cell.not-this {
  background: #fee2e2;
  border-color: #dc2626;
  color: #b91c1c;
}
[data-theme="dark"] .matrix-cell.not-this {
  background: rgba(220, 38, 38, 0.25);
  border-color: #ef4444;
  color: #fca5a5;
}
.matrix-cell.dont-care {
  background: var(--brand-soft, #fefce8);
  border-color: var(--border, #e7e5e4);
  color: var(--text-muted, #57534e);
}
.matrix-cell.center-cell {
  position: relative;
  overflow: hidden;
  background: #141414;
  border-color: var(--brand, #d97706);
  color: #fff;
  cursor: default;
}
.center-tile-thumb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.62);
  image-rendering: pixelated;
  opacity: 0.45;
  pointer-events: none;
}
.center-badge,
.center-lbl {
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.85);
}
.center-lbl {
  font-size: 10px;
}
.presets-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-top: auto;
}
.preset-btn {
  font-size: 12px;
  font-weight: 700;
  background: var(--brand-soft, #fefce8);
  border: 1px solid var(--brand-border, #fef08a);
  color: var(--brand, #78350f);
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.preset-btn:hover {
  background: var(--brand, #fef3c7);
  color: #fff;
  border-color: var(--brand, #d97706);
}
.result-card {
  align-items: center;
  justify-content: center;
  text-align: center;
}
.sprite-preview {
  width: 128px;
  height: 128px;
  border: 3px solid var(--brand, #d97706);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0 10px;
  background: #141414;
  padding: 6px;
  box-shadow: 0 8px 20px rgba(217, 119, 6, 0.22);
  transition: all 0.25s ease;
}
.preview-tile-graphic {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  background: #141414;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: all 0.25s ease;
}
.preview-tile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.62);
  image-rendering: pixelated;
  display: block;
}
.preview-edge-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #86efac;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
}
.preview-tile-graphic.grass-top {
  border-top: 4px solid #4ade80;
  box-shadow: inset 0 4px 10px rgba(74, 222, 128, 0.35);
}
.preview-tile-graphic.corner-tl {
  border-top-left-radius: 22px;
  border-top: 4px solid #4ade80;
  border-left: 4px solid #4ade80;
}
.preview-tile-graphic.corner-tr {
  border-top-right-radius: 22px;
  border-top: 4px solid #4ade80;
  border-right: 4px solid #4ade80;
}
.preview-tile-graphic.edge-right {
  border-right: 4px solid #f59e0b;
  box-shadow: inset -4px 0 10px rgba(245, 158, 11, 0.3);
}
.preview-tile-graphic.dirt-center {
  border: 2px solid rgba(120, 53, 15, 0.7);
}
.preview-tile-graphic.single-float {
  border-radius: 16px;
  border: 3px solid #4ade80;
  box-shadow: 0 0 14px rgba(74, 222, 128, 0.45);
}
.preview-file-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono, monospace);
  font-size: 11.5px;
  font-weight: 700;
  color: var(--brand, #b45309);
  background: var(--brand-soft, #fefce8);
  border: 1px solid var(--brand-border, #fef08a);
  padding: 3px 10px;
  border-radius: 999px;
  margin-bottom: 10px;
}

.rule-name {
  font-size: 16px;
  font-weight: 800;
  color: var(--text-main, #1c1917);
  margin-bottom: 6px;
}
.rule-desc {
  font-size: 13.5px;
  color: var(--text-muted, #57534e);
  line-height: 1.6;
}
</style>
