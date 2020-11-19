import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class User extends Component {
  
  
  

  render() {
    const { user, answers } = this.props
   
    console.log(user)
    
      
    return (
      <Link to={``} className='question'>
        <img
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <span>{user.name}</span>
            <p></p>
          </div>
          <div>{}</div>
          <div className='user-scores'>
            <div>Created Questions: {user.questions.length}</div>
            <div>Answered Questions: {answers.length}</div>

          </div>
          <div className='total-score'>
            Total Score: {user.questions.length + answers.length}
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const user = users[id]
  const avatarURL = users[user.id].avatarURL
  const answers = Object.keys(user.answers)
  return {
    authedUser,
    avatarURL,
    answers,
    user: user
      ? user
      : null
  }
}

export default withRouter(connect(mapStateToProps)(User))