# teste-api

API REST para gerenciamento de tarefas (TO-DO) com autenticação JWT.

## 📌 Funcionalidades
- Cadastro de usuário
- Login com autenticação JWT
- Criação de tarefas
- Listagem de tarefas pendentes
- Conclusão de tarefas
- Rotas protegidas por autenticação

---

## 🚀 Tecnologias
- Node.js
- Express
- SQLite + Sequelize
- JWT
- Swagger
- Jest

---

## ⚙️ Requisitos
- Node.js 18+

---

## 📥 Instalação

Clone o repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

Instale as dependências:

npm install

## 🔐 Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto:
JWT_SECRET=seu_segredo_aqui


## ▶️ Executar a aplicação
npm start
Servidor disponível em:
http://localhost:3000


## 📘 Documentação da API (Swagger)
A documentação da API pode ser acessada via Swagger:
http://localhost:3000/api-docs


## 🧪 Executar testes
Para rodar os testes unitários e verificar a cobertura de código:
npx jest --coverage


## ☁️ Publicação na AWS
### Opção 1 — EC2 (mais simples e direta)

A aplicação pode ser publicada em uma instância EC2 com Linux (Amazon Linux ou Ubuntu).

Passos:

- Criar uma instância EC2

- Instalar Node.js e Git

- Clonar o repositório da aplicação

  - Configurar as variáveis de ambiente (.env)
  - 
           PORT=3000
           JWT_SECRET=123456
           JWT_EXPIRES_IN=1d

- Instalar dependências (npm install)

- Executar a aplicação com PM2, garantindo alta disponibilidade

- Liberar a porta 3000 no Security Group

- Opcionalmente configurar Nginx como reverse proxy

Essa abordagem é simples, econômica e adequada para aplicações pequenas e médias.

### Opção 2 — Serverless (mais escalável)

A aplicação pode ser adaptada para uma arquitetura serverless, utilizando:

- AWS Lambda

- API Gateway

- Banco de dados gerenciado como Amazon RDS (SQLite → PostgreSQL) ou DynamoDB

Essa abordagem reduz custos operacionais, escala automaticamente e elimina a necessidade de gerenciamento de servidores.


📌 Conclusão:

A escolha entre EC2 ou Serverless depende do volume de acessos e da necessidade de escalabilidade da aplicação.



## 👤 Autor

Desenvolvido por Fellipe Carneiro  
Desafio técnico – Aplicação teste-angular