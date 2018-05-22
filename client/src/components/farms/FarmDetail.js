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
import FarmStore from '../../store/FarmStore'

import CircleProg from '../customs/CircleProg'
import TemperatureGauge from '../customs/TemperatureGauge'
import { Ionicons } from '@expo/vector-icons'
import FarmPic from '../farms/FarmsPic'
import FarmDate from '../farms/FarmDate'
import ButtonOnOff from '../farms/ButtonOnOff'

@observer class FarmDetail extends Component {
  render() {
    const {
      name, temperature, water_ratio, ready_siram,
      water_level, humidity, last_siram, last_updated,
    } = FarmStore.FarmDetail
    const { dateFormat, timeFormat } = UserStore

    return (
      <View style={styles.mainContainer}>
        <FarmPic />
        <View style={styles.DetailCard}>
          <View style={styles.infoView}>
            <Text style={styles.textTitle}>{name}</Text>
          </View>
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
            color='rgba(0, 167, 5, 1)' 
          />
          <CircleProg 
            sensor={(water_level/50)*100}
            textTitle={'Water Level'}
            maxValue={'%'}
            color='rgb(41, 177, 237)' 
          />
          <CircleProg 
            sensor={humidity}
            textTitle={'Humidity'}
            maxValue={'%'}
            color='rgba(242, 129, 35, 0.83)'
          />
          <View style={styles.dateContainer}>
              <FarmDate 
                date={{
                  title: 'Last Watering:',
                  dates: dateFormat(last_siram),
                  times: timeFormat(last_siram)
                }}
              />
              <FarmDate 
                date={{
                  title: 'Last Updated:',
                  dates: dateFormat(last_updated),
                  times: timeFormat(last_updated)
                }}
              />
          </View>
          {/* <Text>Ready Siram: {ready_siram}</Text> */}
        </View>
        <ButtonOnOff siram={{ready_siram, triggerSiram: FarmStore.triggerSiram}}/>
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white'
  },
  DetailCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 4
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%'
  },
  dateView: {
    width: '100%',
    height: 'auto',
    borderRadius: 10
  },
  dateText: {
    textAlign: 'center',
    fontSize: 20
  },
  infoView: {
    width: '100%',
  },
  infoText: {
    fontSize: 20 
  },
  dateContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default FarmDetail