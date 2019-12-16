// NOTE: While the fetch API is built into modern browsers these days, I chose
// to use 'node-fetch' simply to make the interface consistent without assuming
// the user-agent has the fetch API available. This could be easily swapped out
// for something else since it is isolated to this single module and the app
// proper is only aware of the `callApi()` function that is returned here.
import request from 'node-fetch'

// Make an HTTP request to the given `url` and return the resulting JSON,
// otherwise throw an error message.
//
// TODO: Could add more logic here to make this function more generic so it
// could handle different HTTP verbs and take a request body with some
// different headers. But for this use-case test scenario, I'm keeping it
// pretty basic ;)
const callApi = async ({
  url = '',
  method = 'GET'
}) => {
  const options = {
    method,
    headers: { 'Accept': 'application/json' }
  }

  try {
    const res = await request(url, options)
    const jsonData = await res.json()

    return jsonData
  } catch (err) {
    throw err.message
  }
}

// If an action returns a function instead of an object, apply this middleware
// which provides a function with 3 properties: dispatch, callApi, and getState.
const thunk = ({ dispatch, getState }) => next => action => {
  return typeof action === 'function' ?
    action(dispatch, callApi, getState) :
    next(action);
}

export default thunk
