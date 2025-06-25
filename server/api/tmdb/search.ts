type SearchMovie = {
  id: number
  title: string
  overview: string
  release_date: string
  genre_ids: number[]
  poster_path: string
  backdrop_path: string
  vote_average: number
}

const searchMovies = async (search: string): Promise<SearchMovie[]> => {
  const URL = `https://api.themoviedb.org/3/search/movie?query=${search}`
  const result = (await $fetch(URL, { headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN!}` } })) as {
    results: Record<string, any>[]
    total_results: number
  }
  return result.results.map(
    ({ id, title, overview, release_date, genre_ids, poster_path, backdrop_path, vote_average }) => ({
      id,
      title,
      overview,
      release_date,
      genre_ids,
      poster_path,
      backdrop_path,
      vote_average
    })
  ) as SearchMovie[]
}

export default defineEventHandler(async e => {
  const search = getQuery(e).q as string
  if (!search || typeof search !== "string") {
    throw createError({ status: 400 })
  }
  const results = await searchMovies(search)
  return results
})
