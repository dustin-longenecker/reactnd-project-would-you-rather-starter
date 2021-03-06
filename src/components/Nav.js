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

      <ul className = 'nav ul'>
        <li className = 'nav li'>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li className = 'nav li'>
          <NavLink to='/new' exact activeClassName='active'>
            New Question
          </NavLink>
        </li>
         <li className = 'nav li'>
          <NavLink to='/leaderboard' exact activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        <li className="right nav li">
          <div>
          <button onClick={this.onLogout} >
            Logout
          </button>
          </div>
        </li>
        <li className="right nav li">{authedUser}</li>

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