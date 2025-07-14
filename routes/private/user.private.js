import Router from 'express'
const router = Router()
import userControllers from '../../controllers/user.controllers.js'



router.get('/list-users', userControllers.listUsersController)
router.delete('/user/:id', userControllers.deleteUserController)
router.put('/user/update/:id', userControllers.updateUserController)


export default router