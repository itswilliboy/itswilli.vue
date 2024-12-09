<script setup lang="ts">
useSeoMeta({
  title: "Willi - Spotify",
  ogTitle: "Willi - Spotify",
  description: "See my most recently played songs.",
  ogDescription: "See my most recently played songs."
})

const {
  status,
  data: tracks,
  refresh
} = await useLazyFetch("/api/spotify", { query: { limit: 48 }, headers: { "Cache-Control": "max-age=30" } })

const { status: statusTop, data: tracksTop } = await useLazyFetch("/api/top", {
  query: { limit: 10 },
  headers: { "Cache-Control": "max-age=10" }
})
</script>

<template>
  <div
    class="flex h-[230vh] w-screen flex-col items-center justify-center gap-4 overflow-x-hidden bg-background text-white md:h-screen md:flex-row">
    <a
      href="/"
      class="absolute left-5 top-5 z-10 rounded-lg bg-primary p-2 font-semibold transition-colors hover:bg-primary/80">
      Go Back
    </a>
    <div class="flex h-[800px] w-[400px] flex-col md:w-[1000px]">
      <div class="flex h-16 flex-row items-center justify-between">
        <a
          :href="`https://last.fm/user/${$config.public.LAST_FM_USERNAME}`"
          target="_blank"
          class="w-max transition-colors hover:text-red-100"
          title="Last FM">
          <div class="flex flex-row items-center justify-center gap-3">
            <NuxtImg src="/milo.jpg" alt="pfp" class="h-[60px] w-[60px] rounded-lg" />
            <h1 class="text-3xl font-semibold md:text-6xl">My Songs</h1>
            <span class="-ml-2 mt-10 hidden text-xs md:block">Powered by LastFM</span>
          </div>
        </a>
        <button
          class="mr-2 rounded-lg bg-primary p-2 font-semibold transition-colors hover:bg-primary/80"
          @click="refresh()">
          Refresh
        </button>
      </div>
      <div class="my-4 w-full rounded-full border-2 border-white/50"></div>
      <div class="flex flex-row flex-wrap justify-center gap-4 overflow-y-auto">
        <Track :track="track" v-for="track in tracks" :key="track.date?.uts ?? track.name" v-if="status === 'success'" />
        <div v-else v-for="_ in 48" class="h-28 w-72 animate-pulse rounded-lg bg-white/10"></div>
      </div>
    </div>

    <div class="flex h-[800px] w-[400px] flex-col items-center">
      <div class="flex h-16 flex-row items-center justify-between">
        <div class="relative flex h-[60px] w-64 justify-center">
          <h1 class="absolute bottom-0 float-right w-max text-3xl font-semibold md:text-4xl">Top Weekly</h1>
        </div>
      </div>
      <div class="my-4 w-4/6 rounded-full border-2 border-white/50"></div>

      <div class="flex flex-col justify-center gap-2">
        <TopTrack v-for="track in tracksTop" :track="track" v-if="statusTop === 'success'" />
        <div v-else v-for="_ in 10" class="h-16 w-64 animate-pulse rounded-lg bg-white/10"></div>
      </div>
    </div>
  </div>

  <Footer />
</template>
