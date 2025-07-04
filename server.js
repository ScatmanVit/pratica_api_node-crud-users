import Connect from './connection/connection.js'
import App from './config/app.js' 
import dotenv from 'dotenv'
dotenv.config()
const url_database = process.env.URL_DATABASE

Connect(url_database)
App.listen(3000, () => console.log("Servidor rodando 🚀"))