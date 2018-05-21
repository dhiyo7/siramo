const CronJob = require('cron').CronJob
const { db } = require('./controllers/firebase')
const firebase = require('firebase')

let History = new CronJob({
  cronTime: '* */15 * * * *',
  onTick: function() {
    db.ref(`/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3`).on('value', snap => {
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
      db.ref('/history/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').push(historyData)
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





