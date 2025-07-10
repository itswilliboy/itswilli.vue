const BASE = "http://ws.audioscrobbler.com/2.0"
const config = useRuntimeConfig()

type Data = {
  image: { size: string; "#text": string }[]
  mbid: string
  url: string
  playcount: string
  "@attr": { rank: string }
  name: string
}

const getTopArtists = async (limit: number): Promise<Data[]> => {
  const URL =
    BASE +
    `/?method=user.gettopartists&user=${config.public.LAST_FM_USERNAME}&api_key=${process.env.LAST_FM_TOKEN}&format=json&limit=${limit}&period=1month`

  const resp = (await $fetch(URL, {})) as any
  return resp.topartists.artist as Data[]
}

export default defineCachedEventHandler(
  async () => {
    const resp = await getTopArtists(10)
    return resp
  },
  { maxAge: 300 }
)
