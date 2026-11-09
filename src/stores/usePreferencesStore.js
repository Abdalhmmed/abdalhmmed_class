import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const usePreferencesStore = defineStore('preferences', () => {
  const theme = ref(localStorage.getItem('portal_theme') || 'light')
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
    localStorage.setItem('portal_theme', theme.value)
    applyDomAttributes()
  }

  function toggleLang() {
    lang.value = lang.value === 'ar' ? 'en' : 'ar'
    localStorage.setItem('agy_lang', lang.value)
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
