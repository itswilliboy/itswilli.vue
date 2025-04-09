<script setup lang="ts">
import { formatDistance } from "date-fns"

const props = defineProps<{ track: Track; toPage?: boolean }>()
const track = props.track
const isCurrent = Boolean(track.hasOwnProperty("@attr") && track["@attr"].nowplaying) ?? false
const relativeTime = () => {
  return !isCurrent && formatDistance(new Date(), new Date(Number(track.date.uts) * 1000)) + " ago"
}
const relative = ref<string>(relativeTime() || "NOW")

useIntervalFn(() => {
  if (isCurrent) return
  relative.value = relativeTime() as string
}, 60000)
</script>

<template>
  <NuxtLink :to="toPage ? '/spotify' : track.url" :target="toPage ? '' : '_blank'">
    <div class="relative h-28 w-72 rounded-lg bg-white/10 transition-colors hover:bg-white/15">
      <ClientOnly>
        <p class="absolute right-0 mr-3 mt-2 font-bold text-white/50">{{ relative.replace("about", "") }}</p>
      </ClientOnly>
      <div class="flex h-full w-full items-center gap-4 px-4">
        <NuxtImg preload :src="track.image[2]['#text']" alt="album cover" class="rounded-lg" width="80" height="80" />
        <div class="flex flex-col justify-center">
          <h1 class="line-clamp-1 break-all text-lg font-semibold" :title="track.name">{{ track.name }}</h1>
          <h2 class="text-sm">{{ track.artist["#text"]?.replace("Lisa", "LiSA") }}</h2>
          <!-- :^) -->
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
