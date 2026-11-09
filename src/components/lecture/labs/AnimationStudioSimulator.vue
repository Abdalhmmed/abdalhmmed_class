<template>
  <div class="anim-studio-container">
    <div class="studio-two-cols">
      <!-- COLUMN 1: VIEWPORT & DOPE SHEET (Appears on the RIGHT in RTL) -->
      <div class="studio-viewport-panel">
        <!-- 2D Game Stage Screen -->
        <div class="anim-stage-box">
          <!-- Animated Actor on Platform -->
          <div class="character-anchor" :class="{ 'coin-actor': currentClipKey === 'coin' }">
            <div class="sprite-graphic" v-html="currentFrameSvg"></div>
            <div class="character-shadow" :style="shadowStyle"></div>
          </div>

          <!-- 2D Ground Tilemap Platform (6 Grass Blocks) -->
          <div class="anim-ground-platform">
            <div v-for="b in 6" :key="b" class="grass-block"></div>
          </div>
        </div>

        <!-- Clip Title & Frame Indicator -->
        <div class="clip-label-group">
          <h4 class="active-clip-name">
            {{ isEn ? currentClipData.nameEn : currentClipData.name }}
          </h4>
          <span class="active-frame-num">
            {{ isEn ? `Current Frame: ${currentFrameIndex + 1} of ${totalFrames}` : `الإطار الحالي: ${currentFrameIndex + 1} من ${totalFrames}` }}
          </span>
        </div>

        <!-- Frame Slices Strip (F1 to Fn) -->
        <div class="slices-strip-container">
          <div class="strip-title">
            <i class="fa-solid fa-images"></i>
            <span>{{ isEn ? 'Sprite Sheet Frames (Click to inspect any frame):' : 'كوادر الـ Sprite Sheet (انقر لفحص أي كادر):' }}</span>
          </div>

          <div class="slices-row">
            <div
              v-for="(svg, idx) in currentFramesList"
              :key="idx"
              class="slice-box"
              :class="{ active: idx === currentFrameIndex }"
              @click="jumpToFrame(idx)"
            >
              <div class="slice-thumb" v-html="svg"></div>
              <span class="slice-f-tag">F{{ idx + 1 }}</span>
            </div>
          </div>
        </div>

        <!-- Unity Dope Sheet Timeline -->
        <div class="unity-dopesheet-widget">
          <div class="dopesheet-header">
            <div class="dopesheet-track-title">
              <i class="fa-brands fa-unity unity-icon"></i>
              <span>{{ isEn ? 'Unity Dope Sheet (Track: SpriteRenderer)' : 'Unity Dope Sheet (Track: SpriteRenderer)' }}</span>
            </div>
            <div class="dopesheet-timecode">
              F{{ currentFrameIndex + 1 }} · ({{ currentTimeSec }}s) 0:{{ currentFrameIndex < 10 ? '0' + currentFrameIndex : currentFrameIndex }}
            </div>
          </div>

          <div ref="rulerRef" class="dopesheet-track-ruler">
            <!-- Red playhead scrubber needle line -->
            <div
              class="dopesheet-playhead"
              :style="{ left: playheadPos + 'px' }"
            ></div>

            <!-- Keyframe Diamond Markers -->
            <div class="diamonds-strip">
              <div
                v-for="(svg, idx) in currentFramesList"
                :key="idx"
                ref="diamondRefs"
                class="keyframe-diamond"
                :class="{ active: idx === currentFrameIndex }"
                :title="isEn ? `Jump to Keyframe ${idx + 1}` : `انقر للانتقال إلى الإطار ${idx + 1}`"
                @click="jumpToFrame(idx)"
              ></div>
            </div>
          </div>

          <!-- Ruler time tick marks forced LTR -->
          <div class="dopesheet-ruler-labels">
            <span>0:00</span>
            <span>0:05</span>
            <span>0:10</span>
            <span>0:15</span>
            <span>0:20</span>
            <span>0:25</span>
          </div>
        </div>
      </div>

      <!-- COLUMN 2: UNIFIED CONTROL PANEL (Appears on the LEFT in RTL) -->
      <div class="studio-controls-panel">
        <!-- Row 1: Playback Buttons -->
        <div class="ctrl-row">
          <div class="ctrl-label-wrap">
            <i class="fa-solid fa-play ctrl-arrow-icon"></i>
            <span class="ctrl-label-bold">{{ isEn ? 'Frame Playback Controls:' : 'أزرار التحكم بالإطارات:' }}</span>
          </div>

          <div class="playback-actions-row">
            <button
              type="button"
              class="ctrl-action-btn"
              :title="isEn ? 'Previous Frame' : 'الإطار السابق'"
              @click="stepFrame(-1)"
            >
              <span>{{ isEn ? 'Prev' : 'السابق' }}</span>
              <i class="fa-solid fa-backward-step"></i>
            </button>

            <button
              type="button"
              class="ctrl-action-btn solid-orange-btn"
              @click="togglePlay"
            >
              <span>{{ isPlaying ? (isEn ? 'Pause' : 'إيقاف مؤقت') : (isEn ? 'Play' : 'تشغيل') }}</span>
              <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
            </button>

            <button
              type="button"
              class="ctrl-action-btn"
              :title="isEn ? 'Next Frame' : 'الإطار التالي'"
              @click="stepFrame(1)"
            >
              <i class="fa-solid fa-forward-step"></i>
              <span>{{ isEn ? 'Next' : 'التالي' }}</span>
            </button>
          </div>
        </div>

        <!-- Row 2: Frame Rate (Samples / FPS) -->
        <div class="ctrl-row">
          <div class="ctrl-label-wrap vertical">
            <div class="label-with-icon">
              <i class="fa-solid fa-gauge-high ctrl-arrow-icon"></i>
              <span class="ctrl-label-bold">{{ isEn ? 'Frame Rate:' : 'معدل الإطارات:' }}</span>
            </div>
            <span class="sub-param-label">:(Samples / FPS)</span>
          </div>

          <div class="slider-and-presets">
            <div class="slider-header-num">
              <span>FPS {{ fps }}</span>
            </div>
            <input
              v-model.number="fps"
              type="range"
              min="2"
              max="20"
              class="fps-slider"
              @change="restartTimer"
            >
            <div class="fps-preset-buttons">
              <button
                type="button"
                class="preset-pill"
                :class="{ active: fps === 12 }"
                @click="setFps(12)"
              >
                (Smooth) 12
              </button>
              <button
                type="button"
                class="preset-pill"
                :class="{ active: fps === 8 }"
                @click="setFps(8)"
              >
                (Normal) 8
              </button>
              <button
                type="button"
                class="preset-pill"
                :class="{ active: fps === 4 }"
                @click="setFps(4)"
              >
                (Retro) 4
              </button>
            </div>
          </div>
        </div>

        <!-- Row 3: Loop Time -->
        <div class="ctrl-row">
          <label class="loop-checkbox-container">
            <input
              v-model="isLoop"
              type="checkbox"
              class="orange-checkbox"
            >
            <span class="ctrl-label-bold">
              <i class="fa-solid fa-arrows-rotate"></i>
              {{ isEn ? 'Loop Time (Infinite Repeat):' : 'خاصية التكرار (Loop Time):' }}
            </span>
          </label>
        </div>

        <!-- Row 4: Clip Selector -->
        <div class="ctrl-row">
          <div class="ctrl-label-wrap">
            <i class="fa-solid fa-film ctrl-arrow-icon"></i>
            <span class="ctrl-label-bold">{{ isEn ? 'Active Animation Clip:' : 'كليب الحركة النشط:' }}</span>
          </div>

          <select
            v-model="currentClipKey"
            class="anim-clip-select"
            @change="onClipChange"
          >
            <option value="walk">🚶 مشي الشخصية الكلاسيكي (Hero Walk - 6 إطارات)</option>
            <option value="run">🏃 جري سريع وانسيابي (Hero Sprint - 6 إطارات)</option>
            <option value="slash">⚔️ هجوم وضربة سيف (Sword Slash - 4 إطارات)</option>
            <option value="coin">🪙 دوران عملة ذهبية (Coin Spin - 4 إطارات)</option>
            <option value="fire">🔥 شعلة نار بيئية (Torch Flame - 4 إطارات)</option>
          </select>
        </div>

        <!-- Unity Educational Rule Box -->
        <div class="unity-rule-box">
          <i class="fa-solid fa-circle-info"></i>
          <div>
            <b>{{ isEn ? 'Unity Engine Rule: ' : 'قاعدة محرك Unity: ' }}</b>
            <span>
              {{
                isEn
                  ? 'Dragging consecutive sprite frames into the Scene prompts you to save two linked assets: the .anim file (keyframes and sample rate) and the .controller file (the State Machine managing character transitions).'
                  : 'عند سحب مجموعة صور متتابعة إلى المشهد، يطلب منك Unity حفظ ملفين: الأول هو .anim (كليب الإطارات والسرعة) والثاني هو .controller (المتحكم المسؤول عن شجرة الحالات State Machine).'
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  isEn: { type: Boolean, default: false }
})

