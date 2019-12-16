import React from 'react'
import PropTypes from 'prop-types'
import { STATUSES } from '../constants/status_types'

const Notification = ({
  isVisible,
  status,
  message,
  onReset
}) => {
  if (!isVisible) return null

  return (
    <div className={`notification ${status}`}>
      <div className="notification-message">
        {message}
      </div>
      <button
          className="notification-reset"
          onClick={onReset}>
        x
      </button>
    </div>
  )
}

Notification.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  status: PropTypes.oneOf(STATUSES),
  message: PropTypes.string,
  onReset: PropTypes.func.isRequired
}

export default Notification
