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

 O projeto foi desenvolvido pensando na segurança do usuário, então foi criado uma chave SECRET para validar o usuário na qual não estou disponibilizando 
 aqui neste ambiente público.
 
 Para você rodar o projeto sem erros, você precisa criar um arquivo com nome "secret.ts" dentro da pasta "app" que fica dentro de "src", e então
 criar uma constante SECRET com alguma palavra chave que você prefira e exporta-la como default.

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
## 🛠️ Construído com

O projeto foi desenvolvido com as seguintes ferramentas:

* [TypeScript](https://www.typescriptlang.org/)
* [NodeJs](https://nodejs.org/en/)
* [Sequelize](https://sequelize.org/)
* [Docker](https://www.docker.com/)
* [Heroku](https://dashboard.heroku.com/)
* [Eslint](https://eslint.org/)
* [MySQL](https://www.mysql.com/)
* [JavaScript](https://www.javascript.com/)

## 📌 Versão

[Git](https://git-scm.com/) - para controle de versão.

## 🚀 Deploy
O deploy do projeto foi realizado utililizando:
* [Heroku](https://dashboard.heroku.com/)

## 📌 Rotas

* USER ROUTES: [create new user](https://twitter-clone-bac-kend.herokuapp.com/user/create);
* USER ROUTES: [user login](https://twitter-clone-bac-kend.herokuapp.com/user/login);

* TWEET ROUTES: [create new tweet](https://twitter-clone-bac-kend.herokuapp.com/tweet/create)
* TWEET ROUTES: [get all tweets](https://twitter-clone-bac-kend.herokuapp.com/tweet)
* TWEET ROUTES: [delete tweet](https://twitter-clone-bac-kend.herokuapp.com/tweet/:id)

---
