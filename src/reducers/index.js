import { combineReducers } from 'redux'
import rates from './rates'
import notifications from './notifications'

const appReducer = combineReducers({
  rates,
  notifications
})

export default appReducer
