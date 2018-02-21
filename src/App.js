import React, { Component } from 'react'
import { Provider } from 'react-redux'

import TodoList from './todos'
import configureStore from './store'
import { Navbar, NavbarBrand, Nav, Button, Container, NavItem } from 'reactstrap'


const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)


class App extends Component {
  
  launchAddModal(event) {
    event.preventDefault()
  }
  
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Navbar>
            <NavbarBrand href="/">BusyBee</NavbarBrand>
            <Nav navbar>
              <NavItem>
                <Button onClick={this.launchAddModal}>Add Todo</Button>
              </NavItem>
            </Nav>
          </Navbar>

          <TodoList />
        </Container>
      </Provider>
    )
  }
}

export default App;
