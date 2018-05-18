import { observable, computed } from 'mobx'
import { db, User } from './firebase'
import { Alert } from 'react-native'

class FarmStore {
  @observable farmData = {
    history: []
  }

  getHistory = (key) => {
    db.ref('history/' + '17UFak7JqufG1RXUeVW30jwdfrQ2').on('value', (snapshot) => {
      let historyList = []
      let hist = snapshot.val()
      for(let key in hist){
        if(hist.hasOwnProperty(key)) {
          historyList.push({key, ...hist[key]})
        }
      }
      this.farmData.history = historyList
    })
  }

  // Logout Belum
}

export default FarmStore