const express = require("express");
const router = express.Router();

const { buscarClima } = require("../controllers/climaController");

router.get("/clima/:cidade", buscarClima);

module.exports = router;
