<template>
  <div class="crypto-stage">
    <div v-if="step.a" class="stage-row">
      <div class="row-label">{{ isEn ? 'Inputs / Plaintext' : 'المدخلات / النص الصريح (Plaintext)' }}</div>
      <div class="arr-row">
        <div
          v-for="(val, idx) in step.a"
          :key="idx"
          class="cell"
          :class="step.cls?.[idx] || ''"
        >
          <div class="ptr">{{ step.ptr?.[idx] || '' }}</div>
          <div class="box">{{ val === null ? '' : val }}</div>
          <div class="ix">[{{ idx }}]</div>
        </div>
      </div>
    </div>

    <div v-if="step.b" class="stage-row">
      <div class="row-label">{{ isEn ? 'Outputs / Ciphertext' : 'المخرجات / النص المشفر (Ciphertext / Output)' }}</div>
      <div class="arr-row">
        <div
          v-for="(val, idx) in step.b"
          :key="idx"
          class="cell"
          :class="step.bcls?.[idx] || ''"
        >
          <div class="ptr">{{ step.bptr?.[idx] || '' }}</div>
          <div class="box">{{ val === null ? '' : val }}</div>
          <div class="ix">[{{ idx }}]</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  step: { type: Object, required: true },
  isEn: { type: Boolean, default: false }
})
</script>

<style scoped>
.crypto-stage {
  background: var(--bg, #f8fafc);
  border: 1.5px dashed var(--brand-border, #a7f3d0);
  border-radius: 16px;
  padding: 24px 16px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}
.row-label {
  font-family: inherit;
  font-weight: 800;
  font-size: 13px;
  color: var(--muted, #64748b);
  text-align: center;
  margin-bottom: 6px;
}
.arr-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  direction: ltr !important;
  flex-wrap: wrap;
}
.cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 66px;
  position: relative;
  transition: all 0.25s ease;
}
.cell .ptr {
  min-height: 24px;
  font: 800 12px var(--font-mono, monospace);
  color: var(--muted, #64748b);
  white-space: nowrap;
  margin-bottom: 6px;
  padding: 2px 8px;
  border-radius: 6px;
  background: transparent;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cell.active .ptr {
  color: #fff;
  background: var(--brand, #059669);
  box-shadow: 0 4px 10px rgba(5, 150, 105, 0.35);
  transform: translateY(-4px) scale(1.08);
}
.cell.compare .ptr {
  color: #b45309;
  background: var(--accent-soft, #fffbeb);
  border: 1px solid rgba(217, 119, 6, 0.4);
  transform: translateY(-3px);
}
.cell.found .ptr {
  color: #fff;
  background: var(--ok, #10b981);
  transform: translateY(-4px);
}
.cell.swap .ptr {
  color: #fff;
  background: var(--bad, #ef4444);
  transform: translateY(-4px);
}
.cell .box {
  min-width: 64px;
  width: auto;
  max-width: 420px;
  min-height: 58px;
  height: auto;
  border: 2.5px solid var(--brand, #059669) !important;
  border-radius: 14px;
  background: var(--paper, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  font: 800 16px var(--font-mono, monospace);
  color: var(--ink, #0f172a);
  padding: 10px 18px;
  white-space: normal;
  word-break: break-word;
  text-align: center;
  line-height: 1.5;
  transition: background-color 0.3s ease, transform 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}
.cell .ix {
  font: 700 12px var(--font-mono, monospace);
  color: var(--muted, #64748b);
  margin-top: 6px;
}
.cell.active .box {
  background: var(--brand-soft, #ecfdf5);
  color: var(--brand, #059669);
  transform: translateY(-4px);
  box-shadow: 0 8px 18px -4px rgba(5, 150, 105, 0.25);
}
.cell.done .box {
  background: #f0fdf4;
  border-color: #22c55e !important;
  color: #166534;
}
.cell.found .box {
  background: #dcfce7;
  border-color: #16a34a !important;
  color: #15803d;
}
.cell.swap .box {
  background: #fee2e2;
  border-color: #dc2626 !important;
  color: #991b1b;
}
</style>
