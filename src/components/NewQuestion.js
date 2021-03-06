import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }
  handleChangeOptionOne = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText,
    }))
  }
   handleChangeOptionTwo = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText,
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: id ? false : true,
    }))
  }
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }


    return (
      <div className='question'>
        <h3 className='center'>Compose new Question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
        <h4>Complete a new question: </h4>
          <input
            placeholder="Option 1?"
            value={optionOneText}
            onChange={this.handleChangeOptionOne}
            maxLength={280}
            className='textarea'
          />
          <span>OR . . . </span>
          <input
            placeholder="Option 2?"
            value={optionTwoText}
            onChange={this.handleChangeOptionTwo}
            maxLength={280}
            className='textarea'

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