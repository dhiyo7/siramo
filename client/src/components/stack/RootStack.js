import { createStackNavigator } from 'react-navigation'
import Login from '../users/Login'
import SignUp from '../users/SignUp'
import HomeStack from './HomeStack'

export default RootStack = createStackNavigator({
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  },
  Home: {
    screen: HomeStack
  }
},{
  initialRouteName: 'Login'
})