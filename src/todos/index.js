import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import Todo from './todo'
import CreateTodoForm from './createForm.js'

import { CardDeck, Row, Col } from 'reactstrap'


const TodoList = ({ firebase, todos }) => {
  
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
    <Row>
      <Col sm={{ size: 8, offset: 1 }}>
      {emptyState}
  
      <CardDeck>{todoItems}</CardDeck>

      <CreateTodoForm />
      </Col>
    </Row>
  )
}

export default compose(
  firebaseConnect(['todos']),
  connect(
    ({ firebase }) => ({
      todos: firebase.data.todos,
    })
  )
)(TodoList)
