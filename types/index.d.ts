declare global {
    type Track = {
        artist: {
            "#text": string
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
            nowplaying: string
        }
    }
}

export {}