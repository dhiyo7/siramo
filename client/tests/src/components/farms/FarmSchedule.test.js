import React from 'react'
import {
  View, Text, TouchableOpacity, 
  TextInput, StyleSheet, Picker
} from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { Ionicons } from '@expo/vector-icons'

import FarmSchedule from '../../../../src/components/farms/FarmSchedule'

Enzyme.configure({ adapter: new Adapter()})

let wrapper

beforeEach(() => {
  wrapper = shallow(<FarmSchedule />)
})

describe('<FarmSchedule /> snapshot Testing', () => {
  it('snapshot works!', () => {
    const tree = renderer.create(<FarmSchedule />)
    expect(tree).toMatchSnapshot()
  })
})

describe('<FarmSchedule />', () => {
  it('should render <FarmDetail />', () => {
    expect(wrapper).toBeDefined()
  })
})

describe('<FarmSchedule /> state', () => {
  it('should have state value', () => {
    expect(wrapper.state('minutes').length).toBe(60)
    expect(typeof wrapper.state('minutes')[0]).toBe('string')
    expect(wrapper.state('hours').length).toBe(24)
    expect(typeof wrapper.state('hours')[0]).toBe('string')
    expect(wrapper.state('waterRatio').length).toBe(100)
    expect(typeof wrapper.state('waterRatio')[0]).toBe('number')
    expect(wrapper.state('hoursPick')).toBe('00')
    expect(wrapper.state('minutesPick')).toBe('00')
    expect(wrapper.state('maxWaterRatio')).toBe(0)
    expect(wrapper.state('minWaterRatio')).toBe(0)
  })
})

describe('<FarmSchedule /> child is rendered', () => {
  it('should render <FarmSchedule /> child Element', () => {
    expect(wrapper.find(<View />)).toBeDefined()
    expect(wrapper.find(<Text />)).toBeDefined()
    expect(wrapper.find('Text').length).toBe(6)
    expect(wrapper.find(<Picker />)).toBeDefined()
    expect(wrapper.find('Picker').length).toBe(4)
    expect(wrapper.find(<Picker.Item />)).toBeDefined()
    expect(wrapper.find(<TouchableOpacity />)).toBeDefined()
    expect(wrapper.find('TouchableOpacity').length).toBe(1)
  })
})

describe('<FarmSchedule /> <Text /> testing', () => {
  it('should have expected childern', () => {
    expect(wrapper.find('Text').get(0).props.children).toEqual('Watering Schedule')
    expect(wrapper.find('Text').get(1).props.children[0]).toEqual(<Ionicons name='md-clock' size={20} />)
    expect(wrapper.find('Text').get(1).props.children[1]).toEqual('  Hours')
    expect(wrapper.find('Text').get(2).props.children).toEqual('Minutes')
    expect(wrapper.find('Text').get(3).props.children[0]).toEqual(<Ionicons name='md-rainy' size={20} />)
    expect(wrapper.find('Text').get(3).props.children[1]).toEqual(' Maximum Water Ratio')
    expect(wrapper.find('Text').get(4).props.children[0]).toEqual(<Ionicons name='md-cloud-outline' size={20} />)
    expect(wrapper.find('Text').get(4).props.children[1]).toEqual(' Minimum Water Ratio')
    expect(wrapper.find('Text').get(5).props.children).toEqual('Save Change')
  })
})

describe('<FarmSchedule /> <Picker /> testing', () => {
  it('should have Picker.Item according to state', () => {
    console.log('==============================')
    console.log(wrapper.find('Picker').get(0).props.children.length)
    expect(wrapper.find('Picker').get(0).props.children.length).toEqual(24)
    expect(wrapper.find('Picker').get(1).props.children.length).toEqual(60)
    expect(wrapper.find('Picker').get(2).props.children.length).toEqual(100)
  })
})

describe('<FarmSchedule /> state Test on Change', () => {
  it('State value should have changed, when pickers changed', () => {
    console.log(wrapper.state('hoursPick'))
  })
})