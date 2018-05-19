import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { inject, observer } from 'mobx-react'
import UserStore from '../../store/UserStore'
import CircleProg from '../customs/CircleProg'
import TemperatureGauge from '../customs/TemperatureGauge'

@inject('UserStore')
@observer class FarmDetail extends Component {
  static navigationOptions ={
    header: null
  }

  render() {
    const {
      name, temperature, water_ratio, ready_siram,
      water_level, humidity, last_siram, last_updated
    } = UserStore.farmData
    const { dateFormat } = UserStore
    // console.log('Kok Ilang ?', UserStore.farmData)
    // ready_siram nanti dihapus ?
    return (
      <View style={styles.container}>
        <Text>Name: {name}</Text>
        <View style={styles.DetailCard}>
          <TemperatureGauge
            sensor={temperature}
            textTitle={'Temperature'}
            maxValue={'°C'}
            color='rgba(241, 6, 102, 0.83)'
          />
          <CircleProg 
            sensor={water_ratio}
            textTitle={'Water Ratio'}
            maxValue={'%'}
            color='rgb(41, 177, 237)' 
          />
          <CircleProg 
            sensor={water_level}
            textTitle={'Water Level'}
            maxValue={'%'}
            color='rgb(41, 177, 237)' 
          />
          <CircleProg 
            sensor={humidity}
            textTitle={'Humidity'}
            maxValue={'%'}
            color='rgba(241, 6, 102, 0.83)'
          />
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
  DetailCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 4
  },
  container: {
    backgroundColor: '#F1F8E9',
    padding: 20,
    width: '100%',
    height: '100%'
  },
  input: {
    height:40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  buttonContainer: {
    backgroundColor: '#33691E',
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})

export default FarmDetail