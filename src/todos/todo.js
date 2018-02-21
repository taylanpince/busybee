import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebase } from 'react-redux-firebase'

import { Card, CardHeader, CardText, CardBody, CardLink, CardFooter, FormGroup, Label,
         CardTitle, CardSubtitle, Button, Input, Row, Col } from 'reactstrap'


class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object,
    id: PropTypes.string
  }

  render() {
    const {firebase, todo, id} = this.props

    const deleteTodo = (event) => {
      firebase.remove(`/todos/${id}`)
      
      event.preventDefault()
    }

    const updateTodoStatus = (event) => {
      firebase.set(`/todos/${id}/status`, event.target.value)
      
      event.preventDefault()
    }

    return (
      <Card>
        <CardHeader>{todo.title}</CardHeader>
        <CardBody>
          <CardSubtitle>{todo.dueDate}</CardSubtitle>
          <CardText>{todo.description}</CardText>
      
          <Row>
            <Col sm={9}>
              <Input type="select" bsSize="sm" name="status" value={todo.status} onChange={updateTodoStatus}>
                <option disabled>Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Waiting">Waiting</option>
                <option value="Done">Done</option>
              </Input>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <CardLink href="void(0);" onClick={deleteTodo}>Delete</CardLink>
        </CardFooter>
      </Card>
    )
  }
}

export default firebase()(Todo)
