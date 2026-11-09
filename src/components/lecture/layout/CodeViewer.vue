<script setup>
import { ref, computed } from 'vue'
import { highlightJavaLine } from '@/core/syntaxHighlighter'
import { usePreferencesStore } from '@/stores/usePreferencesStore'

const props = defineProps({
  lines: { type: [Array, String], required: true },
  activeLine: { type: Number, default: -1 },
  showLineNumbers: { type: Boolean, default: true },
  copyable: { type: Boolean, default: true },
  langLabel: { type: String, default: 'Java' },
  compact: { type: Boolean, default: false }
})

const prefs = usePreferencesStore()
const copied = ref(false)

const normalizedLines = computed(() => {
  if (Array.isArray(props.lines)) return props.lines
  return String(props.lines).split('\n')
})

const highlightedLines = computed(() =>
  normalizedLines.value.map((line) => highlightJavaLine(line))
)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(normalizedLines.value.join('\n'))
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    // Fallback if clipboard permission denied
  }
}
</script>

<template>
  <div class="code-wrap" :class="{ 'code-compact': compact }">
    <div v-if="copyable" class="code-toolbar">
      <span class="code-lang-tag">
        <i class="fa-solid fa-code"></i> {{ langLabel }}
      </span>
      <button
        type="button"
        class="code-copy-btn"
        :class="{ copied }"
        :title="prefs.isEn ? 'Copy Code' : 'نسخ الكود'"
        @click="copyCode"
      >
        <i :class="copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'"></i>
        <span>
          {{
            copied
              ? prefs.isEn
                ? 'Copied'
                : 'تم النسخ'
              : prefs.isEn
                ? 'Copy'
                : 'نسخ'
          }}
        </span>
      </button>
    </div>

    <div class="code">
      <div
        v-for="(html, idx) in highlightedLines"
        :key="idx"
        class="ln"
        :class="{ on: idx === activeLine }"
      >
        <i v-if="showLineNumbers">{{ idx + 1 }}</i>
        <span v-html="html"></span>
      </div>
    </div>
  </div>
</template>
