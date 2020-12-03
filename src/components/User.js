import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class User extends Component {
  
  
  

  render() {
    const { user } = this.props
    if( user === null) {
        return <p>This User doesnt exist.</p>
    }

    const {
         name, answers, questions,  avatarURL
    } = user
    console.log(user)
    
      
    return (
      <Link to={``} className='question'>
        <img
          src={avatarURL}
          className='avatar'
          alt='{name}'
        />
        <div className='question-info'>
          <div>
            <span>{name}</span>
            <p></p>
          </div>
          <div>{}</div>
          <div className='user-scores'>
            <div>Created Questions: {questions.length}</div>
            <div>Answered Questions: {Object.keys(answers).length}</div>

          </div>
          <div className='total-score'>
            Total Score: {questions.length + Object.keys(answers).length}
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users}, { id }) {
  const user = users[id]
  return {
    authedUser,
    users,
    user: user
      ? user
      : null
  }
}

export default withRouter(connect(mapStateToProps)(User))