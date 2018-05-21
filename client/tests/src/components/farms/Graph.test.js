import React from 'react'
import {
  View, Text, TouchableOpacity, 
  TextInput, StyleSheet, Picker, ScrollView
} from 'react-native'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { Ionicons } from '@expo/vector-icons'

import FarmStore from '../../../../src/store/FarmStore'
import FarmSchedule from '../../../../src/components/farms/FarmSchedule'
import UserStore from '../../../../src/store/UserStore';
import RecommendedCard from '../../../../src/components/customs/RecommendedCard'
import { Card, ListItem, Button, Divider } from 'react-native-elements'
import PureChart from 'react-native-pure-chart';

import Graph from '../../../../src/components/farms/Graph'
Enzyme.configure({ adapter: new Adapter()})


describe('<Graph /> has props history data', () => {
  const navigation = { navigate: jest.fn() }
  let userId = 'Hmyc0z9azhQbKE4mcv0NNZwDfPB3'
  let sensorArr = []

  it('Graph has props data from history humidity', async() => {
    await FarmStore.getHistory(userId)
    FarmStore.farmData.historyHumidity.forEach(element => {
      sensorArr.push({
        x: UserStore.dateFormat(element.x), 
        y: element.y
      })
    })
    const wrapper = shallow(<Graph sensorData={FarmStore.farmData.historyHumidity} humidityDetail={'humid'} navigation={navigation}/>)
    expect(wrapper.find(<ScrollView />)).toBeDefined()
    expect(wrapper.find(<Card />)).toBeDefined()
    expect(wrapper.find(<PureChart data={sensorArr} />)).toBeDefined()
    expect(wrapper.find(<RecommendedCard />)).toBeDefined()
    expect(wrapper.find(<Text />)).toBeDefined()
    expect(wrapper.find('Text').get(0).props.children).toEqual('Humidity is the amount of water vapor present in the air. Water vapor is the gaseous state of water and is invisible to the human eye. Humidity indicates the likelihood of precipitation, dew, or fog.')
    expect(wrapper.find('Text').get(1).props.children).toEqual('History')
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Button').get(0).props.title).toEqual('VIEW MORE')
    wrapper.find('Button').get(0).props.onPress()
  })

  it('Graph has props data from history water ratio', async() => {
    await FarmStore.getHistory(userId)
    FarmStore.farmData.historyWaterRatio.forEach(element => {
      sensorArr.push({
        x: UserStore.dateFormat(element.x), 
        y: element.y
      })
    })
    const wrapper = shallow(<Graph sensorData={FarmStore.farmData.historyWaterRatio} waterRatioDetail={'water ratio'} navigation={navigation}/>)
    expect(wrapper.find(<ScrollView />)).toBeDefined()
    expect(wrapper.find(<Card />)).toBeDefined()
    expect(wrapper.find(<PureChart data={sensorArr} />)).toBeDefined()
    expect(wrapper.find(<RecommendedCard />)).toBeDefined()
    expect(wrapper.find(<Text />)).toBeDefined()
    expect(wrapper.find('Text').get(0).props.children).toEqual('Moisture is the presence of a liquid, especially water, often in trace amounts. Small amounts of water may be found, for example, in the air (humidity), in foods, and in various commercial products.')
    expect(wrapper.find('Text').get(1).props.children).toEqual('History')
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Button').get(0).props.title).toEqual('VIEW MORE')
    wrapper.find('Button').get(0).props.onPress()

  })
  
  it('Graph has props data from history water level', async() => {
    await FarmStore.getHistory(userId)
    FarmStore.farmData.historyWaterLevel.forEach(element => {
      sensorArr.push({
        x: UserStore.dateFormat(element.x), 
        y: element.y
      })
    })
    const wrapper = shallow(<Graph sensorData={FarmStore.farmData.historyWaterLevel} waterLevelDetail={'level'} navigation={navigation}/>)
    expect(wrapper.find(<ScrollView />)).toBeDefined()
    expect(wrapper.find(<Card />)).toBeDefined()
    expect(wrapper.find(<PureChart data={sensorArr} />)).toBeDefined()
    expect(wrapper.find(<RecommendedCard />)).toBeDefined()
    expect(wrapper.find(<Text />)).toBeDefined()
    expect(wrapper.find('Text').get(0).props.children).toEqual('A water level is a device used for matching elevations of locations that are too far apart for a spirit level to span. The simplest water level is a section of clear tubing, partially filled with water.')
    expect(wrapper.find('Text').get(1).props.children).toEqual('History')
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Button').get(0).props.title).toEqual('VIEW MORE')
    wrapper.find('Button').get(0).props.onPress()

  })

  it('Graph has props data from history temperature', async() => {
    await FarmStore.getHistory(userId)
    FarmStore.farmData.historyTemperature.forEach(element => {
      sensorArr.push({
        x: UserStore.dateFormat(element.x), 
        y: element.y
      })
    })
    const wrapper = shallow(<Graph sensorData={FarmStore.farmData.historyTemperature} temperatureDetail={'panas'} navigation={navigation}/>)
    expect(wrapper.find(<ScrollView />)).toBeDefined()
    expect(wrapper.find(<Card />)).toBeDefined()
    expect(wrapper.find(<PureChart data={sensorArr} />)).toBeDefined()
    expect(wrapper.find(<RecommendedCard />)).toBeDefined()
    expect(wrapper.find(<Text />)).toBeDefined()
    expect(wrapper.find('Text').get(0).props.children).toEqual('Temperature, measure of hotness or coldness expressed in terms of any of several arbitrary scales and indicating the direction in which heat energy will spontaneously flow—i.e., from a hotter body (one at a higher temperature) to a colder body (one at a lower temperature).')
    expect(wrapper.find('Text').get(1).props.children).toEqual('History')
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Button').get(0).props.title).toEqual('VIEW MORE')
    wrapper.find('Button').get(0).props.onPress()

  })
})