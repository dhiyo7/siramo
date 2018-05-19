import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import { inject, observer } from 'mobx-react'
import UserStore from '../../store/UserStore'
import CircleProg from '../customs/CircleProg'
import TemperatureGauge from '../customs/TemperatureGauge'

@inject('UserStore')
@observer class FarmDetail extends Component {
  render() {
    const {
      name, temperature, water_ratio, ready_siram,
      water_level, humidity, last_siram, last_updated
    } = UserStore.farmData
    const { dateFormat } = UserStore
    // console.log('Kok Ilang ?', UserStore.farmData)
    // ready_siram nanti dihapus ?
    return (
      <View>
        <Text style={styles.textTitle}>Name: {name}</Text>
        <View style={styles.DetailCard}>
          <Text>Plants Info :</Text>
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
          <View style={styles.dateView}>
            <Text style={styles.dateText}>Last Watering: {dateFormat(last_siram)}</Text>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.dateText}>Last updated: {dateFormat(last_updated)}</Text>
          </View>
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
    backgroundColor: '#F1F8E9',
    padding: 4
  },
  container: {
    padding: 20,
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
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%'
  },
  dateView: {
    width: '100%',
    height: 20,
    borderRadius: 10
  },
  dateText: {
    textAlign: 'center'
  }
})

export default FarmDetail