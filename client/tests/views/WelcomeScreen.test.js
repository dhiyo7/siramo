// import 'jsdom-global/register'
import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import MockStorage from '../MockStorage'
// import 'jsdom-global/register'

const storageCache = {}
const AsyncStorage = new MockStorage(storageCache)
import { View, Image } from 'react-native'
import History from '../../src/views/History'
import FarmStore from '../../src/store/FarmStore'
import WelcomeScreen from '../../src/views/WelcomeScreen'
import userStore from '../../src/store/UserStore'

Enzyme.configure({ adapter: new Adapter()})

describe('render components', () => {
  it('has view and image', () => {
      const wrapper = shallow(
        <WelcomeScreen />
      )
      const component = renderer.create(<WelcomeScreen />)
      expect(wrapper.containsMatchingElement([
        <View/>,
        <Image/>,
      ]))
      expect(component).toMatchSnapshot()
  })

  test('component did mount when its rendering', () => {
    const navigation = { navigate: jest.fn() }
    const wrapper = shallow(<WelcomeScreen navigation={navigation}/>)
    wrapper.instance().componentDidMount()
  })
})

describe('AsnycStorage test in <WelcomeScreen />', () => {
  let asnycStore = new MockStorage()
  let navigation = { navigate: jest.fn() }
  let wrapper = shallow(<WelcomeScreen navigation={navigation}/>)
  
  it('should not get userId and email', async () => {
    asnycStore.setItem('userId', null)
    asnycStore.setItem('email', null)
    asnycStore.getAllKeys()
    // console.log('uid ===>', userStore.userData)
    // console.log('email ===>', userStore.userData.email)
    // console.log('Farm Data', FarmStore.FarmDetail.name)
    wrapper.instance().componentDidMount()
    expect(userStore.userData.uid).toBe('')
    expect(userStore.userData.email).toBe('')
    // console.log('Farm Data', FarmStore.FarmDetail.name)
    asnycStore.clear()
  })

  it('should get userId and email', async () => {
    asnycStore.setItem('userId', 'Hmyc0z9azhQbKE4mcv0NNZwDfPB3')
    asnycStore.setItem('email', 'demo@gmail.com')
    let uid = await asnycStore.getItem('userId')
    let email = await asnycStore.getItem('email')
    await setTimeout(() => {
      wrapper.instance().componentDidMount()
    }, 3000)
    userStore.assignUserData({uid, email})
    expect(userStore.userData.uid).toEqual(uid)
    expect(userStore.userData.email).toEqual(email)
  })
})

// describe('<WelcomeScreen /> componentDidMount Test', () => {
//   it('should call all method inside componentDidMount', () => {
//     let UserStore = {
//       assignUserData : jest.spyOn(WelcomeScreen.prototype, 'UserStore.assignUserData')
//     }
//     let wrap = mount(<WelcomeScreen />)
//     expect(UserStore.assignUserData).toHaveBeenCalledTimes(1) 
//   })
// })