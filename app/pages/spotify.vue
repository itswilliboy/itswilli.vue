<script setup lang="ts">
const {
  status,
  data,
  refresh: refetch
} = await useLazyFetch("/api/spotify", {
  query: { limit: 48 },
  server: false
})

const { status: statusTop, data: tracksTop } = await useLazyFetch("/api/top", {
  query: { limit: 10 },
  server: false
})

const { data: topArtists } = await useLazyFetch("/api/gradient", { server: false })

const refresh = async () => {
  if (!data.value) return

  const currFirst = data.value[0]!
  await refetch()
  const newFirst = data.value[0]!

  if (newFirst.date.uts === currFirst.date.uts && newFirst.name == currFirst.name) return
  data.value = data.value.slice(0, 48)
}

const checkIncludes = <T extends { name: string }>(one: T[], two: string): boolean => {
  return one.map(s => s.name.toLowerCase()).includes(two.toLowerCase())
}
</script>

<template>
  <div class="bg-background flex min-h-screen flex-col gap-4 p-4 text-white">
    <LinkButton to="/">Go Back</LinkButton>
    <div class="flex h-full flex-col items-center justify-center gap-4 lg:flex-row">
      <div class="flex h-[800px] w-[300px] flex-col lg:w-[1000px]">
        <div class="flex h-16 flex-row items-center justify-between">
          <a
            :href="`https://last.fm/user/${$config.public.LAST_FM_USERNAME}`"
            target="_blank"
            class="w-max transition-colors hover:text-red-100"
            title="Last FM">
            <div class="flex flex-row items-center justify-center gap-3">
              <NuxtImg src="/milo.jpg" alt="pfp" class="h-[60px] w-[60px] rounded-lg" />
              <h1 class="text-3xl font-semibold lg:text-6xl">My Songs</h1>
              <span class="mt-10 -ml-2 hidden text-xs md:block">Powered by LastFM</span>
            </div>
          </a>
          <Button @click="refresh" :loading="status === 'pending'">Refresh</Button>
        </div>
        <div class="my-4 w-full rounded-full border-2 border-white/50"></div>
        <div class="flex flex-row flex-wrap justify-center gap-4 overflow-y-auto">
          <ClientOnly>
            <TransitionGroup
              v-if="data"
              name="list"
              tag="ul"
              class="relative flex flex-row flex-wrap justify-center gap-4 overflow-y-auto">
              <li v-for="track in data" :key="`${track.name}-${track.date.uts}-${track.mbid}`">
                <Track
                  :track="track"
                  :is-top-artist="checkIncludes(topArtists!, track.artist['#text']!)"
                  :is-top-track="checkIncludes(tracksTop!, track.name)" />
              </li>
            </TransitionGroup>
            <div v-else v-for="_ in 48" class="bg-light-bg h-28 w-72 animate-pulse rounded-lg"></div>
          </ClientOnly>
        </div>
      </div>

      <div class="flex h-[800px] w-full flex-col items-center md:w-[400px]">
        <div class="flex h-16 flex-row items-center justify-between">
          <div class="relative flex h-[60px] w-64 justify-center">
            <h1 class="absolute bottom-0 float-right w-max text-3xl font-semibold md:text-4xl">Top Weekly</h1>
          </div>
        </div>
        <div class="my-4 w-4/6 rounded-full border-2 border-white/50"></div>

        <div class="flex flex-col justify-center gap-2">
          <TopTrack v-for="track in tracksTop" :track="track" v-if="statusTop === 'success'" />
          <div v-else v-for="_ in 10" class="bg-light-bg h-16 w-64 animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active {
  transition: all 1s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-to {
  transition: none;
  opacity: 0;
}
.list-leave-active {
  position: absolute;
}
</style>
