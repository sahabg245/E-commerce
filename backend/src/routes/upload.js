const path = require('path');
const express = require('express');
const multer = require('multer');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only (jpg, jpeg, png)'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});


router.post('/', protect, admin, upload.single('image'), (req, res) => {
  res.json({
    image: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
  });
});

module.exports = router;
