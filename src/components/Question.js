import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  formatDate } from '../utils/_DATA'
import { handleToggleQuestion } from '../actions/questions'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  handleLike = (e) => {
    e.preventDefault()

    const { dispatch, question, authedUser } = this.props

    dispatch(handleToggleQuestion({
      id: question.id,
      hasLiked: question.hasLiked,
      authedUser
    }))
  }
 
  
  

  render() {
    const { question, avatarURL } = this.props
    if (question === null) {
      return <p>This Question doesn't exist</p>
    }
    const {
      author, timestamp, optionOne, optionTwo, id
    } = question
    
      
    return (
      <Link to={`/question/${id}`} className='question'>
        <img
          src={avatarURL}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <span>{author}</span>
            <div>{formatDate(timestamp)}</div>
            <p></p>
          </div>
          <div>{id}</div>
          <div className='question-options'>
           <form>
              <input type="radio" name="option-one"  value="optionOne"  /> 
              {optionOne.text}
              <input type="radio" name="option-two"  value="optionTwo"  /> 
              {optionTwo.text}
          </form>
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  const avatarURL = users[question.author].avatarURL
  const questionsArr = Object.keys(questions);
  
  return {
    authedUser,
    avatarURL,
    replies: !questionsArr[id]
      ? []
      : questionsArr[id].replies.sort((a,b,) => questionsArr[b].timestamp - questionsArr[a].timestamp),
    question: question
      ? question
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Question))