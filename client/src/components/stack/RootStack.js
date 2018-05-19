import { createStackNavigator } from 'react-navigation'
import Login from '../users/Login'
import SignUp from '../users/SignUp'
import HomeStack from './HomeStack'
import Graph from '../farm/Graph'
import History from '../../views/History'


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
  initialRouteName: 'Login',
})