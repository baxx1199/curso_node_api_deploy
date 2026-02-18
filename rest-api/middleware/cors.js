import cors from 'cors'

const ACCEPT_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:5500',
  'http://localhost:1234',
  'http://movies.com'
]
export const middlewareCors = ({ acceptedOrigin = ACCEPT_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigin.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
