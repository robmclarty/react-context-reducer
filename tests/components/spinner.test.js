import React from 'react'
import { shallow } from 'enzyme'
import Spinner from '../../src/components/spinner'

describe('Components/Spinner', () => {
  test('is visible if loading', () => {
    const component = shallow(<Spinner isLoading={true} />)
    expect(component).toBeTruthy()
    expect(component.text()).toMatch('Loading')
  })

  test('does not render if not loading', () => {
    const component = shallow(<Spinner isLoading={false} />)
    expect(component).toEqual({})
  })
})
