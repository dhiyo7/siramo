import React, { Component } from 'react'
import {
  Image,
} from 'react-native';
export default class TabBarLogo extends Component {

  render() {
    return (
          <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://www.iconsdb.com/icons/preview/red/temperature-2-xxl.png'}}
        />
    );
  }
}