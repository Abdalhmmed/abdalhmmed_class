<script setup>
defineProps({
  hero: { type: Object, required: true },
  instructor: { type: Object, required: true }
})
</script>

<template>
  <header id="home" class="portal-hero">
    <div class="hero-container">
      <div class="hero-text">
        <div class="hero-badge">
          <span class="dot"></span>
          <span>{{ hero.badge }}</span>
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

      <!-- Instructor Card -->
      <div id="about" class="lecturer-card">
        <div class="card-content">
          <div class="instructor-profile">
            <div class="instructor-avatar">
              <i class="fa-solid fa-code"></i>
            </div>
            <div class="instructor-info">
              <h3>{{ instructor.name }}</h3>
              <p>{{ instructor.subtitle }}</p>
            </div>
          </div>

          <ul class="academic-meta-list">
            <li v-for="(item, idx) in instructor.meta" :key="idx">
              <i :class="item.icon"></i>
              <div>
                {{ item.label }} <b>{{ item.value }}</b>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
