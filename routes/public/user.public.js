import Router from 'express'
const router = Router()
import userControllers from '../../controllers/user.controllers.js'

 
router.post('/register', userControllers.createUserController)
router.post('/login', userControllers.loginUserController)

export default router;