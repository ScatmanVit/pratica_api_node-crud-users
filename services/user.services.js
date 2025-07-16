import User from '../models/user.model.js'

const createUserService = async (newUser) => {
   const user = await User.create(newUser)
   return user
}
/*Nome genérico para reuso em outros momentos*/
const findUserByEmail = async (email) => {
   const userDB = await User.findOne({ email: email })
   return userDB
}


export default {
   createUserService,
   findUserByEmail
}
