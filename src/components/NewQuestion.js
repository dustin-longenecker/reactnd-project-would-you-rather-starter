import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }
  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value
    console.log(e.target)

    this.setState(() => ({
      optionOne,
    }))
  }
   handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value
    console.log(e.target)

    this.setState(() => ({
      optionTwo,
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: id ? false : true,
    }))
  }
  render() {
    const { optionOne, optionTwo, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }


    return (
      <div>
        <h3 className='center'>Compose new Question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
        <h4>Complete a new question: </h4>
          <input
            placeholder="Option 1?"
            value={optionOne}
            onChange={this.handleChangeOptionOne}
            maxLength={280}
          />
          <span>OR . . . </span>
          <input
            placeholder="Option 2?"
            value={optionTwo}
            onChange={this.handleChangeOptionTwo}
            maxLength={280}
          />
          
          <button
            className='btn'
            type='submit'
            >
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)