<template>
  <div class="fab-container">
    <button
      class="fab-btn"
      :class="{ visible: isVisible }"
      :title="isEn ? 'Scroll to top' : 'العودة لأعلى الصفحة'"
      @click="scrollToTop"
    >
      <i class="fa-solid fa-arrow-up"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  isEn: { type: Boolean, default: false }
})

const isVisible = ref(false)

function checkScroll() {
  const top = document.documentElement.scrollTop || document.body.scrollTop
  isVisible.value = top > 350
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.fab-container {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 99;
}
:global(html[dir="ltr"]) .fab-container {
  left: auto;
  right: 24px;
}
.fab-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--brand, #2563eb);
  color: #fff;
  border: none;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.25s ease;
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px);
}
.fab-btn.visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}
.fab-btn:hover {
  filter: brightness(1.15);
  transform: translateY(-3px);
}
:global(.theme-unity) .fab-btn {
  background: #ea580c;
  box-shadow: 0 4px 14px rgba(234, 88, 12, 0.4);
}
:global(.theme-unity) .fab-btn:hover {
  background: #c2410c;
}
:global(.theme-amber) .fab-btn {
  background: #d97706;
  box-shadow: 0 4px 14px rgba(217, 119, 6, 0.4);
}
:global(.theme-amber) .fab-btn:hover {
  background: #b45309;
}
</style>
