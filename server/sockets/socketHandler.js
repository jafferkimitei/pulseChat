import Message from '../models/MessageModel.js'

export const handleSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 Connected:', socket.id)

    socket.on('joinRoom', (room) => {
      socket.join(room)
      console.log(`📥 ${socket.id} joined ${room}`)
    })

    socket.on('chatMessage', async ({ room, sender, content }) => {
      const message = await Message.create({ room, sender, content })

      io.to(room).emit('message', {
        sender,
        content,
        createdAt: message.createdAt,
      })
    })

    socket.on('disconnect', () => {
      console.log('🔴 Disconnected:', socket.id)
    })
  })
}
