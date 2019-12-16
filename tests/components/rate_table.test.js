import React from 'react'
import { shallow } from 'enzyme'
import RateTable from '../../src/components/rate_table'

describe('Components/RateTable', () => {
  const sampleRates = {
    "CAD": 1.4561,
    "USD": 1.1034,
    "JPY": 120.72,
    "GBP": 0.86158
  }

  test('displays rate data', () => {
    const component = shallow(<RateTable rates={sampleRates} />)
    expect(component).toBeTruthy()
    expect(component.find('td').get(0).props.children).toEqual('CAD')
    expect(component.find('td').get(1).props.children).toEqual(1.4561)
  })

  test('does not render if no rates', () => {
    const component = shallow(<RateTable rates={{}} />)
    expect(component).toEqual({})
  })
})
