<script setup lang="ts">
const { x, y } = useMousePosition()
const tooltip = useTemplateRef("tooltip")
const isHovered = ref<boolean>(false)
defineProps<{ text: string }>()

const onHover = () => {
  if (!tooltip.value) return
  const style = tooltip.value.style
  style.left = `${x.value + 30}px`
  style.top = `${y.value - 10}px`
}

const onMouseEnter = () => {
  isHovered.value = true
}
const onMouseLeave = () => {
  isHovered.value = false
}
</script>

<template>
  <div>
    <ClientOnly>
      <span
        v-if="isHovered"
        ref="tooltip"
        class="bg-light-bg pointer-events-none fixed z-1000 rounded-lg px-3 py-1 font-semibold text-white transition-opacity duration-100 select-none">
        {{ text }}
      </span>
    </ClientOnly>
    <span @mousemove="onHover" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <slot />
    </span>
  </div>
</template>
