let accessToken: Option<string> = null
let expiresAt = 0

export async function getSpotifyToken() {
  const now = Date.now()

  if (accessToken && now < expiresAt) return accessToken

  const auth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64")

  const resp = await $fetch<any>("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  })

  accessToken = resp.access_token
  expiresAt = now + resp.expires_in * 1000

  return accessToken
}

function parseMBRelations(resp: any): Option<string> {
  const relations = resp.relations ?? []

  const spotifyRelation = relations.find((rel: any) => {
    const url = rel?.url?.resource ?? ""
    return typeof url === "string" && url.includes("open.spotify.com/artist/")
  })

  if (!spotifyRelation) return null

  const resource: string = spotifyRelation.url.resource
  const match = resource.match(/open\.spotify\.com\/artist\/([A-Za-z0-9]+)/)

  return match?.[1] ?? null
}

export async function getSpotifyArtistIDFromMBID(mbid: string) {
  const url = `https://musicbrainz.org/ws/2/artist/${encodeURIComponent(mbid)}?inc=url-rels&fmt=json`

  const resp = await $fetch<any>(url, {
    headers: {
      "User-Agent": "itswilli.dev/1.0.0"
    }
  })
  const relations = parseMBRelations(resp)
  return relations
}

export async function getSpotifyArtistImageFromName(name: string) {
  const token = await getSpotifyToken()

  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`

  const resp = await $fetch<any>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const artist = resp.artists?.items?.[1]
  if (!artist) return null

  return artist.images[0].url
}

export async function getSpotifyTrackImageFromSearch(name: string, artist: string): Promise<string> {
  const token = await getSpotifyToken()

  const query = `track:${name} artist:${artist}`
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`

  const resp = await $fetch<any>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const items = resp.tracks.items as any[]

  if (items.length == 0) return ""

  return items[0].album.images[1].url || ""
}

export async function getSpotifyArtistImageFromArtistID(id: string) {
  const token = await getSpotifyToken()
  const url = `https://api.spotify.com/v1/artists/${encodeURIComponent(id)}`

  const resp = await $fetch<any>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return resp.images[1]?.url ?? null
}
