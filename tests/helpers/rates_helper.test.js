import { mapRatesToState } from '../../src/helpers/rate_helper'

describe('Helpers/rates_helper', () => {
  const sampleRates = {
    "CAD": 1.4561,
    "USD": 1.1034,
    "JPY": 120.72,
    "GBP": 0.86158
  }

  test('new rates are added to the store', () => {
    const state = {}
    const rates = sampleRates
    const newState = mapRatesToState(state, rates)

    expect(Object.keys(newState).length).toBe(4)
    expect(newState['CAD']).toBe(1.4561)
  })
})
