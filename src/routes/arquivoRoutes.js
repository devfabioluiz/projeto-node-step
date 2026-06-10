const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const {
  uploadArquivo,
  listarArquivos,
  exportarModelo,
  exportarProdutos,
  importarProdutos,
} = require("../controllers/arquivoController");
router.post("/upload", upload.single("arquivo"), uploadArquivo);
router.get("/arquivos", listarArquivos);
router.get("/modelo-produtos", exportarModelo);
router.get("/exportar-produtos", exportarProdutos);
router.post("/importar-produtos", upload.single("arquivo"), importarProdutos);
module.exports = router;
