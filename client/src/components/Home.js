import React, { Component } from 'react'
import {
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  BackHandler
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import FarmDetail from './farms/FarmDetail'

class Home extends Component {
  constructor() {
    super()
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
  }

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: () => (
      <Ionicons name="md-home" size={24} color="#66BB6A" />
    )
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      return true;
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <FarmDetail />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F1F8E9'
  }
})

export default Home