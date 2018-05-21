import React from 'react'
import {
  WebView
} from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { Ionicons } from '@expo/vector-icons'

import DetailParameter from '../../src/views/DetailParameter'

Enzyme.configure({ adapter: new Adapter()})

describe('Detail Parameter has web view component', () => {
  it('it has webview component', () => {
    const wrapper = shallow(<DetailParameter />)
    expect(wrapper.find(<WebView />)).toBeDefined()
    expect(wrapper).toMatchSnapshot()
  })
})