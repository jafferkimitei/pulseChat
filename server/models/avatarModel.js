import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
    name: String,
    url: String,
  });
  
  const Avatar = mongoose.model('Avatar', avatarSchema);
  
  export default Avatar
  