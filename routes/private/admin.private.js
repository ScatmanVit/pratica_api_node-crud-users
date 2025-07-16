import Router from 'express'
const route = Router()
import AdminController from '../../controllers/admin.controller.js'


route.get('/list-users', AdminController.listUsersController)
route.delete('/user/:id', AdminController.deleteUserController)
route.put('/user/update/:id', AdminController.updateUserController)


export default route