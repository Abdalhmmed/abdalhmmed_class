<script setup>
defineProps({
  featuresSection: { type: Object, required: true },
  footer: { type: Object, required: true }
})
</script>

<template>
  <!-- FEATURES / ADVANTAGES -->
  <section class="features-section">
    <div class="container">
      <div class="section-header" style="justify-content: center; text-align: center; margin-bottom: 30px">
        <div class="section-title-wrap">
          <h2 style="justify-content: center">
            <i class="fa-solid fa-wand-magic-sparkles"></i> {{ featuresSection.title }}
          </h2>
          <p>{{ featuresSection.subtitle }}</p>
        </div>
      </div>

      <div class="features-grid">
        <div v-for="(feat, idx) in featuresSection.items" :key="idx" class="feature-box">
          <div class="feature-icon">
            <i :class="feat.icon"></i>
          </div>
          <h4>{{ feat.title }}</h4>
          <p>{{ feat.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <i class="fa-solid fa-code"></i>
        <span>{{ footer.logoTitle }}</span>
      </div>

      <p class="footer-text">
        {{ footer.descLine1 }}<br />
        <b>{{ footer.descAuthor }}</b> {{ footer.descRole }} · <b>{{ footer.descYear }}</b>
        <template v-if="footer.instructorsLine">
          <br />
          <span style="font-size: 13px; opacity: 0.92; font-weight: 700">{{ footer.instructorsLine }}</span>
        </template>
      </p>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <div>{{ footer.rights }}</div>
        <div>{{ footer.credits }}</div>
      </div>

      <div
        class="academic-watermark"
        aria-hidden="true"
        data-author="Abdulhamid-Helal-Daban"
        data-university="University of Aden"
      >
        حقوق الملكية الفكرية والبرمجية محفوظة © 2026-2027م م. عبدالحميد هلال دعبان | م. عبدالحميد هلال دعبان - بوابة الملازم البرمجية
      </div>
    </div>
  </footer>
</template>
