<script setup>
import { RouterLink } from 'vue-router'
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import defaultAvatar from '@/../assets/abdalhmmed.jfif'

defineProps({
  pdfUrl: { type: String, default: 'courses/data-structures/lecture-01/print-pdf.html' },
  authorNameAr: { type: String, default: 'م. عبدالحميد هلال دعبان' },
  authorNameEn: { type: String, default: 'Eng. Abdulhamid Helal Daban' },
  authorAvatar: { type: String, default: defaultAvatar },
  authorIcon: { type: String, default: '' }
})

const prefs = usePreferencesStore()
</script>

<template>
  <header class="topbar">
    <div class="topbar-nav-group">
      <RouterLink
        to="/"
        class="tool nav-back-btn"
        :title="prefs.isEn ? 'Return to Portal Home' : 'الرجوع إلى البوابة الرئيسية'"
      >
        <i class="fa-solid fa-house"></i>
        <span>{{ prefs.isEn ? 'Portal Home' : 'الرئيسية' }}</span>
      </RouterLink>

      <a
        :href="pdfUrl"
        class="tool nav-pdf-btn"
        :title="prefs.isEn ? 'Open Official English PDF Handout' : 'الانتقال إلى النسخة الإنجليزية المجهزة للطباعة والحفظ PDF'"
      >
        <i class="fa-solid fa-file-pdf"></i>
        <span>{{ prefs.isEn ? 'PDF Handout (EN)' : 'ملزمة PDF (English)' }}</span>
      </a>

      <div class="topbar-author-badge">
        <i v-if="authorIcon" :class="'fa-solid ' + authorIcon" style="margin-left: 4px; margin-right: 4px;"></i>
        <img
          v-else
          :src="authorAvatar"
          :alt="authorNameAr"
        />
        <span>{{ prefs.isEn ? authorNameEn : authorNameAr }}</span>
      </div>
    </div>

    <div class="tools">
      <!-- Language Switcher (Hidden: English only mode active) -->
      <!--
      <button
        type="button"
        class="tool"
        title="Switch Language / تبديل اللغة"
        @click="prefs.toggleLang()"
      >
        <i class="fa-solid fa-globe"></i>
        <span>{{ prefs.isEn ? 'العربية' : 'English' }}</span>
      </button>
      -->

      <!-- Auditorium Big Mode -->
      <button
        type="button"
        class="tool"
        :class="{ on: prefs.isBigMode }"
        :title="prefs.isEn ? 'Auditorium Large Text Mode' : 'تكبير الخط وعرض القاعة'"
        @click="prefs.toggleBigMode()"
      >
        <i class="fa-solid fa-display"></i>
        <span>{{ prefs.isEn ? 'Auditorium' : 'وضع العرض' }}</span>
      </button>

      <!-- Drawing Pen -->
      <button
        type="button"
        class="tool"
        :class="{ on: prefs.isDrawing }"
        :title="prefs.isEn ? 'Draw on Screen' : 'الكتابة على الشاشة'"
        @click="prefs.toggleDrawing()"
      >
        <i class="fa-solid fa-pen-nib"></i>
        <span>{{ prefs.isEn ? 'Draw Pen' : 'قلم الشرح' }}</span>
      </button>

      <!-- Clear Drawing -->
      <button
        v-if="prefs.isDrawing"
        type="button"
        class="tool"
        :title="prefs.isEn ? 'Clear Screen' : 'مسح'"
        @click="prefs.triggerClearCanvas()"
      >
        <i class="fa-solid fa-trash-can"></i>
        <span>{{ prefs.isEn ? 'Clear' : 'مسح' }}</span>
      </button>

      <!-- Dark / Light Mode -->
      <button
        type="button"
        class="tool"
        :title="prefs.isEn ? 'Toggle Dark Mode' : 'تبديل الوضع الليلي'"
        @click="prefs.toggleTheme()"
      >
        <i :class="prefs.theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
        <span>
          {{
            prefs.theme === 'dark'
              ? prefs.isEn
                ? 'Light'
                : 'نهاري'
              : prefs.isEn
                ? 'Dark'
                : 'ليلي'
          }}
        </span>
      </button>
    </div>
  </header>
</template>
