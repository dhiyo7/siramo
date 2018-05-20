import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, 
  TextInput, StyleSheet, Picker
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { inject, observer } from 'mobx-react'
import FarmStore from '../../store/FarmStore'

@inject('FarmStore')
@observer class FarmSchedule extends Component {
  constructor() {
    super()
    this.state = {
      minutes: [
        '00','01','02','03','04','05','06','07','08', '09',
        '10','11','12','13','14','15','16','17','18', '19',
        '20','21','22','23','24','25','26','27','28', '29',
        '30','31','32','33','34','35','36','37','38', '39',
        '40','41','42','43','44','45','46','47','48', '49',
        '50','51','52','53','54','55','56','57','58', '59'
      ],
      hours: [
        '00','01','02','03','04','05','06','07','08', '09',
        '10','11','12','13','14','15','16','17','18', '19',
        '20','21','22','23'
      ],
      waterRatio: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 33, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 99, 98, 99, 100
      ],
      hoursPick: '00',
      minutesPick: '00',
      maxWaterRatio: 85,
      minWaterRatio: 30
    }
  }

  startSchedule = () => {
    let cronFormat = "* 59 */23 * * *" // setiap jam 00:00 tengah malam
    let { 
      hoursPick, minutesPick, maxWaterRatio, minWaterRatio
    } = this.state
    if (hoursPick === '00' && minutesPick !== '00') {
      cronFormat = `* */${parseInt(minutesPick)} * * * *`
    } else if (hoursPick !== '00') {
      cronFormat = `* ${parseInt(minutesPick)} */${parseInt(hoursPick)} * * *`
    }
    console.log('Jam', this.state.hoursPick)
    console.log('Menit', this.state.minutesPick)
    console.log('Max', this.state.maxWaterRatio)
    console.log('min', this.state.minWaterRatio)

    FarmStore.setSchedule(cronFormat, maxWaterRatio, minWaterRatio)
  }
  
  render() {
    const { 
      hours, minutes, hoursPick, minutesPick,
      maxWaterRatio, minWaterRatio, waterRatio
    } = this.state
    const hoursFormat = hours.map((hour, index) => (
      <Picker.Item label={hour} value={hour} key={index}/>
    ))
    const minutesFormat = minutes.map((minute, index) => (
      <Picker.Item label={minute} value={minute} key={index}/>
    ))
    const wtrRatio = waterRatio.map((wr, index) => (
      <Picker.Item label={`${wr}`} value={wr} key={index}/>
    )) 

    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.txtTitle}>Watering Schedule</Text>
          <View style={styles.inputBox}>
            <Text><Ionicons name='md-clock' size={20} />  Hours</Text>
            <Picker
              style={styles.timeInput}
              selectedValue={hoursPick}
              onValueChange={(itemValue, itemIndex) => this.setState({hoursPick: itemValue})}
            >
              {hoursFormat}
            </Picker>
            <Text>Minutes</Text>
            <Picker
              style={styles.timeInput}
              selectedValue={minutesPick}
              onValueChange={(itemValue, itemIndex) => this.setState({minutesPick: itemValue})}
            >
              {minutesFormat}
            </Picker>
          </View>

          <View style={styles.inputBox}>
            <Text><Ionicons name='md-rainy' size={20} /> Maximum Water Ratio</Text>
            <Picker
              style={styles.timeInput}
              selectedValue={maxWaterRatio}
              onValueChange={(value, index) => this.setState({maxWaterRatio: value})}
            >
              {wtrRatio}
            </Picker>
          </View>

          <View style={styles.inputBox}>
            <Text><Ionicons name='md-cloud-outline' size={20} /> Minimum Water Ratio</Text>
            <Picker
              style={styles.timeInput}
              selectedValue={minWaterRatio}
              onValueChange={(value, index) => this.setState({minWaterRatio: value})}
            >
              {wtrRatio}
            </Picker>
          </View>

          <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.startSchedule}
            >
              <Text style={styles.buttonText}>Start Scheduling</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F1F8E9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12
  },
  container: {
    backgroundColor: '#F1F8E9',
    width: '100%',
    height: '100%',
    marginRight: 8,
    marginLeft: 8,
    alignItems: 'center',
    paddingTop: 50,
  },
  txtTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 4,
    width: 400,
  },
  iconBox: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeInput: {
    height: 40,
    width: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    padding: 6,
    marginRight: 4,
    marginLeft: 4,
    marginTop: 2,
    marginBottom: 2,
    color: '#8D6E63',
    borderRadius: 4,
  },
  buttonContainer: {
    backgroundColor: '#33691E',
    paddingVertical: 15,
    marginBottom: 8,
    borderRadius: 4,
    width: 320,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})

export default FarmSchedule