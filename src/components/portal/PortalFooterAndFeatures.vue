<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  featuresSection: { type: Object, required: true },
  footer: { type: Object, required: true },
  instructor: { type: Object, default: () => null },
  instructors: { type: Array, default: () => [] }
})

const openPopoverIndex = ref(null)

const instructorList = computed(() => {
  if (props.instructors && props.instructors.length > 0) return props.instructors
  return props.instructor ? [props.instructor] : []
})

function togglePopover(idx) {
  openPopoverIndex.value = openPopoverIndex.value === idx ? null : idx
}
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

      <!-- Hoverable Academic Profile Popover Buttons -->
      <div v-if="instructorList.length" class="instructors-popover-row">
        <div
          v-for="(inst, instIdx) in instructorList"
          :key="inst.email || inst.name || instIdx"
          class="instructor-popover-wrapper"
          @mouseenter="openPopoverIndex = instIdx"
          @mouseleave="openPopoverIndex = null"
        >
          <button
            type="button"
            class="instructor-profile-btn"
            :class="{ active: openPopoverIndex === instIdx }"
            aria-haspopup="dialog"
            :aria-expanded="openPopoverIndex === instIdx"
            @click="togglePopover(instIdx)"
          >
            <span class="btn-avatar">
              <i class="fa-solid fa-user-tie"></i>
            </span>
            <span class="btn-label">{{ inst.name }} · {{ inst.profileBtnLabel || 'Academic Profile & Contact' }}</span>
            <i class="fa-solid fa-chevron-up btn-chevron"></i>
          </button>

          <!-- Popover Card Floating Above -->
          <transition name="popover-fade">
            <div
              v-if="openPopoverIndex === instIdx"
              class="instructor-floating-card"
              :class="{ 'instructor-floating-card--wide': inst.cardLayout === 'wide' }"
              role="dialog"
              aria-label="Instructor Academic Profile"
            >
              <div class="floating-header">
                <div class="floating-avatar">
                  <i class="fa-solid fa-user-graduate"></i>
                </div>
                <div class="floating-info">
                  <h4>{{ inst.name }}</h4>
                  <p>{{ inst.subtitle }}</p>
                </div>
              </div>

              <div class="floating-divider"></div>

              <ul
                class="floating-meta-list"
                :class="{ 'floating-meta-list--grid': inst.cardLayout === 'wide' }"
              >
                <li
                  v-for="(item, idx) in inst.meta"
                  :key="idx"
                  :class="{ 'meta-item-full': item.fullWidth }"
                >
                  <i :class="item.icon"></i>
                  <div class="meta-content">
                    <span class="meta-lbl">{{ item.label }}</span>
                    <div v-if="item.tags && item.tags.length" class="meta-tags">
                      <span v-for="(tag, tIdx) in item.tags" :key="tIdx" class="meta-tag-chip">
                        {{ tag }}
                      </span>
                    </div>
                    <strong v-else class="meta-val">{{ item.value }}</strong>
                  </div>
                </li>
              </ul>

              <!-- Contact Channels (Phone / WhatsApp & Email) -->
              <div
                v-if="inst.phone || inst.email"
                class="floating-contact-box"
                :class="{ 'floating-contact-box--row': inst.cardLayout === 'wide' }"
              >
                <a
                  v-if="inst.phone"
                  :href="'https://wa.me/' + inst.phone.replace(/[^0-9]/g, '')"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact-chip"
                  title="WhatsApp / Phone"
                >
                  <i class="fa-brands fa-whatsapp"></i>
                  <span dir="ltr">{{ inst.phone }}</span>
                </a>

                <a
                  v-if="inst.email"
                  :href="'mailto:' + inst.email"
                  class="contact-chip"
                  title="Email"
                >
                  <i class="fa-regular fa-envelope"></i>
                  <span>{{ inst.email }}</span>
                </a>
              </div>
            </div>
          </transition>
        </div>
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
