import React from 'react'
import {View} from 'react-native'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
// import AddEntry from './components/add-entry'
import History from './components/history'

class App extends React.Component {
  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <View style={{height: 25}} />
          <History />
          {/* <AddEntry /> */}
        </View>
      </Provider>
    )
  }
}

export default App
