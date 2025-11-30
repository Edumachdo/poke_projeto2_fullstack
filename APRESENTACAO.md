# Roteiro para Vídeo de 3 Minutos - Projeto Pokémon Fullstack

**Objetivo:** Apresentar o projeto de forma clara e concisa, cobrindo os requisitos da proposta e as funcionalidades implementadas.

---

### Parte 1: Introdução (Aprox. 20 segundos)

*   **(Você na câmera ou slide inicial):** "Olá, [seu nome]. Este é o meu Projeto 2 de Programação Web Fullstack, uma aplicação completa para gerenciamento de Pokémon."
*   **(Mostrando a tela de login):** "A aplicação foi construída com **React** no frontend, **Express.js** no backend e **MySQL** como banco de dados. Toda a comunicação segue o padrão de uma API RESTful e a arquitetura de uma Single-Page Application."

---

### Parte 2: Demonstração das Funcionalidades (Aprox. 2 minutos)

*   **(Tela de Login):** "O acesso é restrito a usuários autenticados. A primeira funcionalidade é o **login**."
    *   *Ação:* Faça login com um usuário já existente.
*   **(Tela de Listagem, após login):** "Após o login, somos levados à página principal, que lista os Pokémon cadastrados com paginação."
    *   *Ação:* Clique rapidamente na página 2 para mostrar a paginação funcionando.
*   **(Busca):** "Podemos **buscar** por um Pokémon específico pelo nome ou pelo ID."
    *   *Ação:* Use a barra de busca para encontrar um Pokémon, como o "Pikachu". Limpe a busca.
*   **(Logout e Registro):** "O sistema também permite o **registro de novos usuários**."
    *   *Ação:* Faça logout. Na tela de login, clique em "Criar conta". Preencha os dados e crie um novo usuário. Em seguida, faça login com esse novo usuário para provar que funcionou.
*   **(Inserção):** "Usuários logados podem **adicionar** novos Pokémon."
    *   *Ação:* Clique em "Novo Pokémon". Preencha o formulário e adicione um Pokémon à lista. Mostre ele aparecendo na tabela.
*   **(Edição e Remoção):** "Também é possível **editar** as informações e **remover** um Pokémon."
    *   *Ação:* Pegue o Pokémon que você acabou de criar, clique em "Editar", mude o nome dele e salve. Depois, clique em "Deletar" para removê-lo da lista.

---

### Parte 3: Destaques Técnicos e Arquitetura (Aprox. 30 segundos)

*   **(Mostrando o código rapidamente no VS Code):** "Nos bastidores, o projeto implementa vários requisitos importantes da proposta."
*   "No backend, implementamos **segurança** contra injeção de SQL com *prepared statements* e a autenticação é feita com tokens JWT."
*   "Para **otimização**, o backend utiliza um **pool de conexões** com o banco de dados e compressão GZIP nas respostas da API para diminuir o tráfego de rede."
*   **(De volta à aplicação rodando):** "A estrutura do frontend com React permite uma experiência de usuário fluida e reativa."

---

### Parte 4: Conclusão (Aprox. 10 segundos)

*   **(Você na câmera ou slide final):** "Este foi o resumo do projeto, uma aplicação full-stack funcional, segura e otimizada. Obrigado!"

---

## Dicas para a Gravação

*   **Pratique antes:** Grave uma ou duas vezes para garantir que o tempo está correto e que você não vai esquecer nenhuma etapa.
*   **Seja direto:** Com apenas 3 minutos, não há tempo para detalhes pequenos. Foque em mostrar o fluxo principal das funcionalidades.
*   **Deixe tudo preparado:** Antes de iniciar a gravação, certifique-se de que:
    *   O servidor do backend está rodando (`npm start` na pasta `backend`).
    *   O servidor do frontend está rodando (`npm run dev` na pasta `frontend`).
    *   Você tem um usuário e senha prontos para fazer o login.
    *   Você tem os dados de um Pokémon prontos para a inserção (ID, nome, etc.).
*   **Use um software de gravação de tela:** Ferramentas como OBS Studio, Loom ou o próprio gravador do Windows (Win + G) funcionam bem.
*   **Fale com clareza:** Narre o que você está fazendo de forma calma e clara. O roteiro acima serve como guia para a sua fala.
