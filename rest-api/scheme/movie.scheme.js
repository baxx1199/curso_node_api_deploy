import z from 'zod'

const schemeMovie = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2028),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5.5),
  poster: z.url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Drama', 'Comedy', 'Adventure', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Superheros', 'Animation'])
  )
})

export function validateMovie (object) {
  return schemeMovie.safeParse(object)
}

export function validatePartialMovie (object) {
  return schemeMovie.partial().safeParse(object)
}
