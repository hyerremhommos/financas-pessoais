import { Query } from "../../core/utils/abstract.ts";

type TransacaoData = {
    id: number;
    descricao: string;
    valor: number;
    tipo: 'receita' | 'despesa';
    categoria: string;
    data: string;
    observacao: string | null;
    criado: string;
}

type TransacaoCreate = Omit<TransacaoData, 'id' | 'criado'>;

type InvestimentoData = {
    id: number;
    nome: string;
    tipo: string;
    valor_investimento: number;
    data_investimento: string;
    instituicao: string | null;
    observacao: string | null;
    criado: string;
}

type InvestimentoCreate = Omit<InvestimentoData, 'id' | 'criado'>;

export class FinancasQuery extends Query {
    // Transações
    insertTransacao({ descricao, valor, tipo, categoria, data, observacao }: TransacaoCreate) {
        return this.db.query(/*sql*/`
            INSERT INTO "transacoes"
            ("descricao", "valor", "tipo", "categoria", "data", "observacao")
            VALUES (?,?,?,?,?,?)
        `).run(descricao, valor, tipo, categoria, data, observacao);
    }

    selectTransacoes(){
        return this.db.prepare(/*sql*/`
            SELECT * FROM "transacoes"
            ORDER BY "data" DESC, "id" DESC
            LIMIT 200
        `).all() as TransacaoData[];
    }

    updateTransacao({ descricao, valor, tipo, categoria, data, observacao }: TransacaoCreate, id: number){
        return this.db.prepare(/*sql*/`
            UPDATE "transacoes"
            SET 
                "descricao" = ?,
                "valor" = ?,
                "tipo" = ?,
                "categoria" = ?,
                "data" = ?,
                "observacao" = ?
            WHERE "id" = ?
        `).run(descricao, valor, tipo, categoria, data, observacao, id);
    }

    deleteTransacao(id: number){
        return this.db.prepare(/*sql*/`
            DELETE FROM "transacoes"
            WHERE "id" = ?
        `).run(id);
    }

    // Investimentos
    insertInvestimento({ nome, tipo, valor_investimento, data_investimento, instituicao, observacao }: InvestimentoCreate){
        return this.db.query(/*sql*/`
            INSERT INTO "investimentos"
            ("nome", "tipo", "valor_investimento", "data_investimento", "instituicao", "observacao")
            VALUES (?,?,?,?,?,?)
        `).run(nome, tipo, valor_investimento, data_investimento, instituicao, observacao);
    }

    selectInvestimentos(){
        return this.db.prepare(/*sql*/`
            SELECT * FROM "investimentos"
            ORDER BY "data_investimento" DESC, "id" DESC
            LIMIT 200
        `).all() as InvestimentoData[];
    }

    updateInvestimento({ nome, tipo, valor_investimento, data_investimento, instituicao, observacao }: InvestimentoCreate, id: number){
        return this.db.prepare(/*sql*/`
            UPDATE "investimentos"
            SET
                "nome" = ?,
                "tipo" = ?,
                "valor_investimento" = ?,
                "data_investimento" = ?,
                "instituicao" = ?,
                "observacao" = ?
            WHERE "id" = ?
        `).run(nome, tipo, valor_investimento, data_investimento, instituicao, observacao, id);
    }

    deleteInvestimento(id: number){
        return this.db.prepare(/*sql*/`
            DELETE FROM "investimentos"
            WHERE id = ?
        `).run(id);
    }
}