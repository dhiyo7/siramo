import { createStackNavigator } from 'react-navigation'
import React from 'react'
import Login from '../users/Login'
import SignUp from '../users/SignUp'
import HomeStack from './HomeStack'
import History from '../../views/History'
import WelcomeScreen from '../../views/WelcomeScreen'
import SiramoLogo from '../customs/SiramoLogo'
import { Ionicons } from '@expo/vector-icons'

export default RootStack = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen
  },
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  },
  Home: {
    screen: HomeStack,
  }
},{
  initialRouteName: 'Welcome',
  navigationOptions: ({ navigation }) => ({
    headerTitle: <SiramoLogo />,
    headerStyle: {
      // backgroundColor: '#EFEBE9'
      paddingLeft: 10
    },
    headerLeft: <Ionicons name="md-reorder" size={32} onPress={ () => navigation.navigate('Home') } />
  })
})