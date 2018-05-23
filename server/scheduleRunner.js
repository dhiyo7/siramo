// let cronFormat = "3 59 00 * * *"
// let findHours = cronFormat.split(' ')[2].match(/[0-9]/g).join('')
// console.log(findHours)
// let minusTimezone = findHours - 7
// console.log('nilai kurang', minusTimezone)
// let handleMinusVal = (minusTimezone < 0)? (24+minusTimezone):minusTimezone
// console.log(handleMinusVal)
// let hoursFormat = (handleMinusVal < 10)? `0${handleMinusVal}`:`${handleMinusVal}` 
// console.log(hoursFormat)

const {db} = require('./controllers/firebase')
const cron = require('node-cron')
const axios = require('axios')

db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').once('value', snapshot => {
  let schedule = snapshot.val().cronSchedule
  // Add code
  let findHours = schedule.split(' ')[2].match(/[0-9]/g).join('')
  let minutes = schedule.split(' ')[1]
  let minutesFix = (minutes < 10)? `0${minutes}`:`${minutes}`
  console.log('Once ==============')
  console.log('cron Schedule before', schedule)
  console.log(findHours)
  let minusTimezone = findHours - 7
  console.log('nilai kurang', minusTimezone)
  let handleMinusVal = (minusTimezone < 0)? (24+minusTimezone):minusTimezone
  console.log(handleMinusVal)
  let hoursFormat = (handleMinusVal < 10)? `0${handleMinusVal}`:`${handleMinusVal}` 
  console.log(hoursFormat)
  if (!hoursFormat) {
    hoursFormat = '*'
  }

  let cronFormat = `3 ${minutesFix} */${parseInt(hoursFormat)} * * *`
  console.log(cronFormat)
  let task = cron.schedule(cronFormat, async function() {
    if(snapshot.val().automaticMode) {
      try {
        await axios.post('https://expo.io/--/api/v2/push/send', {
          to: snapshot.val().token,
          title: 'Automated Watering ON!',
          body: 'Your plant has been watered now'
        }, {
          Accept: 'application/json',
          ['Accept-Encoding']: 'gzip, deflate',
          ['Content-Type']: ' application/json/x-www-form-urlencoded'
        })
      } catch (error) {
        console.log(error)
      }
      
      db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').update({
        ready_siram: 1
      })
    }   
  }, false);  

  db.ref(`/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3`).on('value', snap => {
    if( schedule !== snap.val().cronSchedule) {
      task.destroy()
      schedule = snap.val().cronSchedule
      let findHours = schedule.split(' ')[2].match(/[0-9]/g).join('')
      console.log('db.ref.on ==============')
      console.log(findHours)
      let minusTimezone = findHours - 7
      console.log('nilai kurang', minusTimezone)
      let handleMinusVal = (minusTimezone < 0)? (24+minusTimezone):minusTimezone
      console.log(handleMinusVal)
      let hoursFormat = (handleMinusVal < 10)? `0${handleMinusVal}`:`${handleMinusVal}` 
      console.log(hoursFormat)

      if (!hoursFormat) {
        hoursFormat = '*'
      }
    
      let cronFormat = `3 ${minutes} */${parseInt(hoursFormat)} * * *`
      console.log(cronFormat)
      task = cron.schedule(cronFormat, async function() {
        if(snap.val().automaticMode){
          db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').update({
            ready_siram: 1
          })
          console.log(snapshot.val().token)
          try {
            await axios.post('https://expo.io/--/api/v2/push/send', {
            to: snapshot.val().token,
            title: 'Automated Watering ON!',
            body: 'Your plant has been watered now'
          }, {
            Accept: 'application/json',
            ['Accept-Encoding']: 'gzip, deflate',
            ['Content-Type']: ' application/json/x-www-form-urlencoded'
          })
          } catch (error) {
            console.log(error)
          }    
        }
      }, false);
      task.start()
    }
  })
  
  task.start();
})
