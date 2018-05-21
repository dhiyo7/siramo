import React from 'react'
import {
  View,
  StyleSheet, Image
} from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import SiramoLogo from '../../../../src/components/customs/SiramoLogo'
import { Ionicons } from '@expo/vector-icons'

Enzyme.configure({ adapter: new Adapter()})

let wrapper

beforeEach(() => {
  wrapper = shallow(<SiramoLogo />)
})

describe('<SiramoLogo /> snapshot Testing', () => {
  it('snapshot works!', () => {
    const tree = renderer.create(<SiramoLogo />)
    expect(tree).toMatchSnapshot()
  })
})