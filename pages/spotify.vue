<script setup lang="ts">

const getData = async (): Promise<Track[]> => {
    let { data } = await useFetch("/api/spotify", { query: { "limit": 48 } })
    return data.value!
}

let tracks = ref<Track[]>(await getData())

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
                <button class="bg-primary p-2 mr-2 font-semibold rounded-lg hover:bg-primary/80 transition-colors"
                    @click="getData().then(data => tracks = data)">Refresh</button>
            </div>
            <div class="border-2 border-white/50 w-full rounded-full my-4"></div>
            <div class="flex flex-row flex-wrap gap-4 justify-center overflow-y-auto ">
                <Track :track="track" v-for="track in tracks" :key="track.date?.uts ?? track.name" />
            </div>
        </div>
    </div>

    <Footer />
</template>