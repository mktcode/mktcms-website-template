<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = defineProps<{
  /** Optional gap value. Numeric values use Tailwind spacing scale (n * 0.25rem). */
  gap?: string | number
}>()

const slots = useSlots()

const normalizedCols = computed(() => {
  const columnIndices = Object.keys(slots)
    .map((name) => {
      const match = name.match(/^col-(\d+)$/)
      return match ? Number(match[1]) : 0
    })
    .filter(index => Number.isFinite(index) && index > 0)

  if (columnIndices.length === 0) return 1
  return Math.max(...columnIndices)
})

const normalizedGap = computed(() => {
  if (props.gap == null || props.gap === '') return '1rem'

  if (typeof props.gap === 'number' && Number.isFinite(props.gap)) {
    return `${props.gap * 0.25}rem`
  }

  const trimmedGap = String(props.gap).trim()
  if (!trimmedGap) return '1rem'

  if (/^\d+(\.\d+)?$/.test(trimmedGap)) {
    const numericGap = Number(trimmedGap)
    return `${numericGap * 0.25}rem`
  }

  return trimmedGap
})

const gridStyle = computed(() => ({
  '--mdc-cols': String(normalizedCols.value),
  '--mdc-gap': normalizedGap.value,
}))

function slotName(index1: number) {
  return `col-${index1}`
}
</script>

<template>
  <div
    class="mdc-cols grid"
    :style="gridStyle"
  >
    <div
      v-for="i in normalizedCols"
      :key="i"
      class="flex flex-col gap-2"
    >
      <MDCSlot :name="slotName(i)" />
    </div>
  </div>
</template>

<style scoped>
.mdc-cols {
  gap: var(--mdc-gap);
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

@media (min-width: 768px) {
  .mdc-cols {
    grid-template-columns: repeat(var(--mdc-cols), minmax(0, 1fr));
  }
}
</style>
