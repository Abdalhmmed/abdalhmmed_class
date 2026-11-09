<template>
  <div class="quiz-widget">
    <div class="quiz-header">
      <h3 class="quiz-title">
        <i class="fa-solid fa-graduation-cap"></i>
        <span>{{ isEn ? (titleEn || title) : title }}</span>
      </h3>
      <span class="quiz-score-badge">
        {{ isEn ? `Score: ${totalCorrect} / ${questions.length}` : `النتيجة: ${totalCorrect} / ${questions.length}` }}
      </span>
    </div>

    <div
      v-for="(q, qIdx) in questions"
      :key="qIdx"
      class="quiz-q-box"
      :class="{ 'is-answered': state[qIdx].answered }"
    >
      <div class="quiz-q-title">
        <span class="q-num">{{ qIdx + 1 }}.</span>
        <span>{{ isEn ? (q.titleEn || q.title) : q.title }}</span>
      </div>

      <div class="quiz-options">
        <button
          v-for="(opt, optIdx) in q.options"
          :key="optIdx"
          class="quiz-opt-btn"
          :class="{
            correct: state[qIdx].answered && opt.correct,
            wrong: state[qIdx].answered && state[qIdx].selectedIdx === optIdx && !opt.correct
          }"
          :disabled="state[qIdx].answered"
          @click="answerQuestion(qIdx, optIdx, opt.correct)"
        >
          <span>{{ isEn ? (opt.textEn || opt.text) : opt.text }}</span>
          <i
            class="fa-solid"
            :class="{
              'fa-circle-check': state[qIdx].answered && opt.correct,
              'fa-circle-xmark': state[qIdx].answered && state[qIdx].selectedIdx === optIdx && !opt.correct,
              'fa-circle': !state[qIdx].answered
            }"
            :style="{ opacity: state[qIdx].answered ? 1 : 0.25 }"
          ></i>
        </button>
      </div>

      <div
        v-if="state[qIdx].answered"
        class="quiz-feedback-txt"
        :class="state[qIdx].isCorrect ? 'text-ok' : 'text-bad'"
      >
        <i :class="state[qIdx].isCorrect ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation'"></i>
        <span>
          {{
            state[qIdx].isCorrect
              ? (isEn ? 'Correct! Excellent analytical answer.' : 'إجابة صحيحة وممتازة!')
              : (isEn ? 'Incorrect. Please review the concepts above.' : 'إجابة غير صحيحة، راجع الشرح في الدرس أعلاه.')
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

const props = defineProps({
  title: { type: String, default: 'اختبار الفحص الذاتي (Self-Check Quiz)' },
  titleEn: { type: String, default: 'Self-Check Interactive Quiz' },
  questions: { type: Array, required: true },
  isEn: { type: Boolean, default: false }
})

const emit = defineEmits(['quizCompleted'])

const state = reactive(
  props.questions.map(() => ({
    answered: false,
    selectedIdx: -1,
    isCorrect: false
  }))
)

const totalCorrect = computed(() => {
  return state.filter(s => s.answered && s.isCorrect).length
})

function answerQuestion(qIdx, optIdx, isCorrect) {
  if (state[qIdx].answered) return
  state[qIdx].answered = true
  state[qIdx].selectedIdx = optIdx
  state[qIdx].isCorrect = isCorrect

  const allAnswered = state.every(s => s.answered)
  if (allAnswered) {
    emit('quizCompleted', {
      totalCorrect: totalCorrect.value,
      totalQuestions: props.questions.length
    })
  }
}
</script>

<style scoped>
.quiz-widget {
  background: var(--bg, #f8fafc);
  border: 1.5px solid var(--border-light, #e2e8f0);
  border-radius: var(--radius-lg, 16px);
  padding: 26px;
  margin: 24px 0;
}
.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 22px;
  padding-bottom: 14px;
  border-bottom: 1.5px dashed var(--border-light, #e2e8f0);
}
.quiz-title {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
  color: var(--brand, #059669);
  display: flex;
  align-items: center;
  gap: 10px;
}
.quiz-score-badge {
  font-family: var(--font-mono, monospace);
  font-size: 13.5px;
  font-weight: 800;
  background: var(--brand-soft, #ecfdf5);
  color: var(--brand, #059669);
  padding: 5px 16px;
  border-radius: 20px;
  border: 1px solid var(--brand, #059669);
}
.quiz-q-box {
  background: var(--paper, #fff);
  border: 1px solid var(--line, #e2e8f0);
  border-radius: var(--radius-md, 12px);
  padding: 20px;
  margin-bottom: 18px;
  transition: all 0.2s ease;
}
.quiz-q-title {
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 14px;
  color: var(--ink, #0f172a);
  display: flex;
  align-items: flex-start;
  gap: 8px;
  line-height: 1.6;
}
.q-num {
  color: var(--brand, #059669);
}
.quiz-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 700px) {
  .quiz-options {
    grid-template-columns: 1fr;
  }
}
.quiz-opt-btn {
  background: var(--bg, #f8fafc);
  border: 1.5px solid var(--line, #e2e8f0);
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--ink, #0f172a);
  text-align: right;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-family: inherit;
}
:global(html[dir="ltr"]) .quiz-opt-btn {
  text-align: left;
}
.quiz-opt-btn:hover:not(:disabled) {
  border-color: var(--brand, #059669);
  background: var(--brand-soft, #ecfdf5);
  transform: translateY(-1px);
}
.quiz-opt-btn.correct {
  background: #dcfce7 !important;
  color: #15803d !important;
  border-color: #22c55e !important;
}
.quiz-opt-btn.wrong {
  background: #fee2e2 !important;
  color: #b91c1c !important;
  border-color: #ef4444 !important;
}
:global([data-theme="dark"]) .quiz-opt-btn.correct {
  background: rgba(16, 185, 129, 0.25) !important;
  color: #86efac !important;
  border-color: #10b981 !important;
}
:global([data-theme="dark"]) .quiz-opt-btn.wrong {
  background: rgba(239, 68, 68, 0.25) !important;
  color: #fca5a5 !important;
  border-color: #ef4444 !important;
}
.quiz-feedback-txt {
  margin-top: 12px;
  font-size: 13px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
}
.text-ok { color: var(--ok, #10b981); }
.text-bad { color: var(--bad, #ef4444); }
</style>
