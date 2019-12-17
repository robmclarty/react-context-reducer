import React from 'react'
import Notification from '../components/notification'
import { RESET_NOTIFICATIONS } from '../constants/action_types'
import useStore from '../store'

const NotificationContainer = () => {
  const [state, dispatch] = useStore()
  const { isVisible, status, message } = state

  const onReset = () => {
    dispatch({
      type: RESET_NOTIFICATIONS
    })
  }

  return (
    <Notification
      isVisible={isVisible}
      message={message}
      status={status}
      onReset={onReset}
    />
  )
}

export default NotificationContainer
