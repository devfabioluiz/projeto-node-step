const express = require("express");
const router = express.Router();

const {
  listar,
  criar,
  deletar,
} = require("../controllers/produtoPgController");

router.get("/pg/produtos", listar);
router.post("/pg/produtos", criar);
router.delete("/pg/produtos/:id", deletar);

module.exports = router;
