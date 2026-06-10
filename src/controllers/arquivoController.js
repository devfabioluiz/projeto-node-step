const fs = require("fs");

const ExcelJS = require("exceljs");

const Produto = require("../models/Produto");

const listarArquivos = (req, res) => {
  const arquivos = fs.readdirSync("uploads");

  res.json(arquivos);
};

const uploadArquivo = (req, res) => {
  res.json({
    mensagem: "Upload realizado",
    arquivo: req.file.filename,
  });
};

const exportarModelo = async (req, res) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Modelo");

  worksheet.columns = [
    { header: "nome", key: "nome" },
    { header: "preco", key: "preco" },
    { header: "estoque", key: "estoque" },
  ];

  worksheet.addRow({
    nome: "Mouse",
    preco: 120,
    estoque: 50,
  });

  const caminho = "uploads/modelo-produtos.xlsx";

  await workbook.xlsx.writeFile(caminho);

  res.download(caminho);
};

const exportarProdutos = async (req, res) => {
  const produtos = await Produto.find();

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Produtos");

  worksheet.columns = [
    { header: "nome", key: "nome" },
    { header: "preco", key: "preco" },
    { header: "estoque", key: "estoque" },
  ];

  const dados = produtos.map((produto) => ({
    nome: produto.nome,
    preco: produto.preco,
    estoque: produto.estoque,
  }));

  worksheet.addRows(dados);

  const caminho = "uploads/produtos.xlsx";

  await workbook.xlsx.writeFile(caminho);

  res.download(caminho);
};

const importarProdutos = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      erro: "Nenhum arquivo enviado. Use o campo 'arquivo' com uma planilha .xlsx.",
    });
  }

  try {
    const workbook = new ExcelJS.Workbook();

    await workbook.xlsx.readFile(req.file.path);

    const worksheet = workbook.worksheets[0];

    const produtos = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        produtos.push({
          nome: row.getCell(1).value,
          preco: Number(row.getCell(2).value),
          estoque: Number(row.getCell(3).value),
        });
      }
    });

    await Produto.insertMany(produtos);

    res.json({
      mensagem: "Produtos importados",
      total: produtos.length,
    });
  } catch (erro) {
    res.status(400).json({
      erro: "Erro ao importar planilha. Verifique o formato: nome (texto), preco (número), estoque (número).",
    });
  }
};

module.exports = {
  listarArquivos,
  uploadArquivo,
  exportarModelo,
  exportarProdutos,
  importarProdutos,
};
