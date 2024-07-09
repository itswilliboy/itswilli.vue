<script setup lang="ts">
let { data: tracks, refresh, status } = useLazyFetch("/api/spotify", { headers: { "Cache-Control": "max-age=30" }, query: { "limit": 24 } })
</script>

<template>
    <div class="bg-background flex w-screen h-screen text-white items-center justify-center">
        <a href="/"
            class="absolute top-5 left-5 bg-primary p-2 rounded-lg hover:bg-primary/80 transition-colors font-semibold hidden md:block">Go
            Back
        </a>
        <div class=" h-[800px] w-[400px] md:w-[1000px] flex flex-col p-8">
            <div class="flex flex-row justify-between items-center">
                <a :href="`https://last.fm/user/${$config.public.LAST_FM_USERNAME}`" target="_blank"
                    class="w-max hover:text-red-100 transition-colors" title="Last FM">
                    <div class="flex flex-row gap-3 items-center">
                        <img src="/milo.jpg" alt="pfp" class="h-[60px] w-[60px] rounded-lg">
                        <h1 class="text-3xl md:text-6xl font-semibold">My Music</h1>
                        <span class="text-xs mt-10 -ml-2 hidden md:block">Powered by LastFM</span>
                    </div>
                </a>
                <button class="bg-primary p-2 mr-2 font-semibold rounded-lg hover:bg-primary/80 transition-colors"
                    @click="refresh()">Refresh</button>
            </div>
            <div class="border-2 border-white/50 w-full rounded-full my-4"></div>
            <div class="flex flex-row flex-wrap gap-4 justify-center overflow-y-auto">
                <Track :track="track" v-for="track in tracks" :key="track.date?.uts ?? track.name"
                    v-if="status === 'success'" />
                <h1 v-else>one second please...</h1>
            </div>
        </div>
    </div>
</template>