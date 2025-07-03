import Router from 'express'
const router = Router()
import User from '../../models/user.model.js'

router.get('/list-users', async (req, res) => {
   try {
      const users = await User.find({})
      // aqui o length é usado porque o mongoose retorna um array [], portanto o certo é verificar a quantidade
      if (users.length === 0) {
         return res.status(404).json({ message: "Nenhum usuário encontrado" })
      }

      res.status(200).json({ message: "Usuários listados:", users })
   } catch (err) {
      res.status(500).json({ message: "Erro no servidor, na listagem de usuários" })
      console.error(`Ocorreu erro ao listar usuários: \n${err}`)
   } finally {/*Testando uso do finally*/
      console.log("Rota LISTAR USUARIOS acessada")
   }
})

router.delete('/users/:id', async (req, res) => {
   try {
      const idUser = req.params.id
      const user = await User.findByIdAndDelete(idUser)
      if (!user) {
         return res.status(404).json({ message: "Esse usuário não existe com esse ID ou já foi deletado do banco de dados" })
      }
      
      res.status(200).json({ message: `Usuário deletado com sucesso` })
   } catch (err) {
      res.status(500).json({ message: "Erro no servidor, por favor, tente no novamente" })
      console.error(`Ocorreu erro ao deletar usuário: \n${err}`)
   } finally {/*Testando uso do finally*/
      console.log("Rota DELETE acessada")
   }
})

router.put('/user/update/:id', async (req, res) => {
   try{
      const idUpdate = req.params.id
      const { name, email, role } = req.body
      if (!name || !email || !role) {
         return res.status(400).json({message: "Por favor preencha os novos dados do usuário"})
      }
      const updateData = {
         name: name,
         email: email,
         role: role
      }                                           /*new: true é usado para retornar o objeto User já atualizado*/
      const user = await User.findByIdAndUpdate({_id: idUpdate}, updateData, {new: true})
      if(!user) {
         return res.status(404).json({ message: "Esse id não corresponde a nenhum usuário no banco"})
      }
      
      res.status(200).json({ message: "Usuário alterado com sucesso"})
   }catch (err) {
         res.status(500).json({message: "Aconteceu um erro aqui"})
         console.error(`Ocorreu algum erro no servidor: \n${err}`)
   } finally {/*Testando uso do finally*/
      console.log("Rota UPDATE acessada")
   }
})


export default router