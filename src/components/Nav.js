import React from 'react'
import { NavLink } from 'react-router-dom'
import {removeAuthedUser} from '../actions/authedUser'

export default function Nav (authedUser) {
  console.log(authedUser)
  function onLogout () {
    const {dispatch} = this.props
    dispatch(removeAuthedUser())
  }
  return (
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
          { authedUser === null ?
          <NavLink to='/login' activeClassName='active'>
            Login
          </NavLink>
          :
          <div>
          <NavLink to='/login' onClick={onLogout} activeClassName='active'>
            Logout
          </NavLink>
          </div>
        }
        </li>
      </ul>
    </nav>
  )
}