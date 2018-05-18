import { observable, computed } from 'mobx'
import { db, User } from './firebase'
import { Alert } from 'react-native'


class FarmStore {
  @observable farmData = {
    historyHumidity: [],
    historyWaterRatio: [],
    historyTemperature: [],
    historyWaterLevel: []
  }

  getHistory = (key) => {
    db.ref('/history/17UFak7JqufG1RXUeVW30jwdfrQ2').on('value', (snapshot) => {

      snapshot.forEach(snap => {
        this.farmData.historyHumidity.push({
          x: snap.val().last_updated,
          y: parseFloat(snap.val().humidity)})
        this.farmData.historyWaterRatio.push({
          x: snap.val().last_updated,
          y: parseFloat(snap.val().water_ratio)})
        this.farmData.historyTemperature.push({
          x: snap.val().last_updated,
          y: parseFloat(snap.val().temperature)})
        this.farmData.historyWaterLevel.push({
          x: snap.val().last_updated,
          y: parseFloat(snap.val().water_level)})
      })
      // console.log(this.farmData.historyHumidity)
    })
  }

  // Logout Belum
}

export default new FarmStore()