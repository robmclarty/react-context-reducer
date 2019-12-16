import React from 'react'
import { render } from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import apiMiddleware from './middleware/api_middleware'
import appReducer from './reducers'
import AppContainer from './containers/app_container'

// If Chrome devToolsExtension exists, hook it up as middleware.
const devTools = window.devToolsExtension ?
  window.devToolsExtension() :
  f => f

// Combine middlewares together.
const middlewares = compose(
  applyMiddleware(apiMiddleware),
  devTools
)

// Create store from app's reducers combined with middlewares.
const store = createStore(appReducer, middlewares)

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app-root') // defined in `/assets/index.html`
)
