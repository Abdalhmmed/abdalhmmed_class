<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'

const prefs = usePreferencesStore()
const canvasRef = ref(null)
let drawing = false

function resizeCanvasPreservingContent() {
  const cvs = canvasRef.value
  if (!cvs) return
  const ctx = cvs.getContext('2d')

  // Save current drawing before resizing
  let savedData = null
  if (cvs.width > 0 && cvs.height > 0) {
    savedData = ctx.getImageData(0, 0, cvs.width, cvs.height)
  }

  cvs.width = window.innerWidth
  cvs.height = window.innerHeight

  if (savedData) {
    ctx.putImageData(savedData, 0, 0)
  }
}

function clearCanvas() {
  const cvs = canvasRef.value
  if (!cvs) return
  const ctx = cvs.getContext('2d')
  ctx.clearRect(0, 0, cvs.width, cvs.height)
}

function onPointerDown(e) {
  if (!prefs.isDrawing) return
  const cvs = canvasRef.value
  if (!cvs) return
  drawing = true
  cvs.setPointerCapture?.(e.pointerId)
  const ctx = cvs.getContext('2d')
  ctx.beginPath()
  ctx.moveTo(e.clientX, e.clientY)
}

function onPointerMove(e) {
  if (!drawing || !prefs.isDrawing) return
  const cvs = canvasRef.value
  if (!cvs) return
  const ctx = cvs.getContext('2d')
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

onMounted(() => {
  resizeCanvasPreservingContent()
  window.addEventListener('resize', resizeCanvasPreservingContent)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvasPreservingContent)
})
</script>

<template>
  <canvas
    id="pen"
    ref="canvasRef"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  />
</template>
