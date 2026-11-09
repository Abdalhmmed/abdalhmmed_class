<script setup>
import { usePreferencesStore } from '@/stores/usePreferencesStore'

defineProps({
  matrix: { type: Array, required: true },
  cls: { type: Object, default: () => ({}) },
  ptr: { type: Object, default: () => ({}) },
  secondaryArr: { type: Array, default: null },
  secondaryCls: { type: Object, default: () => ({}) },
  secondaryPtr: { type: Object, default: () => ({}) },
  secondaryLabel: { type: Object, default: null }
})

const prefs = usePreferencesStore()
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 14px">
    <div
      class="matrix"
      :style="{
        gridTemplateColumns: `repeat(${matrix[0]?.length || matrix.length}, minmax(60px, 68px))`
      }"
    >
      <template v-for="(row, r) in matrix" :key="'r-' + r">
        <div
          v-for="(val, c) in row"
          :key="r + '-' + c"
          class="mcell"
          :class="cls[r + '-' + c] || ''"
        >
          <span v-if="ptr && ptr[r + '-' + c]" class="mptr">{{ ptr[r + '-' + c] }}</span>
          <span>{{ val }}</span>
          <small>[{{ r }}][{{ c }}]</small>
        </div>
      </template>
    </div>

    <div v-if="secondaryArr" style="width: 100%">
      <div class="row-label" style="margin-bottom: 8px">
        {{
          secondaryLabel
            ? secondaryLabel[prefs.lang]
            : prefs.isEn
              ? 'Auxiliary / Output Array'
              : 'مصفوفة المخرجات / المجاميع'
        }}
      </div>
      <div class="arr-row">
        <div
          v-for="(val, idx) in secondaryArr"
          :key="'sb-' + idx"
          class="cell"
          :class="[val === null ? 'empty' : '', secondaryCls[idx] || '']"
        >
          <div class="ptr">{{ secondaryPtr[idx] || '' }}</div>
          <div class="box" style="width: 56px; height: 50px; font-size: 16px">
            {{ val === null ? '' : val }}
          </div>
          <div class="ix">[{{ idx }}]</div>
        </div>
      </div>
    </div>
  </div>
</template>
