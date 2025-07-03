import Router from 'express'
const route = Router()
import User from '../../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const jwt_secret = process.env.JWT_SECRET

/*Rota de Registro de usuário*/
route.post('/register', async (req, res) => {
   const { name, email, password } = req.body
   if (!name || !email || !password) {
      return res.status(400).json({ message: "Dados não recebidos, por favor preencha todos os campos" })
   }

   try {
      const userExist = await User.findOne({ email: email })
      if (userExist) {
         return res.status(409).json({ message: "Esse usuário já existe, cadastrado neste email: " + email })
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
         name: name,
         email: email,
         hashPassword
      })

      res.status(201).json({ message: `Usuário criado com sucesso`, newUser })
   } catch (err) {
      res.status(500).json({ message: "Não foi possível criar usuário, erro no servidor" })
      console.error(err)
   }
})

/*Rota de Login de usuário*/
route.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body
      if (!email || !password) {
         return res.status(400).json({ message: "Dados não recebidos, por favor preencha todos os campos" })
      }

      const user = await User.findOne({ email: email })
      if (!user) {
         return res.status(400).json({ message: 'Dados inválidos, por favor digite novamente o e-mail e a senha' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
         return res.status(400).json({ message: "Senha inválida, por favor digite novamente" })
      }

      const token = jwt.sign({ id: user._id }, jwt_secret, { expiresIn: '2m' });

      res.status(200).json({message: "Usuário logado com sucesso!", token})
   } catch (err) {
      res.status(500).json({ message: "Erro no servidor, por favor tente novamente" })
      console.error(`Ocorreu um erro no login: ${err.stack || err}`);
   }
})



export default route;