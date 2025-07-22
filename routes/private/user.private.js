import Router from 'express'
const route = Router()
import userPrivateController from '../../controllers/private/user.private.controller.js'

route.get('/profile', userPrivateController.profileUserController)
route.get('/logout', userPrivateController.logoutUserController)

export default route;

