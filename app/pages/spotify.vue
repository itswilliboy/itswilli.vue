<script setup lang="ts">
useSeoMeta({
  title: "itswilli - spotify"
})

const {
  status: trackStatus,
  data: trackData,
  refresh: refetch
} = await useLazyFetch("/api/tracks", {
  query: { limit: 30 },
  server: false
})

const { status: topTrackStatus, data: topTrackData } = await useLazyFetch("/api/top/tracks", {
  query: { limit: 10 },
  server: false
})

const { status: artistStatus, data: artistData } = await useLazyFetch("/api/top/artists", {
  query: { limit: 10 },
  server: false
})

const getHyperlink = (track: Track): string => {
  if (track.mbid == "") return track.url
  return `https://musicbrainz.org/track/${track.mbid}`
}

const refresh = async () => {
  const data = trackData
  if (!data.value) return

  const prev = data.value
  await refetch()
  const next = data.value

  const currFirst = prev[0]!
  const newFirst = next[0]!
  if (newFirst.date.uts === currFirst.date.uts && newFirst.name == currFirst.name) return

  data.value = next
}
</script>

<template>
  <div class="bg-background flex min-h-screen flex-col justify-evenly gap-4 p-4 text-white">
    <LinkButton to="/" class="absolute top-3 left-3">Go Back</LinkButton>

    <section>
      <div class="mt-5 flex gap-1">
        <h1 class="mb-4 text-3xl font-bold">Recent Tracks</h1>
        <ClientOnly>
          <Transition>
            <button @click="refresh" class="hover:cursor-pointer">
              <Icon
                name="material-symbols:refresh-rounded"
                size="28px"
                class="mb-1.5 opacity-75"
                :class="trackStatus == 'pending' && 'animate-spin'" />
            </button>
          </Transition>
        </ClientOnly>
      </div>
      <TransitionGroup
        v-if="trackData"
        name="list"
        tag="ul"
        class="grid auto-cols-max grid-flow-col grid-rows-1 justify-evenly gap-4 overflow-x-scroll md:grid-rows-2 lg:grid-rows-3">
        <Track :track="track" v-for="track in trackData" :key="`${track.name}:${track.date.uts}`" />
      </TransitionGroup>
      <div
        v-else
        class="grid auto-cols-max grid-flow-col grid-rows-1 justify-evenly gap-4 overflow-x-scroll whitespace-nowrap md:grid-rows-2 lg:grid-rows-3">
        <div v-for="_ in 30" class="h-28 w-72 shrink-0 animate-pulse rounded-lg bg-white/10" />
      </div>
    </section>

    <section>
      <div class="mb-4">
        <h1 class="text-3xl font-bold">Top Tracks</h1>
        <h2 class="font-thin">one week</h2>
      </div>
      <div v-if="artistData" class="flex justify-evenly gap-4 overflow-x-scroll">
        <TopTrack :track="track" v-for="track in topTrackData" :key="track.name" />
      </div>
      <div v-else class="flex justify-evenly gap-4 overflow-x-scroll whitespace-nowrap">
        <div v-for="_ in 10" class="h-28 w-72 shrink-0 animate-pulse rounded-lg bg-white/10" />
      </div>
    </section>

    <section>
      <div class="mb-4">
        <h1 class="text-3xl font-bold">Top Artists</h1>
        <h2 class="font-thin">one month</h2>
      </div>
      <div v-if="artistData" class="flex justify-evenly gap-4 overflow-x-scroll">
        <Artist :artist="artist" v-for="artist in artistData" :key="artist.name" />
      </div>
      <div v-else class="flex justify-evenly gap-4 overflow-x-scroll whitespace-nowrap">
        <div v-for="_ in 10" class="h-28 w-72 shrink-0 animate-pulse rounded-lg bg-white/10" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  transition: none;
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>
