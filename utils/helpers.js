import React from 'react'
import glamorous from 'glamorous-native'
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import {red, orange, blue, lightPurp, pink, white} from './colors'

const IconContainer = glamorous.view({
  padding: 5,
  borderRadius: 8,
  width: 50,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 20
})

export function getMetricMetaInfo (metric) {
  const info = {
    run: {
      displayName: 'Run',
      max: 50,
      unit: 'miles',
      step: 1,
      type: 'steppers',
      getIcon () {
        return (
          <IconContainer style={{backgroundColor: red}}>
            <MaterialIcons name='directions-run' color={white} size={35} />
          </IconContainer>
        )
      }
    },
    bike: {
      displayName: 'Bike',
      max: 100,
      unit: 'miles',
      step: 1,
      type: 'steppers',
      getIcon () {
        return (
          <IconContainer style={{backgroundColor: orange}}>
            <MaterialCommunityIcons name='bike' color={white} size={32} />
          </IconContainer>
        )
      }
    },
    swim: {
      displayName: 'Swim',
      max: 9900,
      unit: 'meters',
      step: 100,
      type: 'steppers',
      getIcon () {
        return (
          <IconContainer style={{backgroundColor: blue}}>
            <MaterialCommunityIcons name='swim' color={white} size={35} />
          </IconContainer>
        )
      }
    },
    sleep: {
      displayName: 'Sleep',
      max: 24,
      unit: 'hours',
      step: 1,
      type: 'slider',
      getIcon () {
        return (
          <IconContainer style={{backgroundColor: lightPurp}}>
            <FontAwesome name='bed' color={white} size={30} />
          </IconContainer>
        )
      }
    },
    eat: {
      displayName: 'Eat',
      max: 10,
      unit: 'rating',
      step: 1,
      type: 'slider',
      getIcon () {
        return (
          <IconContainer style={{backgroundColor: pink}}>
            <MaterialCommunityIcons name='food' color={white} size={35} />
          </IconContainer>
        )
      }
    }
  }

  return typeof metric === 'undefined' ? info : info[metric]
}
export function isBetween (num, x, y) {
  if (num >= x && num <= y) {
    return true
  }

  return false
}

export function calculateDirection (heading) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  )
  return todayUTC.toISOString().split('T')[0]
}

export function getDailyReminderValue () {
  return {
    today: "👋 Don't forget to log your data today!"
  }
}
