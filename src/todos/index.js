import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import Todo from './todo'
import CreateTodoForm from './createForm.js'

import { CardColumns, Navbar, NavbarBrand, Nav, Button, Container, NavItem } from 'reactstrap'


class TodoList extends React.Component {
  
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }
  
  constructor(props) {
    super(props)
    
    this.createTodoForm = null
    this.toggleFormModal = this.toggleFormModal.bind(this);
  }
  
  toggleFormModal() {
    this.createTodoForm.toggleModal()
  }

  render() {
    const { todos } = this.props

    let emptyState = null
    let todoItems = null

    if (!isLoaded(todos)) {
      emptyState = 'Loading'
    } else if (isEmpty(todos)) {
      emptyState = 'You are all done, have a nice day!'
    } else {
      todoItems = (
        Object.keys(todos).map((key) => (
          <Todo key={key} id={key} todo={todos[key]} />
        ))
      )
    }

    return (
      <Container>

        <CreateTodoForm onRef={ref => (this.createTodoForm = ref)} />

        <Navbar>
          <NavbarBrand>BusyBee</NavbarBrand>
          <Nav navbar>
            <NavItem>
              <Button onClick={this.toggleFormModal} color="primary">New Todo</Button>
            </NavItem>
          </Nav>
        </Navbar>
      
        {emptyState}

        <CardColumns>{todoItems}</CardColumns>

      </Container>
    )
  }
}

export default compose(
  firebaseConnect(['todos']),
  connect(
    ({ firebase }) => ({
      todos: firebase.data.todos,
    })
  )
)(TodoList)
