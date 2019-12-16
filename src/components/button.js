import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ label, onPress }) => (
  <button
      className="fetch-button"
      onClick={() => onPress()}>
    {label}
  </button>
)

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default Button
