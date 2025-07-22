import Router from 'express'
const route = Router()
import AdminController from '../../controllers/admin.controller.js'

 
route.get('/list-users', AdminController.listUsersController)
route.get('/logout', AdminController.logoutAdmController)
route.put('/update/user/:id', AdminController.updateUserController)
route.delete('/delete/user/:id', AdminController.deleteUserController)

export default route