<template>
  <div class="painter-widget">
    <div class="painter-container">
      <!-- Sidebar Palette & Tools -->
      <div class="painter-sidebar">
        <div class="palette-section-title">
          <i class="fa-solid fa-swatchbook"></i>
          <span>{{ isEn ? 'Tile Palette (Assets)' : 'لوحة القطع (Tiles)' }}</span>
        </div>

        <div class="brush-palette">
          <button
            type="button"
            class="brush-item"
            :class="{ active: currentTileType === 'grass' }"
            @click="currentTileType = 'grass'"
          >
            <div class="tile-sample-icon tile-grass"></div>
            <span>{{ isEn ? 'Grass' : 'عشب' }}</span>
          </button>

          <button
            type="button"
            class="brush-item"
            :class="{ active: currentTileType === 'dirt' }"
            @click="currentTileType = 'dirt'"
          >
            <div class="tile-sample-icon tile-dirt"></div>
            <span>{{ isEn ? 'Dirt' : 'تراب' }}</span>
          </button>

          <button
            type="button"
            class="brush-item"
            :class="{ active: currentTileType === 'stone' }"
            @click="currentTileType = 'stone'"
          >
            <div class="tile-sample-icon tile-stone"></div>
            <span>{{ isEn ? 'Stone' : 'صخر' }}</span>
          </button>

          <button
            type="button"
            class="brush-item"
            :class="{ active: currentTileType === 'empty' }"
            @click="currentTileType = 'empty'"
          >
            <div class="tile-sample-icon tile-empty">
              <i class="fa-solid fa-eraser"></i>
            </div>
            <span>{{ isEn ? 'Erase' : 'فارغ' }}</span>
          </button>
        </div>

        <div class="palette-section-title">
          <i class="fa-solid fa-shapes"></i>
          <span>{{ isEn ? 'Quick Level Presets' : 'نماذج سريعة جاهزة' }}</span>
        </div>

        <div class="presets-col">
          <button type="button" class="action-btn" @click="loadPreset('island')">
            <i class="fa-solid fa-cloud"></i>
            <span>{{ isEn ? 'Floating Island' : 'جزيرة معلقة (Floating Island)' }}</span>
          </button>
          <button type="button" class="action-btn" @click="loadPreset('stairs')">
            <i class="fa-solid fa-stairs"></i>
            <span>{{ isEn ? 'Stairs & Hills' : 'مضمار قفز وتلال' }}</span>
          </button>
          <button type="button" class="action-btn" @click="loadPreset('chasm')">
            <i class="fa-solid fa-mountain"></i>
            <span>{{ isEn ? 'Pit & Cliffs' : 'جرفان مع هوة (Pit & Cliffs)' }}</span>
          </button>
        </div>

        <div class="palette-section-title">
          <i class="fa-solid fa-tools"></i>
          <span>{{ isEn ? 'Painting Tools' : 'أدوات الرسم' }}</span>
        </div>

        <div class="tools-group">
          <button
            type="button"
            class="action-btn"
            :class="{ active: currentTool === 'paint' }"
            @click="currentTool = 'paint'"
          >
            <i class="fa-solid fa-paint-brush"></i>
            <span>{{ isEn ? 'Paint Brush' : 'فرشاة الرسم (Paint)' }}</span>
          </button>

          <button
            type="button"
            class="action-btn"
            :class="{ active: currentTool === 'box' }"
            @click="currentTool = 'box'"
          >
            <i class="fa-solid fa-vector-square"></i>
            <span>{{ isEn ? 'Box Fill (2×3)' : 'ملء مستطيل (Box Fill)' }}</span>
          </button>

          <button
            type="button"
            class="action-btn"
            :class="{ active: currentTool === 'erase' }"
            @click="currentTool = 'erase'"
          >
            <i class="fa-solid fa-eraser"></i>
            <span>{{ isEn ? 'Erase Tool' : 'ممحاة (Erase Tool)' }}</span>
          </button>

          <button type="button" class="action-btn clear-btn" @click="clearGrid">
            <i class="fa-solid fa-trash-can"></i>
            <span>{{ isEn ? 'Clear Grid' : 'مسح الخريطة بالكامل' }}</span>
          </button>
        </div>

        <div class="callout-yellow-sm">
          <i class="fa-solid fa-lightbulb"></i>
          <span>
            <b>{{ isEn ? 'Lab Exercise:' : 'تطبيق المعمل:' }}</b>
            {{ isEn ? 'Paint an 8-cell dirt base, then top it with grass to build a solid platform.' : 'ارسم مسطحاً ترابياً بعرض 8 خلايا، ثم ضع طبقة عشب في الأعلى لتكوين منصة قفز صلبة.' }}
          </span>
        </div>
      </div>

      <!-- Painter Canvas Board -->
      <div class="painter-board">
        <div class="board-header">
          <div class="layer-pill">
            <i class="fa-solid fa-layer-group"></i>
            <span>{{ isEn ? 'Active Layer: ' : 'الطبقة الحالية: ' }}</span>
            <code class="copy-pill" @click="copyLayerName">Ground_Tilemap <i class="fa-solid fa-copy"></i></code>
          </div>

          <div class="stats-group">
            <span class="coord-stat">
              <i class="fa-solid fa-crosshairs"></i>
              <span>X: {{ hoveredCoord.x }}, Y: {{ hoveredCoord.y }}</span>
            </span>
            <span class="tile-count-stat">
              {{ isEn ? 'Painted Tiles: ' : 'القطع المرسومة: ' }}<b>{{ paintedCount }}</b>
            </span>
          </div>
        </div>

        <div
          class="grid-canvas"
          @mouseleave="stopPainting"
          @mouseup="stopPainting"
        >
          <div
            v-for="(tile, idx) in gridData"
            :key="idx"
            class="cell-tile"
            :class="tileClass(tile)"
            @mousedown="startPainting(idx)"
            @mouseenter="onCellHover(idx)"
          ></div>
        </div>

        <div class="canvas-tip">
          <i class="fa-solid fa-hand-pointer"></i>
          <span>{{ isEn ? 'Click & Drag anywhere on the grid to paint continuously.' : 'ميزة السحب السريع: انقر واستمر بالضغط مع تحريك الفأرة للرسم المستمر بكل سلاسة.' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isEn: { type: Boolean, default: false }
})