const emit = defineEmits(['notify'])

// 1. Classic Hero Walk (6 Frames)
function makeWalkHeroSvg(idx) {
  const poses = [
    { by: 0, lLeg: "M26 44 L19 61 L14 62", rLeg: "M38 44 L46 59 L51 60", lArm: "M22 28 L16 38", rArm: "M40 28 L48 38", lBoot: [10,60], rBoot: [47,58], cape: "M19 28 Q11 34 8 42 Q15 39 21 34" },
    { by: 3, lLeg: "M26 47 L23 62 L18 63", rLeg: "M38 47 L42 56 L44 54", lArm: "M22 31 L20 40", rArm: "M40 31 L42 40", lBoot: [14,61], rBoot: [41,52], cape: "M19 31 Q13 36 10 44 Q16 41 21 36" },
    { by: -3, lLeg: "M26 41 L27 60 L23 61", rLeg: "M38 41 L43 51 L39 57", lArm: "M22 25 L24 35", rArm: "M40 25 L38 35", lBoot: [19,59], rBoot: [36,55], cape: "M19 25 Q10 30 7 38 Q14 36 21 31" },
    { by: 0, lLeg: "M26 44 L17 59 L12 60", rLeg: "M38 44 L45 61 L50 62", lArm: "M22 28 L15 38", rArm: "M40 28 L47 38", lBoot: [8,58], rBoot: [46,60], cape: "M19 28 Q11 34 8 42 Q15 39 21 34" },
    { by: 3, lLeg: "M26 47 L22 56 L20 54", rLeg: "M38 47 L41 62 L46 63", lArm: "M22 31 L22 40", rArm: "M40 31 L40 40", lBoot: [17,52], rBoot: [42,61], cape: "M19 31 Q13 36 10 44 Q16 41 21 36" },
    { by: -3, lLeg: "M26 41 L21 51 L25 57", rLeg: "M38 41 L37 60 L41 61", lArm: "M22 25 L20 35", rArm: "M40 25 L42 35", lBoot: [22,55], rBoot: [37,59], cape: "M19 25 Q10 30 7 38 Q14 36 21 31" }
  ]
  const p = poses[idx % 6]
  return `<svg viewBox="0 0 64 76" width="68" height="78" style="display:block;margin:0 auto;overflow:visible;">
    <path d="${p.cape}" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5"/>
    <path d="${p.rLeg}" stroke="#1e3a8a" stroke-width="6" stroke-linecap="round"/>
    <rect x="${p.rBoot[0]}" y="${p.rBoot[1]}" width="10" height="6" rx="2" fill="#451a03"/>
    <rect x="22" y="${26 + p.by}" width="20" height="19" rx="4" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.5"/>
    <rect x="22" y="${39 + p.by}" width="20" height="5" fill="#78350f"/>
    <rect x="29" y="${39 + p.by}" width="6" height="5" fill="#facc15" stroke="#ca8a04" stroke-width="0.8"/>
    <path d="${p.lLeg}" stroke="#3b82f6" stroke-width="6.5" stroke-linecap="round"/>
    <rect x="${p.lBoot[0]}" y="${p.lBoot[1]}" width="11" height="6.5" rx="2" fill="#78350f" stroke="#451a03" stroke-width="1"/>
    <path d="${p.rArm}" stroke="#d97706" stroke-width="4.5" stroke-linecap="round"/>
    <rect x="21" y="${9 + p.by}" width="22" height="19" rx="5" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
    <rect x="25" y="${14 + p.by}" width="15" height="4" rx="1.5" fill="#0f172a"/>
    <rect x="27" y="${15 + p.by}" width="3.5" height="2" fill="#38bdf8"/>
    <rect x="34" y="${15 + p.by}" width="3.5" height="2" fill="#38bdf8"/>
    <path d="M29 ${9 + p.by} Q32 ${2 + p.by} 35 ${9 + p.by} Z" fill="#ef4444"/>
    <path d="${p.lArm}" stroke="#fbbf24" stroke-width="5" stroke-linecap="round"/>
  </svg>`
}

