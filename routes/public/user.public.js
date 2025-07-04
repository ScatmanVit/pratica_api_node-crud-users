import Router from 'express'
const route = Router()
import UserController from '../../controllers/user.controllers.js'

/*Rota de Registro de usuário*/
route.post('/register', UserController.createUserController)
route.post('/login', UserController.loginUserController)

/*Rota de Login de usuário*/
// route.post('/login', async (req, res) => {
//    try {
//       const { email, password } = req.body
//       if (!email || !password) {
//          return res.status(400).json({ message: "Dados não recebidos, por favor preencha todos os campos" })
//       }

//       const user = await User.findOne({ email: email })
//       if (!user) {
//          return res.status(400).json({ message: 'Dados inválidos, por favor digite novamente o e-mail e a senha' })
//       }
//       const isMatch = await bcrypt.compare(password, user.password)
//       if (!isMatch) {
//          return res.status(400).json({ message: "Senha inválida, por favor digite novamente" })
//       }

//       const token = jwt.sign({ id: user._id }, jwt_secret, { expiresIn: '5m' });

//       res.status(200).json({message: "Usuário logado com sucesso!", token})
//    } catch (err) {
//       res.status(500).json({ message: "Erro no servidor, por favor tente novamente" })
//       console.error(`Ocorreu um erro no login: ${err.stack || err}`);
//    }
// })


export default route;