<template>
  <div class="keyspace-box">
    <div class="box-head">
      <h3 class="box-title">
        <i class="fa-solid fa-calculator"></i>
        <span>{{ isEn ? 'Keyspace & Brute-Force Time Explorer' : 'مختبر فضاء المفاتيح (Keyspace) وزمن كسر التشفير بالقوة الغاشمة' }}</span>
      </h3>
      <span class="resilience-pill">{{ isEn ? 'Mathematical Resilience Metric' : 'مقياس المناعة الرياضية' }}</span>
    </div>

    <p class="box-desc">
      {{
        isEn
          ? 'Keyspace volume equals 2^k where k is key length in bits. Select a key length to evaluate brute-force crack time assuming a supercomputer testing 1 trillion keys/sec:'
          : 'حجم فضاء المفاتيح يساوي 2^k حيث k هو طول المفتاح بالبتات (Bits). اختر طول المفتاح لمعرفة عدد الاحتمالات والزمن المطلوب لكسر التشفير إذا افترضنا حاسوباً عملاقاً يجرب 1 تريليون مفتاح في الثانية:'
      }}
    </p>

    <div class="controls-row">
      <label class="select-label">
        <span>{{ isEn ? 'Cryptographic Key Length: ' : 'طول المفتاح التشفيري: ' }}</span>
        <b class="key-lbl">{{ isEn ? currentOption.labelEn : currentOption.labelAr }}</b>
      </label>
      <select v-model="selectedBits" class="key-select">
        <option v-for="opt in options" :key="opt.bits" :value="opt.bits">
          {{ isEn ? opt.nameEn : opt.nameAr }}
        </option>
      </select>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <h4>{{ isEn ? 'Possibilities (2^k)' : 'عدد الاحتمالات (2^k)' }}</h4>
        <div class="metric-val text-brand">{{ isEn ? currentOption.spaceEn : currentOption.spaceAr }}</div>
      </div>
      <div class="metric-card">
        <h4>{{ isEn ? 'Estimated Crack Time' : 'الزمن المتوقع للكسر' }}</h4>
        <div class="metric-val" :class="currentOption.secure ? 'text-ok' : 'text-bad'">
          {{ isEn ? currentOption.timeEn : currentOption.timeAr }}
        </div>
      </div>
      <div class="metric-card">
        <h4>{{ isEn ? 'Cybersecurity Verdict' : 'حكم الأمن السيبراني' }}</h4>
        <div class="verdict-txt" :class="currentOption.secure ? 'text-ok' : 'text-bad'">
          <i :class="currentOption.secure ? 'fa-solid fa-shield-check' : 'fa-solid fa-triangle-exclamation'"></i>
          <span>{{ isEn ? currentOption.verdictEn : currentOption.verdictAr }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineProps({
  isEn: { type: Boolean, default: false }
})

const selectedBits = ref(56)

const options = [
  {
    bits: 8,
    nameAr: '8 بت (بدائي جداً - 256 مفتاح)',
    nameEn: '8-bit (Trivial - 256 keys)',
    labelAr: '8 بت (256 احتمال)',
    labelEn: '8-bit (256 keys)',
    spaceAr: '256 مفتاح',
    spaceEn: '256 Keys',
    timeAr: '< 0.0001 ثانية (لحظي)',
    timeEn: '< 0.0001 sec (Instantaneous)',
    verdictAr: 'كسر لحظي تافه حتى بهاتف قديم.',
    verdictEn: 'Instant trivial crack even on an old mobile phone.',
    secure: false
  },
  {
    bits: 16,
    nameAr: '16 بت (ضعيف - 65,536 مفتاح)',
    nameEn: '16-bit (Weak - 65,536 keys)',
    labelAr: '16 بت (65,536 احتمال)',
    labelEn: '16-bit (65,536 keys)',
    spaceAr: '65,536 مفتاح',
    spaceEn: '65,536 Keys',
    timeAr: '~ 0.001 ثانية',
    timeEn: '~ 0.001 sec',
    verdictAr: 'غير آمن تماماً ويكسر فوراً.',
    verdictEn: 'Completely insecure, broken instantaneously.',
    secure: false
  },
  {
    bits: 56,
    nameAr: '56 بت (معيار DES القديم - كُسر تاريخياً)',
    nameEn: '56-bit (Legacy DES standard - Historically cracked)',
    labelAr: '56 بت (معيار DES القديم)',
    labelEn: '56-bit (Legacy DES Standard)',
    spaceAr: '7.2 × 10¹⁶ احتمال',
    spaceEn: '7.2 × 10¹⁶ Keys',
    timeAr: '~ 20 ساعة (بحاسوب مخصص)',
    timeEn: '~ 20 Hours (Custom Hardware)',
    verdictAr: 'مكسور عملياً منذ عام 1999 بواسطة EFF Deep Crack.',
    verdictEn: 'Practically compromised since 1999 by EFF Deep Crack.',
    secure: false
  },
  {
    bits: 128,
    nameAr: '128 بت (AES-128 - آمن لملايين السنين)',
    nameEn: '128-bit (AES-128 - Bulletproof for millennia)',
    labelAr: '128 بت (معيار AES-128)',
    labelEn: '128-bit (AES-128 Standard)',
    spaceAr: '3.4 × 10³⁸ احتمال',
    spaceEn: '3.4 × 10³⁸ Keys',
    timeAr: '> مليار مليار سنة!',
    timeEn: '> 10¹⁸ Years (Centuries)',
    verdictAr: 'آمن تماماً ضد كل حواسيب الأرض مجتمعة.',
    verdictEn: 'Impervious to all world computing clusters combined.',
    secure: true
  },
  {
    bits: 256,
    nameAr: '256 بت (AES-256 - مناعة عسكرية وفلكية)',
    nameEn: '256-bit (AES-256 - Military & Quantum resistance)',
    labelAr: '256 بت (معيار AES-256)',
    labelEn: '256-bit (AES-256 Standard)',
    spaceAr: '1.15 × 10⁷⁷ احتمال',
    spaceEn: '1.15 × 10⁷⁷ Keys',
    timeAr: 'يفوق عمر الكون بمليارات المرات',
    timeEn: 'Billions of times the age of the Universe',
    verdictAr: 'مناعة مطلقة وقوة تشفير عسكرية حتى ضد الحواسيب الكمومية.',
    verdictEn: 'Astronomical entropy exceeding the age of the known universe.',
    secure: true
  }
]

const currentOption = computed(() => {
  return options.find(o => o.bits === Number(selectedBits.value)) || options[2]
})
</script>

<style scoped>
.keyspace-box {
  background: var(--bg, #f8fafc);
  border: 1px solid var(--line, #e2e8f0);
  border-radius: var(--radius-lg, 16px);
  padding: 24px 28px;
  margin-top: 24px;
}
.box-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}
.box-title {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
  color: var(--brand, #059669);
  display: flex;
  align-items: center;
  gap: 10px;
}
.resilience-pill {
  font-size: 12.5px;
  font-weight: 800;
  background: var(--brand-soft, #ecfdf5);
  color: var(--brand, #059669);
  padding: 4px 14px;
  border-radius: 20px;
  border: 1px solid var(--brand-border, #a7f3d0);
}
.box-desc {
  font-size: 14.5px;
  color: var(--muted, #64748b);
  line-height: 1.8;
  margin-bottom: 18px;
}
.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  background: var(--paper, #fff);
  border: 1px solid var(--line, #e2e8f0);
  border-radius: 12px;
  padding: 14px 20px;
}
.select-label {
  font-size: 15px;
  font-weight: 800;
  color: var(--ink, #0f172a);
}
.key-lbl {
  color: var(--brand, #059669);
  font-family: var(--font-mono, monospace);
  margin-right: 6px;
}
:global(html[dir="ltr"]) .key-lbl {
  margin-right: 0;
  margin-left: 6px;
}
.key-select {
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1.5px solid var(--brand, #059669);
  background: var(--bg, #f8fafc);
  color: var(--ink, #0f172a);
  outline: none;
}
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 18px;
}
@media (max-width: 800px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
.metric-card {
  background: var(--paper, #fff);
  border: 1px solid var(--line, #e2e8f0);
  border-radius: 12px;
  padding: 18px 20px;
}
.metric-card h4 {
  margin: 0 0 8px;
  font-size: 14px;
  color: var(--muted, #64748b);
  font-weight: 800;
}
.metric-val {
  font-family: var(--font-mono, monospace);
  font-size: 16.5px;
  font-weight: 900;
}
.verdict-txt {
  font-size: 13.5px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 8px;
}
.text-brand { color: var(--brand, #059669); }
.text-ok { color: var(--ok, #10b981); }
.text-bad { color: var(--bad, #ef4444); }
</style>
