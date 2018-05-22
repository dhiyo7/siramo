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
    <SignUp/>
  )
  expect(wrapper).toMatchSnapshot();
});

it('use all Element of react native that is imported', () => {
  const wrapper = shallow(
    <SignUp/>
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

  describe('onChange input type testing', () => {
    it('email, password, and conPassword change', () => {
      const wrapper = shallow(<SignUp />)
      expect(wrapper.state().email).toEqual('')
      expect(wrapper.state().password).toEqual('')
      expect(wrapper.state().conPassword).toEqual('')
      // console.log(wrapper.find('TextInput').get(0))
      wrapper.find('TextInput').get(0).props.onChangeText('rama@gmail.com')
      wrapper.find('TextInput').get(1).props.onChangeText('rama12345')
      wrapper.find('TextInput').get(2).props.onChangeText('rama12345')
      expect(wrapper.state().email).toEqual('rama@gmail.com')
      expect(wrapper.state().password).toEqual('rama12345')
      expect(wrapper.state().conPassword).toEqual('rama12345')
    })
  })

  describe('submit onChange testing', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<SignUp navigation={navigation}/>)
    const instance = wrapper.instance()
    it('submit method is called', () => {
      const handleSubmit = jest.spyOn(instance, 'submitSignUp')
      wrapper.find('TextInput').get(0).props.onChangeText('rama2@gmail.com')
      wrapper.find('TextInput').get(1).props.onChangeText('rama12345')
      wrapper.find('TextInput').get(2).props.onChangeText('rama12345')
      wrapper.instance().submitSignUp()
      expect(handleSubmit).toBeCalled()
    })
  })
