<template>
  <div class="flashcard-interactive" :class="{ 'is-revealed': isRevealed }">
    <div class="flashcard-q">
      <i class="fa-solid fa-circle-question" :style="{ color: iconColor }"></i>
      <span>{{ isEn ? questionEn || question : question }}</span>
    </div>
    
    <button class="flashcard-btn" @click="toggleReveal">
      <i :class="isRevealed ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
      <span>{{ isRevealed ? (isEn ? 'Hide Answer' : 'إخفاء الإجابة') : (isEn ? 'Reveal Model Answer' : 'كشف الإجابة النموذجية') }}</span>
    </button>
    
    <transition name="fade-slide">
      <div v-show="isRevealed" class="flashcard-answer">
        <b>{{ isEn ? 'Model Answer: ' : 'الإجابة النموذجية: ' }}</b>
        <span v-html="isEn ? answerEn || answer : answer"></span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  question: { type: String, required: true },
  questionEn: { type: String, default: '' },
  answer: { type: String, required: true },
  answerEn: { type: String, default: '' },
  iconColor: { type: String, default: 'var(--brand)' },
  isEn: { type: Boolean, default: false }
})

const isRevealed = ref(false)

function toggleReveal() {
  isRevealed.value = !isRevealed.value
}
</script>

<style scoped>
.flashcard-interactive {
  background: var(--paper, #fff);
  border: 1px solid var(--line, #e2e8f0);
  border-radius: var(--radius-md, 14px);
  padding: 22px 24px;
  margin-bottom: 18px;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.flashcard-interactive:hover {
  border-color: var(--brand, #059669);
  box-shadow: 0 6px 18px -4px rgba(5, 150, 105, 0.15);
}
.flashcard-q {
  font-size: 15.5px;
  font-weight: 800;
  color: var(--ink, #0f172a);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.flashcard-btn {
  background: var(--brand-soft, #ecfdf5);
  color: var(--brand, #059669);
  border: 1px solid var(--brand, #059669);
  padding: 8px 18px;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.flashcard-btn:hover {
  background: var(--brand, #2563eb);
  color: #fff;
  transform: translateY(-1px);
}
.flashcard-answer {
  background: var(--bg, #f8fafc);
  border-right: 4px solid var(--brand, #2563eb);
  padding: 14px 18px;
  border-radius: 8px;
  margin-top: 14px;
  font-size: 14.5px;
  line-height: 1.85;
  color: var(--ink, #0f172a);
}
:global(html[dir="ltr"]) .flashcard-answer {
  border-right: none !important;
  border-left: 4px solid var(--brand, #2563eb) !important;
}
:global(html[dir="rtl"]) .flashcard-answer {
  border-left: none !important;
  border-right: 4px solid var(--brand, #2563eb) !important;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease-out;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
