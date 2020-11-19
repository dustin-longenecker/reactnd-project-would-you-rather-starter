import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'


class Leaderboard extends Component {
      


  render() {
    return (
      <div>
        <h3 className='center'>Leaderboard</h3>
        <ul className='dashboard-list'>
        
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
  }
}

export default connect(mapStateToProps)(Leaderboard)