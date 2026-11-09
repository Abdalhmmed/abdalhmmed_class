<template>
  <div class="rubric-box">
    <div class="rubric-header">
      <div class="rubric-title">
        <i class="fa-solid fa-calculator"></i>
        <span>{{ isEn ? 'Interactive Lab Grading Rubric (18 Points Total):' : 'حاسبة التقييم التفاعلية للأستاذ والطالب (18 درجة إجمالية):' }}</span>
      </div>
      <div class="score-badge">
        <span>{{ isEn ? 'Total Score: ' : 'الدرجة المستحقة الإجمالية: ' }}</span>
        <b class="score-num">{{ totalScore }} / 18</b>
      </div>
    </div>

    <div class="rubric-items">
      <label
        v-for="item in items"
        :key="item.id"
        class="rubric-item"
        :class="{ checked: item.checked }"
      >
        <input
          v-model="item.checked"
          type="checkbox"
          class="rubric-cb"
        >
        <span class="rubric-desc">
          {{ isEn ? item.textEn : item.text }}
        </span>
        <span class="weight-badge">{{ item.weight }} {{ isEn ? (item.weight > 1 ? 'Pts' : 'Pt') : 'درجات' }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'

defineProps({
  isEn: { type: Boolean, default: false }
})

const items = reactive([
  {
    id: 'rb1',
    weight: 2,
    checked: true,
    text: 'إنشاء كائن Grid وتنظيم الـ Tilemaps في طبقات مستقلة (أرضية، زينة، خلفية)',
    textEn: 'Create Grid parent and organize separate Tilemap layers (Ground, Decoration, Background)'
  },
  {
    id: 'rb2',
    weight: 2,
    checked: true,
    text: 'استيراد صور الـ Sprites وضبط PPU و Point (no filter) وتقطيع الـ Sprite Sheet',
    textEn: 'Import Sprites, configure unified PPU & Point (no filter), and slice the Sprite Sheet'
  },
  {
    id: 'rb3',
    weight: 3,
    checked: true,
    text: 'إنشاء Tile Palette واستخدام أدوات الرسم (Paint, Erase, Box Fill)',
    textEn: 'Create a Tile Palette and build the level using Paint, Erase, and Box Fill tools'
  },
  {
    id: 'rb4',
    weight: 4,
    checked: true,
    text: 'تثبيت 2D Tilemap Extras وإنشاء Rule Tile وضبط قواعد اتصال الحواف والزوايا بنجاح',
    textEn: 'Create a Rule Tile asset and configure neighbor rules for automated edges and corners'
  },
  {
    id: 'rb5',
    weight: 2,
    checked: true,
    text: 'تفعيل Tilemap Collider و Composite واختبار استقرار اللاعب فوق الأرضية عند التشغيل',
    textEn: 'Configure Tilemap Collider 2D + Composite Collider 2D (Static Rigidbody) and test player movement'
  },
  {
    id: 'rb6',
    weight: 4,
    checked: true,
    text: 'إنشاء Animation Clip لشخصية أو عنصر وضبط سرعة الإطارات (Samples) وتكرار Loop',
    textEn: 'Create a 2D Sprite Animation Clip, adjust frame Samples (FPS), and enable Loop Time'
  },
  {
    id: 'rb7',
    weight: 1,
    checked: true,
    text: 'تنظيم مجلدات المشروع (Art, Tiles, Animations) وحفظ المشهد بالاسم المعتمد',
    textEn: 'Organize project folders (Art, Tiles, Animations) and save scene as Tilemap_Animation_Task'
  }
])

const totalScore = computed(() => {
  return items.reduce((sum, item) => sum + (item.checked ? item.weight : 0), 0)
})
</script>

<style scoped>
.rubric-box {
  background: var(--brand-soft, #fefce8);
  border: 1.5px solid var(--brand-border, #fef08a);
  border-radius: 14px;
  padding: 24px;
  margin: 20px 0;
}
.rubric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1.5px dashed var(--brand-border, #fef08a);
  margin-bottom: 16px;
}
.rubric-title {
  font-size: 16px;
  font-weight: 900;
  color: var(--text-main, #1c1917);
  display: flex;
  align-items: center;
  gap: 10px;
}
.rubric-title i {
  color: var(--brand, #d97706);
}
.score-badge {
  font-size: 14px;
  font-weight: 800;
  color: var(--brand, #b45309);
}
.score-num {
  font-family: var(--font-mono, monospace);
  font-size: 18px;
  background: var(--brand-soft, #fef3c7);
  border: 1px solid var(--brand-border, #fcd34d);
  padding: 3px 12px;
  border-radius: 20px;
  margin-left: 6px;
  color: var(--brand, #b45309);
}
:global(html[dir="ltr"]) .score-num {
  margin-left: 0;
  margin-right: 6px;
}
.rubric-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rubric-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: var(--surface, #fff);
  border: 1px solid var(--border, #fef08a);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}
.rubric-item:hover {
  border-color: var(--brand, #d97706);
  background: var(--brand-soft, #fefce8);
}
.rubric-item.checked {
  border-color: var(--brand, #d97706);
}
.rubric-cb {
  width: 19px;
  height: 19px;
  accent-color: var(--brand, #d97706);
  cursor: pointer;
  flex-shrink: 0;
}
.rubric-desc {
  flex: 1;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-main, #1c1917);
  line-height: 1.6;
}
.weight-badge {
  font-family: var(--font-mono, monospace);
  font-size: 12px;
  font-weight: 800;
  background: var(--brand-soft, #fef3c7);
  color: var(--brand, #b45309);
  border: 1px solid var(--brand-border, #fcd34d);
  border-radius: 6px;
  padding: 3px 8px;
  white-space: nowrap;
}
</style>
