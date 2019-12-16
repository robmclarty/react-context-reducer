import React from 'react'
import { connect } from 'react-redux'

import { resetNotifications } from '../actions'
import Notification from '../components/notification'

const mapStateToProps = state => ({
  isVisible: state.notifications.isVisible,
  message: state.notifications.message,
  status: state.notifications.status
})

const mapDispatchToProps = dispatch => ({
  onReset: () => dispatch(resetNotifications())
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
