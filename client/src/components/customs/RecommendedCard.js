import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Modal,
  TouchableHighlight,
  Button,
  WebView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import PureChart from 'react-native-pure-chart';

class RecommendedCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalInfo: false,
      modalCheckmark: false,
      modalWarning: false,
      modalDanger: false
    };
  }
  render() {
    return ( 
      <View style={styles.mainContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.container}>
              <Ionicons name="md-checkmark-circle" size={24} color="#69F0AE" />
              <Text style={styles.text}>
              &nbsp;&nbsp; {this.props.recommended}</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.container}>
              <Ionicons name="md-warning" size={24} color="#FDD835" />
              <Text style={styles.text}>&nbsp;&nbsp; {this.props.warning}</Text>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.container}>
              <Ionicons name="md-close-circle" size={24} color="#FFAB91" />
              <Text style={styles.warning}>&nbsp;&nbsp; {this.props.danger}</Text>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  container:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  descContainer: {
    width: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  warning:{
    color:'red',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed'
  },
  text:{
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed'
  },
  modalBackGround: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C8E6C9',
  },
  ActivityIndicatorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }
})

export default RecommendedCard;