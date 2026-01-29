const express = require('express')
const crypto = require('node:crypto')
const moviesJSON = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./scheme/movie.scheme')

const app = express()
app.disable('x-powered-by')

const port = process.env.PORT ?? 1234

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'baxx' })
})

// Manejo de cors o origenes desconocidos

const ACCEPT_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:5500',
  'http://localhost:1234',
  'http://movies.com'
]

/* Recuperar todas las peliculas, todos los recursos MOVIES se identifican con /movies */
/* app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovie = moviesJSON.filter(
      movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
    )
    return res.json(filteredMovie)
  }
  return res.json(moviesJSON)
})
 */
app.get('/movies', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*') * permite todos los orgenes, puedes definir un origen especifico o definir una lista de orignes permitidos
  const origin = req.header('origin')
  if (ACCEPT_ORIGINS.includes(origin) || !origin) { // si la peticion es de el mismo origen del servidor no existe o no se envia el origen ya que no se estan compartiendo recursos con otros origenes
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { title } = req.query
  if (title) {
    const filteredMovie = moviesJSON.filter(
      movie => movie.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())
    )
    return res.json(filteredMovie)
  }
  return res.json(moviesJSON)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = moviesJSON.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

// Crear una pelicula con post

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) return res.status(422).json({ error: JSON.parse(result.error.message) })

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  moviesJSON.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) return res.status(404).json({ message: 'Not found' })

  const { id } = req.params
  const movieIndex = moviesJSON.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(404).json({ message: 'Not found' })

  const updateMovie = {
    ...moviesJSON[movieIndex],
    ...result.data
  }

  moviesJSON[movieIndex] = updateMovie
  return res.status(201).json(updateMovie)
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPT_ORIGINS.includes(origin) || !origin) { // si la peticion es de el mismo origen del servidor no existe o no se envia el origen ya que no se estan compartiendo recursos con otros origenes
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { id } = req.params
  const movieIndex = moviesJSON.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  moviesJSON.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPT_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  }
  res.send(200)
})

app.use((req, res) => {
  res.status(404).send('<h1>404 not found</h1>')
})

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`)
})
