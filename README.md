# API Node.js CRUD de Usuários com Autenticação JWT

Este projeto é uma API RESTful para gerenciamento de usuários com operações CRUD completas, implementando encriptação de senha com bcrypt e autenticação segura com tokens JWT.

---

## ✨ Funcionalidades Principais

- Registro de usuários com senhas encriptadas
- Encriptação e desencriptação de senha com bcrypt  
- Autenticação JWT para acesso seguro  
- Operações CRUD completas:  
  - Criar novos usuários  
  - Listar todos os usuários  
  - Atualizar informações de usuários  
  - Excluir usuários  
- Acesso restrito para admin para operações sensíveis (UPDATE/DELETE)  
- Arquitetura modular e bem organizada  

---

## 🛠️ Tecnologias Utilizadas

- Node.js (Ambiente de execução)  
- Express (Framework web)  
- JWT (Autenticação por tokens)  
- Mongoose (ODM para MongoDB)  
- Bcrypt (Encriptação de senhas)  
- Dotenv (Gerenciamento de variáveis de ambiente)  

---

## 📂 Estrutura de Diretórios
```plaintext
pratica_api_node-crud-users/
├── config/           # Configurações do servidor
├── connection/       # Configurações de conexão com banco de dados
├── controllers/      # Lógica dos endpoints
├── middlewares/      # Middlewares de autenticação
├── models/           # Modelos de dados
├── routes/           # Definição das rotas
├── services/         # Serviços e regras de negócio
├── .gitignore        # Arquivos ignorados pelo Git
├── package.json      # Dependências e scripts
├── package-lock.json
├── server.js         # Ponto de entrada da aplicação
└── README.md         # Este arquivo
```

---

## 🚀 Como Executar

1. Clone o repositório:
```plaintext
git clone https://github.com/seu-usuario/pratica_api_node-crud-users.git
```
3. Instale as dependências:
```plaintext
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com o conteúdo:

.env
```plaintext
URL_DATABASE=sua_string_de_conexao_mongodb
JWT_SECRET=aua_chave_secreta
PORT=sua_porta
```

Inicie o servidor:
```plaintext
npm run dev
```
---

## 🔒 Rotas da API
| Método | Endpoint        | Descrição                     | Autenticação |
| ------ | --------------- | ----------------------------- | ------------ |
| POST   | /api/register   | Registra um novo usuário      | Não          |
| POST   | /api/login      | Autentica e retorna token JWT | Não          |
| GET    | /api/users      | Lista todos os usuários       | Sim (JWT)    |
| PUT    | /api/users/\:id | Atualiza um usuário           | Sim (JWT)    |
| DELETE | /api/users/\:id | Exclui um usuário             | Sim (JWT)    |

---

## 🔜 Próximos Passos
- Integração com frontend React
- Implementação de testes automatizados
- Adição de sistema de roles/permissões
- Paginação e filtros na listagem de usuários


## 👤 Autor
Victor Ribeiro Baradel


