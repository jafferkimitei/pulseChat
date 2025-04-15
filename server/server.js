import express from 'express'
import http from 'http'
import { Server as SocketIO } from 'socket.io'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import chatRoutes from './routes/chatRoutes.js'
import { handleSocket } from './sockets/socketHandler.js'
import cors from 'cors'

dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new SocketIO(server, {
  cors: { origin: '*' },
})

connectDB()
app.use(cors())
app.use(express.json())
app.use('/api/chat', chatRoutes)

io.on('connection', (socket) => {
  handleSocket(io, socket)
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
