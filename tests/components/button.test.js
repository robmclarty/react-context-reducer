import React from 'react'
import { shallow } from 'enzyme'
import Button from '../../src/components/button'

describe('Components/Button', () => {
  const mockLabel = 'My Button'
  const mockCallback = jest.fn()

  test('displays label', () => {
    const component = shallow(<Button label={mockLabel} onPress={mockCallback} />)
    expect(component.text()).toEqual('My Button')
  })

  test('clicking button executes callback', () => {
    const component = shallow(<Button label={mockLabel} onPress={mockCallback} />)
    component.find('button').props().onClick()
    expect(mockCallback).toHaveBeenCalled()
  })
})
