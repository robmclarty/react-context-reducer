import React from 'react'

import { RATES_URL } from '../constants/endpoints'
import { FETCH_RATES_SUCCESS, FETCH_RATES_PENDING, FETCH_RATES_FAIL } from '../constants/action_types'
import Button from '../components/button'
import RateTable from '../components/rate_table'
import Spinner from '../components/spinner'
import Notification from './notification_container'
import useStore from '../store'

import request from 'node-fetch'

const AppContainer = () => {
  const [state, dispatch] = useStore()
  const { rates, isLoading } = state

  console.log({state})

  // TODO: move action logic into separate modules to isolate from view logic
  const onButtonPress = async () => {
    dispatch({ type: FETCH_RATES_PENDING })

    try {
      const res = await request(RATES_URL, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      })
      const jsonData = await res.json()

      dispatch({
        type: FETCH_RATES_SUCCESS,
        rates: jsonData.rates
      })
    } catch (error) {
      dispatch({ type: FETCH_RATES_FAIL, error })
    }
  }

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

export default AppContainer