// 2. Hero Sprint (6 Frames)
function makeRunHeroSvg(idx) {
  const poses = [
    { by: 0, lLeg: "M26 44 L14 62 L9 63", rLeg: "M38 44 L50 56 L56 57", cape: "M16 26 Q4 24 0 30 Q8 32 18 32", rot: 12 },
    { by: 3, lLeg: "M26 47 L22 64 L17 64", rLeg: "M38 47 L44 54 L46 51", cape: "M16 29 Q5 27 1 34 Q9 35 18 34", rot: 14 },
    { by: -4, lLeg: "M26 40 L30 58 L26 59", rLeg: "M38 40 L48 48 L44 56", cape: "M16 22 Q4 19 0 26 Q8 28 18 28", rot: 15 },
    { by: 0, lLeg: "M26 44 L12 56 L8 57", rLeg: "M38 44 L48 62 L54 63", cape: "M16 26 Q4 24 0 30 Q8 32 18 32", rot: 12 },
    { by: 3, lLeg: "M26 47 L20 54 L18 51", rLeg: "M38 47 L42 64 L47 64", cape: "M16 29 Q5 27 1 34 Q9 35 18 34", rot: 14 },
    { by: -4, lLeg: "M26 40 L20 48 L24 56", rLeg: "M38 40 L34 58 L38 59", cape: "M16 22 Q4 19 0 26 Q8 28 18 28", rot: 15 }
  ]
  const p = poses[idx % 6]
  return `<svg viewBox="0 0 70 76" width="74" height="80" style="display:block;margin:0 auto;overflow:visible;">
    <g transform="rotate(${p.rot} 32 40)">
      <path d="${p.cape}" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5"/>
      <path d="${p.rLeg}" stroke="#1e3a8a" stroke-width="6" stroke-linecap="round"/>
      <rect x="22" y="${26 + p.by}" width="20" height="19" rx="4" fill="#2563eb" stroke="#1d4ed8" stroke-width="1.5"/>
      <rect x="22" y="${39 + p.by}" width="20" height="5" fill="#78350f"/>
      <rect x="29" y="${39 + p.by}" width="6" height="5" fill="#facc15"/>
      <path d="${p.lLeg}" stroke="#3b82f6" stroke-width="6.5" stroke-linecap="round"/>
      <rect x="21" y="${9 + p.by}" width="22" height="19" rx="5" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
      <rect x="25" y="${14 + p.by}" width="15" height="4" rx="1.5" fill="#0f172a"/>
      <rect x="27" y="${15 + p.by}" width="3.5" height="2" fill="#38bdf8"/>
      <rect x="34" y="${15 + p.by}" width="3.5" height="2" fill="#38bdf8"/>
    </g>
  </svg>`
}

