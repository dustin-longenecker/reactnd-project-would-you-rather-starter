import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'


class QuestionPage extends Component {
  state = {
    selectedOption : ''
  }
  checkIsAnswered = (authedUser, question) => {
      if(question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)){
        return true
      }
      else {
        return false
      }
  }
  onChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    const { dispatch, question } = this.props
    console.log(this.state.selectedOption)
    const selectedOption = this.state.selectedOption
    dispatch(handleAnswerQuestion(question.id, selectedOption))

    
  }
  render() {
    
    const {authedUser, question, avatarURL} = this.props
    const isAnswered = this.checkIsAnswered(authedUser, question)
    
    const {
      author, optionOne, optionTwo
    } = question
    const optionOneVotes = optionOne.votes.length
    const optionTwoVotes = optionTwo.votes.length
    const voteTotal = optionOneVotes + optionTwoVotes

    return (
      <div>
      { !isAnswered ?
      <div>
        <h1>{author}</h1>
        <img
          src={avatarURL}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
        <form onSubmit={(e) => this.handleSubmit(e)}>
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
          <button type="submit">Submit</button>

        </form>
      </div>
      :
        <div>
          <h1>{author}</h1>
          <img
          src={avatarURL}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
          <div>
            {optionOne.text}
            <p>{Math.floor((optionOneVotes/(voteTotal))*100)}%</p>
            <p>{optionOneVotes} / {voteTotal} votes</p>
            {optionTwo.text}
            <p>{Math.floor((optionTwoVotes/(voteTotal))*100)}%</p>
            <p>{optionTwoVotes} / {voteTotal} votes</p>

          </div>
        </div>
      }

      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
 const { id } = props.match.params
 const question = questions[id]
  const avatarURL = users[question.author].avatarURL
  return {
    question: questions[id],
    avatarURL,
    authedUser,
  }
}

export default connect(mapStateToProps)(QuestionPage)