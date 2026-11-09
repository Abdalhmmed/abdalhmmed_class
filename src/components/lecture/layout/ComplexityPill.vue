<script setup>
import { computed } from 'vue'

const props = defineProps({
  complexity: { type: String, required: true },
  variant: { type: String, default: '' } // optional override: 'ok' | 'acc' | 'bad' | 'brand'
})

const pillClass = computed(() => {
  if (props.variant) return `p-${props.variant}`
  if (props.complexity.includes('O(1)')) return 'p-ok'
  if (props.complexity.includes('O(log')) return 'p-brand'
  if (props.complexity.includes('O(n²)') || props.complexity.includes('O(n^2)')) return 'p-bad'
  return 'p-acc'
})
</script>

<template>
  <span class="pill" :class="pillClass">
    <slot>{{ complexity }}</slot>
  </span>
</template>
