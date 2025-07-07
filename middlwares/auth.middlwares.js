import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

const jwt_secret = process.env.JWT_SECRET

const auth = (req, res, next) => {
   try {
      const token = req.headers.authorization
      if (!token) {
         return res.status(401).json({ message: "Acesso negado" })
      }
      const token_formated = token.replace('Bearer ', '')
      const decoded = jwt.verify(token_formated, jwt_secret)

      req.user = decoded
      next()
   } catch (err) {
      res.status(401).json({ message: "Token Inválido" })
      console.error(err)
   }
}


export default auth;