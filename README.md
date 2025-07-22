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
- MongoDB (Banco de dados)  
- Mongoose (ODM para MongoDB)  
- Bcrypt (Encriptação de senhas)  
- Dotenv (Gerenciamento de variáveis de ambiente)
- Insomnia (Para testes no desenvolvimento)  

---

## 📂 Estrutura de Diretórios
```plaintext
API-NODE_CRUD_USERS/
├── config/                  # Arquivos de configuração (variáveis, setups)
│   └── app.js               # Configuração principal do app (middlewares globais, etc.)
│
├── connection/              # Conexão com banco de dados
│   └── connection.js        # Setup da conexão com MongoDB
│
├── controllers/             # Camada de controle das rotas
│   ├── user.controllers.js  # Controladores públicos e gerais de usuários
│   ├── admin.controller.js  # Controladores para ações de administrador
│   └── private/             # Controladores privados
│       └── user.private.controller.js
│
├── middlewares/             # Middlewares de autenticação/validação
│   ├── auth.middlewares.js  # Verificação de JWT, roles, etc.
│   └── validation.middlewares.js  # Validações de inputs
│
├── models/                  # Modelos de dados (Mongoose Schemas)
│   └── user.model.js
│
├── routes/                  # Rotas separadas por contexto
│   ├── public/
│   │   └── user.public.js   # Rotas públicas (login, cadastro)
│   └── private/
│       ├── admin.private.js # Rotas privadas do admin
│       └── user.private.js  # Rotas privadas do usuário
│
├── services/                # Lógica de negócio (chamada pelos controllers)
│   ├── admin.services.js
│   ├── user.services.js
│   └── private/
│       └── user.private.services.js
│
├── utils/                   # Funções utilitárias
│   └── capitalize.js
│
├── .env                     # Variáveis de ambiente (chaves, configs)
├── .gitignore               # Ignora node_modules, env, etc.
├── package.json             # Dependências e scripts
├── package-lock.json
├── README.md                # Documentação inicial
└── server.js                # Ponto inicial da aplicação
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
| POST   | /register   | Registra um novo usuário      | Não          |
| POST   | /login      | Autentica e retorna token JWT | Não          |
| GET    | /admin/list-users      | Lista todos os usuários       | Sim (JWT)    |
| PUT    | /admin/update/user/:id | Atualiza um usuário           | Sim (JWT)    |
| DELETE | /admin/update/user/:id | Exclui um usuário             | Sim (JWT)    |
| GET | /logout |                   Termina a sessão de um usuário| Sim (JWT)    |

---

## 👤 Autor
Victor Ribeiro Baradel
Feito com ☕


