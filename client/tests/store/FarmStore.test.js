import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import UserStore from '../../src/store/UserStore'
import FarmStore from '../../src/store/FarmStore'
import { User, db, Fire } from '../../src/store/firebase'
import MockStorage from '../MockStorage';
 
const storageCache = {};
const AsyncStorage = new MockStorage(storageCache)

UserStore.userData.uid = '17UFak7JqufG1RXUeVW30jwdfrQ2'

jest.setMock('AsyncStorage', AsyncStorage)
Enzyme.configure({ adapter: new Adapter() })

describe('FarmStore testing get Farm data', () => {

  it('before get farm data methods testing', () => {
    expect(FarmStore.FarmDetail.name).toEqual('')
    expect(FarmStore.FarmDetail.cronSchedule).toEqual('')
    expect(FarmStore.FarmDetail.temperature).toEqual(0)
    expect(FarmStore.FarmDetail.water_ratio).toEqual(0)
    expect(FarmStore.FarmDetail.water_level).toEqual(0)
    expect(FarmStore.FarmDetail.humidity).toEqual(0)
    expect(FarmStore.FarmDetail.last_siram).toEqual(0)
    expect(FarmStore.FarmDetail.last_updated).toEqual(0)
    expect(FarmStore.FarmDetail.minWaterRatio).toEqual(0)
    expect(FarmStore.FarmDetail.maxWaterRatio).toEqual(0)
  })

  it('after get farm data methods testing', async () => {
    await FarmStore.getFarmData()
    expect(FarmStore.FarmDetail.name).not.toEqual('')
    expect(FarmStore.FarmDetail.cronSchedule).not.toEqual('')
    expect(FarmStore.FarmDetail.temperature).not.toEqual(0)
    expect(FarmStore.FarmDetail.water_ratio).not.toEqual(0)
    expect(FarmStore.FarmDetail.water_level).not.toEqual(0)
    expect(FarmStore.FarmDetail.humidity).not.toEqual(0)
    expect(FarmStore.FarmDetail.last_siram).not.toEqual(0)
    expect(FarmStore.FarmDetail.last_updated).not.toEqual(0)
    expect(FarmStore.FarmDetail.minWaterRatio).not.toEqual(0)
    expect(FarmStore.FarmDetail.maxWaterRatio).not.toEqual(0)
  })

  afterAll(async() => {
    await FarmStore.clearAll()
    expect(FarmStore.FarmDetail.name).toEqual('')
    expect(FarmStore.FarmDetail.cronSchedule).toEqual('')
    expect(FarmStore.FarmDetail.temperature).toEqual(0)
    expect(FarmStore.FarmDetail.water_ratio).toEqual(0)
    expect(FarmStore.FarmDetail.water_level).toEqual(0)
    expect(FarmStore.FarmDetail.humidity).toEqual(0)
    expect(FarmStore.FarmDetail.last_siram).toEqual(0)
    expect(FarmStore.FarmDetail.last_updated).toEqual(0)
    expect(FarmStore.FarmDetail.minWaterRatio).toEqual(0)
    expect(FarmStore.FarmDetail.maxWaterRatio).toEqual(0)
  })
})

describe('FarmStore testing get history data', () => {
  it('before get history data method has called', () => {
    expect(FarmStore.farmData.historyHumidity.length).toEqual(0)
    expect(FarmStore.farmData.historyTemperature.length).toEqual(0)
    expect(FarmStore.farmData.historyWaterLevel.length).toEqual(0)
    expect(FarmStore.farmData.historyWaterRatio.length).toEqual(0)
  })

  it('after get history data method has called', async () => {
    await FarmStore.getHistory('17UFak7JqufG1RXUeVW30jwdfrQ2')
    expect(FarmStore.farmData.historyHumidity.length).not.toEqual(0)
    expect(FarmStore.farmData.historyTemperature.length).not.toEqual(0)
    expect(FarmStore.farmData.historyWaterLevel.length).not.toEqual(0)
    expect(FarmStore.farmData.historyWaterRatio.length).not.toEqual(0)
  })

  afterAll(async() => {
    await FarmStore.clearAll()
    expect(FarmStore.farmData.historyHumidity.length).toEqual(0)
    expect(FarmStore.farmData.historyTemperature.length).toEqual(0)
    expect(FarmStore.farmData.historyWaterLevel.length).toEqual(0)
    expect(FarmStore.farmData.historyWaterRatio.length).toEqual(0)
  })
})

describe('FarmStore testing set Schedule', () => {
  let cronFormat = '* 2 22 * * *'
  let max = 80
  let min = 20

  test('update data schedule in firebase', async() => {
    await FarmStore.setSchedule(cronFormat, max, min)
    expect(FarmStore.FarmDetail.minWaterRatio).toEqual(min)
    expect(FarmStore.FarmDetail.maxWaterRatio).toEqual(max)
    expect(FarmStore.FarmDetail.cronSchedule).toEqual(cronFormat)
  })
})

describe('FarmStore testing trigger siram and update siram', () => {
  let farmUpdate = {
    ready_siram: 1,
    last_siram: Fire.database.ServerValue.TIMESTAMP,
    last_updated: Fire.database.ServerValue.TIMESTAMP
  }
  test('FarmStore trigger siram active', async() => {
    FarmStore.FarmDetail.water_ratio = 40
    FarmStore.FarmDetail.ready_siram = 0
    expect(FarmStore.FarmDetail.ready_siram).toEqual(0)
    await FarmStore.triggerSiram()
    expect(FarmStore.FarmDetail.ready_siram).toEqual(1)
  })

  test('FarmStore updateSiram works', async() => {
    farmUpdate.ready_siram = 0
    await FarmStore.updateSiram(UserStore.userData.uid, farmUpdate)
    expect(FarmStore.FarmDetail.ready_siram).toEqual(0)
    farmUpdate.ready_siram = 1
    await FarmStore.updateSiram(UserStore.userData.uid, farmUpdate)
    expect(FarmStore.FarmDetail.ready_siram).toEqual(1)
  })
})