<script setup lang="ts">
import moment from "moment"

const props = defineProps<{ track: Track; toPage?: boolean }>()
const track = props.track
const isCurrent = Boolean(track.hasOwnProperty("@attr") && track["@attr"].nowplaying) ?? false
const relative = !isCurrent && moment().to(new Date(Number(track.date.uts) * 1000))
</script>

<template>
  <NuxtLink :to="toPage ? '/spotify' : track.url" :target="toPage ? '' : '_blank'">
    <div class="bg-white/10 w-72 h-28 rounded-lg hover:bg-white/15 transition-colors relative">
      <p class="absolute right-0 mr-3 mt-2 text-white/50 font-bold">{{ isCurrent ? "NOW" : relative }}</p>
      <div class="flex items-center h-full w-full px-4 gap-4">
        <NuxtImg :src="track.image[3]['#text']" alt="album cover" class="rounded-lg" width="80" height="80" loading="lazy" />
        <div class="flex flex-col justify-center">
          <h1 class="font-semibold text-lg line-clamp-1 break-all" :title="track.name">{{ track.name }}</h1>
          <h2 class="text-sm">{{ track.artist["#text"].replace("Lisa", "LiSA") }}</h2>
          <!-- :^) -->
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
