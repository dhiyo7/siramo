import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation'
import { View, SafeAreaView, Button } from 'react-native'
import Home from '../Home'
import Graph from '../farm/Graph'
import History from '../../views/History'
import SideMeny from '../../components/customs/SideMenu'
import SideMenu from '../../components/customs/SideMenu';

export default HomeStack = createDrawerNavigator(
{
  Home: {
    screen: Home
  },
  History: {
    screen: History
  }
// },
// {
//   contentComponent:(props) => (
//       <View style={{flex:1}}>
//           <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
//               <DrawerItems {...props} />
//               <Button title="Sign Out" onPress={() => console.log('Keluarrrr'))}/>
//           </SafeAreaView>
//       </View>
//   ),
//   drawerOpenRoute: 'DrawerOpen',
//   drawerCloseRoute: 'DrawerClose',
//   drawerToggleRoute: 'DrawerToggle'
},{
  initialRouteName: 'Home',
  contentComponent: SideMenu,
})