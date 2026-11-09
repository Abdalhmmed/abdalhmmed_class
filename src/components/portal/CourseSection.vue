<script setup>
import { computed } from 'vue'
import CompactLectureCard from './CompactLectureCard.vue'

const props = defineProps({
  course: { type: Object, required: true },
  btnInteractive: { type: String, required: true },
  btnPdf: { type: String, required: true }
})

// Allows setting custom hex colors per course in code if desired alongside themeClass
const customCourseStyle = computed(() => {
  if (!props.course.customColor) return {}
  return {
    '--sec-color': props.course.customColor,
    '--sec-color-hover': props.course.customColorHover || props.course.customColor,
    '--sec-color-soft': props.course.customColorSoft || 'rgba(37, 99, 235, 0.1)',
    '--sec-border': props.course.customBorder || 'rgba(37, 99, 235, 0.3)',
    '--sec-glow': props.course.customGlow || 'rgba(37, 99, 235, 0.18)',
    '--sec-badge-bg': props.course.customColorSoft || 'rgba(37, 99, 235, 0.12)',
    '--sec-badge-text': props.course.customColor
  }
})
</script>

<template>
  <div
    class="course-section"
    :class="course.themeClass || 'theme-ds'"
    :style="customCourseStyle"
  >
    <div class="course-section-header">
      <div class="course-title-group">
        <div class="course-badge-icon">
          <i :class="course.icon"></i>
        </div>
        <div>
          <h3>{{ course.title }}</h3>
          <span>{{ course.subtitle }}</span>
        </div>
      </div>
      <div class="course-tag">
        <i :class="course.tagIcon"></i> {{ course.tagText }}
      </div>
    </div>

    <div class="lectures-grid">
      <CompactLectureCard
        v-for="lec in course.lectures"
        :key="lec.id"
        :lecture="lec"
        :btn-interactive="btnInteractive"
        :btn-pdf="btnPdf"
      />
    </div>
  </div>
</template>
