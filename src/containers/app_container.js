import React from 'react'
import { RATES_URL } from '../constants/endpoints'
import { fetchRates, resetNotifications } from '../actions'
import Button from '../components/button'
import RateTable from '../components/rate_table'
import Spinner from '../components/spinner'
import Notification from './notification_container'
import useStore from '../store'

const AppContainer = () => {
  const [{ rates, isLoading }, dispatch] = useStore()
  const onButtonPress = () => dispatch(fetchRates(RATES_URL))

  return (
    <>
      <header>
        <Notification />
        <Spinner isLoading={isLoading} />
      </header>

      <br />

      <main>
        <h2>Currency Rates</h2>
        <Button
          label="Fetch Rates"
          onPress={onButtonPress}
        />
        <br /><br />
        <RateTable rates={rates} />
      </main>

      <footer>
        <br />
        &copy; 2019
      </footer>
    </>
  )
}

export default AppContainer
