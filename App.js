import React from 'react'
import {View} from 'react-native'
import AddEntry from './components/add-entry'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'

class App extends React.Component {
  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{backgroundColor: '#444', padding: 50, minHeight: '100%'}}>
          <AddEntry />
        </View>
      </Provider>
    )
  }
}

export default App
