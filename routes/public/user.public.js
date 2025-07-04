import Router from 'express'
const route = Router()
import UserController from '../../controllers/user.controllers.js'


route.post('/register', UserController.createUserController)
route.post('/login', UserController.loginUserController)

export default route;