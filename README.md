
# 🚀 API Adonis 5 Checkout Multi-Gateway

Sistema construído com **AdonisJS 5 + MySQL**, preparado para lidar com:
- múltiplos gateways de pagamento,
- papéis de usuários com permissões distintas (ADMIN, MANAGER, FINANCE, USER),
- TDD com @japa/runner,
- Docker Compose com MySQL, aplicação e mocks de gateways.

---

## 🚀 Tecnologias
- AdonisJS 5
- MySQL
- Docker / Docker Compose
- Luxon (datas)
- @vinejs/vine (validações)
- Axios (HTTP)
- Lucid ORM
- JWT Opaque Access Tokens
- @japa/runner para testes automatizados

---

## ⚙️ Como rodar o projeto

### 🚀 Clone o repositório
```bash
git clone <seu-repo>
cd <seu-repo>
```

### 🚀 Suba o ambiente com Docker Compose
```bash
docker compose up --build
```
Isso irá:
- subir o MySQL na porta 3306
- subir o AdonisJS na porta 3333
- subir os mocks de gateways nas portas 3001 e 3002

---

## ✅ Seeders iniciais
Usuários criados automaticamente:

| Email                | Senha    | Role    |
|-----------------------|----------|---------|
| admin@admin.com        | secret   | ADMIN   |
| manager@admin.com      | secret   | MANAGER |
| finance@admin.com      | secret   | FINANCE |
| user@admin.com         | secret   | USER    |

---

## 🚀 Rotas do sistema

### 🔓 Públicas
| POST   | /login    | Login e obter token |
| POST   | /purchase | Checkout compra     |

### 🔒 Privadas (prefix /api)
| Método | Endpoint                      | Permissões |
|--------|-------------------------------|------------|
| GET    | /api/users                    | ADMIN, MANAGER |
| POST   | /api/users                    | ADMIN, MANAGER |
| PUT    | /api/users/:id                | ADMIN, MANAGER |
| DELETE | /api/users/:id                | ADMIN, MANAGER |
| GET    | /api/products                 | ADMIN, MANAGER, FINANCE |
| POST   | /api/products                 | ADMIN, MANAGER, FINANCE |
| PATCH  | /api/gateways/:id/activate    | ADMIN |
| PATCH  | /api/gateways/:id/priority    | ADMIN |
| GET    | /api/clients                  | qualquer user |
| GET    | /api/clients/:id              | qualquer user |
| GET    | /api/transactions             | qualquer user |
| GET    | /api/transactions/:id         | qualquer user |
| POST   | /api/transactions/:id/refund  | FINANCE |

---

## 🧪 Testes automatizados

### 🚀 Rodando todos os testes
```bash
docker compose exec app node ace test
```

---

## 📂 Estrutura dos testes
Os testes estão localizados em:

```
tests/
 └── functional/
      ├── auth.spec.ts
      ├── purchase.spec.ts
      └── transactions.spec.ts
```

- `auth.spec.ts` testa login com sucesso e falha com senha errada.
- `purchase.spec.ts` testa o fluxo completo de checkout.
- `transactions.spec.ts` lista todas as transações.

---

### 📝 Rodar apenas um arquivo de testes
```bash
docker compose exec app node ace test --files "tests/functional/auth.spec.ts"
```

---

## 🔑 Autenticação
```http
POST /login
{ "email": "admin@admin.com", "password": "secret" }
```
Retorna token. Use:
```
Authorization: Bearer <token>
```

---

## ✅ Checkout exemplo
```http
POST /purchase
{
  "client": { "name": "Fulano", "email": "fulano@email.com" },
  "products": [ { "product_id": 1, "quantity": 2 } ],
  "card": { "number": "5569000000006063", "cvv": "010" }
}
```

---

## 👨‍💻 Autor
Feito com ❤️ usando AdonisJS.
