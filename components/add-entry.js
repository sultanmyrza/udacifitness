import React, {Component} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {connect} from 'react-redux'
import {Ionicons} from '@expo/vector-icons'
import UdaciSlider from './udaci-slider'
import UdaciSteppers from './udaci-steppers'
import DateHeader from './date-header'
import TextButton from './text-button'
import {addEntry} from '../actions'
import {submitEntry, removeEntry} from '../utils/api'
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue
} from '../utils/helpers'

class AddEntry extends Component {
  state = {run: 0, bike: 0, swim: 0, sleep: 0, eat: 0}

  increment = metric => {
    this.setState(state => {
      const {max, step} = getMetricMetaInfo(metric)
      const count = state[metric] + step
      return {[metric]: count > max ? max : count}
    })
  }

  decrement = metric => {
    this.setState(state => {
      const count = state[metric] - getMetricMetaInfo(metric).step
      return {[metric]: count < 0 ? 0 : count}
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({[metric]: value}))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.setState(() => ({run: 0, bike: 0, swim: 0, sleep: 0, eat: 0}))

    // Update Redux
    this.props.addEntry({[key]: entry})

    // Navigate to home

    // Save to "DB"
    submitEntry({key, entry})

    // Clear local notification
  }

  reset = () => {
    const key = timeToString()

    // Update Redux
    this.props.addEntry({[key]: getDailyReminderValue()})

    // Navigate to home

    // Save to "DB"
    removeEntry(key)
  }

  render () {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name={'ios-happy-outline'} size={100} />
          <Text>You already logged your information for today.</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={new Date().toLocaleDateString()} />
        {Object.keys(metaInfo).map(key => {
          const {getIcon, type, ...rest} = metaInfo[key]
          const value = this.state[key]
          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider' ? (
                <UdaciSlider
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <UdaciSteppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          )
        })}
        <SubmitButton onPress={this.submit} />
      </View>
    )
  }
}

function mapStateToProps (state) {
  const key = timeToString()
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps, {addEntry})(AddEntry)

function SubmitButton ({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}