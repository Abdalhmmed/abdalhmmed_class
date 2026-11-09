<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  lecture: { type: Object, required: true },
  btnInteractive: { type: String, required: true },
  btnPdf: { type: String, required: true }
})

// Allows changing an individual card's color directly in code via lecture.themeClass or lecture.cardColor
const customCardStyle = computed(() => {
  if (!props.lecture.cardColor) return {}
  return {
    '--sec-color': props.lecture.cardColor,
    '--sec-color-hover': props.lecture.cardColorHover || props.lecture.cardColor,
    '--sec-color-soft': props.lecture.cardColorSoft || 'rgba(37, 99, 235, 0.1)',
    '--sec-border': props.lecture.cardBorder || 'rgba(37, 99, 235, 0.3)',
    '--sec-glow': props.lecture.cardGlow || 'rgba(37, 99, 235, 0.18)',
    '--sec-badge-bg': props.lecture.cardColorSoft || 'rgba(37, 99, 235, 0.12)',
    '--sec-badge-text': props.lecture.cardColor
  }
})
</script>

<template>
  <div
    class="compact-card"
    :class="lecture.themeClass || ''"
    :style="customCardStyle"
  >
    <div>
      <div class="compact-top">
        <span class="lec-number-tag">
          <i class="fa-solid fa-bookmark"></i> {{ lecture.numberTag }}
        </span>
        <span class="lec-topic-tag">{{ lecture.topicTag }}</span>
      </div>
      <h4>{{ lecture.title }}</h4>
      <p>{{ lecture.desc }}</p>
      <div class="compact-meta">
        <span v-for="(m, idx) in lecture.meta" :key="idx">
          <i :class="m.icon"></i> {{ m.text }}
        </span>
      </div>
    </div>

    <div class="compact-actions">
      <!-- Button 1: Interactive (Vue Router link if migrated, or direct link) -->
      <RouterLink
        v-if="lecture.interactiveRoute || lecture.route"
        :to="lecture.interactiveRoute || lecture.route"
        class="btn-compact btn-compact-interactive"
        :title="btnInteractive"
      >
        <i class="fa-solid fa-play"></i> {{ btnInteractive }}
      </RouterLink>
      <a
        v-else-if="lecture.externalInteractiveUrl"
        :href="lecture.externalInteractiveUrl"
        class="btn-compact btn-compact-interactive"
        :title="btnInteractive"
      >
        <i class="fa-solid fa-play"></i> {{ btnInteractive }}
      </a>

      <!-- Button 2: PDF (Official Print-Ready Handout) -->
      <a
        :href="lecture.pdfUrl"
        class="btn-compact btn-compact-pdf"
        :title="btnPdf"
      >
        <i class="fa-solid fa-file-pdf"></i> {{ btnPdf }}
      </a>
    </div>
  </div>
</template>
