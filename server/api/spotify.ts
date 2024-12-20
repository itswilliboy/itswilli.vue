const BASE = "http://ws.audioscrobbler.com/2.0"
const config = useRuntimeConfig()

const getRecentTracks = async (limit: number): Promise<Track[]> => {
  const URL =
    BASE +
    `/?method=user.getrecenttracks&user=${config.public.LAST_FM_USERNAME}&api_key=${process.env.LAST_FM_TOKEN}&format=json&limit=${limit}`

  const resp = (await $fetch(URL, {
    headers: { "Cache-Control": "max-age=30" }
  })) as any
  const tracks = resp.recenttracks.track as Track[]

  return tracks
}

export default defineEventHandler(async e => {
  const query = getQuery(e)
  const limit = Number(query.limit ?? 15)
  const clamped = Math.max(1, Math.min(limit, 100))

  const tracks = await getRecentTracks(clamped)
  return tracks.slice(0, clamped)
})
