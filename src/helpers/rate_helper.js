export const mapRatesToState = (state, rates) => {
  return Object.keys(rates).reduce((newState, key) => ({
    ...newState,
    [key]: rates[key]
  }), {...state})
}
