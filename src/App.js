import React, { Component } from 'react'
import { Provider } from 'react-redux'

import TodoList from './todos'
import configureStore from './store'


const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)


class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <TodoList />
      </Provider>
    )
  }
}

export default App;
