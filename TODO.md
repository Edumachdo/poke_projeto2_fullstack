# TODO - Projeto 2

Esta lista contém os itens pendentes e pontos de verificação para finalizar o projeto conforme a proposta.

- [ ] **Validação de Dados no Backend:**
  - [ ] Verificar se todas as rotas (especialmente de inserção e edição) validam os dados recebidos antes de interagir com o banco de dados.

- [ ] **Segurança:**
  - [x] **Prevenção contra Injeção:** Confirmar se as entradas do usuário estão sendo higienizadas (sanitized) no backend para prevenir ataques de XSS e NoSQL Injection.
  - [x] **Invalidação de Token:** Garantir que o token de autenticação é corretamente invalidado no processo de logout.

- [ ] **Otimização:**
  - [x] **Compressão de Respostas:** Implementar ou verificar se há um middleware de compressão (ex: `compression`) no Express para otimizar as respostas da API.

- [ ] **Banco de Dados:**
  - [x] **Pool de Conexões:** Revisar o arquivo `config/database.js` para confirmar se o gerenciamento do pool de conexões está configurado corretamente.