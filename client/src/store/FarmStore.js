import { observable, computed } from 'mobx'
import { db, User } from './firebase'
import { Alert } from 'react-native'
import firebase from 'firebase'
import UserStore from './UserStore'
import userStore from './UserStore'
import FarmDetail from '../components/farms/FarmDetail'

class FarmStore {
  @observable farmData = {
    historyHumidity: [],
    historyWaterRatio: [],
    historyTemperature: [],
    historyWaterLevel: [],
    historyLoading: false
  }

  @observable schedule = {
    hours: '00',
    minutes: '00'
  }

  @observable FarmDetail = {
    name: '',
    temperature: 0,
    water_ratio: 0,
    water_level: 0,
    humidity: 0,
    last_siram: 0,
    last_updated: 0,
    cronSchedule: '',
    minWaterRatio: 0,
    maxWaterRatio: 0,
    ready_siram: 1,
    loading: false
  }

  @observable navigation = {}

  clearAll = () => {
    return new Promise((resolve, reject) => {
      this.farmData.historyHumidity= []
      this.farmData.historyWaterRatio= []
      this.farmData.historyTemperature= []
      this.farmData.historyWaterLevel= []
      this.farmData.historyLoading= false
  
      this.FarmDetail.name= ''
      this.FarmDetail.temperature= 0
      this.FarmDetail.water_ratio= 0
      this.FarmDetail.water_level= 0
      this.FarmDetail.humidity= 0
      this.FarmDetail.last_siram= 0
      this.FarmDetail.last_updated= 0
      this.FarmDetail.cronSchedule= ''
      this.FarmDetail.minWaterRatio= 0
      this.FarmDetail.maxWaterRatio= 0
      this.FarmDetail.ready_siram= 2
      this.FarmDetail.loading= false
      resolve()
      reject()
    })
  }

  getFarmData = () => {
    return new Promise((resolve, reject) => {
      let userId = userStore.userData.uid
      this.FarmDetail.loading = true
      db.ref(`/farms/${userId}`).on('value', snap => {
        try {
          let farmDB = snap.val()
          this.FarmDetail.name = farmDB.name
          this.FarmDetail.temperature = farmDB.temperature
          this.FarmDetail.water_ratio = farmDB.water_ratio
          this.FarmDetail.water_level = farmDB.water_level
          this.FarmDetail.humidity = farmDB.humidity
          this.FarmDetail.cronSchedule = farmDB.cronSchedule
          this.FarmDetail.minWaterRatio = farmDB.minWaterRatio
          this.FarmDetail.maxWaterRatio = farmDB.maxWaterRatio
          this.FarmDetail.last_siram = farmDB.last_siram
          this.FarmDetail.last_updated = farmDB.last_updated
          this.FarmDetail.ready_siram = farmDB.ready_siram
          this.FarmDetail.loading = false
          resolve()
        } catch (error) {
          console.log(error)
          reject(error)
        }
      })
    })
  }

  getHistory = (key) => {
    return new Promise((resolve, reject) => {
      this.farmData.historyLoading = true
      db.ref('/history/' + key).on('value', (snapshot) => {
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
        resolve()
        reject()
      })
    })
  }

  setSchedule = (cronFormat, max, min) => {
    return new Promise((resolve, reject) =>{
      let uid = userStore.userData.uid
      let updatedValue = {
        cronSchedule: cronFormat,
        maxWaterRatio: max,
        minWaterRatio: min
      }
      db.ref(`/farms/${uid}`).update(updatedValue)
      db.ref(`/farms/${uid}`).once('value', snapshot => {
        console.log('FarmStore ======', updatedValue)
        this.FarmDetail.minWaterRatio = snapshot.val().minWaterRatio
        this.FarmDetail.maxWaterRatio = snapshot.val().maxWaterRatio
        this.FarmDetail.cronSchedule = snapshot.val().cronSchedule
        resolve()
        reject()
      })
    })
  }

  triggerSiram = () => {
    return new Promise(async(resolve, reject) => {
      let userId = userStore.userData.uid
      let ready_siram = this.FarmDetail.ready_siram
      let water_ratio = this.FarmDetail.water_ratio
      if (ready_siram === 0) {
        ready_siram = 1
      } else {
        ready_siram = 0
      }
  
      let farmUpdate = {
        ready_siram: ready_siram,
        last_siram: firebase.database.ServerValue.TIMESTAMP,
        last_updated: firebase.database.ServerValue.TIMESTAMP
      }
  
      if (water_ratio > 70 && ready_siram === 0) {
        Alert.alert(
          '',
          'Your plant is still have enough water',
          [
            {text: 'Watering anyway', onPress: async () => {
              await this.updateSiram(userId, farmUpdate)
              resolve()
            }}
          ]
        )
        resolve()
      } else {
        await this.updateSiram(userId, farmUpdate)
        resolve()
      }
    })
  }

  updateSiram = (userId, farmUpdate) => {
    return new Promise((resolve, reject) => {
      db.ref(`/farms/${userId}`).update(farmUpdate)
      db.ref(`/farms/${userId}`).once('value', (snapshot) => {
        this.FarmDetail.ready_siram = snapshot.val().ready_siram
        resolve()
        reject()
      })
    })
  }

  changeMode = (cond) => {
    let userId = userStore.userData.uid

    db.ref(`/farms/${userId}`).update({
      automaticMode: cond
    })
  }

}

export default new FarmStore()