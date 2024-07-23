import 'dotenv/config'
import express, { Application } from 'express'
import connectDB from '~/config/mongodb'
import initRoutes from '~/routes/v1'

const app: Application = express()
const APP_HOST = process.env.APP_HOST || 'localhost'
const APP_PORT = Number(process.env.APP_PORT) || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()
initRoutes(app)

app.listen(APP_PORT, APP_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on: http://${APP_HOST}:${APP_PORT}`)
})
