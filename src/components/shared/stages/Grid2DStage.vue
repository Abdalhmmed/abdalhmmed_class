<script setup>
import Matrix2DStage from '@/components/lecture/simulation/Matrix2DStage.vue'

defineProps({
  matrix: { type: Array, default: () => [] },
  cls: { type: Object, default: () => ({}) },
  pointers: { type: Object, default: () => ({}) },
  secondaryArr: { type: Array, default: null },
  secondaryCls: { type: Object, default: () => ({}) },
  secondaryPointers: { type: Object, default: () => ({}) },
  secondaryLabel: { type: String, default: '' }
})
</script>

<template>
  <Matrix2DStage
    :matrix="matrix"
    :cls="cls"
    :ptr="pointers"
    :secondary-arr="secondaryArr"
    :secondary-cls="secondaryCls"
    :secondary-ptr="secondaryPointers"
    :secondary-label="secondaryLabel"
  />
</template>
