const {db} = require('./controllers/firebase')
const cron = require('node-cron')

db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').once('value', snapshot => {
  let schedule = snapshot.val().cronSchedule
  let task = cron.schedule(schedule, function() {
    if(snapshot.val().automaticMode) {
      db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').update({
        ready_siram: 1
      })
    }   
  }, false);  

  db.ref(`/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3`).on('value', snap => {
    if( schedule !== snap.val().cronSchedule) {
      task.destroy()
      schedule = snap.val().cronSchedule
      task = cron.schedule(schedule, function() {
        if(snap.val().automaticMode){
          db.ref('/farms/Hmyc0z9azhQbKE4mcv0NNZwDfPB3').update({
            ready_siram: 1
          })
        }
      }, false);
      task.start()
    }
  })
  
  task.start();
})
