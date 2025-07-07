import Router from 'express'
const router = Router()
import userControllers from '../../controllers/user.controllers.js'



router.get('/list-users', userControllers.listUsersController)
router.delete('/user/:id', userControllers.deleteUserController)
router.put('/user/update/:id', userControllers.updateUserController)

// router.put('/user/update/:id', async (req, res) => {
//    try{
//       const idUpdate = req.params.id
//       const { name, email, role } = req.body
//       if (!name || !email || !role) {
//          return res.status(400).json({message: "Por favor preencha os novos dados do usuário"})
//       }
//       const updateData = {
//          name: name,
//          email: email,
//          role: role
//       }                                           /*new: true é usado para retornar o objeto User já atualizado*/
//       const user = await User.findByIdAndUpdate({_id: idUpdate}, updateData, {new: true})
//       if(!user) {
//          return res.status(404).json({ message: "Esse id não corresponde a nenhum usuário no banco"})
//       }
      
//       res.status(200).json({ message: "Usuário alterado com sucesso"})
//    }catch (err) {
//          res.status(500).json({message: "Ocorreu um erro no servidor"})
//          console.error(`Ocorreu algum erro no servidor: \n${err}`)
//    } finally {/*Testando uso do finally*/
//       console.log("Rota UPDATE acessada")
//    }
// })


export default router