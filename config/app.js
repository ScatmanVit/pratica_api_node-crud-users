import express from 'express'
import cors from 'cors'
import userPublicRoutes from '../routes/public/user.public.js'
import UserPrivateRoutes from '../routes/private/user.private.js'
import AdminPrivateRoutes from '../routes/private/admin.private.js'
import auth from '../middlwares/auth.middlwares.js'
import isAdmin from '../middlwares/validation.middlewares.js'

const App = express()
App.use(cors())
App.use(express.json())

App.use('/', userPublicRoutes)
App.use('/user', auth, UserPrivateRoutes)
App.use('/admin', auth, isAdmin, AdminPrivateRoutes)

export default App
