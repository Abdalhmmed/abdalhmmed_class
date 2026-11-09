<script setup>
import { ref } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import avatarUrl from '@/../assets/abdalhmmed.jfif'

defineProps({
  t: { type: Object, required: true }
})

const prefs = usePreferencesStore()
const activeLink = ref('home')

function scrollToSection(id) {
  activeLink.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="brand">
        <div class="brand-icon">
          <img :src="avatarUrl" :alt="t.brand.name" />
        </div>
        <div class="brand-text">
          <h1>{{ t.brand.name }}</h1>
          <span v-if="t.brand.role">{{ t.brand.role }}</span>
        </div>
      </div>

      <ul class="nav-links">
        <li>
          <a
            href="#home"
            class="nav-link"
            :class="{ active: activeLink === 'home' }"
            @click.prevent="scrollToSection('home')"
          >
            {{ t.nav.home }}
          </a>
        </li>
        <li>
          <a
            href="#courses"
            class="nav-link"
            :class="{ active: activeLink === 'courses' }"
            @click.prevent="scrollToSection('courses')"
          >
            {{ t.nav.courses }}
          </a>
        </li>
        <li>
          <a
            href="#about"
            class="nav-link"
            :class="{ active: activeLink === 'about' }"
            @click.prevent="scrollToSection('about')"
          >
            {{ t.nav.about }}
          </a>
        </li>
      </ul>

      <div class="nav-actions">
        <!-- Language Switcher (Hidden: English only mode active) -->
        <!--
        <button
          type="button"
          class="btn-theme"
          title="Switch Language / تبديل اللغة"
          @click="prefs.toggleLang()"
        >
          <i class="fa-solid fa-globe"></i>
          <span>{{ t.nav.langLabel }}</span>
        </button>
        -->

        <!-- Dark / Light Mode Toggle -->
        <button
          id="themeBtn"
          type="button"
          class="btn-theme"
          :title="t.nav.themeTooltip"
          @click="prefs.toggleTheme()"
        >
          <i :class="prefs.theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
        </button>
      </div>
    </div>
  </nav>
</template>
