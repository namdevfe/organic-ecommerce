import { Application } from 'express'
import { BASE_URL_API_V1 } from '~/constants/baseUrl'
import errorHandlerMiddleware, { notFoundErrorMiddleware } from '~/middlewares/errorHandlerMiddleware'
import authRoutes from '~/routes/v1/authRoute'
import productRoutes from '~/routes/v1/productRoute'
import productCategoryRoutes from '~/routes/v1/productCategoryRoute'

const initRoutes = (app: Application) => {
  app.use(`${BASE_URL_API_V1}/auth`, authRoutes)
  app.use(`${BASE_URL_API_V1}/products`, productRoutes)
  app.use(`${BASE_URL_API_V1}/product-categories`, productCategoryRoutes)

  app.use(notFoundErrorMiddleware)
  app.use(errorHandlerMiddleware)
}

export default initRoutes
