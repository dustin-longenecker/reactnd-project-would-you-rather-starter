import React, {Component} from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import Login from './Login'
import {removeAuthedUser} from '../actions/authedUser'

class Nav extends Component  {
  onLogout = () => {
    const {dispatch} = this.props
    dispatch(removeAuthedUser())
  }
  render() {
    const { authedUser } = this.props
  return (
    <div>
    { authedUser !== null ?
    <nav className='nav'>

      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' activeClassName='active'>
            New Question
          </NavLink>
        </li>
         <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        <li>


          <div>
          <button onClick={this.onLogout} activeClassName='active'>
            Logout
          </button>
          {authedUser}
          </div>
        </li>

      </ul>

    </nav>
    :
    <Login />
    }
    </div>
  )
  }
}
function mapStateToProps ({ authedUser }) {
  return {
    
    authedUser
  }
}
export default connect(mapStateToProps)(Nav)