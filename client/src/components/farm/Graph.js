import React, { Component } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TouchableHighlight } from 'react-native'
import PureChart from 'react-native-pure-chart';
import { inject, observer } from 'mobx-react'
import FarmStore from '../../store/FarmStore'
import UserStore from '../../store/UserStore'

@inject('FarmStore')
@observer class Graph extends Component {

  render() {
    let sensorArr = []
    this.props.sensorData.forEach(element => {
      sensorArr.push({
        x: UserStore.dateFormat(element.x),
        y: element.y
      })
    })
    if (this.props.humidityDetail !== undefined) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.head}>Data Humidity (%)</Text>
            <PureChart style={styles.chart} data={sensorArr} type='line'/>
            <Text style={styles.text}>Nilai Normal yang dianjurkan = 40-60 %</Text>
            <Text style={styles.text}>Nilai Diatas 60 % = Basah</Text>
            <Text style={styles.warning}>Nilai Dibawah 40 % = Sangat Kering</Text>
          </View>
        </ScrollView>)
    } else if (this.props.waterRatioDetail !== undefined){
      return (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.head}>Data Water Ratio (%)</Text>
            <PureChart style={styles.chart} data={sensorArr} type='line'/>
            <Text style={styles.text}>Nilai Normal yang dianjurkan = 50-100%</Text>
            <Text style={styles.warning}>Nilai Dibawah 35% = sangat kering*</Text>
            <Text style={styles.text}>*Jika Water Ratio dibawah 35% maka watering system akan menyala </Text>
          </View>
        </ScrollView>)
    } else if (this.props.temperatureDetail !== undefined){
      return (
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.head}>Data Temperature (°C)</Text>
            <PureChart style={styles.chart} data={sensorArr} type='line'/>
            <Text style={styles.text}>Nilai Normal yang dianjurkan = 24-30 °C*</Text>
            <Text style={styles.text}>Nilai Diatas 31°C = Sangat Panas</Text>
            <Text style={styles.warning}>Nilai Dibawah 22°C = Dingin</Text>
            <Text style={styles.text}>*Suhu tinggi akan menyalakan kipas pada sistem</Text>
          </View>
        </ScrollView>)
    } else {
      return (
      <ScrollView>
          <View style={styles.container}>
            <Text style={styles.head}>Data Water Ratio (cm)</Text>
            <PureChart style={styles.chart} data={sensorArr} type='line'/>
            <Text style={styles.text}>Nilai Normal yang dianjurkan = 20-30*</Text>
            <Text style={styles.warning}>Nilai Dibawah 20 = reservoir harus sudah diisi</Text>
          </View>
        </ScrollView>)
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:10,
    marginLeft:10
  },
  head:{
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  warning:{
    color:'red',
    textAlign: 'center'
  },
  text:{
    textAlign: 'center'
  }
})


export default Graph