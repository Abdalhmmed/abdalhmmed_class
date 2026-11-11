<script setup>
import { ref } from 'vue'

defineProps({
  featuresSection: { type: Object, required: true },
  footer: { type: Object, required: true },
  instructor: { type: Object, default: () => null }
})

const isPopoverOpen = ref(false)
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
  <footer id="about" class="footer">
    <div class="footer-container">
      <div class="footer-brand-badge">
        <div class="badge-icon">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <div class="badge-content">
          <span class="portal-badge-kicker">{{ footer.badgeKicker || 'Official Academic Platform' }}</span>
          <h3 class="portal-badge-title">{{ footer.logoTitle }}</h3>
        </div>
      </div>

      <p class="footer-lead-text">
        {{ footer.descLine1 }}
      </p>

      <!-- Hoverable Academic Profile Popover Button -->
      <div
        v-if="instructor"
        class="instructor-popover-wrapper"
        @mouseenter="isPopoverOpen = true"
        @mouseleave="isPopoverOpen = false"
      >
        <button
          type="button"
          class="instructor-profile-btn"
          :class="{ active: isPopoverOpen }"
          aria-haspopup="dialog"
          :aria-expanded="isPopoverOpen"
          @click="isPopoverOpen = !isPopoverOpen"
        >
          <span class="btn-avatar">
            <i class="fa-solid fa-user-tie"></i>
          </span>
          <span class="btn-label">{{ instructor.name }} · {{ instructor.profileBtnLabel || 'Academic Profile & Contact' }}</span>
          <i class="fa-solid fa-chevron-up btn-chevron"></i>
        </button>

        <!-- Popover Card Floating Above -->
        <transition name="popover-fade">
          <div
            v-if="isPopoverOpen"
            class="instructor-floating-card"
            role="dialog"
            aria-label="Instructor Academic Profile"
          >
            <div class="floating-header">
              <div class="floating-avatar">
                <i class="fa-solid fa-user-graduate"></i>
              </div>
              <div class="floating-info">
                <h4>{{ instructor.name }}</h4>
                <p>{{ instructor.subtitle }}</p>
              </div>
            </div>

            <div class="floating-divider"></div>

            <ul class="floating-meta-list">
              <li v-for="(item, idx) in instructor.meta" :key="idx">
                <i :class="item.icon"></i>
                <div class="meta-content">
                  <span class="meta-lbl">{{ item.label }}</span>
                  <strong class="meta-val">{{ item.value }}</strong>
                </div>
              </li>
            </ul>

            <!-- Contact Channels (Phone / WhatsApp & Email) -->
            <div v-if="instructor.phone || instructor.email" class="floating-contact-box">
              <a
                v-if="instructor.phone"
                :href="'https://wa.me/' + instructor.phone.replace(/[^0-9]/g, '')"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-chip"
                title="WhatsApp / Phone"
              >
                <i class="fa-brands fa-whatsapp"></i>
                <span dir="ltr">{{ instructor.phone }}</span>
              </a>

              <a
                v-if="instructor.email"
                :href="'mailto:' + instructor.email"
                class="contact-chip"
                title="Email"
              >
                <i class="fa-regular fa-envelope"></i>
                <span>{{ instructor.email }}</span>
              </a>
            </div>
          </div>
        </transition>
      </div>

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
