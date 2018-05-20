import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation'
import { View, SafeAreaView, Button } from 'react-native'
import Home from '../Home'
import Graph from '../farm/Graph'
import History from '../../views/History'
import SideMenu from '../../components/customs/SideMenu'
import DetailParameter from '../../views/DetailParameter'
import FarmSchedule from '../../components/farms/FarmSchedule'

export default HomeStack = createDrawerNavigator(
{
  Home: {
    screen: Home
  },
  History: {
    screen: History
  },
  DetailParameter: {
    screen: DetailParameter
  },
  FarmSchedule: {
    screen: FarmSchedule
  },
},{
  initialRouteName: 'Home',
  contentComponent: SideMenu,
})