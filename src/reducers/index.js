import {
  FETCH_RATES_PENDING,
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAIL,
  RESET_NOTIFICATIONS
} from '../constants/action_types'
import {
  STATUS_SUCCESS,
  STATUS_ERROR,
  STATUS_INFO
} from '../constants/status_types'
import { mapRatesToState } from '../helpers/rate_helper'

const defaultState = {
  isLoading: false,
  isVisible: false,
  status: '',
  rates: {},
  message: ''
}

const reducer = (state, action) => {
  switch(action.type) {
  case FETCH_RATES_PENDING:
    return {
      ...state,
      isLoading: true
    }
  case FETCH_RATES_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isVisible: true,
      status: STATUS_SUCCESS,
      message: 'Rates fetched successfully',
      rates: mapRatesToState(state.rates, action.rates)
    }
  case FETCH_RATES_FAIL:
    return {
      ...state,
      isLoading: false,
      status: STATUS_ERROR,
      message: `Something went wrong: ${ action.error }`
    }
  case RESET_NOTIFICATIONS:
    return {
      ...state,
      isVisible: false,
      status: '',
      message: ''
    }
  default:
    return state
  }
}

export {
  defaultState,
  reducer
}
