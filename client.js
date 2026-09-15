console.clear();
const base = "http://localhost:3000";

const functions = {
  /* Transações */
  async postTransacao() {
    const response = await fetch(base + "/financas/transacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descricao: "Renda",
        valor: 200,
        tipo: "receita",
        categoria: "Renda extra",
        data: "2026-08-24",
        observacao: "Testes",
      }),
    });
    const body = await response.json();
    console.table(body);
  },

  async getTransacoes() {
    const response = await fetch(base + "/financas/transacoes");
    const body = await response.json();
    console.log(body);
  },

  async putTransacao(id) {
    const response = await fetch(base + "/financas/transacao/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descricao: "Real Madrid",
        valor: 2023,
        tipo: "despesa",
        categoria: "Champions League",
        data: "2026-08-27",
        observacao: null,
      }),
    });
    const body = await response.json();
    console.table(body);
  },

  async deleteTransacao(id) {
    const response = await fetch(base + "/financas/transacao/" + id, {
      method: "DELETE",
    });
    const body = await response.json();
    console.table(body);
  },

  /* Investimentos */
  async postInvestimento() {
    const response = await fetch(base + "/financas/investimento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "Reserva Emergência",
        tipo: "Renda Fixa",
        valor_investimento: 1000,
        data_investimento: "2026-08-25",
        instituicao: "Sicoob",
        observacao: "Investimento para o futuro",
      }),
    });
    const body = await response.json();
    console.table(body);
  },

  async getInvestimentos() {
    const response = await fetch(base + "/financas/investimentos");
    const body = await response.json();
    console.log(body);
  },

  async putInvestimento(id) {
    const response = await fetch(base + "/financas/investimento/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: "Reserva Emergência",
        tipo: "Renda Fixa",
        valor_investimento: 20000,
        data_investimento: "2026-08-27",
        instituicao: "Sicoob Sarom",
        observacao: null,
      }),
    });
    const body = await response.json();
    console.table(body);
  },

  async deleteInvestimento(id) {
    const response = await fetch(base + "/financas/investimento/" + id, {
      method: "DELETE",
    });
    const body = await response.json();
    console.table(body);
  },
};

functions.postUsuario();
