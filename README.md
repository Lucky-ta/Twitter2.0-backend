# TWITTER-BASIC-CLONE (Back-end)

Projeto para estudo.

## 🚀 Começando

Siga as instruções abaixo para a execução do projeto.

### 🔧 Instalação

1 -
  Faça um fork do projeto clicando no botão 'Fork' na parte superior direita do seu github.

2 -
   Faça um clone do projeto copiando o link SSH ou HTTPS disponivel no seu fork e rodando o seguinte comando no seu terminal:
   ```
   git clone 'seu link SSH ou HTTPS'
   ```
3 -
  Entre no arquivo e instale as dependencias necessarias:
  ```
   cd Twitter2.0-backend
  ```
   ```
   npm install
  ```
  ou
   ```
   yarn install
  ```
  
## ⚙️ Executando os testes


### 🔩 Testes Unitários e de Integração

O projeto possui testes unitários e de integração, que roda em um banco de dados sqlite!
Os testes vão verificar a integridade do aplicativo testando desde pequenas funções, até as rotas desenvolvidas.

Dentro da pasta raiz do projeto, rode o seguinte comando:
```
npm run test
```
Ele irá rodar todos os testes automaticamente.

Caso precise zerar o banco de dados sqlite, rode o seguinte comando:
```
npm run db:reset
```

## ⚙️ Variáveis de ambiente

Para você executar o projeto em ambiente de desenvolvimento, você precisa configurar as seguintes variáveis de ambiente para se conectar ao seu banco de dados:

Crie um arquivo com o seguinte nome ".env", e dentro dele configure as seguintes variáveis:
```
DB_USERNAME=seu db userName aqui...(root)
DB_PASSWORD=a senha do seu db aqui...
DB_NAME=o nome do seu db aqui...
DB_HOST=o host do seu db aqui...
```
## 📦 JWT SECRET

 O projeto foi desenvolvido pensando na segurança do usuário, então foi criado uma chave SECRET para validar o usuário, na qual não estou disponibilizando 
 aqui neste repositório público.
 
 Para você rodar o projeto sem erros, você precisa criar um arquivo com nome "secret.ts" dentro da pasta "app" que fica dentro de "src", e então
 criar uma constante SECRET com alguma palavra chave que você prefira e exporta-la como padrão.

## 📦 Desenvolvimento

Para rodar o projeto em modo de desenvolvimento você precisa ter todas as dependências instaladas.
Caso não tenha feito, rode o seguinte comando:

```
npm install
```
ou
```
yarn install
```
Com as dependências instaladas, basta apenas rodar o seguinte comando para rodar o projeto:
```
npm run dev
```
ou 
```
yarn run dev
```
Após o comando, o App vai estar rodando na porta 3000 do seu localhost.
Para acessa-lo basta colando o seguinte link na URL do seu navegador:
```
http://localhost:3000/
```
Certifique-se de que não há nenhuma mais nenhuma aplicação rodando na porta 3000 para rodar o projeto!

## ⚙️ Rotas

--Rotas de usuário--
- http://localhost:3000/user/create (POST METHOD) - Parâmetros [email, name, password] - (REGISTRO DE USUÁRIO);
- http://localhost:3000/user/login (POST METHOD) - Parâmetros [email, password] - (LOGIN DE USUÁRIO);
- http://localhost:3000/user/edit/:id (PUT METHOD) - Parâmetros [name] - (EDITAR NOME DO USUÁRIO);
- http://localhost:3000/user/exclude/:id (DELETE METHOD) - Parâmetros [] - (EXCLUIR USUÁRIO);
- http://localhost:3000/user/:userId (GET METHOD) - Parâmetros [] - (RETORNA O USUÁRIO PELO SEU ID);
---

--Rotas de tweet--
- http://localhost:3000/tweet/ (GET METHOD) - Parâmetros [] - (RETORNA TODOS TWEETS NO BANCO DE DADOS);
- http://localhost:3000/tweet/:userId (GET METHOD) - Parâmetros [] - (RETORNA TODOS OS TWEETS DE UM USUÁRIO);
- http://localhost:3000/tweet/liked/:userId (GET METHOD) - Parâmetros [] - (RETORNA TODOS OS TWEETS QUE O USUÁRIO CURTIU);
- http://localhost:3000/tweet/create/:userId (POST METHOD) - Parâmetros [tweet] - (CRIAR NOVO TWEET);
- http://localhost:3000/tweet/like/:userId/:tweetId (POST METHOD) - Parâmetros [] - (CURTE UM TWEET EPECÍFICO);
- http://localhost:3000/tweet/:tweetId/:userId (DELETE METHOD) - Parâmetros [] - (EXCLUI O TWEET DE UM USUÁRIO ESPECÍFICO);

---
## 🛠️ Construído com

O projeto foi desenvolvido com as seguintes ferramentas:

* [TypeScript](https://www.typescriptlang.org/)
* [JavaScript](https://www.javascript.com/)
* [Jest](https://jestjs.io/)
* [ESlint](https://eslint.org/)
* [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
* [NodeJS](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Docker](https://www.docker.com/)
* [Heroku](https://heroku.com/)
* [Sqlite](https://www.sqlite.org/index.html)

## 📌 Versão e API

[Git](https://git-scm.com/) - para controle de versão.

## 🚀 Deploy
O deploy do projeto foi realizado utililizando:
* [Heroku](https://heroku.com/)
