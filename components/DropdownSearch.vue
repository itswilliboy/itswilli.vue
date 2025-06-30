<script setup lang="ts">
useSeoMeta({ title: "Movie Marathon Calculator" })
defineEmits<{
  movieAdd: [id: number]
}>()

const movies = ref<SearchMovie[]>([])
const isLoading = ref<boolean>(false)
const isActive = ref<boolean>(false)
const searchInput = useTemplateRef<HTMLInputElement>("searchInput")

const debounced = debounce((q: string) => {
  return $fetch("/api/tmdb/search", { query: { q } })
}, 800)

const search = async () => {
  movies.value = []

  const q = searchInput.value!.value
  if (!q) return

  isLoading.value = true
  movies.value = await debounced(q)
  isLoading.value = false
}

const clearSearch = () => {
  searchInput.value!.value = ""
  movies.value = []
  isActive.value = false
}
</script>

<template>
  <div class="relative flex w-128 flex-col gap-4 text-white">
    <form class="relative" @submit.prevent="">
      <input
        @input="search"
        @focus="isActive = true"
        type="text"
        ref="searchInput"
        class="bg-light-bg w-full rounded-lg px-2 py-3 font-semibold outline-0" />
      <span v-show="isLoading" class="absolute top-0 right-3 flex h-full items-center">
        <Icon name="svg-spinners:3-dots-scale" size="24" />
      </span>
      <span
        v-show="!isLoading && (searchInput?.value.length ?? 0) > 0"
        @click="clearSearch"
        class="absolute top-0 right-3 flex h-full cursor-pointer items-center">
        <Icon name="material-symbols:add" class="rotate-45" size="24" />
      </span>
    </form>
    <div
      class="absolute top-16 max-h-80 w-full overflow-y-scroll rounded-lg bg-white outline-3"
      v-show="movies.length && isActive">
      <div
        v-for="movie in movies"
        class="odd:bg-background even:bg-light-bg hover:bg-background/80 flex h-24 w-full flex-col items-center overflow-hidden p-2 transition-[background-color] first:rounded-tl-lg first:rounded-tr-lg last:rounded-br-lg last:rounded-bl-lg">
        <div class="flex gap-1.5">
          <NuxtImg :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" class="w-10 rounded-lg" />
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
                clearSearch()
              }
            "
            class="bg-primary hover:bg-secondary flex cursor-pointer items-center justify-center rounded-full p-1 transition-[background-color]">
            <Icon name="material-symbols:add" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
