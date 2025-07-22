import AdminService from '../services/admin.services.js'


const listUsersController = async (req, res) => {
   try {
      const users = await AdminService.listUsersService()
      if (users.length === 0) {
         return res.status(404).json({ message: "Nenhum usuário encontrado" })
      }
      res.status(200).json({ message: "Usuários listados:", users })
   } catch (err) {
      res.status(500).json({ message: "Erro no servidor, na listagem de usuários" })
      console.error(`Ocorreu erro ao listar usuários: \n${err}`)
   } 
}


const deleteUserController = async (req, res) => {
   const idUser = req.params.id
   try {
      const user = await AdminService.deleteUserService(idUser)
      if (!user) {
         return res.status(404).json({ message: "Esse usuário não existe com esse ID ou já foi deletado do banco de dados" })
      }

      res.status(200).json({ message: `Usuário deletado com sucesso` })
   } catch (err) {
      res.status(500).json({ message: "Erro no servidor, por favor tente no novamente" })
      console.error(`Ocorreu erro ao deletar usuário: \n${err}`)
   }
}

const updateUserController = async (req ,res) => {
   const idUpdate = req.params.id
   const { role } = req.body
   if (!role) {
      return res.status(400).json({message: "Por favor preencha o novo dado do usuário"})
   }
   const updateData = {
      role: role
   }                                           
   try{
      const user = await AdminService.updateUserService(idUpdate, updateData)
      if(user?.error) {
         return res.status(400).json({ message: user.error })
      }

      res.status(200).json({ message: "Usuário alterado com sucesso"})
   }catch (err) {
         res.status(500).json({message: "Ocorreu um erro no servidor"})
         console.error(`Ocorreu algum erro no servidor: \n${err}`)
   }
}

const logoutAdmController = (req, res) => {
   try {
      return res.status(200).json({ message: "Saindo.."});
   } catch (err) {
      return res.status(500).json({ message: "Ocorreu um erro no servidor"});
   }
}

export default {
   listUsersController,
   updateUserController,
   deleteUserController,
   logoutAdmController
}