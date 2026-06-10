const multer = require('multer');

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  filename: (req, file, cb) => {

    const nomeArquivo =
      Date.now() +
      '-' +
      file.originalname;

    cb(null, nomeArquivo);
  }
});

module.exports = multer({
  storage
});
