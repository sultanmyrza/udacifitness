import React, {Component} from 'react'
import {View, Platform, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import glamorous from 'glamorous-native'
import {AppLoading} from 'expo'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import {receiveEntries, addEntry} from '../actions'
import {timeToString, getDailyReminderValue} from '../utils/helpers'
import {fetchCalendarResults} from '../utils/api'
import {white} from '../utils/colors'
import DateHeader from './date-header'
import MetricCard from './metric-card'

class History extends Component {
  state = {ready: false}

  componentDidMount () {
    fetchCalendarResults()
      .then(entries => this.props.receiveEntries(entries))
      .then(({entries}) => {
        if (!entries[timeToString()]) {
          this.props.addEntry({[timeToString()]: getDailyReminderValue()})
        }
      })
      .then(() => this.setState({ready: true}))
  }

  render () {
    if (this.state.ready === false) {
      return <AppLoading />
    }

    return (
      <UdaciFitnessCalendar
        items={this.props.entries}
        renderItem={Item}
        renderEmptyDate={EmptyDate}
      />
    )
  }
}

const mapStateToProps = entries => ({entries})
const actions = {receiveEntries, addEntry}
export default connect(mapStateToProps, actions)(History)

const Item = ({today, ...metrics}, formattedDate, key) => (
  <ItemEl>
    {today ? (
      <View>
        <DateHeader date={formattedDate} />
        <NoDataText>{today}</NoDataText>
      </View>
    ) : (
      <TouchableOpacity onPress={() => console.log('Pressed!')}>
        <MetricCard date={formattedDate} metrics={metrics} />
      </TouchableOpacity>
    )}
  </ItemEl>
)

const EmptyDate = formattedDate => (
  <ItemEl>
    <DateHeader date={formattedDate} />
    <NoDataText>You didn't log any data on this day.</NoDataText>
  </ItemEl>
)

const ItemEl = glamorous.view({
  backgroundColor: white,
  padding: 20,
  marginLeft: 10,
  marginRight: 10,
  marginTop: 17,
  justifyContent: 'center',
  shadowRadius: 3,
  shadowOpacity: 0.8,
  shadowColor: 'rgba(0, 0, 0, 0.24)',
  shadowOffset: {width: 0, height: 3},
  ...Platform.select({
    ios: {borderRadius: 16},
    android: {borderRadius: 2}
  })
})

const NoDataText = glamorous.text({
  fontSize: 20,
  paddingTop: 20,
  paddingBottom: 20
})
