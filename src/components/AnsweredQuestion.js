import React, { Component } from 'react'
import { connect } from 'react-redux'


class AnsweredQuestion extends Component {
  
  
  render() {
    const {users, authedUser, question} = this.props
    console.log(question)
    const avatarURL = users[question.author].avatarURL

    
    const {
      author, optionOne, optionTwo
    } = question
    const optionOneVotes = optionOne.votes.length
    const optionTwoVotes = optionTwo.votes.length
    const voteTotal = optionOneVotes + optionTwoVotes

    return (
      
        <div className='question'>
          <h1>{author}</h1>
          <img
          src={avatarURL}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
          
          <div className='question-info'>
          <h3>Would you rather . . . </h3>
          
            <p>{optionOne.text}</p>
            <p>{(optionOneVotes/(voteTotal)*100)}%</p>
            <p>{optionOneVotes} / {voteTotal} votes</p>
            {question.optionOne.votes.includes(authedUser) ?
              <p>{ authedUser } seleted this option </p> : <p></p>
            }
            <p>{optionTwo.text}</p>
            <p>{(optionTwoVotes/(voteTotal)*100)}%</p>
            <p>{optionTwoVotes} / {voteTotal} votes</p>
            {question.optionTwo.votes.includes(authedUser) ?
              <p>{ authedUser } seleted this option </p> : <p></p>
            }

          </div>
        </div>

    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(AnsweredQuestion)