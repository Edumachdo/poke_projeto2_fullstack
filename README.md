# Poke Projeto Fullstack

Este é um projeto full-stack que consiste em um frontend em React e um backend em Node.js com Express, para gerenciar uma lista de Pokémons.

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MySQL2 (com o uso de `mysql2`)
- JWT para autenticação (`jsonwebtoken`)
- Bcrypt para hashing de senhas (`bcrypt`)
- CORS, Helmet, express-rate-limit para segurança
- `express-validator` para validação de entrada

### Frontend
- React
- Vite
- React Router (`react-router-dom`)
- Material-UI (`@mui/material`)
- ESLint para linting

## Instalação e Execução

### Pré-requisitos
- Node.js instalado
- Um servidor de banco de dados MySQL em execução

### Backend
1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz da pasta `backend` e adicione as seguintes variáveis (substitua com suas credenciais):
   ```
   DB_HOST=localhost
   DB_USER=seu_usuario_mysql
   DB_PASSWORD=sua_senha_mysql
   DB_NAME=seu_banco_de_dados
   JWT_SECRET=seu_segredo_jwt
   ```
4. Opcional: Para popular o banco de dados com dados iniciais, execute o script de seed:
   ```bash
   npm run db:seed
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```
O servidor backend estará em execução em `http://localhost:3000` (ou a porta configurada).

### Frontend
1. Em um novo terminal, navegue até a pasta `frontend`:
   ```bash
un
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
A aplicação frontend estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

## Scripts Disponíveis

### Backend
- `npm start`: Inicia o servidor de produção.
- `npm run db:seed`: Executa o script para popular o banco de dados.

### Frontend
- `npm run dev`: Inicia o ambiente de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run lint`: Executa o linter.
- `npm run preview`: Visualiza a build de produção localmente.
