import { Application } from 'express'
import authRoutes from '~/routes/auth'

const initRoutes = (app: Application) => {
  app.use('/api/v1/auth', authRoutes)
}

export default initRoutes
