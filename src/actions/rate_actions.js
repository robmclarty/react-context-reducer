import {
  FETCH_RATES_PENDING,
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAIL
} from '../constants/action_types'

// Main action creator which triggers a chain-reaction of subsequent actions
// depending on the result of the async http request operation.
export const fetchRates = url => async (dispatch, callApi) => {
  dispatch(fetchRatesPending())

  try {
    const data = await callApi({ url })
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
