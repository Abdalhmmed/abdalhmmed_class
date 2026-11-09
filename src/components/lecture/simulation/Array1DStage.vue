<script setup>
import { usePreferencesStore } from '@/stores/usePreferencesStore'

defineProps({
  arr: { type: Array, default: () => [] },
  cls: { type: Object, default: () => ({}) },
  ptr: { type: Object, default: () => ({}) },
  secondaryArr: { type: Array, default: null },
  secondaryCls: { type: Object, default: () => ({}) },
  secondaryPtr: { type: Object, default: () => ({}) },
  showLabel: { type: Boolean, default: true }
})

const prefs = usePreferencesStore()
</script>

<template>
  <div>
    <div v-if="showLabel" class="row-label">
      {{
        secondaryArr
          ? prefs.isEn
            ? 'Original Array arr'
            : 'المصفوفة الأصلية arr'
          : 'arr'
      }}
    </div>
    <div class="arr-row">
      <div
        v-for="(val, idx) in arr"
        :key="'a-' + idx"
        class="cell"
        :class="[val === null ? 'empty' : '', cls[idx] || '']"
      >
        <div class="ptr">{{ ptr[idx] || '' }}</div>
        <div class="box">{{ val === null ? '' : val }}</div>
        <div class="ix">[{{ idx }}]</div>
      </div>
    </div>

    <template v-if="secondaryArr">
      <div class="row-label" style="margin-top: 14px">
        {{
          prefs.isEn
            ? `New Array result (length ${secondaryArr.length})`
            : `المصفوفة الجديدة result (طول ${secondaryArr.length})`
        }}
      </div>
      <div class="arr-row">
        <div
          v-for="(val, idx) in secondaryArr"
          :key="'b-' + idx"
          class="cell"
          :class="[val === null ? 'empty' : '', secondaryCls[idx] || '']"
        >
          <div class="ptr">{{ secondaryPtr[idx] || '' }}</div>
          <div class="box">{{ val === null ? '' : val }}</div>
          <div class="ix">[{{ idx }}]</div>
        </div>
      </div>
    </template>
  </div>
</template>
