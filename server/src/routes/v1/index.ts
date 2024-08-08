import { Application } from 'express'
import { BASE_URL_API_V1 } from '~/constants/baseUrl'
import errorHandlerMiddleware, { notFoundErrorMiddleware } from '~/middlewares/errorHandlerMiddleware'
import authRoutes from '~/routes/v1/authRoute'
import productRoutes from '~/routes/v1/productRoute'
import productCategoryRoutes from '~/routes/v1/productCategoryRoute'
import blogCategoryRoutes from '~/routes/v1/blogCategoryRoute'
import blogRoutes from '~/routes/v1/blogRoute'
import brandRoutes from '~/routes/v1/brandRoute'
import cartRoutes from '~/routes/v1/cartRoute'
import couponRoutes from '~/routes/v1/couponRoute'
import orderRoutes from '~/routes/v1/orderRoute'

const initRoutes = (app: Application) => {
  app.use(`${BASE_URL_API_V1}/auth`, authRoutes)
  app.use(`${BASE_URL_API_V1}/products`, productRoutes)
  app.use(`${BASE_URL_API_V1}/product-categories`, productCategoryRoutes)
  app.use(`${BASE_URL_API_V1}/blog-categories`, blogCategoryRoutes)
  app.use(`${BASE_URL_API_V1}/blogs`, blogRoutes)
  app.use(`${BASE_URL_API_V1}/brands`, brandRoutes)
  app.use(`${BASE_URL_API_V1}/carts`, cartRoutes)
  app.use(`${BASE_URL_API_V1}/coupons`, couponRoutes)
  app.use(`${BASE_URL_API_V1}/orders`, orderRoutes)

  app.use(notFoundErrorMiddleware)
  app.use(errorHandlerMiddleware)
}

export default initRoutes
