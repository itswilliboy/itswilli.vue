const BASE = "http://ws.audioscrobbler.com/2.0"
const config = useRuntimeConfig()

const getRecentTracks = async (limit: number): Promise<Track[]> => {
  const URL =
    BASE +
    `/?method=user.getrecenttracks&user=${config.public.LAST_FM_USERNAME}&api_key=${process.env.LAST_FM_TOKEN}&format=json&limit=${limit}`

  const resp = (await $fetch(URL)) as any
  const tracks = resp.recenttracks.track as Track[]

  const maybeCurrent = tracks[0]
  const isCurrent = Boolean(maybeCurrent.hasOwnProperty("@attr") && maybeCurrent["@attr"].nowplaying) ?? false
  if (isCurrent) {
    maybeCurrent.date = { uts: "0" } // i hate this api
  }

  return tracks
}

export default cachedEventHandler(
  async e => {
    const query = getQuery(e)
    const limit = Number(query.limit ?? 15)
    const clamped = Math.max(1, Math.min(limit, 100))

    const tracks = await getRecentTracks(clamped)
    return tracks.slice(0, clamped)
  },
  { maxAge: 20 }
)
