import React from 'react'
import PropTypes from 'prop-types'

const Spinner = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div className="spinner">Loading...</div>
  )
}

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

export default Spinner
