import React from 'react'
import PropTypes from 'prop-types'
import '../styles/_controls.styl'

const Controls = ({ onChange, breakVal, workVal, toggleTimer, isRunning }) => {
  return (
    <div className="cockpit">
      <div className="controls">
        <div className="control">
          <label htmlFor="break-value">Break Time</label>
          <input type="number" name="breakDuration" id="break-value" value={breakVal} onChange={onChange} />
        </div>
        <div className="control">
          <label htmlFor="session-value">Session Time</label>
          <input type="number" name="workDuration" id="session-value" value={workVal} onChange={onChange} />
        </div>
      </div>
      <div className="center">
        <button onClick={toggleTimer}>{isRunning === null ? 'Start' : 'Stop'} Timer</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  onChange: PropTypes.func.isRequired,
  breakVal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  workVal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  toggleTimer: PropTypes.func.isRequired
}

export default Controls
