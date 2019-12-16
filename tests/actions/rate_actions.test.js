import configureStore from 'redux-mock-store'
import { fetchRates } from '../../src/actions/rate_actions'
import {
  FETCH_RATES_PENDING,
  FETCH_RATES_SUCCESS,
  FETCH_RATES_FAIL
} from '../../src/constants/action_types'
import { RATES_URL } from '../../src/constants/endpoints'
import thunk from '../../src/middleware/api_middleware'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

// TODO: mock fetch so not making a real http request
describe('Actions/Rates', () => {
  test('should get rates from url', async () => {
    const store = mockStore({})
    await store.dispatch(fetchRates(RATES_URL))
    const actions = store.getActions()
    expect(actions[0].type).toEqual(FETCH_RATES_PENDING)
    expect(actions[1].type).toEqual(FETCH_RATES_SUCCESS)
    expect(Object.keys(actions[1].rates).length).toBeGreaterThan(0)
  })

  test('should return error action if unsuccessful', async () => {
    const fakeUrl = 'http://not.a.real/url/no/rates'
    const store = mockStore({})
    await store.dispatch(fetchRates(fakeUrl))
    const actions = store.getActions()
    expect(actions[0].type).toEqual(FETCH_RATES_PENDING)
    expect(actions[1].type).toEqual(FETCH_RATES_FAIL)
  })
})
