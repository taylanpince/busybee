import React from 'react'
import { firebase } from 'react-redux-firebase'

import { Button, Form, FormGroup, Input } from 'reactstrap'


class CreateTodoForm extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      category: 'home'
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
      name: this.state.name,
      category: this.state.category,
      done: false
    }).then(() => {
      this.setState({
        name: '',
        category: 'home'
      })
    })

    event.preventDefault()
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Input type="text" name="name" placeholder="Get fresh batteries" value={this.state.name} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Input type="select" name="category" value={this.state.category} onChange={this.handleChange}>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="projects">Projects</option>
          </Input>
        </FormGroup>
        <Button onClick={this.handleSubmit}>
          Add
        </Button>
      </Form>
    )
  }
}

export default firebase()(CreateTodoForm)
