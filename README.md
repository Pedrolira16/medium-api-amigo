# Medium API

Este projeto consiste em uma API backend desenvolvida em Node.js. A API permite que os usuários publiquem suas postagens e visualizem as postagens de outras pessoas, além de funcionalidades de autenticação e interação com postagens, como likes e deslikes.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento para construir a API.
- **Express**: Framework para o servidor Node.js.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações das postagens.
- **Postico**: Ferramenta GUI para gerenciamento do PostgreSQL.
- **Sequelize**: ORM para facilitar a interação com o banco de dados.
- **Nodemon**: Ferramenta para reiniciar automaticamente o servidor ao detectar mudanças no código durante o desenvolvimento.
- **JWT**: Para autenticação e autorização de usuários.

## Funcionalidades

### Usuários
- **Criação de Usuário**: Permite que novos usuários se registrem com nome, email e senha.
- **Login**: Permite que os usuários façam login e recebam um token JWT para autenticação.

### Publicações
- **Criar Publicação**: Permite que usuários autenticados criem novas postagens.
- **Atualizar Publicação**: Permite que usuários autenticados atualizem suas postagens existentes.
- **Excluir Publicação**: Permite que usuários autenticados excluam suas postagens existentes.
- **Listar Publicações**: Permite que qualquer usuário visualize as postagens com paginação e ordenação por data de publicação.
- **Interações (Like/Deslike)**: Permite que usuários autenticados interajam com as postagens (like/deslike).

## Requisitos

- Node.js (>= 16 <= 16.14.0)
- Yarn (>= 1.19.1)
- PostgreSQL instalado e configurado
- Postico (opcional, para gerenciar o banco de dados via GUI)

## Instalação

1. Clone este repositório para o seu ambiente local:

    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    cd nome-do-repositorio
    ```

2. Instale as dependências do projeto:

    ```bash
    yarn install
    ```

3. Configure o banco de dados PostgreSQL. Crie um banco de dados e atualize o arquivo `.env` com as informações do banco de dados:

    ```env
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=nome_do_banco
    DB_PORT=5432
    JWT_SECRET=sua_chave_secreta
    ```

4. Execute as migrações do banco de dados para criar as tabelas necessárias:

    ```bash
    npx sequelize-cli db:migrate
    ```

5. Inicie o servidor de desenvolvimento:

    ```bash
    yarn start:dev
    ```

## Endpoints

### Usuários

- **POST** `/users`: Criação de usuário.
- **POST** `users/login`: Autenticação do usuário.

### Publicações

- **GET** `/posts`: Lista todas as publicações com paginação.
- **GET** `/posts/:id`: Visualiza uma publicação específica.
- **POST** `/posts`: Cria uma nova publicação (autenticado).
- **PUT** `/posts/:id`: Atualiza uma publicação existente (autenticado).
- **DELETE** `/posts/:id`: Exclui uma publicação (autenticado).

### Interações

- **POST** `/posts/:id/like`: Dá like em uma publicação (autenticado).
- **POST** `/posts/:id/deslike`: Dá deslike em uma publicação (autenticado).

## Exemplo de Requisição

#### Criar Publicação

**Request:**
```http
POST /publicacoes
Content-Type: application/json
Authorization: Bearer seu_token_jwt

{
  "titulo": "Meu Primeiro Post",
  "texto": "Este é o conteúdo da minha primeira publicação.",
  "resumo": "Resumo da minha primeira publicação.",
  "data_publicacao": "2024-07-20T00:00:00.000Z"
}
```
**Response** 
```
Content-Type: application/json

{
  "id": 1,
  "usuario": "seu_usuario",
  "titulo": "Meu Primeiro Post",
  "texto": "Este é o conteúdo da minha primeira publicação.",
  "resumo": "Resumo da minha primeira publicação.",
  "total_likes": 0,
  "data_publicacao": "2024-07-20T00:00:00.000Z",
  "createdAt": "2024-07-12T00:00:00.000Z",
  "updatedAt": "2024-07-12T00:00:00.000Z"
}
```
