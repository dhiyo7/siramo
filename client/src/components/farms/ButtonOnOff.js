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
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        //onPress={UserStore.triggerSiram}
      >
        <Text style={styles.buttonText}>ON / OFF SIRAM</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    marginBottom: 4
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})

export default ButtonOnOff