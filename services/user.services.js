import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const jwt_secret = process.env.JWT_SECRET

const createUserService = async (newUser) => {
   const user = await User.create(newUser)
   return user
}

const loginUserService = async (email, password) => {
   const userDB = await User.findOne({ email: email })
   const isMatch = await bcrypt.compare(password, userDB.password)
   const token = jwt.sign({ id: userDB._id }, jwt_secret, { expiresIn: '5m' });
   const loginUser = {
         userDB, isMatch, token
      }
   return ( 
      loginUser
   )
}

export default {
   createUserService,
   loginUserService
}
