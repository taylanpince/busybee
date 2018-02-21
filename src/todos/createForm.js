import React from 'react'
import { firebase } from 'react-redux-firebase'

import { Button, Form, FormGroup, Input, Col, Label, Row } from 'reactstrap'


class CreateTodoForm extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      title: '',
      status: '',
      description: '',
      dueDate: ''
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }
  
  handleSubmit(event) {
    const {firebase} = this.props
    
    console.log(this.state)

    firebase.push('/todos', {
      title: this.state.title,
      status: this.state.status,
      description: this.state.description,
      dueDate: this.state.dueDate
    }).then(() => {
      this.setState({
        title: '',
        status: '',
        description: '',
        dueDate: ''
      })
    })

    event.preventDefault()
  }

  render() {
    return (
      <Form>
        <FormGroup row>
          <Label for="title" sm={2}>Title</Label>
          <Col sm={8}>
            <Input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="description" sm={2}>Description</Label>
          <Col sm={8}>
            <Input type="textarea" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="dueDate" sm={2}>Due Date</Label>
          <Col sm={8}>
            <Input type="date" name="dueDate" placeholder="Due Date" value={this.state.dueDate} onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="status" sm={2}>Status</Label>
          <Col sm={8}>
            <Input type="select" name="status" value={this.state.status} onChange={this.handleChange}>
              <option disabled>Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Waiting">Waiting</option>
              <option value="Done">Done</option>
            </Input>
          </Col>
        </FormGroup>
      
        <Row>
          <Col sm={{ size: 'auto', offset: 2 }}>
            <Button onClick={this.handleSubmit}>Add</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default firebase()(CreateTodoForm)
