// Take updated rates and combine them with an existing state.
export const mapRatesToState = (state, rates) => {
  return Object.keys(rates).reduce((newState, key) => ({
    ...newState,
    [key]: rates[key]
  }), {...state})
}
