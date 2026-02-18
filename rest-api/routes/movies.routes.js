import { Router } from 'express'

import { MovieController } from '../controllers/movie.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/:id', MovieController.getById)

moviesRouter.post('/', MovieController.create)

moviesRouter.delete('/:id', MovieController.delete)

moviesRouter.patch('/:id', MovieController.update)

/* app.get('/movies', (req, res) => {
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
 */
