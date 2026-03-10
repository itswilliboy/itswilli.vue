declare global {
  type Option<T> = T | null

  type Track = {
    mbid: string
    artist: {
      "#text"?: string
      name?: string
    }
    image: {
      size: string
      "#text": string
    }[]
    album: {
      "#text": string
    }
    name: string
    url: string
    date: {
      uts: string
    }
    "@attr": {
      nowplaying?: string
      rank?: string
    }
    playcount?: string
    resolvedImage: string
  }

  type Artist = {
    mbid: string
    image: {
      size: string
      "#text": string
    }[]
    album: {
      "#text": string
    }
    name: string
    url: string
    "@attr": {
      rank?: string
    }
    playcount?: string
    resolvedImage: string
  }

  type Friend = {
    name: string
    href: string
    githubID: number
  }
}

export {}
