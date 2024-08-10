<script setup lang="ts">

type Response = {
    status: Ref<any>
    tracks: Ref<Track[]>
}

const getData = async (): Promise<Response> => {
    const { status, data } = await useLazyFetch("/api/spotify", { query: { "limit": 48 }, server: false, headers: { "Cache-Control": "max-age=30" } })
    const tracks = data as any
    return { status, tracks }
}

let tracks = ref<Response>(await getData())

</script>

<template>
    <div class="bg-background flex w-screen h-screen text-white items-center justify-center">
        <a href="/"
            class="absolute top-5 left-5 bg-primary p-2 rounded-lg hover:bg-primary/80 transition-colors font-semibold">Go
            Back
        </a>
        <div class=" h-[800px] w-[400px] md:w-[1000px] flex flex-col p-8 mt-32 md:mt-0">
            <div class="flex flex-row justify-between items-center">
                <a :href="`https://last.fm/user/${$config.public.LAST_FM_USERNAME}`" target="_blank"
                    class="w-max hover:text-red-100 transition-colors" title="Last FM">
                    <div class="flex flex-row gap-3 items-center">
                        <img src="/milo.jpg" alt="pfp" class="h-[60px] w-[60px] rounded-lg">
                        <h1 class="text-3xl md:text-6xl font-semibold">My Songs</h1>
                        <span class="text-xs mt-10 -ml-2 hidden md:block">Powered by LastFM</span>
                    </div>
                </a>
                <!-- @vue-ignore -->
                <button class="bg-primary p-2 mr-2 font-semibold rounded-lg hover:bg-primary/80 transition-colors"
                    @click="getData().then(data => tracks = data)">Refresh
                </button>
            </div>
            <div class="border-2 border-white/50 w-full rounded-full my-4"></div>
            <div class="flex flex-row flex-wrap gap-4 justify-center overflow-y-auto ">
                <Track :track="track" v-for="track in tracks.tracks" :key="track.date?.uts ?? track.name"
                    v-if="tracks.status === 'success'" />
                <div v-else v-for="_ in 48" class="w-72 h-28 bg-white/10 rounded-lg animate-pulse"></div>
            </div>
        </div>
    </div>

    <Footer />
</template>