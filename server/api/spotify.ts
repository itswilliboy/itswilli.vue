const BASE = "http://ws.audioscrobbler.com/2.0"
const config = useRuntimeConfig()

const getRecentTracks = async (limit: number): Promise<Track[]> => {
    const URL = BASE + `/?method=user.getrecenttracks&user=${config.public.LAST_FM_USERNAME}&api_key=${process.env.LAST_FM_TOKEN}&format=json&limit=${limit}`

    const resp = await $fetch(URL) as any
    const tracks = resp.recenttracks.track as Track[]

    return tracks
}

export default defineEventHandler(() => {
    const tracks = getRecentTracks(15)
    return tracks
})