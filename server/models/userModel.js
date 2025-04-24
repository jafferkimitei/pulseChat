import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar:   { type: mongoose.Schema.Types.ObjectId, ref: 'Avatar' }
}, { timestamps: true });

// hash pass...
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.matchPassword = function(pw) {
  return bcrypt.compare(pw, this.password);
};

export default mongoose.model('User', userSchema);
