import 'react-native';
import React from 'react';
import Loader from '../../src/components/customs/Loader'
import { 
  View, Text, TextInput, BackHandler,
  StyleSheet, TouchableOpacity, Alert, Image, ImageBackground
} from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'mobx-react'
import UserStore from '../../src/store/UserStore'
import Login from '../../src/components/users/Login';
Enzyme.configure({ adapter: new Adapter() })

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const wrapper = shallow(
    <Provider UserStore={UserStore}><Login/></Provider>
  )
  expect(wrapper).toMatchSnapshot();
});

it('use all Element of react native that is imported', () => {
  const wrapper = shallow(
    <Provider UserStore={UserStore}><Login/></Provider>
  )
  expect(wrapper.containsMatchingElement([
    <View/>,
    <Text/>,
    <BackHandler/>,
    <StyleSheet/>,
    <TouchableOpacity/>,
    <Alert/>,
    <Image/>,
    <ImageBackground/>,
    <Loader/>
  ]))})

  it('button works', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(
      <Login UserStore={UserStore} navigation={navigation}/>
    )
    const render = wrapper.dive()
    render.find('TouchableOpacity').forEach(button=>{
      button.simulate('press')
    })
  })

  it('input text works', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(
      <Login UserStore={UserStore} navigation={navigation}/>
    )
    const render = wrapper.dive()
    render.find('TextInput').forEach((input,index)=>{
      input.simulate('change')
    })
  })

  

