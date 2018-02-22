import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import Todo from './todo'
import CreateTodoForm from './createForm.js'

import { Navbar, NavbarBrand, Nav, Button, Container, NavItem, Row, Col, CardColumns } from 'reactstrap'

import 'font-awesome/css/font-awesome.min.css'
import '../App.css'
import { default as Logo } from '../logo.js'


class TodoList extends React.Component {
  
  static propTypes = {
    todos: PropTypes.array,
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
      emptyState = (
        <Row className="loading-state">
            <Col sm={12} className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x"></span>
            </Col>
        </Row>
      )
    } else if (isEmpty(todos)) {
      emptyState = (
        <Row className="loading-state">
            <Col sm={12} className="text-center">
                <p>You are all done, have a nice day!</p>
            </Col>
        </Row>
      )
    } else {
      todoItems = (
        todos.map((todo) => (
          <Todo key={todo.key} id={todo.key} todo={todo.value} />
        ))
      )
    }

    return (
      <Container>

        <CreateTodoForm onRef={ref => (this.createTodoForm = ref)} />

        <Navbar>
          <NavbarBrand>
            <Logo />
            <p className="logo-name">BusyBee</p>
          </NavbarBrand>
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
  firebaseConnect(['todos#orderByChild=status']),
  connect(
    ({ firebase }) => ({
      todos: firebase.ordered.todos,
    })
  )
)(TodoList)
