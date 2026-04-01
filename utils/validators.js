function isValidDate(value) {
  return !Number.isNaN(Date.parse(value));
}

function validateFuncionario(funcionario) {
  const camposTexto = [
    "nome",
    "sobrenome",
    "sexo",
    "dtNascimento",
    "grauEscolaridade",
    "endereco",
    "foto",
    "cargo",
  ];

  for (const campo of camposTexto) {
    if (!funcionario[campo] || typeof funcionario[campo] !== "string") {
      return `Campo '${campo}' e obrigatorio e deve ser uma string.`;
    }
  }

  if (typeof funcionario.valorPassagem !== "number") {
    return "valorPassagem deve ser um numero.";
  }

  if (typeof funcionario.optouVT !== "boolean") {
    return "optouVT deve ser booleano.";
  }

  if (typeof funcionario.salario !== "number" || !isValidDate(funcionario.dataInicio)) {
    return "salario deve ser numero e dataInicio deve ser uma data valida.";
  }

  if (funcionario.dataDemissao !== null && funcionario.dataDemissao !== undefined && !isValidDate(funcionario.dataDemissao)) {
    return "dataDemissao deve ser nula ou uma data valida.";
  }

  return null;
}

function validateProduto(produto) {
  if (
    !produto.nome ||
    !produto.categoria ||
    !produto.marca ||
    !produto.preco ||
    typeof produto.preco.valor !== "number" ||
    !produto.estoque ||
    typeof produto.estoque.quantidade !== "number"
  ) {
    return "Dados incompletos. Campos obrigatorios: nome, categoria, marca, preco.valor, estoque.quantidade.";
  }

  return null;
}

function validateAula(payload) {
  const { escola } = payload;

  if (!escola || !escola.nome || !Array.isArray(escola.disciplinas) || escola.disciplinas.length === 0) {
    return "O modelo de dados esta incorreto ou incompleto.";
  }

  return null;
}

function validateMuralAviso(payload) {
  const { turma, message, link, deadline } = payload;

  if (!turma || !message || !link || !deadline) {
    return "Os campos 'turma', 'message', 'deadline' e 'link' sao obrigatorios.";
  }

  return null;
}

function validateAuthPayload(payload) {
  if (!payload.nome || typeof payload.nome !== "string") {
    return "nome e obrigatorio.";
  }

  if (!payload.email || typeof payload.email !== "string") {
    return "email e obrigatorio.";
  }

  if (!payload.password || typeof payload.password !== "string" || payload.password.length < 6) {
    return "password e obrigatorio e deve conter pelo menos 6 caracteres.";
  }

  return null;
}

function validateLoginPayload(payload) {
  if (!payload.email || typeof payload.email !== "string") {
    return "email e obrigatorio.";
  }

  if (!payload.password || typeof payload.password !== "string") {
    return "password e obrigatorio.";
  }

  return null;
}

module.exports = {
  validateFuncionario,
  validateProduto,
  validateAula,
  validateMuralAviso,
  validateAuthPayload,
  validateLoginPayload,
};
