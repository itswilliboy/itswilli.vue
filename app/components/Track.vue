<script setup lang="ts">
import { formatDistance } from "date-fns"

const props = defineProps<{ track: Track; toPage?: boolean; isTopArtist?: boolean; isTopTrack?: boolean }>()
const track = props.track
const isTopArtist = props.isTopArtist || false
const isTopTrack = props.isTopTrack || false

const isCurrent = Boolean(track.hasOwnProperty("@attr") && track["@attr"].nowplaying) ?? false
const relativeTime = () => {
  return !isCurrent && formatDistance(new Date(), new Date(Number(track.date.uts) * 1000)) + " ago"
}
const relative = ref<string>(relativeTime() || "NOW")

const imageUrl = track.image[2]!["#text"]
const image = useImage()(imageUrl, { width: 128 })

useIntervalFn(() => {
  if (isCurrent) return
  relative.value = relativeTime() as string
}, 60000)
</script>

<template>
  <NuxtLink :to="toPage ? '/spotify' : track.url" :target="toPage ? '' : '_blank'">
    <div class="relative h-28 w-72 rounded-lg transition-colors hover:bg-white/15" :style="`--img: url(${image})`">
      <ClientOnly>
        <p class="absolute right-0 mt-2 mr-3 font-bold text-white/50">{{ relative.replace("about", "") }}</p>
      </ClientOnly>
      <div class="flex h-full w-full items-center gap-4 px-4">
        <NuxtImg :placeholder="[80, 80, 15, 5]" preload :src="imageUrl" class="rounded-lg" width="80" height="80" />
        <div class="flex flex-col justify-center">
          <Tooltip :text="track.name" class="z-999">
            <h1 class="line-clamp-1 text-lg font-semibold break-all" :class="isTopTrack && 'top'">
              {{ track.name }}
            </h1>
          </Tooltip>
          <h2 class="text-sm" :class="isTopArtist && 'top'">{{ track.artist["#text"]?.replace("Lisa", "LiSA") }}</h2>
          <!-- :^) -->
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
@reference "@/assets/css/main.css";

a > div {
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 15%;
    border-radius: var(--radius-lg);

    background-image: var(--img);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    filter: blur(4px);
    transform: scale(1.1);
  }
}

.top {
  @apply bg-linear-to-r from-indigo-300 via-pink-300 to-indigo-300;
  font-weight: bold;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 10s ease infinite;
  background-size: 200%;
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0%;
  }
}
</style>
