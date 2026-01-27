<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    images: string[]
    height?: string
    autoplay?: boolean
    intervalMs?: number
  }>(),
  {
    height: '400px',
    autoplay: true,
    intervalMs: 6000,
  },
)

const currentIndex = ref(0)

const hasMultiple = computed(() => props.images.length > 1)
const currentImage = computed(() => props.images[currentIndex.value] ?? '')

function clampIndex(index: number) {
  const length = props.images.length
  if (length <= 0) return 0
  return ((index % length) + length) % length
}

function goTo(index: number) {
  currentIndex.value = clampIndex(index)
}

function next() {
  goTo(currentIndex.value + 1)
}

function prev() {
  goTo(currentIndex.value - 1)
}

watch(
  () => props.images,
  (images) => {
    if (!images?.length) currentIndex.value = 0
    else currentIndex.value = clampIndex(currentIndex.value)
  },
  { deep: true },
)

let autoplayTimer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (!props.autoplay || !hasMultiple.value) return
  autoplayTimer = setInterval(() => {
    next()
  }, props.intervalMs)
})
onBeforeUnmount(() => {
  if (autoplayTimer) clearInterval(autoplayTimer)
})

const pointerStartX = ref<number | null>(null)
const pointerStartY = ref<number | null>(null)
function onPointerDown(event: PointerEvent) {
  pointerStartX.value = event.clientX
  pointerStartY.value = event.clientY
}
function onPointerUp(event: PointerEvent) {
  if (!hasMultiple.value) return
  if (pointerStartX.value == null || pointerStartY.value == null) return

  const deltaX = event.clientX - pointerStartX.value
  const deltaY = event.clientY - pointerStartY.value

  pointerStartX.value = null
  pointerStartY.value = null

  if (Math.abs(deltaX) < 50) return
  if (Math.abs(deltaY) > Math.abs(deltaX)) return
  if (deltaX < 0) next()
  else prev()
}
</script>

<template>
  <div
    class="relative w-full overflow-hidden select-none"
    :style="{ height: props.height }"
    role="region"
    aria-roledescription="carousel"
    aria-label="Slideshow"
    tabindex="0"
    @keydown.left.prevent="prev"
    @keydown.right.prevent="next"
    @pointerdown="onPointerDown"
    @pointerup="onPointerUp"
  >
    <Transition name="fade">
      <img
        v-if="currentImage"
        :key="currentImage"
        :src="currentImage"
        class="absolute inset-0 h-full w-full object-cover"
        alt=""
        draggable="false"
      />
    </Transition>

    <button
      v-if="hasMultiple"
      type="button"
      class="navButton left-3"
      aria-label="Previous slide"
      @click="prev"
    >
      <Icon name="heroicons:chevron-left" size="2rem" />
    </button>

    <button
      v-if="hasMultiple"
      type="button"
      class="navButton right-3"
      aria-label="Next slide"
      @click="next"
    >
      <Icon name="heroicons:chevron-right" size="2rem" />
    </button>

    <div v-if="hasMultiple" class="dots">
      <button
        v-for="(_, index) in props.images"
        :key="index"
        type="button"
        class="dot"
        :class="{ active: index === currentIndex }"
        :aria-label="`Go to slide ${index + 1}`"
        :aria-current="index === currentIndex ? 'true' : undefined"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.navButton {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  backdrop-filter: blur(4px);
  transition: background 150ms ease, transform 150ms ease;
}

.navButton:hover {
  background: rgba(0, 0, 0, 0.5);
}

.navButton:active {
  transform: translateY(-50%) scale(0.96);
}

.navButton:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.9);
  outline-offset: 2px;
}

.dots {
  position: absolute;
  left: 50%;
  bottom: 0.75rem;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(4px);
}

.dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 9999px;
  border: 2px solid rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.25);
  transition: background 150ms ease, transform 150ms ease;
}

.dot:hover {
  background: rgba(255, 255, 255, 0.55);
}

.dot.active {
  background: rgba(255, 255, 255, 0.95);
}
</style>