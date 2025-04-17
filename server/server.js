import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import chatRoutes from './routes/chatRoutes.js'
import { handleSocket } from './sockets/socketHandler.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import AvatarRoutes from './models/avatarModel.js'

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
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/avatars', AvatarRoutes)


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection error ❌', err))


// WebSocket logic
io.on('connection', socket => {
  console.log('A user connected 🟢:', socket.id)
  socket.on('joinRoom', room => {
    socket.join(room)
    console.log(`User ${socket.id} joined room ${room} 📥`)
  })

  socket.on('leaveRoom', room => {
    socket.leave(room)
    console.log(`User ${socket.id} left room ${room} 📤`
    )
  })
  socket.on('typing', ({ room, sender }) =>
    io.to(room).emit(
      'typing',
      { sender }
    )
  )
  socket.on('stopTyping', ({ room, sender }) =>
    io.to(room).emit(
      'stopTyping',
      { sender }
    )
  )
  socket.on('chatMessage', ({ room, sender, content }) => {
    io.to(room).emit('message', { sender, content })
  })
  handleSocket(io)
  socket.on('disconnect', () => {
    console.log('User disconnected 🔴:', socket.id)
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
