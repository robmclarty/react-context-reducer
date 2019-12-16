import React from 'react'
import PropTypes from 'prop-types'

const RateTable = ({ rates }) => {
  if (Object.keys(rates).length === 0) return null

  return (
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(rates).map(key => {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{rates[key]}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

RateTable.propTypes = {
  rates: PropTypes.objectOf(PropTypes.number)
}

export default RateTable
