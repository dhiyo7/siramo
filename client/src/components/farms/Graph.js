import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableHighlight, Image, ActivityIndicator } from 'react-native'
import PureChart from 'react-native-pure-chart';
import { inject, observer } from 'mobx-react'
import FarmStore from '../../store/FarmStore'
import UserStore from '../../store/UserStore'
import RecommendedCard from '../../components/customs/RecommendedCard'
import LandscapeView from 'react-native-landscape-view'
import { Card, ListItem, Button, Divider } from 'react-native-elements'

@observer class Graph extends Component {

  render() {
    let sensorArr = []
    let historyLoading = FarmStore.farmData.historyLoading
    let sensorData = this.props.sensorData
    console.log(historyLoading)
    console.log(sensorData.length)
    console.log(sensorData)
    this.props.sensorData.forEach(element => {
      sensorArr.push({
        x: UserStore.dateFormat(element.x),
        y: element.y
      })
    })
    console.log(sensorArr)
    if (this.props.humidityDetail !== undefined) {
      return (
        <ScrollView style={styles.mainContainer}>
          <View style={styles.container}>
            <Card
              title='HUMIDITY (%)'
              containerStyle={{width: '100%'}}
              image={require('../../assets/logo/humidity-hysitron-inc.jpeg')}>
              <RecommendedCard recommended="Recommended Value = 40-60 %" warning="Nilai Diatas 60 % = Basah" danger="Nilai Dibawah 40 % = Sangat Kering"/>
              <Text style={{marginBottom: 10}}>
                Humidity is the amount of water vapor present in the air. Water vapor is the gaseous state of water and is invisible to the human eye. Humidity indicates the likelihood of precipitation, dew, or fog.
              </Text>
              <Text style={styles.head}>History</Text>
              {(!historyLoading) ? <PureChart style={styles.chart} data={sensorArr} type='line' width={'100%'}/>:<ActivityIndicator size="large" color="#33a815"/>}
              <Button
                backgroundColor='#4CAF50'
                buttonStyle={{borderRadius: 0, marginTop: 8, marginRight: 0, marginBottom: 8}}
                onPress={() => this.props.navigation.navigate('DetailParameter', {
                  url: 'https://en.wikipedia.org/wiki/Humidity'
                })}
                title='VIEW MORE' />
            </Card>
          </View>
        </ScrollView>
      )
    } else if (this.props.waterRatioDetail !== undefined){
      return (
        <ScrollView style={styles.mainContainer}>
          <View style={styles.container}>
            <Card
              title='WATER RATIO (%)'
              containerStyle={{width: '100%'}}
              image={require('../../assets/logo/images.jpeg')}>
              <RecommendedCard recommended="Recommended Value = 50% -80%" warning="Nilai Diatas 80 % = Sangat Basah" danger="Nilai Dibawah 35% = Sangat Kering"/>
              <Text style={{marginBottom: 10}}>
                Moisture is the presence of a liquid, especially water, often in trace amounts. Small amounts of water may be found, for example, in the air (humidity), in foods, and in various commercial products. 
              </Text>
              <Text style={styles.head}>History</Text>
              {(!historyLoading) ? <PureChart style={styles.chart} data={sensorArr} type='line' width={'100%'}/>:<ActivityIndicator size="large" color="#33a815"/>}
              <Button
                backgroundColor='#4CAF50'
                buttonStyle={{borderRadius: 0, marginTop: 8, marginRight: 0, marginBottom: 8}}
                onPress={() => this.props.navigation.navigate('DetailParameter', {
                  url: 'https://en.wikipedia.org/wiki/Moisture'
                })}
                title='VIEW MORE' />
            </Card>
          </View>
        </ScrollView>
      )
    } else if (this.props.temperatureDetail !== undefined){
      return (
        <ScrollView style={styles.mainContainer}>
          <View style={styles.container}>
            <Card
              title='TEMPERATURE (°C)'
              containerStyle={{width: '100%'}}
              image={require('../../assets/logo/5a35e2dfc1d9dc42f97f20b1de231e96.jpg')}>
              <RecommendedCard recommended="Recommended Value = 24-30 °C" warning="Nilai Diatas 31°C = Panas" danger="Nilai Dibawah 22°C = Dingin"/>
              <Text style={{marginBottom: 10}}>
                Temperature, measure of hotness or coldness expressed in terms of any of several arbitrary scales and indicating the direction in which heat energy will spontaneously flow—i.e., from a hotter body (one at a higher temperature) to a colder body (one at a lower temperature).  
              </Text>
              <Text style={styles.head}>History</Text>
              {(!historyLoading) ? <PureChart style={styles.chart} data={sensorArr} type='line' width={'100%'}/>:<ActivityIndicator size="large" color="#33a815"/>}
              <Button
                backgroundColor='#4CAF50'
                buttonStyle={{borderRadius: 0, marginTop: 8, marginRight: 0, marginBottom: 8}}
                onPress={() => this.props.navigation.navigate('DetailParameter', {
                  url: 'https://en.wikipedia.org/wiki/Temperature'
                })}
                title='VIEW MORE' />
            </Card>
          </View>
        </ScrollView>
      )
    } else {
      return (
      <ScrollView style={styles.mainContainer}>
          <View style={styles.container}>
            <Card
              title='WATER LEVEL (Cm)'
              containerStyle={{width: '100%'}}
              image={require('../../assets/logo/2010_7-8_36-home.jpg')}>
              <RecommendedCard recommended="Recommended Value = 20-30 cm" warning="Nilai Dibawah 20 cm reservoir harus sudah diisi" danger="Nilai dibawah 10 cm tidak dapat menyiram"/>
              <Text style={{marginBottom: 10}}>
                A water level is a device used for matching elevations of locations that are too far apart for a spirit level to span. The simplest water level is a section of clear tubing, partially filled with water.
              </Text>
              <Text style={styles.head}>History</Text>
              {(!historyLoading) ? <PureChart style={styles.chart} data={sensorArr} type='line' width={'100%'}/>:<ActivityIndicator size="large" color="#33a815"/>}
              <Button
                backgroundColor='#4CAF50'
                buttonStyle={{borderRadius: 0, marginTop: 8, marginRight: 0, marginBottom: 8}}
                onPress={() => this.props.navigation.navigate('DetailParameter', {
                  url: 'https://en.wikipedia.org/wiki/Water_level_(device)'
                })}
                title='VIEW MORE' />
            </Card>
          </View>
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white'
  },
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  head:{
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed'
  }
})


export default Graph