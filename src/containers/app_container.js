import React from 'react'

//import { fetchRates } from '../actions'
import { RATES_URL } from '../constants/endpoints'
import { FETCH_RATES_SUCCESS } from '../constants/action_types'
import Button from '../components/button'
import RateTable from '../components/rate_table'
import Spinner from '../components/spinner'
//import Notification from './notification_container'
import useStore from '../store'

const AppContainer = () => {
  const [state, dispatch] = useStore()
  const { rates, isLoading } = state

  console.log({state})

  const onButtonPress = e => dispatch({
    type: FETCH_RATES_SUCCESS,
    rates: {"CAD":1.4621,"HKD":8.6856,"ISK":136.8,"PHP":56.421,"DKK":7.4731,"HUF":329.01,"CZK":25.483,"AUD":1.6177,"RON":4.7791,"SEK":10.4213,"IDR":15609.97,"INR":79.1063,"BRL":4.5491,"RUB":69.8317,"HRK":7.4401,"JPY":121.97,"THB":33.689,"CHF":1.0953,"SGD":1.5096,"PLN":4.2657,"BGN":1.9558,"TRY":6.519,"CNY":7.8025,"NOK":10.028,"NZD":1.6859,"ZAR":16.1305,"USD":1.1146,"MXN":21.2022,"ILS":3.8922,"GBP":0.83415,"KRW":1304.67,"MYR":4.6167}
  })

  return (
    <div>
      <header>
        {/*<Notification />
          */}
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
