import React from 'react'
import { firebase } from 'react-redux-firebase'

import { Button, Form, FormGroup, Input, Col, Label, Modal, 
         ModalHeader, ModalFooter, ModalBody } from 'reactstrap'

import STATUS_TYPES from './statusTypes'


class CreateTodoForm extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      title: '',
      titleValid: null,
      status: STATUS_TYPES.IN_PROGRESS,
      description: '',
      dueDate: '',
      modalOpen: false
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  
  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    if (name === "title" && !this.state.titleValid && value.length >= 2) {
      this.setState({
        titleValid: true
      })
    } else if (name === "title" && this.state.titleValid && value.length < 2) {
      this.setState({
        titleValid: false
      })
    }

    this.setState({
      [name]: value
    })
  }
  
  handleSubmit(event) {
    if (this.state.title.length < 2) {
      this.setState({
        titleValid: false
      })
      
      return
    }

    const {firebase} = this.props

    firebase.push('/todos', {
      title: this.state.title,
      status: this.state.status,
      description: this.state.description,
      dueDate: this.state.dueDate
    }).then(() => {
      this.setState({
        title: '',
        titleValid: null,
        status: STATUS_TYPES.IN_PROGRESS,
        description: '',
        dueDate: '',
        modalOpen: false
      })
    })

    event.preventDefault()
  }

  render() {
    return (
      <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
        <ModalHeader>Create New Todo</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="title" sm={3}>Title</Label>
              <Col sm={9}>
                <Input type="text" name="title" placeholder="Title" value={this.state.title} valid={this.state.titleValid} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" sm={3}>Description</Label>
              <Col sm={9}>
                <Input type="textarea" name="description" placeholder="Description" value={this.state.description} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="dueDate" sm={3}>Due Date</Label>
              <Col sm={9}>
                <Input type="date" name="dueDate" placeholder="Due Date" value={this.state.dueDate} onChange={this.handleChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="status" sm={3}>Status</Label>
              <Col sm={9}>
                <Input type="select" name="status" value={this.state.status} onChange={this.handleChange}>
                  <option disabled>Status</option>
                  <option value={STATUS_TYPES.IN_PROGRESS}>In Progress</option>
                  <option value={STATUS_TYPES.IN_QUEUE}>In Queue</option>
                  <option value={STATUS_TYPES.COMPLETED}>Completed</option>
                </Input>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.toggleModal} color="secondary">Cancel</Button>
          <Button onClick={this.handleSubmit} color="primary">Add</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default firebase()(CreateTodoForm)
