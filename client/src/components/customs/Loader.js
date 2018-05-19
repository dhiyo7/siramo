import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native'
import * as Progress from 'react-native-progress'

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props

  return (
    <Modal 
      visible={loading}
      animationType={'none'}
      transparent={true}
      onRequestClose={() => {console.log('close modal')}}
    >
      <View style={styles.modalBackGround}>
        <View style={styles.ActivityIndicatorWrapper}>
          {/* <ActivityIndicator
          
            animating={loading}
          /> */}
          <Progress.CircleSnail color={['#90CAF9', '#FFAB91', '#A5D6A7']} size={100} thickness={4} spinDuration={10000}/>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  ActivityIndicatorWrapper: {
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

export default Loader