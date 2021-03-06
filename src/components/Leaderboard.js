import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'


class Leaderboard extends Component {

  render() {
    return (
      <div className='container'>
        <h3 className='center'>Leaderboard</h3>
        <ul className='center'>
        
          {this.props.usersIds.map((id) => (
            <li key={id}>
              <User id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  
  return {
    usersIds: Object.keys(users)
     .sort((a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length))
  }

}

export default connect(mapStateToProps)(Leaderboard)