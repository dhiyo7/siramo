import React, { Component } from 'react'
import { View, Text } from 'react-native'
import * as Progress from 'react-native-progress'

class CircleProg extends Component {
  ProgText = (value, maxValue, textTitle) => {
    return `${textTitle}\n${Math.round(value * 100)}${maxValue}`
  }

  ProgConvert = (value) => {
    return value / 100
  }

  render() {
    const sensorValue = this.props.sensor
    const maxValue = this.props.maxValue
    const convertValue = this.ProgConvert(sensorValue)
    const colorValue = this.props.color
    const textTitle = this.props.textTitle
    return (
      <View style={{margin:12}}>
        <Progress.Circle 
          progress={convertValue} 
          size={120}
          showsText={true}
          formatText={() => this.ProgText(convertValue, maxValue, textTitle)}
          thickness={10}
          color={colorValue}
          spinDuration={3000}
          textStyle={{fontSize: 16, textAlign: 'center'}}
        />
      </View>
    )
  }
}

export default CircleProg