const {db} = require('./controllers/firebase')
const cron = require('node-cron')
const axios = require('axios')

db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').once('value', snapshot => {
  let schedule = snapshot.val().cronSchedule
  let task = cron.schedule(schedule, async function() {
    if(snapshot.val().automaticMode) {
      try {
        await axios.post('https://expo.io/--/api/v2/push/send', {
          to: snapshot.val().token,
          title: 'Automated Watering ON!',
          body: 'Your plant has been watered now'
        }, {
          Accept: 'application/json',
          [Accept-Encoding]: 'gzip, deflate',
          [Content-Type]: ' application/json/x-www-form-urlencoded'
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
      task = cron.schedule(schedule, async function() {
        if(snap.val().automaticMode){
          db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').update({
            ready_siram: 1
          })
          try {
            await axios.post('https://expo.io/--/api/v2/push/send', {
            to: 'ExponentPushToken[vCQT7pCk00R2eSOQRxBxX_]',
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
