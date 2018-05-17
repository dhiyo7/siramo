var express = require('express');
var router = express.Router();
const Farm = require('../controllers/farm')
const images = require('../middleware/images')

/* GET users listing. */
router.post('/',images.multer.single('image'),images.sendUploadToGCS,Farm.create)

module.exports = router;
