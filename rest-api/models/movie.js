import { readJSON } from '../utils/read-json.js'
import { randomUUID } from 'node:crypto'

const movies = readJSON('../movies.json')
export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.title.toLocaleLowerCase().includes(genre.toLocaleLowerCase())
      )
    }
    return movies
  }

  static async getID ({ id }) {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false

    const updateMovie = {
      ...movies[movieIndex],
      ...input
    }

    movies[movieIndex] = updateMovie
    return true
  }
}
