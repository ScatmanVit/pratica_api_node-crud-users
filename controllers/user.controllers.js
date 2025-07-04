import UserService from '../services/user.services.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const createUserController = async (req, res) => {
   const { name, email, password } = req.body
   if (!name || !email || !password) {
      return res.status(400).json({ message: "Dados não recebidos, por favor preencha todos os campos" })
   }
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(password, salt);

   try {
      const userExist = await UserService.findUserByEmail(email)
      if(userExist) {
         res.status(400).json({ message: `Este email já esta cadastrado no nome de usuário: [ ${userExist.name} ]` })
      }
      const newUser = {
         name: name,
         email: email,
         password: hashPassword
      }
      await UserService.createUserService(newUser)
      const user = {
         name: name,
         email: email
      }
      res.status(201).json({ message: `Usuário criado com sucesso`, user })
   } catch (err) {
      res.status(500).json({ message: "Não foi possível criar usuário, erro no servidor" })
      console.error(err)
   }
}

const jwt_secret = process.env.JWT_SECRET

const loginUserController = async (req, res) => {
   const { email, password } = req.body
   if (!email || !password) {
      return res.status(400).json({ message: "Dados não recebidos, por favor preencha todos os campos" })
   }
   try {
      const user = await UserService.findUserByEmail(email)
      if (!user) {
         return res.status(400).json({ message: 'E-mail ou senha inválidos, por favor digite novamente' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
         return res.status(400).json({ message: "Senha inválida, por favor digite novamente" })
      }

      const token = jwt.sign({ id: user._id }, jwt_secret, { expiresIn: '5m' });
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