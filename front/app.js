new Vue({
  el: "#app",
  vuetify: new Vuetify({
    theme: {
      themes: {
        light: {
          primary: "#1976D2",
          success: "#22c55e",
          error: "#ef4444",
          warning: "#f59e0b",
        },
      },
    },
  }),
  data: {
    tab: 0,

    modalTransacao: false,
    modalInvestimento: false,

    categoriasReceita: [
      { value: "salario", label: "Salário" },
      { value: "freelance", label: "Freelance" },
      { value: "rendimento", label: "Rendimento" },
      { value: "presente", label: "Presente" },
      { value: "outras_receitas", label: "Outros" },
    ],
    categoriasDespesa: [
      { value: "alimentacao", label: "Alimentação" },
      { value: "transporte", label: "Transporte" },
      { value: "moradia", label: "Moradia" },
      { value: "saude", label: "Saúde" },
      { value: "educacao", label: "Educação" },
      { value: "lazer", label: "Lazer" },
      { value: "compras", label: "Compras" },
      { value: "contas", label: "Contas" },
      { value: "outras_despesas", label: "Outros" },
    ],

    transacoes: [],
    editandoId: null, // null = criando nova transação; número = editando essa transição
    form: {
      descricao: "",
      valor: "",
      tipo: "receita",
      categoria: "",
      data: "",
      observacao: "",
    },

    tiposInvestimento: [
      { value: "acoes", label: "Ações" },
      { value: "renda_fixa", label: "Renda Fixa" },
      { value: "cripto", label: "Criptomoedas" },
      { value: "fundos_imobiliarios", label: "Fundos Imobiliários" },
      { value: "fundos", label: "Fundos de Investimento" },
      { value: "poupanca", label: "Poupança" },
      { value: "outro", label: "Outros" },
    ],

    investimentos: [],
    editandoInvestId: null, // null = criando novo investimento; número = editando esse investimento
    formInvest: {
      nome: "",
      tipo: "",
      valor_investimento: "",
      data_investimento: "",
      instituicao: "",
      observacao: "",
    },

    snackbar: {
      show: false,
      text: "",
      color: "success",
    },

    rules: {
      obrigatorio: (v) =>
        (v !== null && v !== undefined && v !== "") || "Campo obrigatório",
    },

    modalDelete: {
      show: false,
      mensagem: "",
      tipo: null,
      id: null,
    },
  },

  methods: {
    // Transações
    async obtemTransacoes() {
      const response = await fetch("/financas/transacoes");
      this.transacoes = await response.json();
    },

    abrirModalTransacao() {
      this.limparEdicao();
      this.modalTransacao = true;
      this.$nextTick(() => {
        this.$refs.formTransacaoRef.resetValidation();
      });
    },

    editarTransacao(transacao) {
      this.editandoId = transacao.id;
      this.form = {
        descricao: transacao.descricao,
        valor: transacao.valor,
        tipo: transacao.tipo,
        categoria: transacao.categoria,
        data: transacao.data,
        observacao: transacao.observacao || "",
      };
      this.modalTransacao = true;
      this.$nextTick(() => {
        this.$refs.formTransacaoRef.resetValidation();
      });
    },

    async salvarTransacao() {
      if (!this.$refs.formTransacaoRef.validate()) {
        return;
      }

      const url = this.editandoId
        ? "/financas/transacao/" + this.editandoId
        : "/financas/transacao";

      const method = this.editandoId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descricao: this.form.descricao,
          valor: this.form.valor,
          tipo: this.form.tipo,
          categoria: this.form.categoria,
          data: this.form.data,
          observacao: this.form.observacao || null,
        }),
      });

      if (!response.ok) {
        const erro = await response.json();
        this.mostrarSnackbar(erro.title || "Erro ao salvar transação", "error");
        return;
      }

      await this.obtemTransacoes();
      this.mostrarSnackbar(
        this.editandoId ? "Transação atualizada!" : "Transação criada!",
      );
      this.fecharModalTransacao();
    },

    fecharModalTransacao() {
      this.modalTransacao = false;
      this.limparEdicao();
    },

    limparEdicao() {
      this.editandoId = null;
      this.form = {
        descricao: "",
        valor: "",
        tipo: "receita",
        categoria: "",
        data: "",
        observacao: "",
      };
    },

    async deletarTransacao(id) {
      const response = await fetch("/financas/transacao/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        const erro = await response.json();
        this.mostrarSnackbar(
          erro.title || "Erro ao excluir transação",
          "error",
        );
        return;
      }

      await this.obtemTransacoes();
      this.mostrarSnackbar("Transação excluída");
    },

    // Investimentos
    async obtemInvestimentos() {
      const response = await fetch("/financas/investimentos");
      this.investimentos = await response.json();
    },

    abrirModalInvestimento() {
      this.limparEdicaoInvestimento();
      this.modalInvestimento = true;
      this.$nextTick(() => {
        this.$refs.formInvestimentoRef.resetValidation();
      });
    },

    editarInvestimento(invest) {
      this.editandoInvestId = invest.id;
      this.formInvest = {
        nome: invest.nome,
        tipo: invest.tipo,
        valor_investimento: invest.valor_investimento,
        data_investimento: invest.data_investimento,
        instituicao: invest.instituicao || "",
        observacao: invest.observacao || "",
      };
      this.modalInvestimento = true;
      this.$nextTick(() => {
        this.$refs.formInvestimentoRef.resetValidation();
      });
    },

    async salvarInvestimento() {
      if (!this.$refs.formInvestimentoRef.validate()) {
        return;
      }

      const url = this.editandoInvestId
        ? "/financas/investimento/" + this.editandoInvestId
        : "/financas/investimento";

      const method = this.editandoInvestId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: this.formInvest.nome,
          tipo: this.formInvest.tipo,
          valor_investimento: this.formInvest.valor_investimento,
          data_investimento: this.formInvest.data_investimento,
          instituicao: this.formInvest.instituicao || null,
          observacao: this.formInvest.observacao || null,
        }),
      });

      if (!response.ok) {
        const erro = await response.json();
        this.mostrarSnackbar(
          erro.title || "Erro ao salvar investimento",
          "error",
        );
        return;
      }

      await this.obtemInvestimentos();
      this.mostrarSnackbar(
        this.editandoInvestId
          ? "Investimento atualizado!"
          : "Investimento criado!",
      );
      this.fecharModalInvestimento();
    },

    fecharModalInvestimento() {
      this.modalInvestimento = false;
      this.limparEdicaoInvestimento();
    },

    limparEdicaoInvestimento() {
      this.editandoInvestId = null;
      this.formInvest = {
        nome: "",
        tipo: "",
        valor_investimento: "",
        data_investimento: "",
        instituicao: "",
        observacao: "",
      };
    },

    async deletarInvestimento(id) {
      const response = await fetch("/financas/investimento/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        const erro = await response.json();
        this.mostrarSnackbar(
          erro.title || "Erro ao excluir investimento",
          "error",
        );
        return;
      }

      await this.obtemInvestimentos();
      this.mostrarSnackbar("Investimento excluído");
    },

    formatarDinheiro(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },

    mostrarSnackbar(text, color = "success") {
      this.snackbar = {
        show: true,
        text,
        color,
      };
    },

    abrirConfirmacao(tipo, id, mensagem) {
      this.modalDelete = {
        show: true,
        tipo,
        id,
        mensagem,
      };
    },

    confirmarExclusao() {
      const { tipo, id } = this.modalDelete;
      this.modalDelete.show = false;

      if (tipo === "transacao") {
        this.deletarTransacao(id);
      } else if (tipo === "investimento") {
        this.deletarInvestimento(id);
      }
    },

    labelCategoria(valor) {
      const todasCategorias = [
        ...this.categoriasReceita,
        ...this.categoriasDespesa,
      ];
      const encontrada = todasCategorias.find((c) => c.value === valor);
      return encontrada ? encontrada.label : valor;
    },

    async atualizarTudo() {
      await this.obtemTransacoes();
      await this.obtemInvestimentos();
      this.mostrarSnackbar("Dados atualizados");
    },
  },

  computed: {
    categorias() {
      return this.form.tipo === "receita"
        ? this.categoriasReceita
        : this.categoriasDespesa;
    },

    totalReceitas() {
      return this.transacoes
        .filter((t) => t.tipo === "receita")
        .reduce((soma, t) => soma + t.valor, 0);
    },

    totalDespesas() {
      return this.transacoes
        .filter((t) => t.tipo === "despesa")
        .reduce((soma, t) => soma + t.valor, 0);
    },

    saldo() {
      return this.totalReceitas - this.totalDespesas;
    },

    totalInvestido() {
      return this.investimentos.reduce(
        (soma, inv) => soma + inv.valor_investimento,
        0,
      );
    },

    dadosGrafico() {
      const totais = {};

      this.transacoes
        .filter((t) => t.tipo === "despesa")
        .forEach((t) => {
          totais[t.categoria] = (totais[t.categoria] || 0) + t.valor;
        });

      const cores = [
        "#6366f1",
        "#22c55e",
        "#f59e0b",
        "#ef4444",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
        "#14b8a6",
        "#f97316",
      ];

      return Object.entries(totais)
        .sort((a, b) => b[1] - a[1])
        .map(([categoria, valor], i) => ({
          label: this.labelCategoria(categoria),
          value: valor,
          color: cores[i % cores.length],
        }));
    },

    totalDespesasCategoria() {
      return this.dadosGrafico.reduce((soma, item) => soma + item.value, 0);
    },

    segmentos() {
      let offset = 25;
      return this.dadosGrafico.map((item) => {
        const dash = (item.value / this.totalDespesasCategoria) * 100;
        const seg = { dash, gap: 100 - dash, offset, color: item.color };
        offset -= dash;
        return seg;
      });
    },
  },

  created() {
    this.obtemTransacoes();
    this.obtemInvestimentos();
  },

  watch: {
    "form.tipo"() {
      this.form.categoria = "";
    },
  },
});
