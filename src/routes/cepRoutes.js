const express = require("express");
const router = express.Router();

const { buscarCEP } = require("../controllers/cepController");

router.get("/cep/:cep", buscarCEP);

module.exports = router;