// 3. Sword Slash (4 Frames)
function makeAttackHeroSvg(idx) {
  const attacks = [
    `<svg viewBox="0 0 74 76" width="76" height="80" style="display:block;margin:0 auto;overflow:visible;"><path d="M12 28 L6 14 L10 12 L16 26 Z" fill="#94a3b8" stroke="#475569" stroke-width="1"/><rect x="22" y="27" width="20" height="19" rx="4" fill="#2563eb"/><rect x="21" y="10" width="22" height="19" rx="5" fill="#f59e0b"/><rect x="25" y="15" width="15" height="4" rx="1.5" fill="#0f172a"/><rect x="27" y="16" width="3.5" height="2" fill="#38bdf8"/><path d="M26 46 L22 62" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/><path d="M38 46 L42 62" stroke="#1d4ed8" stroke-width="6" stroke-linecap="round"/></svg>`,
    `<svg viewBox="0 0 74 76" width="76" height="80" style="display:block;margin:0 auto;overflow:visible;"><path d="M30 10 L34 -6 L38 -6 L36 10 Z" fill="#e2e8f0" stroke="#f59e0b" stroke-width="1.5"/><rect x="22" y="27" width="20" height="19" rx="4" fill="#2563eb"/><rect x="21" y="10" width="22" height="19" rx="5" fill="#f59e0b"/><rect x="25" y="15" width="15" height="4" rx="1.5" fill="#0f172a"/><rect x="27" y="16" width="3.5" height="2" fill="#38bdf8"/><path d="M26 46 L20 62" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/><path d="M38 46 L44 62" stroke="#1d4ed8" stroke-width="6" stroke-linecap="round"/></svg>`,
    `<svg viewBox="0 0 74 76" width="76" height="80" style="display:block;margin:0 auto;overflow:visible;"><path d="M10 16 Q68 18 64 62" stroke="#facc15" stroke-width="7" fill="none" stroke-linecap="round" filter="drop-shadow(0 0 6px #f59e0b)"/><path d="M12 18 Q62 20 60 58" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="24" y="29" width="20" height="19" rx="4" fill="#2563eb"/><rect x="23" y="12" width="22" height="19" rx="5" fill="#f59e0b"/><rect x="27" y="17" width="15" height="4" rx="1.5" fill="#0f172a"/><rect x="29" y="18" width="3.5" height="2" fill="#38bdf8"/><path d="M28 48 L18 64" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/><path d="M40 48 L48 64" stroke="#1d4ed8" stroke-width="6" stroke-linecap="round"/></svg>`,
    `<svg viewBox="0 0 74 76" width="76" height="80" style="display:block;margin:0 auto;overflow:visible;"><path d="M42 42 L62 58 L60 62 L40 46 Z" fill="#94a3b8" stroke="#475569" stroke-width="1"/><rect x="22" y="28" width="20" height="19" rx="4" fill="#2563eb"/><rect x="21" y="11" width="22" height="19" rx="5" fill="#f59e0b"/><rect x="25" y="16" width="15" height="4" rx="1.5" fill="#0f172a"/><rect x="27" y="17" width="3.5" height="2" fill="#38bdf8"/><path d="M26 47 L22 63" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/><path d="M38 47 L44 63" stroke="#1d4ed8" stroke-width="6" stroke-linecap="round"/></svg>`
  ]
  return attacks[idx % 4]
}

