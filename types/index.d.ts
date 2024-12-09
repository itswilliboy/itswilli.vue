declare global {
  type Track = {
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
  }
}

export {}
