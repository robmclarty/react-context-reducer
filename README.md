# Basic Redux

Create application using data from https://api.exchangeratesapi.io/latest

This repo is a refactor of [Basic Redux](https://github.com/robmclarty/basic-redux) implementing `useContext()` & `useReducer()` in place of Redux.

## Install

- `npm install`
- `npm run build`
- open `/build/index.html` in a browser

NOTE: Build output has been committed to the repository for demonstration
purposes (to show what the expected output looks like). In real-life the
contents of `/build` would be omitted through `.gitignore`.


## Folder Structure

The following structure is overkill for this small of an application, but I've
included it for demonstration's sake. This provides a good set of buckets to
begin to grow the application from scratch up until it reaches the point where
a larger, more sophisticated and complex, structure would be warranted.

```
/assets - static assets like html, images, fonts, etc.
  index.html - main application starting point
/src - react application code  
  /components - dumb/stateless components
  /containers - smart/state-aware components
  /constants - config/global values
  /helpers - utility/helper modules
  /middleware - in-between action=>reducer functions
  /store - context store
  index.js - main React application
/tests - test scripts
/build - target for automated build processes
```


## Example Data

Sample output from https://api.exchangeratesapi.io/latest

```json
{
  "rates": {
    "CAD": 1.4561,
    "HKD": 8.6372,
    "ISK": 137.7,
    "PHP": 55.809,
    "DKK": 7.4727,
    "HUF": 333.37,
    "CZK": 25.486,
    "AUD": 1.6065,
    "RON": 4.7638,
    "SEK": 10.7025,
    "IDR": 15463.05,
    "INR": 78.652,
    "BRL": 4.5583,
    "RUB": 70.4653,
    "HRK": 7.4345,
    "JPY": 120.72    
  },
  "base": "EUR",
  "date": "2019-11-08"
}
```


## Testing

`npm test`

Tests are using Jest and Enzyme as the main frameworks. Babel packages have been
installed to enable the test environment to load ES6 modules.


## Soko

I built a utilitiy library called [Soko](https://github.com/robmclarty/soko) that
I've used to transpile JS and build assets. It uses Browserify with Babel to
handle ES6 syntax. This could alternatively have been replaced with Webpack. I
enjoy CLI scripts that I can integrate with `package.json` using `npx` as I
think it makes configuration a bit cleaner and keeps everything in one place.
