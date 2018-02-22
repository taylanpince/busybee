import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebase } from 'react-redux-firebase'

import { Card, CardHeader, CardText, CardBody, CardLink, CardFooter,
         CardSubtitle, Input, Row, Col } from 'reactstrap'

import STATUS_TYPES from './statusTypes'


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
    
    let cardColor = 'primary'
    
    switch (todo.status) {
    case STATUS_TYPES.IN_PROGRESS:
      cardColor = 'danger'
      break
    case STATUS_TYPES.IN_QUEUE:
      cardColor = 'warning'
      break;
    case STATUS_TYPES.COMPLETED:
      cardColor = 'secondary'
      break;
    default:
      break
    }

    return (
      <Card outline color={cardColor}>
        <CardHeader>{todo.title}</CardHeader>
        <CardBody>
          <CardSubtitle>{todo.dueDate}</CardSubtitle>
          <CardText>{todo.description}</CardText>
    
          <Row>
            <Col sm={9}>
              <Input type="select" bsSize="sm" name="status" value={todo.status} onChange={updateTodoStatus}>
                <option disabled>Status</option>
                <option value={STATUS_TYPES.IN_PROGRESS}>In Progress</option>
                <option value={STATUS_TYPES.IN_QUEUE}>In Queue</option>
                <option value={STATUS_TYPES.COMPLETED}>Completed</option>
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
