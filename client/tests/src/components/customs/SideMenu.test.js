import React from 'react'
import {
  Image,
  ImageBackground,
  Text,
  ScrollView,
  View,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import SideMenu from '../../../../src/components/customs/SideMenu'
import { Ionicons } from '@expo/vector-icons'

Enzyme.configure({ adapter: new Adapter()})

let wrapper

beforeEach(() => {
  const navigation = { navigate: jest.fn(), dispatch: jest.fn()}
  wrapper = shallow(<SideMenu navigation={navigation} />)
})

describe('<SideMenu /> snapshot Testing', () => {
  it('snapshot works!', () => {
    const tree = renderer.create(<SideMenu />)
    expect(tree).toMatchSnapshot()
  })
})

describe('<SideMenu />', () => {
  it('should render <SideMenu />', () => {
    expect(wrapper).toBeDefined()
  })
})

describe('<SideMenu /> child component Test', () => {
  it('<SideMenu /> should render all children Component', () => {
    Alert.alert = jest.genMockFunction()
    expect(wrapper.find('ImageBackground').get(0).props.source.uri).toEqual('https://i.ytimg.com/vi/rTVRuEhbVXY/maxresdefault.jpg')
    expect(wrapper.find('Image').get(0).props.source.uri).toEqual('https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg')
    expect(wrapper.find('Text').length).toBe(5)
    expect(wrapper.find('Text').get(0).props.children[0]).toEqual(<Ionicons name="md-home" size={24} color="#66BB6A" />)
    // expect(wrapper.find('Text').get(0).props.children[1]).toBe('    Home')
    expect(wrapper.find('Text').get(1).props.children[0]).toEqual(<Ionicons name="md-calendar" size={24} color="#ef5350" />)
    // expect(wrapper.find('Text').get(1).props.children[1]).toBe('    Scheduling')
    expect(wrapper.find('Text').get(2).props.children[0]).toEqual(<Ionicons name="md-analytics" size={24} color="#7E57C2" />)
    // expect(wrapper.find('Text').get(2).props.children[1]).toBe('    History')
    expect(wrapper.find('Text').get(3).props.children[0]).toEqual(<Ionicons name="md-log-out" size={24} color="#ef5350" />)
    wrapper.find('Text').get(3).props.onPress()
    // console.log(wrapper.get(0))
    // expect(wrapper.find('Text').get(3).props.children[1]).toBe('    Logout')
    expect(wrapper.find('Text').get(4).props.style).toEqual({ fontSize: 24, fontWeight: 'bold', color: '#FAFAFA' })
    expect(wrapper.find('Text').get(4).props.children).toEqual('© Siramo')
  })
})