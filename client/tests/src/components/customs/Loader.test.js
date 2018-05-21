import React from 'react'
import {
  View, Text, TouchableOpacity, 
  TextInput, StyleSheet, Picker
} from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import * as Progress from 'react-native-progress'
import Loader from '../../../../src/components/customs/Loader'
import { wrap } from 'module'

Enzyme.configure({ adapter: new Adapter()})

let wrapper

describe('<Loader /> snapshot Testing', () => {
  it('snapshot works!', () => {
    const tree = renderer.create(<Loader loading={true} />)
    expect(tree).toMatchSnapshot()
  })
})

describe('<Loader />', () => {
  wrapper = shallow(<Loader loading={true} />)
  it('should render <FarmDetail />', () => {
    expect(wrapper).toBeDefined()
  })
})

describe('<Loader /> testing props', () => {
  it('visible value should be true', () => {
    wrapper = shallow(<Loader loading={true} />)
    // console.log(wrapper.get(0).props.children.props.children.props)
    expect(wrapper.get(0).props.visible).toEqual(true)
  })
  it('visible value should be false', () => {
    wrapper = shallow(<Loader loading={false} />)
    expect(wrapper.get(0).props.visible).toEqual(false)
  })
})

describe('<Loader /> Child Testing', () => {
  it('<Loader /> Modal onRequestClose', () => {
    wrapper = shallow(<Loader loading={true} />)
    let reqClose = wrapper.get(0).props.onRequestClose() 
    expect(reqClose).toEqual('close modal')
  })
})