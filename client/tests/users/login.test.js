import 'react-native'
import React from 'react'
import Loader from '../../src/components/customs/Loader'
import { 
  View, Text, TextInput, BackHandler,
  StyleSheet, TouchableOpacity, Alert, Image, ImageBackground
} from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'mobx-react'
import userStore from '../../src/store/UserStore'
import Login from '../../src/components/users/Login'
import renderer from 'react-test-renderer'

Enzyme.configure({ adapter: new Adapter() })

describe('<Login /> snapshot', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Provider UserStore={userStore}><Login/></Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('<Login /> childern component Test', () => {
  it('use all Element of react native that is imported', () => {
    const wrapper = shallow(
      <Login />
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
    ])).toBeTruthy()
  })  
})

describe('<Login /> state Testing', () => {
  it('should have state email and password with epmty string', () => {
    const wrapper = shallow(
      <Login/>
    )
    expect(wrapper.state('email')).toEqual('')
    expect(wrapper.state('password')).toEqual('')
  })
})

describe('<Login /> TextInput OnChange and other attributes Test', () => {
  it('state should changed when textInput trigger onChangeText', () => {
    const wrapper = shallow(
      <Login/>
    )
    let expectedValue = {
      email: 'email@gmail.com',
      password: 'password'
    }
    wrapper.find('TextInput').get(0).props.onChangeText(expectedValue.email)
    wrapper.find('TextInput').get(1).props.onChangeText(expectedValue.password)
    expect(wrapper.state('email')).toEqual(expectedValue.email)
    expect(wrapper.state('password')).toEqual(expectedValue.password)
    // Test nya gimana yang ref ini ?
    let TxtInputRef = wrapper.find('TextInput').get(1).ref() 
    // let onSubmimtEdit = wrapper.find('TextInput').get(0).props.onSubmitEditing() 
    // console.log(onSubmimtEdit)
  })
})

describe('<Login /> button onPress testing', () => {
  let navigation = { navigate: jest.fn() }
  userStore.userData.email = ''
  
  let wrapper = shallow(
    <Login navigation={navigation}/>
  )
  let instance = wrapper.instance()

  let expectedValue = {
    email: 'test3@gmail.com',
    password: 'test1234'
  }

  it('all Button works', () => {
    const render = wrapper.dive()
    render.find('TouchableOpacity').forEach(button=>{
      button.simulate('press')
    })
  })

  it('onPress submitLogin is called', () => {
    let handleSubmit = jest.spyOn(instance, 'submitLogin')
  
    // console.log('Before ===>', userStore.userData.email)
    wrapper.find('TextInput').get(0).props.onChangeText(expectedValue.email)
    wrapper.find('TextInput').get(1).props.onChangeText(expectedValue.password)
    wrapper.instance().submitLogin()
    expect(handleSubmit).toBeCalled()
    // console.log(wrapper.state())
    wrapper.find('TouchableOpacity').get(0).props.onPress()
    //ga ke panggil
    // console.log(userStore.userData.email)
  })

  it('should show alert when email is empty', () => {
    wrapper.find('TextInput').get(1).props.onChangeText(expectedValue.password)
    wrapper.find('TouchableOpacity').get(0).props.onPress()
  })

  it('should show alert when password is empty', () => {
    wrapper.find('TextInput').get(0).props.onChangeText(expectedValue.email)
    wrapper.find('TouchableOpacity').get(0).props.onPress()
  })
})



  