const emit = defineEmits(['notify'])

const COLS = 12
const ROWS = 7
const TOTAL_CELLS = COLS * ROWS

const currentTileType = ref('grass')
const currentTool = ref('paint')
const isMouseDown = ref(false)
const hoveredCoord = ref({ x: '--', y: '--' })

// Initial state: platform preset
const gridData = ref(createInitialGrid())

function createInitialGrid() {
  const arr = new Array(TOTAL_CELLS).fill('empty')
  // Grass top at row 4 (cols 2 to 9)
  for (let c = 2; c <= 9; c++) {
    arr[4 * COLS + c] = 'grass'
  }
  // Dirt at rows 5 & 6 (cols 2 to 9)
  for (let r = 5; r <= 6; r++) {
    for (let c = 2; c <= 9; c++) {
      arr[r * COLS + c] = 'dirt'
    }
  }
  return arr
}

const paintedCount = computed(() => {
  return gridData.value.filter(t => t !== 'empty').length
})

function tileClass(tile) {
  if (tile === 'grass') return 'tile-cell-grass'
  if (tile === 'dirt') return 'tile-cell-dirt'
  if (tile === 'stone') return 'tile-cell-stone'
  return 'tile-cell-empty'
}

function applyAction(index) {
  if (currentTool.value === 'paint') {
    gridData.value[index] = currentTileType.value
  } else if (currentTool.value === 'erase') {
    gridData.value[index] = 'empty'
  } else if (currentTool.value === 'box') {
    const r = Math.floor(index / COLS)
    const c = index % COLS
    for (let dr = 0; dr < 2; dr++) {
      for (let dc = 0; dc < 3; dc++) {
        const nr = r + dr
        const nc = c + dc
        if (nr < ROWS && nc < COLS) {
          gridData.value[nr * COLS + nc] = currentTileType.value
        }
      }
    }
  }
}

