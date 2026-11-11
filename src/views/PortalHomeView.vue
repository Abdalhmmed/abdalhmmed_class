<script setup>
import { computed, onMounted, watchEffect } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import { portalData } from '@/data/portalData'
import PortalNavbar from '@/components/portal/PortalNavbar.vue'
import PortalHero from '@/components/portal/PortalHero.vue'
import CourseSection from '@/components/portal/CourseSection.vue'
import PortalFooterAndFeatures from '@/components/portal/PortalFooterAndFeatures.vue'

const prefs = usePreferencesStore()
const t = computed(() => portalData[prefs.lang] || portalData.ar)

const visibleCourses = computed(() => {
  return (t.value?.coursesSection?.courses || []).filter(c => !c.hidden)
})

watchEffect(() => {
  document.title = prefs.isEn
    ? 'Eng. Abdulhamid Helal Daban | Programming Lectures & Labs Portal'
    : 'م. عبدالحميد هلال دعبان | بوابة الملازم والمحاضرات البرمجية'
})

onMounted(() => {
  // Ensure drawing or auditorium modes are off on the main portal
  if (prefs.isDrawing) prefs.toggleDrawing()
})
</script>

<template>
  <div class="portal-page">
    <PortalNavbar :t="t" />

    <PortalHero :hero="t.hero" />

    <!-- COURSES DIRECTORY -->
    <section id="courses" class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-title-wrap">
            <h2>
              <i class="fa-solid fa-book-bookmark"></i> {{ t.coursesSection.title }}
            </h2>
            <p>{{ t.coursesSection.subtitle }}</p>
          </div>
          <div>
            <span class="badge-count">{{ t.coursesSection.badge }}</span>
          </div>
        </div>

        <CourseSection
          v-for="course in visibleCourses"
          :key="course.id"
          :course="course"
          :btn-interactive="t.coursesSection.btnInteractive"
          :btn-pdf="t.coursesSection.btnPdf"
        />
      </div>
    </section>

    <PortalFooterAndFeatures
      :features-section="t.featuresSection"
      :footer="t.footer"
      :instructor="t.instructor"
    />
  </div>
</template>
