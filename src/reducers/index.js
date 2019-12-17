import {
  FETCH_RATES_PENDING,
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAIL,
  RESET_NOTIFICATIONS
} from '../constants/action_types'
import { mapRatesToState } from '../helpers/rate_helper'

const defaultState = {
  isLoading: false,
  isVisible: false,
  status: 'success',
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
      status: 'success',
      message: 'Rates fetched successfully',
      rates: mapRatesToState(state.rates, action.rates)
    }
  case FETCH_RATES_FAIL:
    return {
      ...state,
      isLoading: false,
      message: `Something went wrong: ${ action.error }`
    }
  case RESET_NOTIFICATIONS:
    return {
      ...state,
      isVisible: false,
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
