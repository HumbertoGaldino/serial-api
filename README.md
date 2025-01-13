# SERIAL API

![Logo](./public/Logo.png)

O **SERIAL API** é uma aplicação que utiliza a API The Movie Database (TMDB) para oferecer funcionalidades de gerenciamento de filmes e séries favoritos. Com esta API, os usuários podem listar filmes, marcar episódios assistidos, comentar e interagir em um feed compartilhado.

## Recursos

- **Adicionar filmes e séries favoritos**
- **Marcar episódios como assistidos**
- **Obter informações detalhadas de filmes e séries**
- **Comentar e interagir com outros usuários**
- **Feed social com atividades dos usuários**

## Tecnologias Utilizadas

- **Back-end**: Node.js, Express, Prisma
- **Front-end**: React, TypeScript
- **Banco de Dados**: PostgreSQL
- **Documentação**: Swagger
- **Autenticação**: JSON Web Tokens (JWT)
- **API Externa**: The Movie Database (TMDB)

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [PostgreSQL](https://www.postgresql.org/)
- Gerenciador de pacotes: [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Conta na [TMDB](https://www.themoviedb.org/) para obter sua API Key

## Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/serial-api.git
   cd serial-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   PORT=3000
   MONGODB_URI=sua_conexao_mongodb
   TMDB_API_KEY=sua_chave_da_api_tmdb
   JWT_SECRET=sua_chave_secreta
   ```

4. Inicie o servidor:

   ```bash
   npm start
   # ou
   yarn start
   ```

5. Acesse a aplicação no navegador em `http://localhost:3000`.

## Estrutura do Projeto

```
serial-api/
├── prisma/
│   └── migrations/
├── public/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   └── utils/
├── .env
├── package.json
└── README.md
```

## Licença

Este projeto está sob a licença [MIT](LICENSE). Sinta-se à vontade para utilizá-lo e modificá-lo.

## Desenvolvedores

 [![GitHub](https://img.shields.io/badge/Humberto-%23483D8B?style=for-the-badge)](https://github.com/HumbertoGaldino)
 [![GitHub](https://img.shields.io/badge/Francis-ff960f?style=for-the-badge)](https://github.com/FrancisBernard34
 )
