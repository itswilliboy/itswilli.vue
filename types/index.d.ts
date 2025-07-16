import type MovieMarathonCalculator from "~/pages/tools/movie-marathon-calculator.vue"

declare global {
  type Option<T> = T | null

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

  interface SearchMovie {
    id: number
    title: string
    overview: string
    release_date: string
    genre_ids: number[]
    poster_path: string
    backdrop_path: string
    vote_average: number
  }

  interface Movie extends Omit<SearchMovie, "genre_ids"> {
    runtime: number
    genres: { id: number; name: string }[]
  }
}

export {}
