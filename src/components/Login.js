import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {setAuthedUser} from '../actions/authedUser.js'


class Login extends Component {
  state = {
    selectedOption: null
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(setAuthedUser(this.state.selectedOption))
    return    <Redirect  to="/" />

  }
  handleChange = (e) => {
    this.setState({
      selectedOption: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h3 className='login'>Login</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
            <select
                defaultValue='none'
                onChange={(e) => this.handleChange(e)}
            >
                <option value='none' disabled> Select User </option>
                <option value='sarahedo'>Sarah Edo</option>
                <option value='tylermcginnis'>Tyler McGinnis</option>
                <option value='johndoe'>John Doe</option>
            </select>
            <button type='submit'>Login</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(Login)