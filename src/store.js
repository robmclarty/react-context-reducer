import React, { createContext, useContext, useReducer } from 'react'
import { defaultState, reducer } from './reducers'
import apiRequest from './middlewares/api_middleware'

const StoreContext = createContext(defaultState)

// If type of `action` is a function, attach `dispatch`, `apiRequest`,
// and `state` to its function call execution.
const thunk = (state, dispatch) => action => {  
  return typeof action === 'function' ?
    action(dispatch, apiRequest, state) :
    dispatch(action);
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  // The value of the context is an array of 2 elements (mimicking the React
  // hook api):
  // 1. `state` (the current value of the global store)
  // 2. `dispatch` (a function for passing actions to the reducer)
  //
  // NOTE: `dispatch` is actually being modified by the above `thunk()` function
  // such that it is able to be used for composite action creators which require
  // access to `dispatch`, `apiRequest` and `state` internally. These types of
  // action creators are used to dispatch subsequent actions depending on some
  // sort of business logic without needing to pass those arguments manually.
  // This acts as a simple sort of middleware in lieu of Redux's `applyMiddleware()`.
  return (
    <StoreContext.Provider value={[state, thunk(state, dispatch)]}>
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => useContext(StoreContext)

export {
  useStore as default,
  StoreProvider
}
