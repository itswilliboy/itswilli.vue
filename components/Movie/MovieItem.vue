<script setup lang="ts">
const { movie } = defineProps<{ movie: Movie }>()
defineEmits<{
  movieRemove: [id: number]
}>()

const getMoviePoster = (): string => {
  if (!movie.poster_path) return "https://itswilli.dev/milo.jpg"
  return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
}
</script>

<template>
  <div
    class="bg-light-bg relative flex h-24 w-full flex-col items-center overflow-hidden rounded-lg p-2 transition-[background-color]">
    <button class="absolute top-2 right-2 cursor-pointer" @click="$emit('movieRemove', movie.id)">
      <Icon name="material-symbols:add" size="20" class="rotate-45" />
    </button>
    <div class="flex gap-1.5">
      <NuxtImg :src="getMoviePoster()" class="w-10 rounded-lg" />
      <div class="flex flex-col">
        <span class="flex items-center gap-1.5">
          <a :href="`https://themoviedb.org/movie/${movie.id}`" target="_blank">
            <h1 class="line-clamp-1 hover:underline">{{ movie.title }}</h1>
          </a>
          <span class="flex gap-0.5">
            <p
              class="text-xs text-white/40"
              v-for="item in [
                new Date(movie.release_date).getFullYear(),
                '·',
                movie.vote_average.toFixed(2),
                '·',
                `${Math.floor(movie.runtime / 60)}h${movie.runtime % 60}m`
              ]">
              {{ item }}
            </p>
          </span>
        </span>
        <p class="line-clamp-2 text-xs">{{ movie.overview }}</p>
      </div>
    </div>

    <div class="flex w-full items-center justify-between gap-[3px] pt-0.5 pl-12">
      <div class="flex w-full items-center gap-[3px]">
        <span v-for="genre in movie.genres.map(g => g.name)" class="bg-primary w-max rounded-full px-2 py-px text-xs">
          {{ genre }}
        </span>
      </div>
    </div>
  </div>
</template>
