import { getSpotifyTrackImageFromSearch } from "../utils/spotify"

export default defineCachedEventHandler(
  async e => {
    const query = getQuery(e)

    const track = String(query.q || "")
    const artist = String(query.artist || "")

    const image = await getSpotifyTrackImageFromSearch(track, artist)

    return {
      track,
      artist,
      image
    }
  },
  { maxAge: 60 * 60 * 24 * 7 }
)
