import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { inject, observer } from 'mobx-react'
import UserStore from '../../store/UserStore'

@inject('UserStore')
@observer class FarmDetail extends Component {
  render() {
    const {
      name, temperature, water_ratio, ready_siram,
      water_level, humidity, last_siram, last_updated
    } = UserStore.farmData
    const { dateFormat } = UserStore
    console.log('Kok Ilang ?', UserStore.farmData)
    // ready_siram nanti dihapus ?
    return (
      <View style={styles.container}>
        <View style={styles.DetailCard}>
          <Text>Name: {name}</Text>
          <Text>Temperature: {temperature}</Text>
          <Text>Water Ratio: {water_ratio}</Text>
          <Text>Water Level: {water_level}</Text>
          <Text>Humidity: {humidity}</Text>
          <Text>Last Watering: {dateFormat(last_siram)}</Text>
          <Text>Last updated: {dateFormat(last_updated)}</Text>
          <Text>Ready Siram: {ready_siram}</Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={UserStore.triggerSiram}
        >
          <Text style={styles.buttonText}>SIRAM</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#151e2d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  DetailCard: {
    backgroundColor: '#fff',
    padding: 4,
    marginBottom: 8
  },
  container: {
    backgroundColor: '#151e2d',
    padding: 20,
    width: '100%'
  },
  input: {
    height:40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    marginBottom: 4
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})

export default FarmDetail