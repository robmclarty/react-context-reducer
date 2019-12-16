import React, { createContext, useContext, useReducer } from 'react'
import {
  FETCH_RATES_PENDING,
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAIL,
  RESET_NOTIFICATIONS
} from '../constants/action_types'
import { mapRatesToState } from '../helpers/rate_helper'

// TODO: combine all reducers here rather than having one single reducer
const defaultState = {
  isLoading: false,
  rates: {},
  message: ''
}

const StoreContext = createContext(defaultState)

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
      rates: mapRatesToState(state.rates, action.rates)
    }
  case FETCH_RATES_FAIL:
    return {
      ...state,
      isLoading: false,
      message: action.error
    }
  case RESET_NOTIFICATIONS:
    return initialState
  default:
    return state
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => useContext(StoreContext)

export {
  useStore as default,
  StoreProvider
}