// 4. Enhanced 3D Rotating Gold Coin (Coin Spin - 4 Frames)
function makeCoinSvg(idx) {
  const coins = [
    // F1: Front Face with embossed Star & shine
    `<svg viewBox="0 0 64 64" width="56" height="56" style="display:block;margin:0 auto;overflow:visible;">
      <defs>
        <radialGradient id="cg1" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#fffbeb"/>
          <stop offset="35%" stop-color="#facc15"/>
          <stop offset="75%" stop-color="#eab308"/>
          <stop offset="100%" stop-color="#854d0e"/>
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="26" fill="url(#cg1)" stroke="#78350f" stroke-width="2.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.35))"/>
      <circle cx="32" cy="32" r="21" fill="none" stroke="#ca8a04" stroke-width="1.8" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="16" fill="#facc15" stroke="#a16207" stroke-width="1.2"/>
      <polygon points="32,20 35,27 43,27 37,32 39,40 32,35 25,40 27,32 21,27 29,27" fill="#ca8a04" stroke="#78350f" stroke-width="0.8"/>
      <circle cx="24" cy="22" r="2.5" fill="#ffffff" opacity="0.85"/>
    </svg>`,
    // F2: 3/4 Perspective Turn with depth edge
    `<svg viewBox="0 0 64 64" width="56" height="56" style="display:block;margin:0 auto;overflow:visible;">
      <defs>
        <linearGradient id="cg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fffbeb"/>
          <stop offset="35%" stop-color="#facc15"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
      </defs>
      <path d="M37 6 C48 6 53 18 53 32 C53 46 48 58 37 58 L32 58 C44 58 48 46 48 32 C48 18 44 6 32 6 Z" fill="#581c87" opacity="0"/>
      <path d="M36 6 C47 6 52 18 52 32 C52 46 47 58 36 58 L32 58 C43 58 47 46 47 32 C47 18 43 6 32 6 Z" fill="#78350f"/>
      <ellipse cx="32" cy="32" rx="16" ry="26" fill="url(#cg2)" stroke="#78350f" stroke-width="2.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.35))"/>
      <ellipse cx="32" cy="32" rx="11" ry="21" fill="none" stroke="#ca8a04" stroke-width="1.5"/>
      <line x1="32" y1="18" x2="32" y2="46" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
      <circle cx="28" cy="22" r="2" fill="#ffffff" opacity="0.9"/>
    </svg>`,
    // F3: Edge-on Vertical Coin Bar with milled ridges
    `<svg viewBox="0 0 64 64" width="56" height="56" style="display:block;margin:0 auto;overflow:visible;">
      <defs>
        <linearGradient id="cg3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#78350f"/>
          <stop offset="35%" stop-color="#fffbeb"/>
          <stop offset="70%" stop-color="#facc15"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
      </defs>
      <rect x="27" y="6" width="10" height="52" rx="5" fill="url(#cg3)" stroke="#78350f" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.35))"/>
      <line x1="32" y1="9" x2="32" y2="55" stroke="#ffffff" stroke-width="2" opacity="0.8"/>
      <line x1="28" y1="18" x2="36" y2="18" stroke="#78350f" stroke-width="1.5"/>
      <line x1="28" y1="26" x2="36" y2="26" stroke="#78350f" stroke-width="1.5"/>
      <line x1="28" y1="34" x2="36" y2="34" stroke="#78350f" stroke-width="1.5"/>
      <line x1="28" y1="42" x2="36" y2="42" stroke="#78350f" stroke-width="1.5"/>
    </svg>`,
    // F4: Reverse 3/4 Perspective Turn
    `<svg viewBox="0 0 64 64" width="56" height="56" style="display:block;margin:0 auto;overflow:visible;">
      <defs>
        <linearGradient id="cg4" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fffbeb"/>
          <stop offset="35%" stop-color="#facc15"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
      </defs>
      <path d="M28 6 C17 6 12 18 12 32 C12 46 17 58 28 58 L32 58 C21 58 17 46 17 32 C17 18 21 6 32 6 Z" fill="#78350f"/>
      <ellipse cx="32" cy="32" rx="16" ry="26" fill="url(#cg4)" stroke="#78350f" stroke-width="2.5" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.35))"/>
      <ellipse cx="32" cy="32" rx="11" ry="21" fill="none" stroke="#ca8a04" stroke-width="1.5"/>
      <line x1="32" y1="18" x2="32" y2="46" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
      <circle cx="36" cy="22" r="2" fill="#ffffff" opacity="0.9"/>
    </svg>`
  ]
  return coins[idx % 4]
}

// 5. Torch Flame (4 Frames)
function makeFireSvg(idx) {
  const fires = [
    `<svg viewBox="0 0 54 60" width="54" height="60"><rect x="12" y="48" width="30" height="7" rx="2" fill="#78350f" transform="rotate(-8 27 50)"/><rect x="14" y="48" width="30" height="7" rx="2" fill="#92400e" transform="rotate(8 27 50)"/><path d="M27 8 Q38 24 38 42 Q27 50 16 42 Q16 26 27 8 Z" fill="#f97316" filter="drop-shadow(0 0 6px #ea580c)"/><path d="M27 20 Q33 30 33 42 Q27 47 21 42 Q21 32 27 20 Z" fill="#facc15"/></svg>`,
    `<svg viewBox="0 0 54 60" width="54" height="60"><rect x="12" y="48" width="30" height="7" rx="2" fill="#78350f" transform="rotate(-8 27 50)"/><rect x="14" y="48" width="30" height="7" rx="2" fill="#92400e" transform="rotate(8 27 50)"/><path d="M29 4 Q42 22 39 42 Q27 52 15 42 Q14 22 29 4 Z" fill="#f97316" filter="drop-shadow(0 0 8px #ea580c)"/><path d="M29 16 Q35 28 33 42 Q27 48 22 42 Q22 28 29 16 Z" fill="#fef08a"/><circle cx="38" cy="14" r="2" fill="#fbbf24"/></svg>`,
    `<svg viewBox="0 0 54 60" width="54" height="60"><rect x="12" y="48" width="30" height="7" rx="2" fill="#78350f" transform="rotate(-8 27 50)"/><rect x="14" y="48" width="30" height="7" rx="2" fill="#92400e" transform="rotate(8 27 50)"/><path d="M24 6 Q40 20 37 42 Q26 50 17 42 Q15 24 24 6 Z" fill="#f97316" filter="drop-shadow(0 0 7px #ea580c)"/><path d="M25 18 Q33 28 31 42 Q26 47 21 42 Q20 30 25 18 Z" fill="#facc15"/><circle cx="16" cy="18" r="2" fill="#f59e0b"/></svg>`,
    `<svg viewBox="0 0 54 60" width="54" height="60"><rect x="12" y="48" width="30" height="7" rx="2" fill="#78350f" transform="rotate(-8 27 50)"/><rect x="14" y="48" width="30" height="7" rx="2" fill="#92400e" transform="rotate(8 27 50)"/><path d="M27 10 Q40 26 38 42 Q27 49 16 42 Q17 28 27 10 Z" fill="#ea580c" filter="drop-shadow(0 0 6px #dc2626)"/><path d="M27 22 Q34 32 33 42 Q27 46 22 42 Q22 32 27 22 Z" fill="#facc15"/></svg>`
  ]
  return fires[idx % 4]
}

