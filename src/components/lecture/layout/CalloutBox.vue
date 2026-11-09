<script setup>
defineProps({
  type: {
    type: String,
    default: 'note', // 'note' | 'warn' | 'analogy' | 'formula'
    validator: (v) => ['note', 'warn', 'analogy', 'formula'].includes(v)
  }
})
</script>

<template>
  <div :class="type">
    <slot />
  </div>
</template>
