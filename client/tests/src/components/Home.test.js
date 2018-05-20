import React from 'react'
import { View, ScrollView } from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import Home from '../../../src/components/Home'
import FarmDetail from '../../../src/components/farms/FarmDetail'

Enzyme.configure({ adapter: new Adapter()})

let wrapper

beforeEach(() => {
  wrapper = shallow(<Home />)
})

describe('<Home /> snapshot Testing', () => {
  it('snapshot works!', () => {
    const tree = renderer.create(<Home />)
    expect(tree).toMatchSnapshot()
  })
})

describe('<Home />', () => {
  it('should render <Home />', () => {
    expect(wrapper).toBeDefined()
  })
})

describe('<Home /> child is rendered', () => {
  it('should render <Home /> child Element', () => {
    expect(wrapper.find(<ScrollView />)).toBeDefined()
    expect(wrapper.find(<View />)).toBeDefined()
    expect(wrapper.find(<FarmDetail />)).toBeDefined()
    expect(wrapper.find('FarmDetail').length).toBe(1)
  })
})

// componentWillMount sama componentwillUnmount belum di test