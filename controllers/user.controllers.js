import UserService from '../services/user.services.js'
import captalize from '../utils/captalize.js'
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
         return res.status(400).json({ message: `Este email já esta cadastrado no nome de usuário: [ ${userExist.name} ]` })
      }
      const newUser = {
         name: name,
         email: email.replace(/\s+/g, ''),
         password: hashPassword
      }
      await UserService.createUserService(newUser)

      res.status(201).json({ message: `Cadastro realizado ${captalize(name)}!`})
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

      const token = jwt.sign({ id: user._id, role: user.role }, jwt_secret, { expiresIn: '5m' });
      res.status(200).json({ message: "Usuário logado com sucesso!", token })
   } catch (err) {
      res.status(500).json({ message: "Erro no servidor, por favor tente novamente" })
      console.error(`Ocorreu um erro no login: ${err.stack || err}`);
   }
}


const listUsersController = async (req, res) => {
   try {
      const users = await UserService.listUsersService()
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
      const user = await UserService.deleteUserService(idUser)
      if (!user) {
         return res.status(404).json({ message: "Esse usuário não existe com esse ID ou já foi deletado do banco de dados" })
      }

      res.status(200).json({ message: `Usuário deletado com sucesso` })
   } catch (err) {
      res.status(500).json({ message: "Erro no servidor, por favor, tente no novamente" })
      console.error(`Ocorreu erro ao deletar usuário: \n${err}`)
   }
}

const updateUserController = async (req ,res) => {
   const idUpdate = req.params.id
   const { name, email, role } = req.body
   if (!name || !email || !role) {
      return res.status(400).json({message: "Por favor preencha os novos dados do usuário"})
   }
   const updateData = {
      name: name,
      email: email.replace(/\s+/g, ''),
      role: role
   }                                           
   try{
      const user = await UserService.updateUserService(idUpdate, updateData)
      if(user?.error) {
         return res.status(400).json({ message: user.error })
      }

      res.status(200).json({ message: "Usuário alterado com sucesso"})
   }catch (err) {
         res.status(500).json({message: "Ocorreu um erro no servidor"})
         console.error(`Ocorreu algum erro no servidor: \n${err}`)
   }
}


export default {
   createUserController,
   loginUserController,
   listUsersController,
   deleteUserController,
   updateUserController
}