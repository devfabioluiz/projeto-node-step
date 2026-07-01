const express = require("express");
const router = express.Router();

const { executarCalculo } = require("../controllers/calculoController");

router.post("/calculo", executarCalculo);

module.exports = router;
