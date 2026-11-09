<script setup>
import Array1DStage from '@/components/lecture/simulation/Array1DStage.vue'

defineProps({
  items: { type: Array, default: () => [] },
  cls: { type: Object, default: () => ({}) },
  pointers: { type: Object, default: () => ({}) },
  secondaryItems: { type: Array, default: null },
  secondaryCls: { type: Object, default: () => ({}) },
  secondaryPointers: { type: Object, default: () => ({}) }
})
</script>

<template>
  <Array1DStage
    :arr="items"
    :cls="cls"
    :ptr="pointers"
    :secondary-arr="secondaryItems"
    :secondary-cls="secondaryCls"
    :secondary-ptr="secondaryPointers"
  />
</template>
