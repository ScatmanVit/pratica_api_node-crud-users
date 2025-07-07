const isAdmin = (req, res, next) => {
   if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' })
   }

   if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado: Admins somente' })
   }

   next()   
}

export default isAdmin