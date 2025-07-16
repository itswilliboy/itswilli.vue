<script setup lang="ts">
defineProps<{ to: string }>()
</script>
<template>
  <NuxtLink :to="to" class="bg-primary hover:bg-primary/80 w-max rounded-lg p-2 text-center font-semibold transition-colors">
    <slot />
  </NuxtLink>
</template>
