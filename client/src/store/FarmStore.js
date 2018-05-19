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

}

export default new FarmStore()