import React from 'react'
import { shallow } from 'enzyme'
import Notification from '../../src/components/notification'
import {
  STATUS_SUCCESS,
  STATUS_ERROR
} from '../../src/constants/status_types'

describe('Components/Notification', () => {
  const mockMessage = 'My message'
  const mockCallback = jest.fn()
  const successComponent = shallow(
    <Notification
      isVisible={true}
      status={STATUS_SUCCESS}
      message={mockMessage}
      onReset={mockCallback} />
  )

  test('displays message + success status', () => {
    expect(successComponent.find('.notification-message').text()).toEqual('My message')
  })

  test('renders success status', () => {
    expect(successComponent.find('.notification').hasClass(STATUS_SUCCESS)).toEqual(true)
    expect(successComponent.find('.notification').hasClass(STATUS_ERROR)).toEqual(false)
  })

  test('clicking reset button executes callback', () => {
    successComponent.find('.notification-reset').props().onClick()
    expect(mockCallback).toHaveBeenCalled()
  })

  test('renders error status', () => {
    const errorComponent = shallow(
      <Notification
        isVisible={true}
        status={STATUS_ERROR}
        message={mockMessage}
        onReset={mockCallback} />
    )
    expect(errorComponent.find('.notification').hasClass(STATUS_ERROR)).toEqual(true)
    expect(errorComponent.find('.notification').hasClass(STATUS_SUCCESS)).toEqual(false)
  })

  test('does not render if not visible', () => {
    const hiddenComponent = shallow(
      <Notification
        isVisible={false}
        status={STATUS_SUCCESS}
        message={mockMessage}
        onReset={mockCallback} />
    )
    expect(hiddenComponent).toEqual({})
  })
})
