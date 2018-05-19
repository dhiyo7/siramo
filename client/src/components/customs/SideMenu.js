import React, { Component } from 'react'
import {
 Image,
 ImageBackground,
 Text,
 ScrollView,
 View,
 StyleSheet,
 Platform,
 Alert
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  logout = () => {
    Alert.alert(
      'WARNING !',
      'Are you sure want to logout?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Logout', onPress: () => this.props.navigation.push('Login')},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={{width: '100%', height: 160, alignItems: 'center'}}
          source={{uri: 'https://i.ytimg.com/vi/rTVRuEhbVXY/maxresdefault.jpg'}}
        >
        <View style={styles.imageContainer} >
          <Image 
            source={{uri:'https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg'}}
            style={{width: 120, height: 120, borderRadius: 120/2}}
          />
         </View>
        </ImageBackground>
      <ScrollView>
        <View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
              <Ionicons name="md-home" size={24} color="#66BB6A" /> &nbsp;&nbsp; Home
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('History')}>
              <Ionicons name="md-contacts" size={24} color="#ef5350" /> &nbsp;&nbsp; About
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('History')}>
              <Ionicons name="md-analytics" size={24} color="#7E57C2" /> &nbsp;&nbsp; History
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={this.logout}>
              <Ionicons name="md-log-out" size={24} color="#ef5350" /> &nbsp;&nbsp; Logout
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#FAFAFA'
        }}>&#169; Siramo</Text>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navItemStyle: {
    padding: 10,
    fontSize: 20,
  },
  navSectionStyle: {
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    backgroundColor: '#A1887F',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  }
})
export default SideMenu;