import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserStore from '../../src/store/UserStore'
import FarmStore from '../../src/store/FarmStore'
import { User, db } from '../../src/store/firebase'
import MockStorage from '../MockStorage';

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

jest.setMock('AsyncStorage', AsyncStorage)
Enzyme.configure({ adapter: new Adapter() })


describe('UserStore testing assign user data', () => {
  let testData = {
    uid: 'Hmyc0z9azhQbKE4mcv0NNZwDfPB3',
    email: 'demo@gmail.com'
  }
  test('UserStore.userData become testData', async () => {
    await UserStore.assignUserData(testData)
    expect(UserStore.userData.uid).toEqual(testData.uid)
    expect(UserStore.userData.email).toEqual(testData.email)
  })
})

describe('UserStore login firebase testing', () => {
  let testData = {
    email: 'demo@gmail.com',
    password: 'demo123'
  }
  let userId = 'Hmyc0z9azhQbKE4mcv0NNZwDfPB3'
  let testDetailData = {
    name: '',
    temperature: 0,
    water_ratio: 0,
    water_level: 0,
    humidity: 0,
    last_siram: 0,
    last_updated: 0,
    cronSchedule: '',
    minWaterRatio: 0,
    maxWaterRatio: 0,
    ready_siram: 1,
    loading: false
  }


  test('firebase login method works',  async() => {
    const navigation = { navigate: jest.fn() } 
    expect(UserStore.isLogin).toEqual(false)
    expect(FarmStore.FarmDetail.name).toBe('')
    expect(FarmStore.FarmDetail.temperature).toEqual(0)
    expect(await AsyncStorage.getItem('userId')).toEqual(null)
    expect(await AsyncStorage.getItem('email')).toEqual(null)

    await UserStore.firebaseLogin(testData, navigation)
    expect(UserStore.isLogin).toEqual(true)
    expect(UserStore.userData.email).toEqual(testData.email)
    expect(UserStore.userData.uid).toEqual(userId)
    expect(await AsyncStorage.getItem('userId')).not.toEqual(null)
    expect(await AsyncStorage.getItem('email')).toEqual(testData.email)
  })

  test('get all farms data after login', async () => {
    expect(FarmStore.FarmDetail.name).not.toBe('')
    expect(FarmStore.FarmDetail.temperature).not.toEqual(0)
  })
})

describe('UserStore sign out firebase testing', () => {
  let testData = {
    email: 'demo@gmail.com',
    userId: 'Hmyc0z9azhQbKE4mcv0NNZwDfPB3'
  }
  beforeEach(async() => {
    AsyncStorage.setItem('userId', testData.userId)
    AsyncStorage.setItem('email', testData.email)
    expect(await AsyncStorage.getItem('userId')).toEqual(testData.userId)
    expect(await AsyncStorage.getItem('email')).toEqual(testData.email)
    UserStore.userData.uid = await AsyncStorage.getItem('userId')
    await FarmStore.getFarmData()
    expect(FarmStore.FarmDetail.name).not.toBe('')
    expect(FarmStore.FarmDetail.temperature).not.toEqual(0)
    await UserStore.firebaseSignOut()
  })

  test('remove async localStore email and userId', async() => {
    expect(await AsyncStorage.getItem('userId')).toEqual(null)
    expect(await AsyncStorage.getItem('email')).toEqual(null)
  })

  test('clear all farm detail data', async () => {
    expect(FarmStore.FarmDetail.name).toBe('')
    expect(FarmStore.FarmDetail.temperature).toEqual(0)
  })
})

describe('UserStore time and date format testing', () => {
  it('return string date and time format', () => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date().getDate()
    let month = new Date().getMonth()
    let year = new Date().getFullYear()
    let minute = new Date().getMinutes()
    let hours = new Date().getHours()

    if (date < 10) {
      date = '0'+date
    }
    if (hours < 10) {
      hours = `0${hours}`
    }
    if (minute < 10) {
      minute = `0${minute}`
    }

    expect(UserStore.dateFormat(new Date())).toBe(`${date} ${months[month]} ${year}`)
    expect(UserStore.timeFormat(new Date())).toBe(`${hours}:${minute}`)
  })
})

describe.skip('UserStore sign up firebase testing', () => {
  let newTestData = {
    email: 'test5@gmail.com',
    password: 'test1234'
  }

  test('firebase signup method works',  async() => {
    const navigation = { navigate: jest.fn() }
  
    expect(await AsyncStorage.getItem('userId')).toEqual(null)
    expect(await AsyncStorage.getItem('email')).toEqual(null)

    await UserStore.firebaseSignUp(newTestData, navigation)
    expect(UserStore.isLogin).toEqual(true)
    expect(UserStore.userData.email).toEqual(newTestData.email)
    expect(await AsyncStorage.getItem('userId')).not.toEqual(null)
    expect(await AsyncStorage.getItem('email')).toEqual(newTestData.email)
  })

  afterAll(async() => {
    // await User.currentUser.delete()
  })
})