import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

class ButtonOnOff extends Component {
  render() {
    const {ready_siram, triggerSiram} = this.props.siram
    let txtButton = 'Stop Watering'
    let buttonStyles = styles.buttonContainerStop
    if (ready_siram === 0) {
      txtButton = 'Start Watering'
      buttonStyles = styles.buttonContainerStart
    }
    return (
      <TouchableOpacity
        style={buttonStyles}
        onPress={triggerSiram}
      >
        <Text style={styles.buttonText}>
          <Ionicons name='md-water' size={20}/> {txtButton}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainerStart: {
    backgroundColor: '#31ce12',
    paddingVertical: 15,
    marginTop: 32,
    width: '100%',

  },
  buttonContainerStop: {
    backgroundColor: '#f44242',
    paddingVertical: 15,
    marginTop: 32,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20
  }
})

export default ButtonOnOff