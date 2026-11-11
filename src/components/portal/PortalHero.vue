<script setup>
defineProps({
  hero: { type: Object, required: true }
})
</script>

<template>
  <header id="home" class="portal-hero">
    <div class="hero-container hero-container-single">
      <div class="hero-text">
        <!-- Academic Header Tag (Clean typography, borderless & background-free) -->
        <div class="academic-hero-tag">
          <span class="tag-label">{{ hero.kicker || 'Academic Curricula' }}</span>
          <span class="tag-sep">/</span>
          <span class="tag-title">{{ hero.badge }}</span>
          <span v-if="hero.year" class="tag-year">{{ hero.year }}</span>
        </div>

        <h2 class="hero-title">
          {{ hero.titleLine1 }}<br />
          <span>{{ hero.titleHighlight }}</span>
        </h2>
        <p class="hero-desc">
          {{ hero.desc }}
        </p>

        <div class="hero-stats">
          <div
            v-for="(stat, idx) in hero.stats"
            :key="idx"
            class="stat-item"
            :class="{ 'stat-item-bordered': stat.bordered }"
          >
            <span class="stat-num">{{ stat.num }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
