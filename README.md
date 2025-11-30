# Projeto Pokedex Full Stack

Projeto full stack que fornece uma Pokedex (API + frontend) para visualizar, buscar e gerenciar Pokémon.

Arquitetura

- **Backend**: Node.js + Express, conecta-se a um banco MySQL e expõe rotas REST.
- **Frontend**: React + Vite, consome a API do backend.

## Pré-requisitos

- Node.js (v14+)
- npm
- MySQL (ou MariaDB)

## Variáveis de ambiente

Configure um arquivo `.env` na raiz do `backend` com as variáveis necessárias. Exemplo mínimo:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=pokedex_db
PORT=3000
JWT_SECRET=uma_chave_secreta
```

O backend usa essas variáveis em `backend/src/config/database.js` e `backend/src/index.js`.

## Backend — configuração e execução

1. Abrir terminal e navegar para `backend`:

```bash
cd backend
```

2. Instalar dependências (caso necessário):

```bash
npm install
```

3. Popular o banco com dados iniciais (seed). Isso criará as tabelas `User` e `Pokemon` e inserirá um usuário de exemplo e alguns pokémons:

```bash
npm run db:seed
```

Usuário de teste criado pelo seed:

- Email: `test@example.com`
- Senha: `password123`

4. Iniciar servidor do backend (porta padrão `3000`):

```bash
npm start
```

O servidor só é iniciado automaticamente quando `backend/src/index.js` é executado diretamente; ao importar `app` (por exemplo, em scripts), ele não fará `listen()` automaticamente.

## Frontend — configuração e execução

1. Abrir outro terminal e navegar para `frontend`:

```bash
cd frontend
```

2. Instalar dependências e iniciar o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abra `http://localhost:5173` (ou o endereço informado pelo Vite).

## Notas sobre testes

- Testes unitários/automáticos foram removidos deste repositório. Se você deseja adicionar testes novamente, recomendo usar `jest` (backend) e `vitest`/`@testing-library/react` (frontend).

## Manutenção

- Caso remova/adicione dependências, execute `npm install` para regenerar `package-lock.json`.
- Para uma instalação limpa (recomendado após mudanças de dependências):

```bash
rm -rf node_modules package-lock.json
npm install
```

## Segurança

- Após instalar, é recomendável rodar `npm audit` e `npm audit fix` para verificar vulnerabilidades.

---

Se quiser, eu posso também commitar estas mudanças no README e/ou adicionar instruções mais avançadas (como execução de migrações ou docker).
