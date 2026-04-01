# projeto-node-step

API em Express organizada em MVC, com autenticacao por token e endpoint para retornar o perfil do usuario autenticado.

## Endpoints de autenticacao

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

## Exemplo de registro

```json
{
  "nome": "Fabio",
  "email": "fabio@email.com",
  "password": "123456",
  "cargo": "admin"
}
```

## Exemplo de login

```json
{
  "email": "fabio@email.com",
  "password": "123456"
}
```

A resposta de `register` e `login` devolve:

```json
{
  "token": "Bearer token-gerado-na-resposta",
  "user": {
    "id": "...",
    "nome": "Fabio",
    "email": "fabio@email.com",
    "cargo": "admin",
    "criadoEm": "2026-03-31T00:00:00.000Z"
  }
}
```

Depois disso, envie o token em `Authorization: Bearer <token>`.
