import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'

import Todo from './todo'
import CreateTodoForm from './createForm.js'

import { Container } from 'reactstrap'


const TodoList = ({ firebase, todos }) => {

  return (
    <Container>
      <h2>BusyBee</h2>

      <div>
        {
          !isLoaded(todos)
            ? 'Loading'
            : isEmpty(todos)
              ? 'Nothing to do, have a nice day!'
              : Object.keys(todos).map((key) => (
                <Todo key={key} id={key} todo={todos[key]} />
              ))
        }
      </div>

      <CreateTodoForm />
    </Container>
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
