import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

function safeGetStorage(key, fallback) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const val = window.localStorage.getItem(key)
      return val !== null ? val : fallback
    }
  } catch {
    // Ignore SecurityError / QuotaExceededError in restricted WebViews or private mode
  }
  return fallback
}

function safeSetStorage(key, value) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value)
    }
  } catch {
    // Ignore storage errors on restricted devices
  }
}

export const usePreferencesStore = defineStore('preferences', () => {
  const theme = ref(safeGetStorage('portal_theme', 'light'))
  const lang = ref('en')
  const isBigMode = ref(false)
  const isDrawing = ref(false)
  const clearCanvasTrigger = ref(0)
  const activeOpIndex = ref(0)

  const isEn = computed(() => lang.value === 'en')
  const isRtl = computed(() => lang.value === 'ar')

  function applyDomAttributes() {
    if (typeof document === 'undefined') return
    const html = document.documentElement
    html.setAttribute('data-theme', theme.value)
    html.lang = lang.value
    html.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
    document.body.classList.toggle('big', isBigMode.value)
    document.body.classList.toggle('drawing', isDrawing.value)
  }

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    safeSetStorage('portal_theme', theme.value)
    applyDomAttributes()
  }

  function toggleLang() {
    lang.value = lang.value === 'ar' ? 'en' : 'ar'
    safeSetStorage('agy_lang', lang.value)
    applyDomAttributes()
  }

  function toggleBigMode() {
    isBigMode.value = !isBigMode.value
    applyDomAttributes()
  }

  function toggleDrawing() {
    isDrawing.value = !isDrawing.value
    applyDomAttributes()
  }

  function triggerClearCanvas() {
    clearCanvasTrigger.value++
  }

  watch([theme, lang, isBigMode, isDrawing], applyDomAttributes, { immediate: true })

  return {
    theme,
    lang,
    isEn,
    isRtl,
    isBigMode,
    isDrawing,
    clearCanvasTrigger,
    activeOpIndex,
    toggleTheme,
    toggleLang,
    toggleBigMode,
    toggleDrawing,
    triggerClearCanvas,
    applyDomAttributes
  }
})
