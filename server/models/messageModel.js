import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text:   { type: String, required: true },
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
