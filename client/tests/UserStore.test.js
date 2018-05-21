import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserStore from '../src/store/UserStore'
import { User } from '../src/store/firebase'
Enzyme.configure({ adapter: new Adapter() })

describe('UserStore testing assign user data', () => {
  let testData = {
    uid: '17UFak7JqufG1RXUeVW30jwdfrQ2',
    email: 'dummy@gmail.com'
  }
  test('UserStore.userData become testData', async () => {
    await UserStore.assignUserData(testData)
    expect(UserStore.userData.uid).toEqual(testData.uid)
    expect(UserStore.userData.email).toEqual(testData.email)
  })
})