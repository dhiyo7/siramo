import 'react-native';
import React from 'react';
import {
  View, Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity, 
  Alert,
  ScrollView
} from 'react-native'
import Loader from '../../src/components/customs/Loader';
import Enzyme, { mount, shallow } from 'enzyme'
import {Provider} from 'mobx-react'
import Adapter from 'enzyme-adapter-react-16'
import UserStore from '../../src/store/UserStore'
import SignUp from '../../src/components/users/SignUp';
Enzyme.configure({ adapter: new Adapter() })

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const wrapper = shallow(
    <Provider UserStore={UserStore}><SignUp/></Provider>
  )
  expect(wrapper).toMatchSnapshot();
});

it('use all Element of react native that is imported', () => {
  const wrapper = shallow(
    <Provider UserStore={UserStore}><SignUp/></Provider>
  )
  expect(wrapper.containsMatchingElement([
    <View/>,
    <Text/>,
    <Alert/>,
    <StyleSheet/>,
    <TouchableOpacity/>,
    <Alert/>,
    <Image/>,
    <Loader/>,
    <ScrollView/>
  ]))})

  it('button works', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(
      <SignUp UserStore={UserStore} navigation={navigation}/>
    )
    const render = wrapper.dive()
    render.find('TouchableOpacity').forEach(button=>{
      button.simulate('press')
    })
  })
