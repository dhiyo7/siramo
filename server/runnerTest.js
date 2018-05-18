const CronJob = require('cron').CronJob
const cron = require('node-cron')
const axios = require('axios')
const { db } = require('./controllers/firebase')

// jalanin saat register data farm
function ScheduleWatering(req, res) {
  let go = req.body.start
  let farmId = req.body.farmId
  // 1 Jam : 00 59 * * * *
  let userId = req.body.uid

  let watering = cron.schedule('*/10 * * * * *', function() {
    console.log(JSON.stringify(this.execution))
    db.ref(`/farms/${userId}`).on('value', snap => {
      let farms = snap.val()
      
      console.log('get Firebase', farms)
      // if (farms.scheduled) {
      //   console.log('Farm Scheduled', farms.scheduled)
      //   this.start()
      // } else {
      //   this.stop()
      //   console.log('Stop it')
      // }
    })
  })
  
  if (go == 'true') {
    watering.start()
  } else {
    console.log('Matikan Schedule')
    watering.destroy()
  }
  
  res.status(200).json({ message: 'Water Scheduling Start' })
}

// ScheduleWatering()

module.exports = ScheduleWatering




