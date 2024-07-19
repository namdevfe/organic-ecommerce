import express, { Request, Response } from 'express'
import 'dotenv/config'

const app = express()
const APP_HOST = process.env.APP_HOST || 'localhost'
const APP_PORT = Number(process.env.APP_PORT) || 5000

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello Namdev')
})

app.listen(APP_PORT, APP_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on: http://${APP_HOST}:${APP_PORT}`)
})
