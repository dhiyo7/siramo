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
class ButtonOnOff extends Component {
  render() {
    const {ready_siram, triggerSiram} = this.props.siram
    let txtButton = 'Start Watering'
    let buttonStyles = styles.buttonContainerStart
    if (ready_siram === 0) {
      txtButton = 'Stop Watering'
      buttonStyles = styles.buttonContainerStop
    }
    return (
      <TouchableOpacity
        style={buttonStyles}
        onPress={triggerSiram}
      >
        <Text style={styles.buttonText}>{txtButton}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainerStart: {
    backgroundColor: '#33691E',
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4
  },
  buttonContainerStop: {
    backgroundColor: '#f44242',
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

export default ButtonOnOff