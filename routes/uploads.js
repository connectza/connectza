const express = require('express');
const upload = require('../middleware/upload');

const router = express.Router();

// Upload an image
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' }); // Handle the case where no file was uploaded
  }

  try {
    res.status(201).json({ filePath: req.file.path }); // Return the file path
  } catch (err) {
    res.status(500).json({ msg: 'File upload failed' });
  }
});

module.exports = router; 
