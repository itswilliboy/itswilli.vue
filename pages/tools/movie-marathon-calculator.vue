<script setup lang="ts">
const movies = ref<Movie[]>([])
const totalRuntime = computed(() => movies.value.map(movie => movie.runtime).reduceRight((a, b) => a + b, 0))

const addMovie = async (id: number) => {
  const movie = await $fetch("/api/tmdb/movie", { query: { id } })
  movies.value.push(movie)
}
</script>

<template>
  <div class="bg-background min-h-screen w-screen p-2">
    <span class="text-white">
      <br />
      <h1 class="text-3xl">{{ Math.floor(totalRuntime / 60) }}h{{ totalRuntime % 60 }}m</h1>
    </span>
    <div class="flex flex-col gap-2">
      <DropdownSearch class="z-1000" @movie-add="id => addMovie(id)" />
      <div>
        <ul v-for="movie in movies" class="w-full text-white">
          {{
            movie.runtime
          }}
          {{
            movie.title
          }}
          <span
            @click="
              movies.splice(
                movies.findIndex(arrMovie => arrMovie.id === movie.id),
                1
              )
            ">
            <Icon name="material-symbols:add" size="24" class="rotate-45 cursor-pointer" />
          </span>
        </ul>
      </div>
    </div>
  </div>
</template>
