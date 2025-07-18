<script setup lang="ts">
const { loading = false } = defineProps<{ loading?: boolean }>()
defineEmits<{
  click: [event: Event]
}>()
</script>

<template>
  <button
    @click="$emit('click', $event)"
    :disabled="loading"
    class="bg-primary hover:bg-primary/80 flex min-h-10 min-w-20 cursor-pointer items-center justify-center rounded-lg p-2 text-center font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:hover:bg-primary">
    <NuxtImg :class="loading && '!opacity-100'" src="/loading.svg" class="absolute w-6 opacity-0 invert transition-opacity" />
    <span :class="loading && '!opacity-0'" class="opacity-100 transition-opacity">
      <slot />
    </span>
  </button>
</template>
