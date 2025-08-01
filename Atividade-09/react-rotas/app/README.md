# Projeto Backend de Usuários (Node.js + Sequelize + MySQL)

Este projeto é um backend básico para gerenciamento de usuários com cadastro, listagem, busca, remoção e troca de senha. Também inclui uma interface web simples para visualizar os usuários.

---

## 🚀 Instruções de uso

🗒️ Observação: Todos os comandos abaixo devem ser executados a partir da pasta `app/` (raiz do projeto).

### 1. Acesse a pasta raiz do projeto

Abra o terminal na pasta raiz do projeto chamada app.
Se estiver em outra pasta, navegue até ela usando o comando cd. Por exemplo:

```bash
cd /caminho/para/seu/projeto/app
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Crie o arquivo de variáveis de ambiente

Copie o arquivo `.env.example`:

```bash
cp .env.example .env
```

Depois, edite o `.env` e preencha com os dados do seu banco MySQL:

```env
PORTA=3000
SALT=10
DATABASE=backend_usuarios
DATABASE_USER=root
PASSWORD=
```
🗒️ Observação:

Se preferir não criar o banco de dados manualmente, mantenha o valor de `DATABASE` como está no arquivo `.env.example`. O banco será criado automaticamente ao executar o próximo comando.

Caso você já tenha criado o banco manualmente, pode ignorar o passo 4.

---

### 4. Crie o banco de dados e tabelas

Excute no Xamp o mysql, com ele funcionando, execute:
```bash
npm run create_db
```

---

### 5. Rode o servidor

#### Modo desenvolvimento:

```bash
npm run dev
```

#### Modo produção:

```bash
npm run production
```

---

### 6. Acesse o frontend

No navegador, acesse:

```navegador
http://localhost:3000/index.html
```

---

### 7. Acesse outros endpoints

Para acessar os demias endpoints, utilize postman, ou simlares. 

---

### 8. Encerrar o servidor

Caso esteja rodadando no modo dev, pressione `Ctrl + C` no terminal, caso esteja no modo production, execute:

```bash
npm run stop
```
