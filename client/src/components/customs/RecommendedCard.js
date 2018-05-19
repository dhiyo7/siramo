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
            <TouchableHighlight onPress={() => this.setState({modalInfo: true})}><Ionicons name="md-information-circle" size={48} color="green"/></TouchableHighlight>
          </View>
          <View style={styles.iconContainer}>
           <Ionicons name="md-checkmark-circle" size={48} color="green" />
          </View>
          <View style={styles.iconContainer}>
           <Ionicons name="md-warning" size={48} color="yellow" />
          </View>
          <View style={styles.iconContainer}>
            <Ionicons name="md-close-circle" size={48} color="red" />
          </View>
          <Modal 
            visible={this.state.modalInfo}
            animationType={'slide'}
            transparent={true}
            onRequestClose={() => {console.log('close modal')}}
          >
            <View style={styles.modalBackGround}>
              <View style={styles.ActivityIndicatorWrapper}>
                <Text>A</Text>
                <TouchableHighlight onPress={() => this.setState({modalInfo: false})}><Text>Button</Text></TouchableHighlight>
              </View>
            </View>
          </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 4,
    marginTop: 4,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    margin: 10
  },
  descContainer: {
    width: 200,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  warning:{
    color:'red',
    textAlign: 'center'
  },
  text:{
    textAlign: 'center'
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