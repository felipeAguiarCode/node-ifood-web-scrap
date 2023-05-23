import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import routes from './routes/routes.js'
dotenv.config()

const app = express()

app.use(json())
app.use(cors())
app.use(routes)

export default app