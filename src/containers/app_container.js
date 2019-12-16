import React from 'react'

//import { fetchRates } from '../actions'
import { RATES_URL } from '../constants/endpoints'
import Button from '../components/button'
import RateTable from '../components/rate_table'
import Spinner from '../components/spinner'
//import Notification from './notification_container'

import {
  FETCH_RATES_SUCCESS
} from '../constants/action_types'
import { mapRatesToState } from '../helpers/rate_helper'

// const mapStateToProps = state => ({
//   rates: state.rates,
//   isLoading: state.notifications.isLoading
// })
//
// const mapDispatchToProps = dispatch => ({
//   onButtonPress: () => dispatch(fetchRates(RATES_URL))
// })

const initialState = {
  rates: [],
  isLoading: false
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
      rates: mapRatesToState(state, action.rates)
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

const mapDispatchToActions = dispatch => ({
  onButtonPress: () => {
    const thing = 5 + 5;
    dispatch(fetchRates(RATES_URL))
  },
  myFun: () => {
    dispatch(asdfads)
  }
})

const AppContainer = ({
  rates,
  isLoading,
  onButtonPress
}) => {
  const [state, dispatch] = getReducer()
  const actions = mapDispatchToActions(dispatch)

  return (
    <div>
      <header>
        <Notification />
        <Spinner isLoading={isLoading} />
      </header>

      <br />

      <main>
        <h2>Currency Rates</h2>
        <Button
            label="Fetch Rates"
            onPress={onButtonPress} />
        <br /><br />
        <RateTable rates={rates} />
      </main>

      <footer>
        <br />
        &copy; 2019
      </footer>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
