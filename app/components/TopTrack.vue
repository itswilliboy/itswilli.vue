<script setup lang="ts">
defineProps<{ track: Track }>()
</script>

<template>
  <NuxtLink :to="track.url">
    <div class="bg-light-bg relative h-16 w-64 rounded-lg transition-colors hover:bg-white/15">
      <p class="absolute right-0 mt-2 mr-3 font-bold text-white/50">{{ track.playcount }}x</p>
      <div class="flex h-full w-full items-center gap-4 px-4">
        <div class="flex flex-col justify-center">
          <Tooltip :text="track.name">
            <h1 class="line-clamp-1 text-lg font-semibold break-all" :title="track.name">{{ track.name }}</h1>
          </Tooltip>
          <h2 class="text-sm">{{ track.artist.name?.replace("Lisa", "LiSA") }}</h2>

          <!-- :^) -->
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
