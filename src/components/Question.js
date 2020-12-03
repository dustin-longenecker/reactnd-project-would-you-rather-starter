import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  formatDate } from '../utils/_DATA'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  
 
  
  

  render() {
    const { question, avatarURL } = this.props
    if (question === null) {
      return <p>This Question doesn't exist</p>
    }
    const {
      author, timestamp, optionOne, optionTwo, id
    } = question
    
      
    return (
      <div className='center'>
        <img
          src={avatarURL}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
        <div className='question-info center'>
          <div>
            <span>{author}</span>
            <div>{formatDate(timestamp)}</div>
            <p></p>
          </div>
          <div className='question-options center'>
          <h3>Would you rather? </h3>
              <p>{optionOne.text}</p>
              <p>{optionTwo.text}</p>
          </div>
        </div>
      <Link to={`/question/${id}`} className='question'>
      View Details
      </Link>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  const avatarURL = users[question.author].avatarURL
  
  return {
    authedUser,
    avatarURL,
    question: question
      ? question
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Question))