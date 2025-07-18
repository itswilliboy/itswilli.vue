<script setup lang="ts">
const { movie } = defineProps<{ movie: SearchMovie }>()
defineEmits<{
  movieAdd: [id: number]
  clearSearch: []
}>()

const getMoviePoster = (): string => {
  if (!movie.poster_path) return "https://itswilli.dev/milo.jpg"
  return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
}
</script>

<template>
  <div
    class="odd:bg-background even:bg-light-bg hover:bg-background/80 flex h-24 w-full flex-col items-center overflow-hidden p-2 transition-[background-color] first:rounded-tl-lg first:rounded-tr-lg last:rounded-br-lg last:rounded-bl-lg">
    <div class="flex w-full gap-1.5">
      <NuxtImg :src="getMoviePoster()" class="w-10 rounded-lg" />
      <div class="flex flex-col">
        <span class="flex items-center gap-1.5">
          <h1 class="line-clamp-1">{{ movie.title }}</h1>
          <span class="flex gap-0.5">
            <p
              class="text-xs text-white/40"
              v-for="item in [new Date(movie.release_date).getFullYear(), '·', movie.vote_average.toFixed(2)]">
              {{ item }}
            </p>
          </span>
        </span>
        <p class="line-clamp-2 text-xs">{{ movie.overview }}</p>
      </div>
    </div>

    <div class="flex w-full items-center justify-between gap-[3px] pt-0.5 pl-12">
      <div class="flex w-full items-center gap-[3px]">
        <span
          v-for="genre in movie.genre_ids
            .sort((a, b) => a - b)
            .map(id => getMovieGenre(id))
            .slice(0, 5)"
          class="bg-primary w-max rounded-full px-2 py-px text-xs">
          {{ genre }}
        </span>
      </div>
      <button
        @click="
          () => {
            $emit('movieAdd', movie.id)
            $emit('clearSearch')
          }
        "
        class="bg-primary hover:bg-secondary flex cursor-pointer items-center justify-center rounded-full p-1 transition-[background-color]">
        <Icon name="material-symbols:add" />
      </button>
    </div>
  </div>
</template>
