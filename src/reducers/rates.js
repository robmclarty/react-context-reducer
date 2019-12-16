import {
  FETCH_RATES_SUCCESS
} from '../constants/action_types'
import { mapRatesToState } from '../helpers/rate_helper'

// State should look like a dictionary of currency codes mapped to their
// corresponding rate values like this:
// ```
// {
//   "CAD": 1.4561,
//   "USD": 1.1034,
//   "JPY": 120.72,
//   "GBP": 0.86158
// }
// ```
const rates = (state = {}, action) => {
  switch(action.type) {
  case FETCH_RATES_SUCCESS:
    return mapRatesToState(state, action.rates)
  default:
    return state
  }
}

export default rates
