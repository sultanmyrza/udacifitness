import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

function UdaciSteppers ({max, unit, step, value, onIncrement, onDecrement}) {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={onDecrement}>
          <FontAwesome name='minus' size={30} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement}>
          <FontAwesome name='plus' size={30} color={'black'} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}

export default UdaciSteppers
