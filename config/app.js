import express from 'express'
import cors from 'cors'
import userPublicRoutes from '../routes/public/user.public.js'
import userPrivateRoutes from '../routes/private/user.private.js'
import AdminPrivateRoutes from '../routes/private/admin.private.js'
import auth from '../middlwares/auth.middlwares.js'
import isAdmin from '../middlwares/validation.middlewares.js'

const App = express()
App.use(cors())
App.use(express.json())

App.use('/', userPublicRoutes)
App.use('/', auth, isAdmin, AdminPrivateRoutes)
/* repetir a linha de cima para as rotas privadas
do usuário, só usar ao UserPrivateRoutes*/

export default App
