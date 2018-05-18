import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation'
import { View, SafeAreaView, Button } from 'react-native'
import Home from '../Home'
import Graph from '../farm/Graph'

export default HomeStack = createDrawerNavigator(
{
  Home: {
    screen: Home
  },
  Graph: {
    screen: Graph
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
  initialRouteName: 'Home'
})