<script setup lang="ts">
const props = defineProps<{ artist: Artist }>()
const artist = props.artist

const imageUrl = artist.resolvedImage
const image = useImage()(imageUrl, { width: 174 })
</script>

<template>
  <a :href="artist.url" target="_blank">
    <div class="relative h-28 w-72 rounded-lg transition-colors hover:bg-white/15" :style="`--img: url(${image})`">
      <p class="absolute right-0 mt-2 mr-3 font-bold text-white/50">#{{ artist["@attr"].rank }}</p>
      <div class="flex h-full w-full items-center gap-4 px-4">
        <img :src="image" class="rounded-lg" width="80" height="80" />
        <div class="flex flex-col justify-center">
          <Tooltip :text="artist.name">
            <h1 class="line-clamp-1 text-lg font-semibold break-all">
              {{ artist.name }}
            </h1>
          </Tooltip>
          <h2 class="text-sm">{{ artist.playcount }} plays</h2>
          <!-- :^) -->
        </div>
      </div>
    </div>
  </a>
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

    pointer-events: none;
  }
}
</style>
