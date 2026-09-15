import { Api } from "../../core/utils/abstract.ts";
import { RouteError } from "../../core/utils/route-error.ts";
import { FinancasQuery } from "./query.ts";
import { financasTabelas } from "./tables.ts";

export class FinancasApi extends Api {
    query = new FinancasQuery(this.db);

    handlers = {
        // Transações
        postTransacao: (req, res) => {
            const { descricao, valor, tipo, categoria, data, observacao } = req.body;

            const writeResult = this.query.insertTransacao({ 
                descricao,
                valor,
                tipo: tipo as 'receita' | 'despesa',
                categoria,
                data,
                observacao
            });

            if (writeResult.changes === 0){
                throw new RouteError(400, 'erro ao criar transação');
            }

            res.status(201).json({ title: 'transação criada'} );
        },

        getTransacoes: (req, res) => {
            const transacoes = this.query.selectTransacoes();
            res.status(200).json(transacoes);
        },

        putTransacao: (req, res) => {
            const { descricao, valor, tipo, categoria, data, observacao } = req.body;
            const { id } = req.params;

            const writeResult = this.query.updateTransacao({ 
                descricao,
                valor,
                tipo,
                categoria,
                data,
                observacao 
            }, Number(id));

            if(writeResult.changes === 0){
                throw new RouteError(404, 'transação não encontrada');
            }

            res.status(200).json({title: 'transação atualizada'});
        },

        deleteTransacao: (req, res) => {
            const { id } = req.params;

            const writeResult = this.query.deleteTransacao(Number(id));

            if(writeResult.changes === 0){
                throw new RouteError(404, 'transação não encontrada');
            }

            res.status(200).json({ title: 'transação deletada' });
        },
        
        // Investimentos
        postInvestimento: (req, res) => {
            const { nome, tipo, valor_investimento, data_investimento, instituicao, observacao } = req.body;

            const writeResult = this.query.insertInvestimento({ 
                nome,
                tipo,
                valor_investimento,
                data_investimento,
                instituicao,
                observacao 
            });

            if (writeResult.changes === 0){
                throw new RouteError(400, 'erro ao criar investimento');
            }

            res.status(201).json({ title: 'investimento criado'} );
        },

        getInvestimentos: (req, res) => {
            const investimentos = this.query.selectInvestimentos();
            res.status(200).json(investimentos);
        },

        putInvestimento: (req, res) => {
            const { nome, tipo, valor_investimento, data_investimento, instituicao, observacao } = req.body;
            const { id } = req.params;

            const writeResult = this.query.updateInvestimento({ 
                nome,
                tipo,
                valor_investimento,
                data_investimento,
                instituicao,
                observacao 
            }, Number(id) );

            if(writeResult.changes === 0){
                throw new RouteError(404, 'investimento não encontrado');
            }

            res.status(200).json({title: 'investimento atualizado'});
        },

        deleteInvestimento: (req, res) => {
            const { id } = req.params;

            const writeResult = this.query.deleteInvestimento(Number(id));

            if(writeResult.changes === 0){
                throw new RouteError(404, 'investimento não encontrado');
            }

            res.status(200).json({title: 'investimento deletado'})
        }
    } satisfies Api['handlers']

    tables(): void {
        this.db.exec(financasTabelas);
    }

    routes(): void {
        // Transações
        this.router.post("/financas/transacao", this.handlers.postTransacao);
        this.router.get("/financas/transacoes", this.handlers.getTransacoes);
        this.router.put("/financas/transacao/:id", this.handlers.putTransacao);
        this.router.delete("/financas/transacao/:id", this.handlers.deleteTransacao);

        // Investimentos
        this.router.post("/financas/investimento", this.handlers.postInvestimento);
        this.router.get("/financas/investimentos", this.handlers.getInvestimentos);
        this.router.put("/financas/investimento/:id", this.handlers.putInvestimento);
        this.router.delete("/financas/investimento/:id", this.handlers.deleteInvestimento);
    }
}