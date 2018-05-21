import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import ButtonOnOff from '../../../../src/components/farms/ButtonOnOff'
import { Ionicons } from '@expo/vector-icons'
import FarmStore from '../../../../src/store/FarmStore'

Enzyme.configure({ adapter: new Adapter()})

let wrapper
let propSiram 

describe('<ButtonOnOff /> snapshot Testing', () => {
  it('snapshot works!', () => {
    propSiram = {ready_siram: 0, triggerSiram: FarmStore.triggerSiram}
    const tree = renderer.create(<ButtonOnOff siram={propSiram}/>)
    expect(tree).toMatchSnapshot()
  })
})

describe('<ButtonOnOff /> Text and Color Test', () => {
  
  it('should changed according to ready_siram status', () => {
    propSiram = {ready_siram: 0, triggerSiram: FarmStore.triggerSiram}
    wrapper = shallow(<ButtonOnOff siram={propSiram}/>)
    expect(wrapper.find('TouchableOpacity').get(0).props.style.backgroundColor).toEqual('#31ce12')
    expect(wrapper.find('Text').get(0).props.children[2]).toEqual('Start Watering')

    propSiram = {ready_siram: 1, triggerSiram: FarmStore.triggerSiram}
    let wrapperStop = shallow(<ButtonOnOff siram={propSiram}/>)
    expect(wrapperStop.find('TouchableOpacity').get(0).props.style.backgroundColor).toEqual('#f44242')
    expect(wrapperStop.find('Text').get(0).props.children[2]).toEqual('Stop Watering')
  })
})