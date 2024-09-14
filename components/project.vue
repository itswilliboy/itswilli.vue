<script setup lang="ts">
const props = defineProps<{ project: { name: string; description: string; href: string; colour: string; icon: string } }>()
</script>

<template>
  <a
    class="group relative h-28 w-72 rounded-lg bg-white/10 transition-all hover:bg-white/15"
    :href="project.href"
    target="_blank">
    <div class="flex items-center justify-between px-3 pt-3">
      <div class="flex items-center justify-between gap-2">
        <Icon :name="project.icon" size="1.5em" />
        <h1 class="text-lg">{{ project.name }}</h1>
      </div>
      <NuxtImg src="/github.svg" class="w-5 opacity-30" />
    </div>
    <div class="mt-1 px-3 text-sm text-white/70">{{ project.description }}</div>
    <div class="absolute bottom-0 h-[6px] w-full rounded-b-lg transition-all group-hover:brightness-125" id="strip"></div>
  </a>
</template>

<style scoped>
#strip {
  @apply bg-[v-bind(project.colour)];
}
</style>
