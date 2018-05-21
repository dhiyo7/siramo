import 'jsdom-global/register'
import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import MockStorage from '../MockStorage';

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

import History from '../../src/views/History'
import FarmStore from '../../src/store/FarmStore'

Enzyme.configure({ adapter: new Adapter()})

describe('check history components', () => {
  const wrapper = shallow(<History />)
  const component = renderer.create(<History />)
  const instance = wrapper.instance()
  it('it has tabview animated, tabbar, and sceneMap', () => {
    expect(wrapper.containsMatchingElement([
      <TabViewAnimated navigationState={wrapper.state()}/>,
      <TabBar />,
      <SceneMap />
    ]))
    expect(component).toMatchSnapshot()
  })

  it('all methods or functions are works', async () => {
    const handleIndexChange = jest.spyOn(instance, '_handleIndexChange')
    await wrapper.instance()._handleIndexChange(wrapper.state().index)
    expect(handleIndexChange).toBeCalled()

    const renderHeader = jest.spyOn(instance, '_renderHeader')
    await wrapper.instance()._renderHeader()
    expect(renderHeader).toBeCalled()

    const renderIcon = jest.spyOn(instance, '_renderIcon')
    let route = {
      icon: 'md-cloudy'
    }
    await wrapper.instance()._renderIcon({route})
    expect(renderIcon).toBeCalled()
  })

  it('component did mount get history data', async () => {
    AsyncStorage.setItem('userId', '17UFak7JqufG1RXUeVW30jwdfrQ2')
    const mountWrapper = mount(<History />)
    let historyData = await mountWrapper.instance().componentDidMount()
  })
})