function startPainting(index) {
  isMouseDown.value = true
  applyAction(index)
}

function onCellHover(index) {
  const r = Math.floor(index / COLS)
  const c = index % COLS
  hoveredCoord.value = { x: c, y: ROWS - 1 - r } // Unity style origin at bottom
  if (isMouseDown.value) {
    applyAction(index)
  }
}

function stopPainting() {
  isMouseDown.value = false
}

function clearGrid() {
  gridData.value = new Array(TOTAL_CELLS).fill('empty')
  emit('notify', props.isEn ? 'Tilemap canvas cleared' : 'تم مسح رقعة الخريطة بالكامل')
}

function loadPreset(type) {
  const arr = new Array(TOTAL_CELLS).fill('empty')
  if (type === 'island') {
    // Floating island in the sky
    for (let c = 3; c <= 8; c++) arr[2 * COLS + c] = 'grass'
    for (let c = 4; c <= 7; c++) arr[3 * COLS + c] = 'dirt'
    for (let c = 5; c <= 6; c++) arr[4 * COLS + c] = 'stone'
  } else if (type === 'stairs') {
    // Stepped hill
    for (let c = 0; c <= 3; c++) arr[5 * COLS + c] = 'grass'
    for (let c = 0; c <= 3; c++) arr[6 * COLS + c] = 'dirt'
    for (let c = 4; c <= 7; c++) arr[4 * COLS + c] = 'grass'
    for (let c = 4; c <= 7; c++) arr[5 * COLS + c] = 'dirt'
    for (let c = 4; c <= 7; c++) arr[6 * COLS + c] = 'stone'
    for (let c = 8; c <= 11; c++) arr[3 * COLS + c] = 'grass'
    for (let c = 8; c <= 11; c++) arr[4 * COLS + c] = 'dirt'
    for (let c = 8; c <= 11; c++) arr[5 * COLS + c] = 'stone'
    for (let c = 8; c <= 11; c++) arr[6 * COLS + c] = 'stone'
  } else if (type === 'chasm') {
    // Two high pillars with a deadly pit in between
    for (let c = 0; c <= 3; c++) {
      arr[3 * COLS + c] = 'grass'
      arr[4 * COLS + c] = 'dirt'
      arr[5 * COLS + c] = 'stone'
      arr[6 * COLS + c] = 'stone'
    }
    for (let c = 8; c <= 11; c++) {
      arr[3 * COLS + c] = 'grass'
      arr[4 * COLS + c] = 'dirt'
      arr[5 * COLS + c] = 'stone'
      arr[6 * COLS + c] = 'stone'
    }
  }
  gridData.value = arr
  emit('notify', props.isEn ? 'Level preset applied' : 'تم تحميل النموذج الجاهز بنجاح')
}

function copyLayerName() {
  navigator.clipboard?.writeText('Ground_Tilemap')
  emit('notify', props.isEn ? 'Copied Ground_Tilemap to clipboard' : 'تم نسخ اسم الطبقة Ground_Tilemap')
}
</script>

<style scoped>
.painter-widget {
  width: 100%;
}

.painter-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  margin: 18px 0;
}
@media (max-width: 900px) {
  .painter-container {
    grid-template-columns: 1fr;
  }
}

