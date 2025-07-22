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
   const existingUser = await findUserById(idUpdate)
   if (!existingUser) {
      return { error: `Não existe usuário com esse ID: ${idUpdate}` }
   }

   const userUpdated = await User.findByIdAndUpdate(
      { _id: idUpdate },
      updateData,
      { new: true }
   )
   if (!userUpdated) {
      return { error: `Não existe usuário com esse ID: ${idUpdate}` }
   }
   return userUpdated
}

export default {
   listUsersService,
   updateUserService,
   deleteUserService
}