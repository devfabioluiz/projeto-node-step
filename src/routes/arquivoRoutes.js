const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const autenticar = require("../middlewares/autenticar");

const {
  uploadArquivo,
  listarArquivos,
  exportarModelo,
  exportarProdutos,
  importarProdutos,
} = require("../controllers/arquivoController");

router.post("/upload", autenticar, upload.single("arquivo"), uploadArquivo);

router.get("/arquivos", autenticar, listarArquivos);
router.get("/modelo-produtos", exportarModelo);
router.get("/exportar-produtos", exportarProdutos);
router.post(
  "/importar-produtos",
  autenticar,
  upload.single("arquivo"),
  importarProdutos,
);

module.exports = router;
