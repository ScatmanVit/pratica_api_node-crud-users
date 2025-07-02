import Router from 'express'
const route = Router()
import User from '../../models/user.model.js'
import bcrypt from 'bcrypt'


route.post('/register', async (req, res) => {
   const { name, email, password } = req.body
   if (!name || !email || !password) {
      return res.status(400).json({ message: "Dados não recebidos, por favor preencha todos os campos" })
   }

   try {
      const userExist = await User.findOne({email: email})
      if(userExist) {
         return res.status(409).json({message: "Esse usuário já existe, cadastrado neste email: " + email})
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      
      const newUser = await User.create({
         name: name,
         email: email,
         password: hashPassword
      })

      res.status(201).json({ message: `Usuário criado com sucesso`, newUser })
   } catch (err) {
      res.status(500).json({ message: "Não foi possível criar usuário, erro no servidor" })
      console.error(err)
   }
})


route.post('/login', (req, res) => {

})



export default route;