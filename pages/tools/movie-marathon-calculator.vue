<script setup lang="ts">
const movies = ref<Movie[]>([])
const totalRuntime = computed<number>(() => movies.value.map(movie => movie.runtime).reduceRight((a, b) => a + b, 0))

const addMovie = async (id: number) => {
  const movie = await $fetch("/api/tmdb/movie", { query: { id } })
  movies.value.push(movie)
}

const removeMovie = (id: number) => {
  const index = movies.value.findIndex(movie => movie.id === id)
  movies.value.splice(index, 1)
}

const data = {
  id: 1,
  title: "Star Wars: Episode III - Revenge of the Sith",
  overview:
    "The evil Darth Sidious enacts his final plan for unlimited power - and the heroic Jedi Anakin Skywalker must choose a side.",
  release_date: "2005-05-17",
  genres: [
    {
      id: 12,
      name: "Adventure"
    },
    {
      id: 28,
      name: "Action"
    },
    {
      id: 878,
      name: "Science Fiction"
    }
  ],
  poster_path: "/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg",
  backdrop_path: "/aQX9Hc4pCdbkzf4Oz6FMSpujagV.jpg",
  vote_average: 7.45,
  runtime: 140
}
</script>

<template>
  <div class="bg-background min-h-screen w-screen p-2">
    <ClientOnly>
      <MovieRuntime :runtime="totalRuntime" />
    </ClientOnly>
    <div class="flex w-128 flex-col gap-2">
      <Button
        class="text-white"
        @click="
          () => {
            for (let i = 0; i < 2; i++) {
              const d = { ...data }
              d.id = Math.floor(Math.random() * 1000)
              movies.push(d)
            }
          }
        ">
        Add Movies
      </Button>
      <MovieDropdownSearch class="z-1000" @movie-add="id => addMovie(id)" />
      <TransitionGroup name="movies" tag="ul" class="relative flex w-full flex-col gap-2 text-white">
        <MovieItem v-for="movie in movies" :movie="movie" :key="movie.id" @movie-remove="id => removeMovie(id)" />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.movies-move,
.movies-enter-active,
.movies-leave-active {
  transition: all 0.8s ease;
}

.movies-enter-from,
.movies-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.movies-leave-active {
  position: absolute;
}
</style>
