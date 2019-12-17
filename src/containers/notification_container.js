import React from 'react'
import Notification from '../components/notification'
//import { RESET_NOTIFICATIONS } from '../constants/action_types'
import { resetNotifications } from '../actions'
import useStore from '../store'

const NotificationContainer = () => {
  const [{ isVisible, status, message }, dispatch] = useStore()

  const onReset = () => dispatch(resetNotifications())

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