const CLIPS = {
  walk: {
    name: 'حركة المشي الكلاسيكية (Hero Walk - 6 إطارات)',
    nameEn: 'Classic Hero Walk (6 Frames)',
    frames: [0, 1, 2, 3, 4, 5].map(makeWalkHeroSvg),
    shadowScales: [1.0, 1.15, 0.85, 1.0, 1.15, 0.85]
  },
  run: {
    name: 'حركة الجري السريع (Hero Sprint - 6 إطارات)',
    nameEn: 'Fast Hero Sprint (6 Frames)',
    frames: [0, 1, 2, 3, 4, 5].map(makeRunHeroSvg),
    shadowScales: [1.2, 0.9, 1.1, 1.2, 0.9, 1.1]
  },
  slash: {
    name: 'حركة الهجوم وضربة السيف (Sword Slash - 4 إطارات)',
    nameEn: 'Sword Slash Attack (4 Frames)',
    frames: [0, 1, 2, 3].map(makeAttackHeroSvg),
    shadowScales: [1.0, 1.1, 1.3, 1.0]
  },
  coin: {
    name: 'دوران عملة ذهبية (Coin Spin - 4 إطارات)',
    nameEn: 'Spinning Gold Coin (4 Frames)',
    frames: [0, 1, 2, 3].map(makeCoinSvg),
    shadowScales: [1.0, 0.75, 0.35, 0.75]
  },
  fire: {
    name: 'شعلة نار بيئية (Torch Flame - 4 إطارات)',
    nameEn: 'Environmental Torch Flame (4 Frames)',
    frames: [0, 1, 2, 3].map(makeFireSvg),
    shadowScales: [1.0, 1.1, 1.05, 1.1]
  }
}

const currentClipKey = ref('walk')
const currentFrameIndex = ref(0)
const isPlaying = ref(true)
const fps = ref(8)
const isLoop = ref(true)
const customFrames = ref(null)

const rulerRef = ref(null)
const diamondRefs = ref([])
const playheadPos = ref(20)

let timer = null

const currentClipData = computed(() => {
  if (customFrames.value) {
    return {
      name: 'شريط مخصص مستورد (Custom Sliced PNG)',
      nameEn: 'Custom Sliced Sprite Sheet (PNG)',
      frames: customFrames.value,
      shadowScales: [1.0, 1.0, 1.0, 1.0]
    }
  }
  return CLIPS[currentClipKey.value] || CLIPS.walk
})

const currentFramesList = computed(() => currentClipData.value.frames)
const totalFrames = computed(() => currentFramesList.value.length)
const currentFrameSvg = computed(() => currentFramesList.value[currentFrameIndex.value] || '')

const currentTimeSec = computed(() => {
  return (currentFrameIndex.value / fps.value).toFixed(2)
})

const shadowStyle = computed(() => {
  const scales = currentClipData.value.shadowScales
  const sc = scales ? scales[currentFrameIndex.value] || 1 : 1
  return {
    transform: `scaleX(${sc})`
  }
})

function updatePlayhead() {
  nextTick(() => {
    if (!rulerRef.value) return
    const diamonds = rulerRef.value.querySelectorAll('.keyframe-diamond')
    if (!diamonds || diamonds.length === 0) return
    const target = diamonds[currentFrameIndex.value]
    if (target) {
      const rRect = rulerRef.value.getBoundingClientRect()
      const dRect = target.getBoundingClientRect()
      playheadPos.value = (dRect.left + dRect.width / 2) - rRect.left
    }
  })
}

function startTimer() {
  stopTimer()
  timer = setInterval(() => {
    if (!isPlaying.value) return
    if (currentFrameIndex.value + 1 >= totalFrames.value) {
      if (isLoop.value) {
        currentFrameIndex.value = 0
      } else {
        isPlaying.value = false
        return
      }
    } else {
      currentFrameIndex.value++
    }
    updatePlayhead()
  }, 1000 / fps.value)
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function restartTimer() {
  if (isPlaying.value) {
    startTimer()
  }
}

function togglePlay() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    startTimer()
    emit('notify', props.isEn ? 'Animation playback resumed' : 'تم استئناف تشغيل الحركة')
  } else {
    stopTimer()
    emit('notify', props.isEn ? 'Animation playback paused' : 'تم إيقاف الحركة مؤقتاً')
  }
}

