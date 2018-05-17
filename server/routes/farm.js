var express = require('express');
var router = express.Router();
const Farm = require('../controllers/farm')
const images = require('../middleware/images')
// const ScheduleWatering = require('../runner')
const ScheduleWatering = require('../runnerTest')

/* GET users listing. */
router.post('/',images.multer.single('image'),images.sendUploadToGCS,Farm.create)
router.post('/watering', ScheduleWatering)

module.exports = router;
