import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import chatRoutes from './routes/chatRoutes.js'
import { handleSocket } from './socket/socketHandler.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})


app.use(cors())
app.use(express.json())


app.use('/api/chats', chatRoutes)


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection error ❌', err))

// WebSocket logic
io.on('connection', socket => {
  console.log('A user connected 🟢:', socket.id)
  handleSocket(io, socket)
  socket.on('disconnect', () => {
    console.log('User disconnected 🔴:', socket.id)
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
