import Router from 'express'
const route = Router()
import AdminController from '../../controllers/admin.controller.js'

 
route.get('/list-users', AdminController.listUsersController)
route.delete('/delete/user/:id', AdminController.deleteUserController)
route.put('/update/user/:id', AdminController.updateUserController)
route.get('/logout', AdminController.logoutAdmController)

export default route