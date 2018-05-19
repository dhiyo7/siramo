import React, { Component } from 'react'
import {
 Image,
 Text,
 ScrollView,
 View,
 StyleSheet
} from 'react-native';
import {NavigationActions} from 'react-navigation';

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

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 200, height: 100, margin: 10, alignItems: 'center'}}
          source={{uri: 'https://www.tablexi.com/wp-content/uploads/2017/12/ReactNative.png'}}
        />
      <ScrollView>
        <View>
          <Text style={styles.sectionHeadingStyle}>
            Section 1
          </Text>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
            Home
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.sectionHeadingStyle}>
            Section 2
          </Text>
          <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('History')}>
              History
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Text>This is my fixed footer</Text>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  }
})
export default SideMenu;