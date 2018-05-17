import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Home from '../Home'

export default HomeStack = createDrawerNavigator({
  Home: {
    screen: Home
  }
},{
  initialRouteName: 'Home'
})