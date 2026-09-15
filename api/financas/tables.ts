export const financasTabelas = /*sql*/`

    CREATE TABLE IF NOT EXISTS "transacoes" (
        "id" INTEGER PRIMARY KEY,
        "descricao" TEXT NOT NULL,
        "valor" REAL NOT NULL CHECK ("valor" > 0),
        "tipo" TEXT NOT NULL CHECK ("tipo" IN ('receita', 'despesa')),
        "categoria" TEXT NOT NULL,
        "data" TEXT NOT NULL,
        "observacao" TEXT,
        "criado" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) STRICT;

    CREATE INDEX IF NOT EXISTS "idx_transacoes_data" ON "transacoes" ("data");

    CREATE TABLE IF NOT EXISTS "investimentos" (
        "id" INTEGER PRIMARY KEY,
        "nome" TEXT NOT NULL,
        "tipo" TEXT NOT NULL,
        "valor_investimento" REAL NOT NULL CHECK ("valor_investimento" > 0),
        "data_investimento" TEXT NOT NULL,
        "instituicao" TEXT,
        "observacao" TEXT,
        "criado" TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) STRICT;

    CREATE INDEX IF NOT EXISTS "idx_investimentos_data_investimento" ON "investimentos" ("data_investimento");
`;