import React, { Component } from 'react'
import {
  WebView
} from 'react-native'


class DetailParameter extends Component {
  
  render() {
    return (
      <WebView
        source={{uri: this.props.navigation.getParam('url')}}
      />
    )
  }
}

export default DetailParameter

