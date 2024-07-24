import express, { Application } from 'express'
import connectDB from '~/config/mongodb'
import initRoutes from '~/routes/v1'
import env from '~/config/environments'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()
initRoutes(app)

app.listen(env.APP_PORT, env.APP_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on: http://${env.APP_HOST}:${env.APP_PORT}`)
})
