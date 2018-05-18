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
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Data Humidity</Text>
          <PureChart style={styles.chart} data={sensorArr} type='line'/>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  chart:{
  },
  board:{
      backgroundColor: 'pink',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 360
  },
  boardHeader:{
      justifyContent: 'center',
      alignItems: 'center',
  },
  column:{
      justifyContent: 'center',
      backgroundColor:'green',
      margin:5,
      width:170,
      height:180
  },
  button:{
      justifyContent: 'center',
      backgroundColor:'green',
      margin:5,
      width:60,
      height:40
  },
  disable:{
    justifyContent: 'center',
    backgroundColor:'brown',
    margin:5,
    width:170,
    height:180
  },
  text:{
      textAlign: 'center'
  }
})


export default Graph