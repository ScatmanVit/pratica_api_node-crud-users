import Router from 'express'
const router = Router()
import User from '../../models/user.model.js'

router.get('/list-users', async (req, res) => {
   try{
      const users = await User.find({})
      if(!users) {
         return res.status(404).json({ message: "Sem usuários cadastrados"})
      }

      res.status(200).json({ message: "Usuários listados:", users})
   } catch(err) {
      res.status(500).json({ message: "Erro no servidor, na listagem de usuários" })
      console.error(err)
   }
})

export default router