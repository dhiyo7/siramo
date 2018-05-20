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
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 4
  },
  buttonContainerStop: {
    backgroundColor: '#f44242',
    paddingVertical: 15,
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 4
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20
  }
})

export default ButtonOnOff