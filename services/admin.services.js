import mongoose from 'mongoose'
import User from '../models/user.model.js'

const listUsersService = async () => {
   const users = await User.find({})
   return users
}

const deleteUserService = async (idUser) => {
   const userDeleted = await User.findByIdAndDelete(idUser)
   return userDeleted
}
/*new: true é usado para retornar o objeto User já atualizado*/
const updateUserService = async (idUpdate, updateData) => {
   // verifica se o id esta no formato certo no mongodb
   if (!mongoose.Types.ObjectId.isValid(idUpdate)) {
      return { error: 'ID inválido' }
   }
   const existingUser = await findUserByEmail(updateData.email)
   if (existingUser && existingUser._id.toString() !== idUpdate) {
      return { error: `Esse email já está sendo usado: ${existingUser.email}` }
   }

   const userUpdated = await User.findByIdAndUpdate(
      { _id: idUpdate },
      updateData,
      { new: true }
   )
   if (!userUpdated) {
      return { error: 'Não existe usuário com esse ID' }
   }
   return userUpdated
}

export default {
   listUsersService,
   updateUserService,
   deleteUserService
}