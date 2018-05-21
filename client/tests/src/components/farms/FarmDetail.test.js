import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import FarmStore from '../../../../src/store/FarmStore'
import userStore from '../../../../src/store/UserStore'

import FarmDetail from '../../../../src/components/farms/FarmDetail'
import CircleProg from '../../../../src/components/customs/CircleProg'
import TemperatureGauge from '../../../../src/components/customs/TemperatureGauge'
import FarmPic from '../../../../src/components/farms/FarmsPic'
import FarmDate from '../../../../src/components/farms/FarmDate'
import ButtonOnOff from '../../../../src/components/farms/ButtonOnOff'

Enzyme.configure({ adapter: new Adapter()})

let wrapper
let mockData
let mockUser

beforeEach(() => {
  FarmStore.FarmDetail.name = 'My Plant',
  FarmStore.FarmDetail.temperature = 20,
  FarmStore.FarmDetail.water_ratio = 10,
  FarmStore.FarmDetail.water_level = 30,
  FarmStore.FarmDetail.humidity = 30,
  FarmStore.FarmDetail.last_siram = 1526824574774,
  FarmStore.FarmDetail.last_updated = 1224824574774,
  FarmStore.FarmDetail.cronSchedule = '* 20 */11 * * *',
  FarmStore.FarmDetail.minWaterRatio = 63,
  FarmStore.FarmDetail.maxWaterRatio = 4,
  FarmStore.FarmDetail.ready_siram = 1,
  FarmStore.FarmDetail.loading = false

  wrapper = shallow(<FarmDetail />)
})

describe('<FarmDetail /> snapshot Testing', () => {
  it('snapshot works!', () => {
    const tree = renderer.create(<FarmDetail FarmStore={{FarmDetail:mockData}} UserStore={mockUser}/>)
    expect(tree).toMatchSnapshot()
  })
})

describe('<FarmDetail />', () => {
  it('should render <FarmDetail />', () => {
    expect(wrapper).toBeDefined()
  })
})

describe('<FarmDetail /> child is rendered', () => {
  it('should render <FarmDetail /> child Element', () => {
    expect(wrapper.find(<View />)).toBeDefined()
    // expect(wrapper.find('View').length).toBe(5)
    expect(wrapper.find(<FarmPic />)).toBeDefined()
    // expect(wrapper.find('FarmPic').length).toBe(1)
    expect(wrapper.find(<TemperatureGauge />)).toBeDefined()
    expect(wrapper.find('TemperatureGauge').length).toBe(1)
    expect(wrapper.find(<CircleProg />)).toBeDefined()
    expect(wrapper.find('CircleProg').length).toBe(3)
    expect(wrapper.find(<FarmDate />)).toBeDefined()
    expect(wrapper.find('FarmDate').length).toBe(2)
    expect(wrapper.find(<Text />)).toBeDefined()
    expect(wrapper.find('Text').length).toBe(1)
    expect(wrapper.find(<ButtonOnOff />)).toBeDefined()
    expect(wrapper.find('ButtonOnOff').length).toBe(1)
  })
})

describe('<FarmDetail /> child props is working', () => {
  it('Childern Component should have the same props value as FarmStore', () => {
    let lastWtrDate = userStore.dateFormat(FarmStore.FarmDetail.last_siram)
    let lastWtrTime = userStore.timeFormat(FarmStore.FarmDetail.last_siram)
    
    let lastUpdateDate = userStore.dateFormat(FarmStore.FarmDetail.last_updated)
    let lastUpdateTime = userStore.timeFormat(FarmStore.FarmDetail.last_updated)

    console.log(wrapper.find('ButtonOnOff').get(0))
    expect(wrapper.find('TemperatureGauge').get(0).props.sensor).toEqual(FarmStore.FarmDetail.temperature)
    expect(wrapper.find('Text').at(0).props().children).toEqual(FarmStore.FarmDetail.name)
    expect(wrapper.find('CircleProg').get(0).props.sensor).toEqual(FarmStore.FarmDetail.water_ratio)
    expect(wrapper.find('CircleProg').get(1).props.sensor).toEqual(FarmStore.FarmDetail.water_level)
    expect(wrapper.find('CircleProg').get(2).props.sensor).toEqual(FarmStore.FarmDetail.humidity)
    expect(wrapper.find('FarmDate').get(0).props.date.dates).toEqual(lastWtrDate)
    expect(wrapper.find('FarmDate').get(0).props.date.times).toEqual(lastWtrTime)
    expect(wrapper.find('FarmDate').get(1).props.date.dates).toEqual(lastUpdateDate)
    expect(wrapper.find('FarmDate').get(1).props.date.times).toEqual(lastUpdateTime)
    // button kalo On Off kalo di pencet ngubah 1 dan 0
  })
})