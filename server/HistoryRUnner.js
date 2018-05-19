const CronJob = require('cron').CronJob
const { db } = require('./controllers/firebase')
const firebase = require('firebase')
console.log('====================')

let History = new CronJob({
  cronTime: '* */15 * * * *',
  onTick: function() {
    db.ref(`/farms/17UFak7JqufG1RXUeVW30jwdfrQ2`).on('value', snap => {
      let farms = snap.val()
      console.log('get Firebase', snap.val())
      let historyData = {
        last_updated: firebase.database.ServerValue.TIMESTAMP,
        humidity: farms.humidity,
        temperature: farms.temperature,
        water_level: farms.water_level,
        water_ratio: farms.water_ratio,
        last_siram: farms.last_siram
      }
      db.ref('/history/17UFak7JqufG1RXUeVW30jwdfrQ2').push(historyData)
        .then(response => {
          console.log('Update Response', response)
        })
        .catch(err => console.log(err))
    })
  },
  start: false,
  timeZone: 'Asia/Jakarta'
})

History.start()





