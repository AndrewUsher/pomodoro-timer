import React, { Component, Fragment } from 'react'
import Clock from '../components/Clock'
import moment from 'moment'
import Controls from '../components/Controls'

class Timer extends Component {
  state = {
    sessionName: 'Tomato Time!',
    sessionCount: 0,
    breakDuration: moment.duration(5, 'minutes'),
    breakDurationInput: moment.duration(5, 'minutes').get('minutes'),
    workDuration: moment.duration(25, 'minutes'),
    workDurationInput: moment.duration(25, 'minutes').get('minutes'),
    beginningTime: moment.duration(25, 'minutes'),
    timeRemaining: moment.duration(25, 'minutes'),
    timeChangeInterval: null
  }

  durationChanged = (event) => {
    const { name, value } = event.target
    // Set session duration values
    if (name === 'workDuration') {
      this.setState({
        beginningTime: moment.duration(parseInt(value, 10), 'minutes'),
        timeRemaining: moment.duration(parseInt(value, 10), 'minutes')
      })
    }
    this.setState({
      [name]: moment.duration(parseInt(value, 10), 'minutes'),
      [`${name}Input`]: value
    })
  }

  displayTimeRemaining = () => {
    const { timeRemaining } = this.state
    // Switch between sessions if no time is left: subtract 1 second otherwise
    if (timeRemaining === 0) {
      this.switchPhase()
    } else {
      this.getTimeRemaining()
    }
  }

  getTimeRemaining = () => {
    const { timeRemaining } = this.state
    const newTime = timeRemaining.subtract(1, 'second')

    this.setState({
      timeRemaining: newTime
    })
  }

  switchPhase = () => {
    // Get session work and rest durations
    const { breakDuration, workDuration, sessionCount } = this.state

    // Change time remaining between work and break duration
    let timeRemaining = sessionCount % 2 === 0 ? breakDuration : workDuration

    // Increment session count and add new time remaining
    this.setState(prevState => ({
      sessionCount: prevState.timeRemaining + 1,
      timeRemaining: moment.duration(timeRemaining, 'minutes')
    }))
  }

  toggleTimer = () => {
    const { timeChangeInterval, workDuration } = this.state

    // Clear interval if timer is stopped: start new session otherwise
    if (!timeChangeInterval) {
      this.getTimeRemaining()
      this.setState({
        timeChangeInterval: setInterval(this.displayTimeRemaining, 1000)
      })
    } else {
      clearInterval(timeChangeInterval)
      this.setState({
        timeChangeInterval: null,
        sessionName: '',
        timeRemaining: moment.duration(parseInt(workDuration, 10), 'minutes')
      })
    }
  }

  render () {
    const { breakDurationInput, workDurationInput, timeRemaining, sessionName, timeChangeInterval } = this.state

    return (
      <Fragment>
        <Clock
          duration={timeRemaining}
          sessionName={sessionName}
        />
        <Controls
          onChange={this.durationChanged}
          breakVal={breakDurationInput}
          workVal={workDurationInput}
          isRunning={timeChangeInterval}
          toggleTimer={this.toggleTimer}
        />
      </Fragment>

    )
  }
}

export default Timer
