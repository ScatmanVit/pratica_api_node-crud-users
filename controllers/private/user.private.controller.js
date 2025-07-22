import profileUserService from "../../services/private/user.private.services.js"


const profileUserController = async (req, res) => {
   if(!req.user.id){
      return res.status(400).json({ message: "Por favor efetue o login antes acessar o perfil"})
   } 
   
   try {
      const userInfo = await profileUserService(req.user.id)
      if(!userInfo) {
         return res.status(404).json({ message: "Dados do usuário não encontrado" })
      }
      res.status(200).json({ message: "Perfil carregado com sucesso!", userInfo})
   } catch (err){
      console.error(err)
      res.status(500).json({ message: "Ocorreu um erro no servidor ao carregar o perfil"})
   }
}


const logoutUserController = (req, res) => {
   try {
      res.status(200).json(true)
   } catch (err) {
      console.error(err)
      res.status(200).json(false)
   }
}

export default {
   profileUserController,
   logoutUserController
}