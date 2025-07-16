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
    class="bg-primary hover:bg-primary/80 flex min-h-10 min-w-20 cursor-pointer items-center justify-center rounded-lg p-2 text-center font-semibold transition-colors disabled:cursor-not-allowed">
    <NuxtImg v-if="loading" src="/loading.svg" class="w-6 invert" />
    <slot v-else />
  </button>
</template>
