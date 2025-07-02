import mongoose from 'mongoose'


function Connect(url_database) {
   try {
      mongoose.connect(
         url_database
      ).then(console.log('Banco de dados conectado'))
   } catch(err) {
      console.error('Não foi possível conectar o banco de dados')
   }
}

export default Connect;