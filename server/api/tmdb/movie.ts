const fetchMovie = async (id: number): Promise<Movie> => {
  const URL = `https://api.themoviedb.org/3/movie/${id}`
  const result = (await $fetch(URL, { headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN!}` } })) as Record<
    string,
    any
  >

  return {
    id: result.id,
    title: result.title,
    overview: result.overview,
    release_date: result.release_date,
    genre_ids: result.genre_ids,
    poster_path: result.poster_path,
    backdrop_path: result.backdrop_path,
    vote_average: result.vote_average,
    runtime: result.runtime
  } satisfies Movie
}

export default defineEventHandler(async e => {
  const id = getQuery(e).id as string
  if (!id) {
    throw createError({ status: 400 })
  }

  const result = await fetchMovie(Number(id))
  return result
})
