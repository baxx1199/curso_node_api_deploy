import express, { json } from 'express'

import { moviesRouter } from './routes/movies.routes.js'
import { middlewareCors } from './middleware/cors.js'
const app = express()
app.disable('x-powered-by')

const port = process.env.PORT ?? 1234

app.use(json())
app.use(middlewareCors())

app.get('/', (req, res) => {
  res.json({ message: 'baxx' })
})

/* Recuperar todas las peliculas, todos los recursos MOVIES se identifican con /movies */
app.use('/movies', moviesRouter)

app.use((req, res) => {
  res.status(404).send('<h1>404 not found</h1> ')
})

app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`)
})
