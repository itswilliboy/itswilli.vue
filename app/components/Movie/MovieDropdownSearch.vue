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
  isActive.value = false
  setTimeout(() => (movies.value = []), 300)
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
        v-show="!isLoading && movies.length > 0"
        @click="clearSearch"
        class="absolute top-0 right-3 flex h-full cursor-pointer items-center">
        <Icon name="material-symbols:add" class="rotate-45" size="24" />
      </span>
    </form>
    <Transition>
      <div
        class="absolute top-16 max-h-80 w-full overflow-y-scroll rounded-lg bg-white outline-3"
        v-show="movies.length && isActive">
        <MovieSearchItem
          v-for="movie in movies"
          :movie="movie"
          @movie-add="$emit('movieAdd', movie.id)"
          @clear-search="clearSearch" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
