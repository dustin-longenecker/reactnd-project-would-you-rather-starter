import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'

class QuestionPage extends Component {
  state = {
    selectedOption : ''
  }
  
  
  onChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    })

  }
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, question } = this.props
    const selectedOption = this.state.selectedOption

    dispatch(handleAnswerQuestion(question.id, selectedOption))

    
  }
  render() {
    
    const {users,  question} = this.props
    const {optionOne, optionTwo, author } = question
    const avatarURL = users[question.author].avatarURL

    return (
      <div className='question'>
        <h2>{author}</h2>
        <img
          src={avatarURL}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
        <form onSubmit={(e) => this.handleSubmit(e)} className='question-info'>
        
          <h3>Would you rather . . . </h3>
          <input 
          type="radio" 
          id="optionOne" 
          value='optionOne' 
          name="option" 
          onChange={this.onChange}
          />
          <label>{optionOne.text}</label>
          <input 
          type="radio" 
          id="optionTwo" 
          value='optionTwo' 
          name="option" 
          onChange={this.onChange}
          />
          <label>{optionTwo.text}</label>
          <button type="submit" className='btn'>Submit</button>

        </form>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  return {
    users
  }
}

export default connect(mapStateToProps)(QuestionPage)