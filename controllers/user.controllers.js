import bcrypt from 'bcrypt'
import UserService from '../services/user.services.js'

const createUserController = async (req, res) => {
   const { name, email, password } = req.body
   if (!name || !email || !password) {
      return res.status(400).json({ message: "Dados não recebidos, por favor preencha todos os campos" })
   }
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(password, salt);

   try {
      const newUser = {
         name: name,
         email: email,
         password: hashPassword
      }
      const user = await UserService.createUserService(newUser)
      res.status(201).json({ message: `Usuário criado com sucesso`, user })
   } catch (err) {
      res.status(500).json({ message: "Não foi possível criar usuário, erro no servidor" })
      console.error(err)
   }
}


const loginUserController = async (req, res) => {
   const { email, password } = req.body
   if (!email || !password) {
      return res.status(400).json({ message: "Dados não recebidos, por favor preencha todos os campos" })
   }
   try {
      const user = await UserService.loginUserService(email, password)
      if (!user.userDB) {
         return res.status(400).json({ message: 'Dados inválidos, por favor digite novamente o e-mail e a senha' })
      }
      if (!user.isMatch) {
         return res.status(400).json({ message: "Senha inválida, por favor digite novamente" })
      }
      const token = user.token
      res.status(200).json({ message: "Usuário logado com sucesso!", token })
   } catch (err) {
      res.status(500).json({ message: "Erro no servidor, por favor tente novamente" })
      console.error(`Ocorreu um erro no login: ${err.stack || err}`);
   }
}


export default {
   createUserController,
   loginUserController
}