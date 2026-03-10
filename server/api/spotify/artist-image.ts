import {
  getSpotifyArtistIDFromMBID,
  getSpotifyArtistImageFromArtistID,
  getSpotifyArtistImageFromName
} from "../utils/spotify"

export default defineCachedEventHandler(
  async e => {
    const query = getQuery(e)

    const artist = String(query.q || "")
    const type = String(query.type || "name")

    let image: string
    if (type == "mbid") {
      const spotifyID = await getSpotifyArtistIDFromMBID(artist)
      image = await getSpotifyArtistImageFromArtistID(spotifyID!)
    } else image = await getSpotifyArtistImageFromName(artist)

    return {
      artist,
      type,
      image
    }
  },
  { maxAge: 60 * 60 * 24 * 7 }
)
