import React from 'react'
import { Provider } from 'mobx-react'
import { AsyncStorage } from 'react-native'
import { NavigationAction } from 'react-navigation'
import { createStackNavigator } from 'react-navigation'
import RootStack from './src/components/stack/RootStack'
import UserStore from './src/store/UserStore'
import FarmStore from './src/store/FarmStore'
import { Asset, AppLoading } from 'expo';

export default class App extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     isReady: false
  //   }
  // }

  // _cacheResourcesAsync = async() => {
  //   console.log('kesainiiii', await AsyncStorage.getItem('userId'))
  //   await AsyncStorage.getItem('userId') == null?
  //   console.log("ke login", this.props): console.log("kenhome")
  // }

  render() {

    // if(!this.state.isReady){
    //   return (
    //     <AppLoading
    //       startAsync={this._cacheResourcesAsync}
    //       onFinish={() => this.setState({ isReady: true })}
    //       onError={console.warn}
    //     />
    //   );
    // }
    return (
      <Provider UserStore={UserStore} FarmStore={FarmStore}>
        <RootStack/>
      </Provider>
    )
  }
}