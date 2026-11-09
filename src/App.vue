<script setup>
import { RouterView } from 'vue-router'
import { usePreferencesStore } from '@/stores/usePreferencesStore'

// Initialize store so theme, palette, and language attributes are applied on mount
usePreferencesStore()
</script>

<template>
  <RouterView />
</template>
