import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebase } from 'react-redux-firebase'

import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap'


class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object,
    id: PropTypes.string
  }

  render() {
    const {firebase, todo, id} = this.props

    const toggleDone = () => {
      firebase.set(`/todos/${id}/done`, !todo.done)
    }

    const deleteTodo = (event) => {
      firebase.remove(`/todos/${id}`)
    }

    return (
      <Card>
        <CardBody>
          <CardTitle>{todo.name}</CardTitle>
          <CardSubtitle>{todo.category}</CardSubtitle>
          <Button color='danger' onClick={deleteTodo}>
            Delete
          </Button>
        </CardBody>
      </Card>
    )
  }
}

export default firebase()(Todo)
