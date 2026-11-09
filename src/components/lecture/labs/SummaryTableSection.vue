<script setup>
import { usePreferencesStore } from '@/stores/usePreferencesStore'
import { OPS } from '@/data/dsLecture01Data'
import CalloutBox from '@/components/lecture/layout/CalloutBox.vue'
import ComplexityPill from '@/components/lecture/layout/ComplexityPill.vue'

defineProps({
  ops: { type: Array, default: () => OPS },
  takeawayHtml: {
    type: Object,
    default: () => ({
      ar: '<b>الخلاصة:</b> المصفوفة ممتازة في <b>القراءة والتعديل بالفهرس O(1)</b>، وضعيفة في <b>الإدراج والحذف O(n)</b> لأن حجمها ثابت ويجب نسخ العناصر إلى مصفوفة جديدة.',
      en: '<b>Takeaway:</b> Arrays excel at <b>indexed reads and updates O(1)</b>, but are costly for <b>insertions and deletions O(n)</b> because their fixed size requires allocating a new array and shifting elements.'
    })
  },
  footerSub: {
    type: Object,
    default: () => ({
      ar: 'مختبر هياكل البيانات بلغة Java (الدرس 01) · العام الجامعي 2026-2027م',
      en: 'Data Structures Lab in Java (Lecture 01) · Academic Year 2026-2027'
    })
  }
})

const prefs = usePreferencesStore()

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <!-- SUMMARY TABLE -->
  <section id="summary" class="card">
    <h2>
      {{
        prefs.isEn
          ? 'Comprehensive Comparison & Complexity Summary of All Operations'
          : 'جدول المقارنة والمراجعة الشاملة لجميع العمليات'
      }}
    </h2>
    <table>
      <thead>
        <tr>
          <th>{{ prefs.isEn ? 'Operation' : 'العملية' }}</th>
          <th>{{ prefs.isEn ? 'Best Case' : 'أفضل' }}</th>
          <th>{{ prefs.isEn ? 'Average Case' : 'متوسط' }}</th>
          <th>{{ prefs.isEn ? 'Worst Case' : 'أسوأ' }}</th>
          <th>{{ prefs.isEn ? 'Space' : 'المكاني' }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in ops" :key="o.key">
          <td>
            <a
              :href="'#op-' + o.key"
              style="font-weight: 800; color: var(--brand)"
              @click.prevent="scrollToId('op-' + o.key)"
            >
              {{ o.name[prefs.lang] }}
            </a>
          </td>
          <td v-for="(c, cIdx) in o.cases[prefs.lang]" :key="cIdx">
            <ComplexityPill :complexity="c[0]" />
          </td>
          <td>
            <ComplexityPill :complexity="o.spaceBig" />
          </td>
        </tr>
      </tbody>
    </table>

    <CalloutBox type="warn">
      <span v-html="takeawayHtml[prefs.lang]"></span>
    </CalloutBox>
  </section>

  <!-- Lecture Footer -->
  <div class="foot" style="line-height: 1.95">
    <b>
      {{
        prefs.isEn
          ? 'Programming Lectures & Interactive Labs Portal | Eng. Abdulhamid Helal Daban'
          : 'بوابة الملازم والمختبرات البرمجية | م. عبدالحميد هلال دعبان'
      }}
    </b>
    <br />
    <span style="font-size: 13px; color: var(--ink-soft); font-weight: 700">
      {{
        prefs.isEn
          ? 'Course Instructor: Eng. Abdulhamid Helal Daban'
          : 'أستاذ المقرر ومعد المحتوى: م. عبدالحميد هلال دعبان'
      }}
    </span>
    <br />
    <span style="font-size: 12.5px; color: var(--muted)">
      {{ footerSub[prefs.lang] }} ·
      {{
        prefs.isEn
          ? 'All Website, Design & Academic Rights Reserved ©'
          : 'جميع حقوق الموقع والتصميم والمحتوى الأكاديمي محفوظة ©'
      }}
    </span>
  </div>
  <div
    style="
      opacity: 0.04;
      font-size: 9px;
      text-align: center;
      margin-top: 10px;
      user-select: none;
      pointer-events: none;
    "
    aria-hidden="true"
    data-author="Abdulhamid-Helal-Daban"
    data-academic-year="2026-2027"
  >
    حقوق الملكية الفكرية والبرمجية محفوظة © 2026-2027م م. عبدالحميد هلال دعبان | جامعة عدن
  </div>
</template>
