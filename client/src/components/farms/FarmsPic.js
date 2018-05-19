import React, { Component } from 'react'
import {
  Platform, StyleSheet, View, Image
} from 'react-native'

class FarmsPic extends Component {
  render() {
    return (
      <View style={styles.MainContainer} >
        <Image 
          source={{uri:'http://jurnalaquascape.com/wp-content/uploads/2015/05/amazon-sword.jpg'}}
          style={{width: 150, height: 150, borderRadius: 150/2}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  }
})

export default FarmsPic