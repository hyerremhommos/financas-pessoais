# Finanças Pessoais

MVP de controle financeiro pessoal, com transações (receitas/despesas) e investimentos, incluindo gráfico de despesas por categoria.

Projeto desenvolvido para consolidar aprendizados de Node.js puro (sem framework).

## Stack

- **Backend**: Node.js puro (sem framework), TypeScript, SQLite (`node:sqlite`)
- **Frontend**: Vue 2 + Vuetify 2 (via CDN, sem etapa de build)

## Funcionalidades

- CRUD completo de transações e investimentos (criar, editar, excluir)
- Confirmação antes de excluir
- Cards de resumo (saldo, receitas, despesas, patrimônio investido)
- Categorias padronizadas por tipo de transação
- Gráfico de despesas por categoria (SVG puro, sem biblioteca de gráficos)
- Validação de formulário e feedback visual (snackbar)

## Como rodar localmente

npm install

node --watch index.ts

Acesse http://localhost:3000

## Estrutura do projeto

```
├── api/financas/       # rotas, queries e schema do banco
├── core/               # framework HTTP próprio (router, request/response customizados)
├── front/              # interface (Vue 2 + Vuetify)
└── index.ts            # ponto de entrada
```

<img width="1916" height="688" alt="image" src="https://github.com/user-attachments/assets/934a0d19-cacc-4952-bbac-a3b584472b00" />
