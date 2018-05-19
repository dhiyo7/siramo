import React, { Component } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, TouchableHighlight } from 'react-native'
import PureChart from 'react-native-pure-chart';
import { inject, observer } from 'mobx-react'
import FarmStore from '../../store/FarmStore'
import UserStore from '../../store/UserStore'
import RecommendedCard from '../../components/customs/RecommendedCard'
import LandscapeView from 'react-native-landscape-view'

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
        <ScrollView style={styles.mainContainer}>
          <View style={styles.container}>
            <Text style={styles.head}>Humidity (%)</Text>
            <PureChart style={styles.chart} data={sensorArr} type='line'  width={'100%'}/>
            <Text style={styles.text}>
              Nilai Normal yang dianjurkan = 40-60 %</Text>
            <RecommendedCard />
            <Text style={styles.text}>Nilai Diatas 60 % = Basah</Text>
            <Text style={styles.warning}>Nilai Dibawah 40 % = Sangat Kering</Text>
          </View>
        </ScrollView>)
    } else if (this.props.waterRatioDetail !== undefined){
      return (
        <ScrollView style={styles.mainContainer}>
          <View style={styles.container}>
            <Text style={styles.head}>Water Ratio (%)</Text>
            <PureChart style={styles.chart} data={sensorArr} type='line'/>
            <Text style={styles.text}>Nilai Normal yang dianjurkan = 50-100%</Text>
            <Text style={styles.warning}>Nilai Dibawah 35% = sangat kering*</Text>
            <Text style={styles.text}>*Jika Water Ratio dibawah 35% maka watering system akan menyala </Text>
          </View>
        </ScrollView>)
    } else if (this.props.temperatureDetail !== undefined){
      return (
        <ScrollView style={styles.mainContainer}>
          <View style={styles.container}>
            <Text style={styles.head}>Temperature (°C)</Text>
            <PureChart style={styles.chart} data={sensorArr} type='line'/>
            <Text style={styles.text}>Nilai Normal yang dianjurkan = 24-30 °C*</Text>
            <Text style={styles.text}>Nilai Diatas 31°C = Sangat Panas</Text>
            <Text style={styles.warning}>Nilai Dibawah 22°C = Dingin</Text>
            <Text style={styles.text}>*Suhu tinggi akan menyalakan kipas pada sistem</Text>
          </View>
        </ScrollView>)
    } else {
      return (
      <ScrollView style={styles.mainContainer}>
          <View style={styles.container}>
            <Text style={styles.head}>Water Level (cm)</Text>
            <PureChart style={styles.chart} data={sensorArr} type='line'/>
            <Text style={styles.text}>Nilai Normal yang dianjurkan = 20-30*</Text>
            <Text style={styles.warning}>Nilai Dibawah 20 = reservoir harus sudah diisi</Text>
          </View>
        </ScrollView>)
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginRight:4,
    marginLeft:4
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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