.painter-sidebar {
  background: var(--brand-soft, #fefce8);
  border: 1.5px solid var(--brand-border, #fef08a);
  border-radius: var(--radius-md, 14px);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.palette-section-title {
  font-size: 13px;
  font-weight: 800;
  color: var(--brand, #d97706);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.brush-palette {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 18px;
}

.brush-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 8px;
  background: var(--surface, #ffffff);
  border: 2px solid var(--border, #fef08a);
  border-radius: var(--radius-sm, 8px);
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text-main, #1c1917);
  gap: 6px;
}
.brush-item:hover {
  border-color: var(--brand, #d97706);
  transform: translateY(-1px);
}
.brush-item.active {
  border-color: var(--brand, #d97706);
  background: var(--brand-soft, #fef3c7);
  color: var(--brand, #d97706);
  font-weight: 800;
  box-shadow: 0 4px 10px rgba(217, 119, 6, 0.15);
}

.tile-sample-icon {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.12);
  background-size: cover !important;
  background-position: center !important;
}
.tile-grass {
  background-image: url('/assets/grass_tile.jpg') !important;
  border: 2px solid #22c55e;
}
.tile-dirt {
  background-image: url('/assets/dirt_tile.jpg') !important;
  border: 2px solid #92400e;
}
.tile-stone {
  background-image: url('/assets/stone_tile.jpg') !important;
  border: 2px solid #64748b;
}
.tile-empty {
  background: transparent !important;
  border: 2px dashed #a8a29e;
  color: var(--text-muted, #78716c);
}

.presets-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
}

.tools-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.action-btn {
  background: var(--surface, #ffffff);
  color: var(--text-main, #1c1917);
  border: 1.5px solid var(--border, #fef08a);
  border-radius: var(--radius-sm, 8px);
  padding: 8px 12px;
  font-family: inherit;
  font-weight: 700;
  font-size: 12.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  text-align: right;
}
.action-btn:hover {
  background: var(--brand-soft, #fef3c7);
  border-color: var(--brand, #d97706);
}
.action-btn.active {
  background: var(--brand, #d97706);
  color: #fff;
  border-color: var(--brand, #d97706);
  font-weight: 800;
}
.clear-btn {
  color: #dc2626;
  border-color: #fca5a5;
  margin-top: 4px;
}
.clear-btn:hover {
  background: #fee2e2;
  border-color: #ef4444;
}
[data-theme="dark"] .clear-btn {
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.4);
}
[data-theme="dark"] .clear-btn:hover {
  background: rgba(220, 38, 38, 0.25);
  border-color: #ef4444;
}

.callout-yellow-sm {
  background: var(--surface, #fff);
  border: 1px solid var(--border, #fef08a);
  border-radius: var(--radius-sm, 8px);
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-muted, #57534e);
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
.callout-yellow-sm i {
  color: var(--brand, #d97706);
  margin-top: 2px;
}

/* Canvas Board */
.painter-board {
  background: var(--surface, #ffffff);
  border: 1.5px solid var(--border, #fef08a);
  border-radius: var(--radius-md, 14px);
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px dashed var(--border, #fef08a);
}

.layer-pill {
  font-weight: 800;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.copy-pill {
  background: var(--brand-soft, #fef3c7);
  color: var(--brand, #d97706);
  padding: 3px 10px;
  border-radius: 6px;
  border: 1px solid var(--brand-border, #fcd34d);
  cursor: pointer;
  font-family: var(--font-mono, 'Fira Code', monospace);
  font-size: 12.5px;
  direction: ltr;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.copy-pill:hover {
  background: var(--brand, #d97706);
  color: #fff;
}

.stats-group {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: var(--font-mono, 'Fira Code', monospace);
}
.coord-stat {
  font-size: 12px;
  color: var(--text-muted, #57534e);
  display: flex;
  align-items: center;
  gap: 5px;
}
.tile-count-stat {
  font-size: 13px;
  color: var(--brand, #d97706);
}

.grid-canvas {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3px;
  background: #0f172a;
  padding: 12px;
  border-radius: 12px;
  border: 2px solid #334155;
  user-select: none;
  aspect-ratio: 12 / 7;
}

.cell-tile {
  aspect-ratio: 1;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: crosshair;
  background-size: cover !important;
  background-position: center !important;
  transition: transform 0.08s ease;
}
.cell-tile:hover {
  transform: scale(1.08);
  border-color: #f59e0b;
  z-index: 5;
}

.tile-cell-grass {
  background-image: url('/assets/grass_tile.jpg') !important;
  border: 1px solid #22c55e;
}
.tile-cell-dirt {
  background-image: url('/assets/dirt_tile.jpg') !important;
  border: 1px solid #92400e;
}
.tile-cell-stone {
  background-image: url('/assets/stone_tile.jpg') !important;
  border: 1px solid #64748b;
}
.tile-cell-empty {
  background: rgba(255, 255, 255, 0.03);
}

.canvas-tip {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-muted, #57534e);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
</style>