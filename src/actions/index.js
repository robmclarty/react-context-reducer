
import {
  FETCH_RATES_PENDING,
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAIL,
  RESET_NOTIFICATIONS
} from '../constants/action_types'
import useStore from '../store'

export const resetNotifications = () => ({
  type: RESET_NOTIFICATIONS
})

// Main action creator which triggers a chain-reaction of subsequent actions
// depending on the result of the async http request operation.
// This function returns another function which is called by the thunk created
// in the store. That function executess the returned function by passing in t
// the values of `dispatch`, `apiRequest`, and `state`. In this particular case
// `state` is not being used, so it is simply omitted for convenience.
export const fetchRates = url => async (dispatch, apiRequest) => {
  dispatch(fetchRatesPending())

  try {
    const data = await apiRequest({ url })

    dispatch(fetchRatesSuccess(data.rates))
  } catch (err) {
    dispatch(fetchRatesFail(err))
  }
}

const fetchRatesPending = () => ({
  type: FETCH_RATES_PENDING
})

const fetchRatesSuccess = rates => ({
  type: FETCH_RATES_SUCCESS,
  rates
})

const fetchRatesFail = error => ({
  type: FETCH_RATES_FAIL,
  error
})
