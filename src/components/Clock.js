import React from 'react'
import PropTypes from 'prop-types'
import '../styles/_clock.styl'

const Clock = ({ duration, sessionName }) => {
  let minutes = duration.get('minutes') || 25
  let seconds = duration.get('seconds') || 0
  seconds = seconds < 10 ? `0${seconds}` : seconds
  return (
    <div className="clock">
      <h2>{sessionName}</h2>
      <h3>{minutes}:{seconds}</h3>
    </div>
  )
}

Clock.propTypes = {
  duration: PropTypes.object.isRequired,
  sesionName: PropTypes.string.isRequired
}

export default Clock
