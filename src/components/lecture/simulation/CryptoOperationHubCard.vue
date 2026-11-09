<script setup>
import { ref } from 'vue'
import UniversalOperationHub from '@/components/shared/hub/UniversalOperationHub.vue'

defineProps({
  op: { type: Object, required: true },
  opIndex: { type: Number, required: true },
  prevOp: { type: Object, default: null },
  nextOp: { type: Object, default: null },
  isEn: { type: Boolean, default: false }
})

defineEmits(['activate'])

const hubRef = ref(null)

defineExpose({
  get sim() {
    return hubRef.value?.sim
  }
})
</script>

<template>
  <UniversalOperationHub
    ref="hubRef"
    :op="op"
    :op-index="opIndex"
    :prev-op="prevOp"
    :next-op="nextOp"
    :is-en="isEn"
    stage-type="crypto"
    @activate="$emit('activate', $event)"
  />
</template>
