<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'

const prefs = usePreferencesStore()
const canvasRef = ref(null)
let drawing = false
let resizeTimer = null
let resizeListenerAttached = false

function resizeCanvasPreservingContent() {
  const cvs = canvasRef.value
  if (!cvs || !prefs.isDrawing) return
  const ctx = cvs.getContext('2d', { willReadFrequently: true })
  if (!ctx) return

  // Save current drawing before resizing
  let savedData = null
  if (cvs.width > 0 && cvs.height > 0) {
    try {
      savedData = ctx.getImageData(0, 0, cvs.width, cvs.height)
    } catch {
      savedData = null
    }
  }

  cvs.width = window.innerWidth
  cvs.height = window.innerHeight

  if (savedData) {
    try {
      ctx.putImageData(savedData, 0, 0)
    } catch {
      // Ignore putImageData errors on extreme viewport changes
    }
  }
}

function handleDebouncedResize() {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    resizeCanvasPreservingContent()
  }, 150)
}

function attachResize() {
  if (!resizeListenerAttached) {
    window.addEventListener('resize', handleDebouncedResize, { passive: true })
    resizeListenerAttached = true
  }
}

function detachResize() {
  if (resizeTimer) {
    clearTimeout(resizeTimer)
    resizeTimer = null
  }
  if (resizeListenerAttached) {
    window.removeEventListener('resize', handleDebouncedResize)
    resizeListenerAttached = false
  }
}

function clearCanvas() {
  const cvs = canvasRef.value
  if (!cvs) return
  const ctx = cvs.getContext('2d', { willReadFrequently: true })
  if (ctx) ctx.clearRect(0, 0, cvs.width, cvs.height)
}

function onPointerDown(e) {
  if (!prefs.isDrawing) return
  const cvs = canvasRef.value
  if (!cvs) return
  drawing = true
  cvs.setPointerCapture?.(e.pointerId)
  const ctx = cvs.getContext('2d', { willReadFrequently: true })
  if (!ctx) return
  ctx.beginPath()
  ctx.moveTo(e.clientX, e.clientY)
}

function onPointerMove(e) {
  if (!drawing || !prefs.isDrawing) return
  const cvs = canvasRef.value
  if (!cvs) return
  const ctx = cvs.getContext('2d', { willReadFrequently: true })
  if (!ctx) return
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = '#f59e0b'
  ctx.lineTo(e.clientX, e.clientY)
  ctx.stroke()
}

function onPointerUp() {
  drawing = false
}

watch(
  () => prefs.clearCanvasTrigger,
  () => {
    clearCanvas()
  }
)

watch(
  () => prefs.isDrawing,
  (val) => {
    if (val) {
      nextTick(() => {
        resizeCanvasPreservingContent()
        attachResize()
      })
    } else {
      drawing = false
      detachResize()
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  detachResize()
})
</script>

<template>
  <canvas
    v-if="prefs.isDrawing"
    id="pen"
    ref="canvasRef"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  />
</template>