function stepFrame(delta) {
  isPlaying.value = false
  stopTimer()
  const len = totalFrames.value
  currentFrameIndex.value = (currentFrameIndex.value + delta + len) % len
  updatePlayhead()
}

function jumpToFrame(idx) {
  isPlaying.value = false
  stopTimer()
  currentFrameIndex.value = idx
  updatePlayhead()
}

function setFps(newFps) {
  fps.value = newFps
  restartTimer()
  emit('notify', props.isEn ? `Playback speed set to ${newFps} FPS` : `تم ضبط السرعة على ${newFps} FPS`)
}

function onClipChange() {
  customFrames.value = null
  currentFrameIndex.value = 0
  updatePlayhead()
  restartTimer()
  emit('notify', props.isEn ? `Loaded clip: ${currentClipData.value.nameEn}` : `تم تحميل: ${currentClipData.value.name}`)
}

onMounted(() => {
  startTimer()
  setTimeout(updatePlayhead, 120)
})

onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.anim-studio-container {
  width: 100%;
}

/* Two Columns Grid matching media_1793889022230_fadc1243.jpg */
.studio-two-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: start;
}
@media (max-width: 960px) {
  .studio-two-cols {
    grid-template-columns: 1fr;
  }
}

/* ================= RIGHT COLUMN: VIEWPORT & DOPE SHEET ================= */
.studio-viewport-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* 2D Stage Screen */
.anim-stage-box {
  width: 100%;
  max-width: 440px;
  height: 200px;
  border: 3px solid #d97706;
  border-radius: 16px;
  background: radial-gradient(circle at 50% 25%, #1e293b 0%, #090d16 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(217, 119, 6, 0.2);
  margin-bottom: 14px;
}

.character-anchor {
  position: absolute;
  bottom: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  transition: transform 0.05s ease;
}
.character-anchor.coin-actor {
  bottom: 42px;
}

.sprite-graphic {
  display: flex;
  align-items: center;
  justify-content: center;
}

.character-shadow {
  width: 46px;
  height: 9px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  margin-top: -6px;
  transition: transform 0.1s ease;
}

/* Ground Platform with 6 Grass Blocks */
.anim-ground-platform {
  width: 100%;
  height: 42px;
  display: flex;
  z-index: 5;
  border-top: 3.5px solid #22c55e;
  background: #78350f;
}
.grass-block {
  flex: 1;
  height: 100%;
  background-image: url('/assets/grass_tile.jpg');
  background-size: cover;
  background-position: center;
  border-right: 1px solid rgba(0, 0, 0, 0.15);
}

/* Label Group */
.clip-label-group {
  text-align: center;
  margin-bottom: 14px;
}
.active-clip-name {
  font-size: 15.5px;
  font-weight: 800;
  color: var(--text-main, #1c1917);
  margin: 0 0 4px;
}
.active-frame-num {
  font-family: var(--font-mono, monospace);
  font-size: 12.5px;
  font-weight: 800;
  color: #d97706;
}

/* Slices Strip */
.slices-strip-container {
  width: 100%;
  max-width: 440px;
  margin-bottom: 16px;
}
.strip-title {
  font-size: 12px;
  font-weight: 800;
  color: var(--text-muted, #57534e);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.slices-row {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  direction: ltr !important;
}

.slice-box {
  width: 58px;
  height: 60px;
  border: 2px solid var(--border, #fef08a);
  border-radius: 10px;
  background: var(--surface, #ffffff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-muted, #57534e);
}
.slice-box:hover {
  border-color: var(--brand, #d97706);
  transform: translateY(-2px);
}
.slice-box.active {
  border-color: var(--brand, #d97706);
  background: var(--brand-soft, #fef3c7);
  color: var(--brand, #d97706);
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.35);
}

.slice-thumb {
  transform: scale(0.48);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
}
.slice-f-tag {
  font-family: var(--font-mono, monospace);
  font-size: 9.5px;
  font-weight: 800;
  margin-top: -3px;
}

/* Unity Timeline Dope Sheet */
.unity-dopesheet-widget {
  width: 100%;
  max-width: 460px;
  background: #090d16;
  border: 1.5px solid #1e293b;
  border-radius: 12px;
  padding: 12px 16px;
  box-sizing: border-box;
}

.dopesheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11.5px;
  margin-bottom: 8px;
  direction: rtl;
}
.dopesheet-track-title {
  font-weight: 800;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 6px;
}
.unity-icon {
  color: #f59e0b;
}
.dopesheet-timecode {
  font-family: var(--font-mono, monospace);
  color: #f59e0b;
  font-weight: 800;
  font-size: 12px;
}

.dopesheet-track-ruler {
  position: relative;
  height: 36px;
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  overflow: hidden;
  direction: ltr !important;
}

.dopesheet-playhead {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2.5px;
  background: #ef4444;
  box-shadow: 0 0 8px #ef4444;
  z-index: 20;
  transition: left 0.08s ease;
}
.dopesheet-playhead::before {
  content: '';
  position: absolute;
  top: 0;
  left: -5px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid #ef4444;
}

.diamonds-strip {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  direction: ltr !important;
}

.keyframe-diamond {
  width: 12px;
  height: 12px;
  background: #64748b;
  transform: rotate(45deg);
  border-radius: 2px;
  transition: all 0.15s ease;
  cursor: pointer;
}
.keyframe-diamond:hover {
  background: #facc15;
  transform: rotate(45deg) scale(1.2);
}
.keyframe-diamond.active {
  background: #f59e0b;
  box-shadow: 0 0 10px #f59e0b;
  transform: rotate(45deg) scale(1.35);
}

.dopesheet-ruler-labels {
  display: flex;
  justify-content: space-between;
  font-size: 9.5px;
  color: #64748b;
  margin-top: 4px;
  font-family: var(--font-mono, monospace);
  direction: ltr !important;
}

/* ================= LEFT COLUMN: UNIFIED CONTROL PANEL ================= */
.studio-controls-panel {
  background: var(--brand-soft, #fefce8);
  border: 1.5px solid var(--brand-border, #fef08a);
  border-radius: 16px;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0 2px 10px rgba(217, 119, 6, 0.04);
}

.ctrl-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px dashed var(--brand-border, #fef08a);
}
.ctrl-row.no-border {
  border-bottom: none;
  padding-bottom: 0;
}

.ctrl-label-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-main, #1c1917);
  flex-shrink: 0;
}
.ctrl-label-wrap.vertical {
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}
.label-with-icon {
  display: flex;
  align-items: center;
  gap: 7px;
}
.sub-param-label {
  font-size: 11px;
  color: var(--text-muted, #57534e);
  direction: ltr;
}

.ctrl-arrow-icon {
  color: var(--brand, #d97706);
  font-size: 13px;
}
.ctrl-label-bold {
  font-size: 13px;
  font-weight: 800;
}

/* Playback Actions Row */
.playback-actions-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ctrl-action-btn {
  background: var(--surface, #ffffff);
  border: 1px solid var(--brand-border, #fcd34d);
  border-radius: 8px;
  padding: 8px 14px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-main, #1c1917);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}
.ctrl-action-btn:hover {
  background: var(--brand-soft, #fef3c7);
  border-color: var(--brand, #d97706);
}
.solid-orange-btn {
  background: var(--brand, #d97706) !important;
  color: #ffffff !important;
  border-color: var(--brand, #d97706) !important;
  font-weight: 800;
  box-shadow: 0 4px 10px rgba(217, 119, 6, 0.25);
}
.solid-orange-btn:hover {
  background: var(--brand-mid, #b45309) !important;
}

/* Speed / FPS */
.slider-and-presets {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-grow: 1;
  max-width: 220px;
}
.slider-header-num {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  font-weight: 800;
  color: var(--brand, #d97706);
}
.fps-slider {
  width: 100%;
  accent-color: var(--brand, #d97706);
  cursor: pointer;
}
.fps-preset-buttons {
  display: flex;
  gap: 6px;
  width: 100%;
  justify-content: space-between;
}
.preset-pill {
  flex: 1;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #fef08a);
  border-radius: 6px;
  padding: 4px;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  color: var(--text-muted, #57534e);
  transition: all 0.2s;
  text-align: center;
}
.preset-pill:hover {
  border-color: var(--brand, #d97706);
  color: var(--brand, #d97706);
}
.preset-pill.active {
  background: var(--brand-soft, #fef3c7);
  border-color: var(--brand, #d97706);
  color: var(--brand, #d97706);
  font-weight: 800;
}

/* Loop Checkbox */
.loop-checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: var(--text-main, #1c1917);
}
.orange-checkbox {
  width: 18px;
  height: 18px;
  accent-color: var(--brand, #d97706);
}

/* Dropdown */
.anim-clip-select {
  padding: 9px 12px;
  border-radius: 8px;
  border: 1.5px solid var(--border, #fef08a);
  background: var(--surface, #ffffff);
  color: var(--text-main, #1c1917);
  font-family: inherit;
  font-weight: 700;
  font-size: 12.5px;
  cursor: pointer;
  max-width: 240px;
}

/* Unity Rule Callout */
.unity-rule-box {
  background: var(--brand-soft, #fef9c3);
  border-right: 4px solid var(--brand, #f59e0b);
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 12px;
  line-height: 1.7;
  color: var(--text-main, #78350f);
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
[data-theme="dark"] .unity-rule-box {
  color: #fef08a;
}
.unity-rule-box i {
  color: var(--brand, #d97706);
  font-size: 15px;
  margin-top: 3px;
  flex-shrink: 0;
}
:global(html[dir="ltr"]) .unity-rule-box {
  border-right: none !important;
  border-left: 4px solid var(--brand, #f59e0b) !important;
}
</style>