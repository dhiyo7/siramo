import { createStackNavigator } from 'react-navigation'
import React from 'react'
import Login from '../users/Login'
import SignUp from '../users/SignUp'
import HomeStack from './HomeStack'
import History from '../../views/History'
import WelcomeScreen from '../../views/WelcomeScreen'
import SiramoLogo from '../customs/SiramoLogo'

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
  navigationOptions: {
    headerTitle: <SiramoLogo />,
    headerStyle: {
      backgroundColor: '#8D6E63',
    },
    headerLeft: null
  }
})