import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Connect from './connection/connection.js'
import userPublicRoutes from './routes/public/user.public.js'
// import userPrivateRoutes from './routes/private/user.private.js'
dotenv.config()

const url_database = process.env.URL_DATABASE

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', userPublicRoutes)
// app.use('/', userPrivateRoutes) 


Connect(url_database)
app.listen(3000, () => console.log("Servidor rodando"))