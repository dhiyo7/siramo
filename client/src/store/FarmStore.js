import { observable, computed } from 'mobx'
import { db, User } from './firebase'
import { Alert } from 'react-native'


class FarmStore {
  @observable farmData = {
    historyHumidity: [],
    historyWaterRatio: [],
    historyTemperature: [],
    historyWaterLevel: [],
    historyLoading: false
  }

  @observable navigation = {}

  getHistory = (key) => {
    this.farmData.historyLoading = true
    db.ref('/history/17UFak7JqufG1RXUeVW30jwdfrQ2').on('value', (snapshot) => {

      snapshot.forEach(snap => {
        this.farmData.historyHumidity.push({
          x: snap.val().last_updated,
          y: parseFloat(snap.val().humidity)
        })
        this.farmData.historyWaterRatio.push({
          x: snap.val().last_updated,
          y: Math.round(parseFloat(snap.val().water_ratio))
        })
        this.farmData.historyTemperature.push({
          x: snap.val().last_updated,
          y: parseFloat(snap.val().temperature)
        })
        this.farmData.historyWaterLevel.push({
          x: snap.val().last_updated,
          y: parseFloat(snap.val().water_level)
        })
      })
      this.farmData.historyLoading = false
    })
  }

  setSchedule = (cronFormat, max, min) => {
    let updatedValue = {
      name: cronFormat,
      maxWaterRatio: max,
      minWaterRatio: min
    }
    console.log('Firebase Updated', updatedValue)
    db.ref(`/users`).update(updatedValue)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

}

export default new FarmStore()