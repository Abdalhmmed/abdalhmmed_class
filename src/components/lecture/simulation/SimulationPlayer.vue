<script setup>
import { usePreferencesStore } from '@/stores/usePreferencesStore'

defineProps({
  stepIndex: { type: Number, required: true },
  totalSteps: { type: Number, required: true },
  isPlaying: { type: Boolean, required: true },
  progressPercent: { type: Number, required: true },
  speed: { type: Number, required: true }
})

const emit = defineEmits(['first', 'prev', 'togglePlay', 'next', 'last', 'update:speed'])
const prefs = usePreferencesStore()
</script>

<template>
  <div>
    <div class="player">
      <button
        type="button"
        class="btn ghost"
        :title="prefs.isEn ? 'First Step' : 'الخطوة الأولى'"
        @click="emit('first')"
      >
        <i :class="prefs.isEn ? 'fa-solid fa-backward-step' : 'fa-solid fa-forward-step'"></i>
      </button>

      <button
        type="button"
        class="btn ghost"
        :title="prefs.isEn ? 'Previous Step' : 'الخطوة السابقة'"
        @click="emit('prev')"
      >
        <i :class="prefs.isEn ? 'fa-solid fa-arrow-left' : 'fa-solid fa-arrow-right'"></i>
      </button>

      <button
        type="button"
        class="btn acc"
        @click="emit('togglePlay')"
      >
        <i :class="isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'"></i>
        <span>
          {{
            isPlaying
              ? prefs.isEn
                ? 'Pause'
                : 'إيقاف'
              : prefs.isEn
                ? 'Play'
                : 'تشغيل'
          }}
        </span>
      </button>

      <button
        type="button"
        class="btn ghost"
        :title="prefs.isEn ? 'Next Step' : 'الخطوة التالية'"
        @click="emit('next')"
      >
        <i :class="prefs.isEn ? 'fa-solid fa-arrow-right' : 'fa-solid fa-arrow-left'"></i>
      </button>

      <button
        type="button"
        class="btn ghost"
        :title="prefs.isEn ? 'Last Step' : 'الخطوة الأخيرة'"
        @click="emit('last')"
      >
        <i :class="prefs.isEn ? 'fa-solid fa-forward-step' : 'fa-solid fa-backward-step'"></i>
      </button>

      <div class="prog">
        <div :style="{ width: progressPercent + '%' }"></div>
      </div>

      <span class="cnt">{{ stepIndex + 1 }}/{{ totalSteps }}</span>
    </div>

    <div class="player">
      <label class="speed">
        <i class="fa-solid fa-sliders" style="color: var(--primary); margin-inline-end: 6px"></i>
        {{ prefs.isEn ? 'Simulation Speed:' : 'سرعة المحاكاة:' }}
        <input
          type="range"
          min="150"
          max="1500"
          :value="speed"
          style="direction: ltr; margin: 0 8px"
          @input="emit('update:speed', Number($event.target.value))"
        />
      </label>
    </div>
  </div>
</template>
