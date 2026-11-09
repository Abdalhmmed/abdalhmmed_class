import { ref, shallowRef, computed, watch, onUnmounted } from 'vue'
import { usePreferencesStore } from '@/stores/usePreferencesStore'

// Registry to ensure only one operation timer runs at any given moment
let activeStopFn = null

export function useSimulationInstance(opConfig, opIndex) {
  const prefs = usePreferencesStore()

  const currentSlide = ref(0)
  const steps = shallowRef([])
  const stepIndex = ref(0)
  const isPlaying = ref(false)
  const speed = ref(750)
  let timerId = null

  // Input state reactive per operation
  const arrInput = ref(opConfig.defArr ? opConfig.defArr.join(', ') : '')
  const presetInput = ref('custom')
  const paramValues = ref({})

  // Initialize default input parameters
  if (opConfig.inputs) {
    opConfig.inputs.forEach(([key, , defVal]) => {
      if (key !== 'preset') {
        paramValues.value[key] = defVal
      }
    })
  }

  function parseArrayInput() {
    if (!opConfig.defArr) return null
    let a = String(arrInput.value)
      .split(/[,،\s]+/)
      .filter((x) => x !== '')
      .map(Number)
      .filter((x) => !isNaN(x))
    if (a.length < 2) a = opConfig.defArr.slice()
    if (a.length > 10) a = a.slice(0, 10)
    arrInput.value = a.join(', ')
    return a
  }

  function getValidatedParams() {
    const p = { arr: parseArrayInput() }
    if (opConfig.inputs) {
      opConfig.inputs.forEach(([key, , defVal]) => {
        if (key === 'preset') return
        const rawVal = paramValues.value[key]
        if (typeof defVal === 'string') {
          p[key] = rawVal !== undefined && rawVal !== null ? String(rawVal) : defVal
        } else {
          const val = Number(rawVal)
          p[key] = !isNaN(val) ? val : defVal
        }
      })
    }
    if (p.arr) {
      const n = p.arr.length
      if ('i' in p) {
        p.i = Math.max(0, Math.min(n - 1, p.i | 0))
        paramValues.value.i = p.i
      }
      if ('pos' in p) {
        const mx = opConfig.key === 'insert' ? n : n - 1
        p.pos = Math.max(0, Math.min(mx, p.pos | 0))
        paramValues.value.pos = p.pos
      }
    }
    if (typeof opConfig.validateParams === 'function') {
      opConfig.validateParams(p, paramValues.value)
    }
    return p
  }

  function stop() {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
    isPlaying.value = false
    if (activeStopFn === stop) {
      activeStopFn = null
    }
  }

  function rebuild(preserveStep = false) {
    const prevIdx = stepIndex.value
    stop()
    const generated = opConfig.gen(getValidatedParams(), prefs.lang)
    steps.value = generated
    stepIndex.value = preserveStep ? Math.min(prevIdx, Math.max(0, generated.length - 1)) : 0
  }

  function applyPreset() {
    const v = presetInput.value
    if (v === 'custom') return
    const currentArr = parseArrayInput()
    if (!currentArr) return
    let a = currentArr.slice().sort((x, y) => x - y)
    if (v === 'worst') a.reverse()
    if (v === 'rand') a = currentArr.map(() => Math.floor(Math.random() * 90) + 10)
    arrInput.value = a.join(', ')
    rebuild()
  }

  function next() {
    if (stepIndex.value < steps.value.length - 1) {
      stepIndex.value++
    } else {
      stop()
    }
  }

  function prev() {
    stop()
    if (stepIndex.value > 0) {
      stepIndex.value--
    }
  }

  function first() {
    stop()
    stepIndex.value = 0
  }

  function last() {
    stop()
    if (steps.value.length > 0) {
      stepIndex.value = steps.value.length - 1
    }
  }

  function play() {
    if (activeStopFn && activeStopFn !== stop) {
      activeStopFn()
    }
    activeStopFn = stop
    prefs.activeOpIndex = opIndex

    if (stepIndex.value >= steps.value.length - 1) {
      stepIndex.value = 0
    }
    isPlaying.value = true

    const delay = () => Math.max(100, 1650 - Number(speed.value))
    const tick = () => {
      if (!isPlaying.value) return
      if (stepIndex.value < steps.value.length - 1) {
        stepIndex.value++
        timerId = setTimeout(tick, delay())
      } else {
        stop()
      }
    }
    timerId = setTimeout(tick, delay())
  }

  function togglePlay() {
    if (isPlaying.value) {
      stop()
    } else {
      play()
    }
  }

  function goSlide(s) {
    stop()
    currentSlide.value = s
    prefs.activeOpIndex = opIndex
  }

  function tryCase(caseKey) {
    if (typeof opConfig.tryCaseFn === 'function') {
      opConfig.tryCaseFn(caseKey, paramValues.value)
    } else if (opConfig.key === 'search') {
      arrInput.value = [12, 7, 25, 9, 18, 30].join(', ')
      paramValues.value.target = caseKey === 'best' ? 12 : 99
    } else if (opConfig.key === 'bubble') {
      arrInput.value = (caseKey === 'best' ? [10, 20, 30, 40, 50, 60] : [60, 50, 40, 30, 20, 10]).join(', ')
    } else if (opConfig.key === 'insert' || opConfig.key === 'delete') {
      const a = parseArrayInput()
      paramValues.value.pos = caseKey === 'best' ? (opConfig.key === 'insert' ? a.length : a.length - 1) : 0
    }
    goSlide(1)
    rebuild()
    play()
  }

  const currentStep = computed(() => steps.value[stepIndex.value] || null)
  const prevStepVars = computed(() => (stepIndex.value > 0 ? steps.value[stepIndex.value - 1]?.vars || {} : {}))
  const progressPercent = computed(() =>
    steps.value.length ? ((stepIndex.value + 1) / steps.value.length) * 100 : 0
  )

  // Re-generate step messages in the new language while preserving the active step index
  watch(
    () => prefs.lang,
    () => {
      rebuild(true)
    }
  )

  // Initialize steps immediately
  rebuild()

  onUnmounted(() => {
    stop()
  })

  return {
    currentSlide,
    steps,
    stepIndex,
    isPlaying,
    speed,
    arrInput,
    presetInput,
    paramValues,
    currentStep,
    prevStepVars,
    progressPercent,
    rebuild,
    applyPreset,
    next,
    prev,
    first,
    last,
    play,
    stop,
    togglePlay,
    goSlide,
    tryCase
  }
}
