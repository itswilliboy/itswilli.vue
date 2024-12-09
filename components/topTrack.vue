<script setup lang="ts">
defineProps<{ track: Track }>()
</script>

<template>
  <NuxtLink :to="track.url">
    <div class="relative h-16 w-64 rounded-lg bg-white/10 transition-colors hover:bg-white/15">
      <p class="absolute right-0 mr-3 mt-2 font-bold text-white/50">{{ track.playcount }}x</p>
      <div class="flex h-full w-full items-center gap-4 px-4">
        <div class="flex flex-col justify-center">
          <h1 class="line-clamp-1 break-all text-lg font-semibold" :title="track.name">{{ track.name }}</h1>
          <h2 class="text-sm">{{ track.artist.name?.replace("Lisa", "LiSA") }}</h2>
          <!-- :^) -->
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
