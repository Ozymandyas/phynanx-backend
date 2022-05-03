// since applicationDefault needs access to env variables we put that here first
import dotenv from 'dotenv'
dotenv.config({ path: './src/config/.env' })

// instantiate firebase and must be on top
import { applicationDefault, initializeApp } from 'firebase-admin/app'

initializeApp({
  credential: applicationDefault(),
})

import app from './app'
import { connectDB } from './config/db/db'
import * as http from 'http'
import Logger from './config/logger/logger'

// connect to mongodb
connectDB()

// create server
const PORT = app.get('port')
const server = http.createServer(app)
server.listen(PORT)
server.on('listening', () => {
  Logger.info(`Listening on port ${PORT}`)
})
