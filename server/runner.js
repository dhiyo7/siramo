const CronJob = require('cron').CronJob
const axios = require('axios')
const { db } = require('./controllers/firebase')

// jalanin saat register data farm
function ScheduleWatering(req, res) {
  let go = req.body.start
  let farmId = req.body.farmId
  // 1 Jam : 00 59 * * * *
  let userId = req.body.uid
  
  console.log('Kondisinya=====', go)
  let watering = new CronJob({
    cronTime: '*/10 * * * * *',
    onTick: function() {
      console.log('=======================', go)
      if (userId) {
        let getFarms = db.ref(`/farms/${userId}`).on('value', snap => {
          let farms = snap.val()
          console.log('get Firebase', snap.val())
          if (farms.scheduled) {
            console.log('Farm Scheduled', farms.scheduled)
            this.start()
          } else {
            this.stop()
            process.exit()
            console.log('Stop it')
          }
        })
      }
    },
    start: false,
    timeZone: 'Asia/Jakarta'
  })
  
  if (go == 'true') {
    watering.start()
  } else {
    console.log('Matikan Schedule')
    watering.stop()
  }
  
  res.status(200).json({ message: 'Water Scheduling Start' })
}

// ScheduleWatering()

module.exports = ScheduleWatering




