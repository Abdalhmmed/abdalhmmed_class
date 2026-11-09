<script setup>
import { computed, ref } from 'vue'
import { countOpsFast } from '@/data/dsLecture01Data'
import UniversalOperationHub from '@/components/shared/hub/UniversalOperationHub.vue'

const props = defineProps({
  op: { type: Object, required: true },
  opIndex: { type: Number, required: true },
  prevOp: { type: Object, default: null },
  nextOp: { type: Object, default: null }
})

const hubRef = ref(null)

const enrichedOp = computed(() => ({
  ...props.op,
  countOpsFast: props.op.countOpsFast || countOpsFast
}))

defineExpose({
  get sim() {
    return hubRef.value?.sim
  }
})
</script>

<template>
  <UniversalOperationHub
    ref="hubRef"
    :op="enrichedOp"
    :op-index="opIndex"
    :prev-op="prevOp"
    :next-op="nextOp"
  />
</template>
