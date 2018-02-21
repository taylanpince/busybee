import React from 'react'
import { firebase } from 'react-redux-firebase'

import { Button, Form, FormGroup, Input } from 'reactstrap'


class CreateTodoForm extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      category: ''
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
    console.log(this.state)
    // return firebase.push('/todos', {
    //   name: this.input.value,
    //   dueDate:
    //   done: false
    // }).then(() => {
    //   this.input.value = ''
    // })
    event.preventDefault()
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Input type='text' name='name' placeholder='Get fresh batteries' value={this.state.name} onChange={this.handleChange} />
        </FormGroup>
        <Button>
          Add
        </Button>
      </Form>
    )
  }
}

export default firebase()(CreateTodoForm)
