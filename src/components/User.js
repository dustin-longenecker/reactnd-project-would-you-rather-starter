import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class User extends Component {
  
  
  

  render() {
    const { user, totalAs, totalQs} = this.props
    if( user === null) {
        return <p>This User doesnt exist.</p>
    }

    const {
         name, avatarURL
    } = user
    
      
    return (
      <div>
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
          <div className='user-scores'>
            <div>Created Questions: {totalQs}</div>
            <div>Answered Questions: {totalAs}</div>

          </div>
          <div className='total-score'>
            Total Score: {totalAs + totalQs}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users}, { id }) {
  console.log(id)
  console.log(users)

  const user = users[id]
  return {
    totalQs: user.questions.length,
    totalAs: Object.keys(user.answers).length,
    authedUser,
    users,
    user: user
      ? user
      : null
  }
}

export default withRouter(connect(mapStateToProps)(User))