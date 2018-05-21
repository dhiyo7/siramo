import React from 'react'
import {
  View, Text, TouchableOpacity, 
  TextInput, StyleSheet, Picker
} from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import RecommendedCard from '../../../../src/components/customs/RecommendedCard'
import { Ionicons } from '@expo/vector-icons'

Enzyme.configure({ adapter: new Adapter()})

let wrapper

beforeEach(() => {
  wrapper = shallow(<RecommendedCard />)
})

describe('<RecommendedCard /> snapshot Testing', () => {
  it('snapshot works!', () => {
    const tree = renderer.create(<RecommendedCard />)
    expect(tree).toMatchSnapshot()
  })
})

describe('<RecommendedCard />', () => {
  it('should render <RecommendedCard />', () => {
    expect(wrapper).toBeDefined()
  })
})

describe('<RecommendedCard /> state Testing', () => {
  it('should have false state value', () => {
    expect(wrapper.state('modalInfo')).toEqual(false)
    expect(wrapper.state('modalCheckmark')).toEqual(false)
    expect(wrapper.state('modalWarning')).toEqual(false)
    expect(wrapper.state('modalDanger')).toEqual(false)
  })
})

describe('<RecommendedCard /> childern Testing', () => {
  it('should render all childern', () => {
    expect(wrapper.find(<View />)).toBeDefined()
    expect(wrapper.find(<Ionicons />)).toBeDefined()
    expect(wrapper.find(<Text />)).toBeDefined()
    expect(wrapper.find('Text').length).toBe(3)
  })
})