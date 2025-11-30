**Relatório do Projeto 2**

Data: 29 de novembro de 2025

**Resumo Geral**:
- **Feito:** Correção de problemas de middleware no `backend`, remoção de testes incompatíveis por decisão do usuário, reinstalação limpa das dependências no `backend`, execução com sucesso de `npm run db:seed`, localização da proposta em PDF, varredura do repositório para reunir evidências de implementação dos requisitos principais.
- **Pendente:** Extração literal do texto da Proposta 2 (PDF) para comparação estrita; mapeamento final requisito → evidência documentado; remediação de vulnerabilidades reportadas pelo `npm audit`; geração do documento de comparação formal; rodar/ajustar testes se necessário.

**O que foi feito (detalhado)**:
- **Corrigido:** `app.use()` error — middleware imports/exports corrigidos e `app` exportado em `backend/src/index.js`.
- **Removido testes:** arquivos de testes e dependências `jest`/`supertest` removidos do `backend` conforme solicitado.
- **Dependencies:** `node_modules` e `package-lock.json` regenerados no `backend` (instalação limpa concluída). Foram reportadas 2 vulnerabilidades (1 alta, 1 crítica) após a instalação.
- **Seed DB:** `npm run db:seed` executado com sucesso em `backend` (exit code 0); `User` e os registros de `Pokemon` foram criados conforme `seed.js`.
- **Varredura de código:** Inspeção manual dos arquivos mostrou implementações que atendem aos requisitos funcionais:
  - `backend/src/index.js`: uso de `helmet()`, `compression()`, `cors()`, logging e rate limiter; roteamento para `/api/auth` e `/api/pokemon`.
  - `backend/src/routes/auth.js`: endpoints `POST /api/auth/login` e `POST /api/auth/register` com `bcrypt` e `jsonwebtoken` (JWT com `expiresIn: '24h'`).
  - `backend/src/routes/pokemon.js`: CRUD para Pokémon; `GET /api/pokemon` com parâmetros de busca e paginação, validação com `express-validator`; `router.use(authMiddleware)` protege rotas; `cacheMiddleware` aplicado ao `GET`.
  - `backend/src/config/database.js`: `mysql2/promise` pool com `connectionLimit: 10` e função `createTables()` para `User` e `Pokemon`.
  - `backend/src/middleware/authMiddleware.js`: verificação de JWT e atribuição `req.user`.
  - `backend/src/middleware/cacheMiddleware.js`: cache em memória para respostas GET (keyed por URL).
  - `frontend/src/api.js`: adiciona header `Authorization: Bearer <token>` e funções `login`, `getPokemon`, `createPokemon`, `updatePokemon`, `deletePokemon`.

**O que falta / pendências**:
- **Extração literal da Proposta 2 (PDF):** leitura direta do arquivo retornou dados binários; é necessário executar uma conversão PDF→texto (ou OCR) para permitir comparação estrita frase-a-frase com a proposta.
- **Mapeamento requisito → evidência formal:** compilar um `docs/proposta2-comparacao.md` listando cada requisito textual e apontando onde está implementado (arquivo/trecho) ou justificando ausência.
- **Remediar vulnerabilidades NPM:** executar `npm audit` e avaliar `npm audit fix` (possivelmente atualizar dependências). Requer validação manual de regressões.
- **Testes:** a suíte de testes foi removida; se desejarem manter testes, é necessário reescrevê-los para MySQL/pool atual ou restaurar/ajustar conforme a arquitetura.
- **Revisões de segurança:** considerar expirar/rotacionar tokens (lista de revogação) se requisitado; fortalecer política CORS se necessário; avaliar armazenamento de segredos (variáveis de ambiente atualmente presumidas).

**Recomendações / mudanças mínimas sugeridas**:
- **Extração do PDF:** autorizar que eu execute uma ferramenta `pdftotext`/`poppler` ou fornecer o texto da proposta para que eu gere a comparação estrita.
- **Vulnerabilidades:** rodar no `backend`:
\`\`\`
cd backend
npm audit
npm audit fix
\`\`\`
- **Documentação:** criar `docs/proposta2-comparacao.md` contendo cada requisito (copiado literalmente do PDF) e status com evidência (arquivo:linha). Posso gerar o rascunho automaticamente após extrair o texto do PDF.
- **Testes:** reescrever testes usando MySQL (mockar pool ou usar DB de teste) e adicionar scripts `npm test` estáveis.
- **Pequenas correções de código (opcionais):** adicionar mensagens de erro consistentes e centralizar a config de tokens (ex.: `JWT_EXPIRES` em `.env`), documentar variáveis de ambiente em `README.md`.

**Próximos passos imediatos (se aprovar)**:
1. Posso extrair o PDF para texto automaticamente (requer autorização para instalar/usar utilitário de extração) e então gerar `docs/proposta2-comparacao.md` com mapeamento literal. (Recomendado)
2. Rodar `npm audit fix` no `backend`, revisar mudanças e testar localmente.
3. Gerar o documento final e submeter PR com `RELATORIO_PROJETO2.md`, `TODO.md`, e `docs/proposta2-comparacao.md`.

Se quiser, eu executo agora a extração do PDF e já gero o `docs/proposta2-comparacao.md` (opção recomendada). Caso prefira colar trechos do PDF aqui, posso trabalhar com isso sem ferramentas adicionais.
