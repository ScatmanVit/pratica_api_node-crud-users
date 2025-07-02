import mongoose from 'mongoose'
const { Schema } = mongoose


const userSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
   },
   password: {
      type: String,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now()
   }
})

// Isso cria uma collection no mongoDB com o nome User com base no meu Schema "userSchema"
// O mongoose sempre irá criar no plurar e em minúsculas, ficando "users" no mongoDB
const User = mongoose.model('User', userSchema);
export default User;