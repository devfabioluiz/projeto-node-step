const express = require("express");
const router = express.Router();

const {
  downloadCSV,
  downloadCSVComprimido,
} = require("../controllers/streamController");

router.get("/download/csv", downloadCSV);
router.get("/download/csv-comprimido", downloadCSVComprimido);

module.exports = router;
