import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Leaderboard from './Leaderboard'
import PageNotFound from './PageNotFound'
import Login from './Login'

import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const {authedUser} = this.props
    console.log(authedUser)
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav authedUser={authedUser} />
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/question/:id' exact component={QuestionPage} />
                  <Route path='/new' exact component={NewQuestion} />
                  <Route path='/leaderboard' exact component={Leaderboard}/>
                  <Route path='/login' exact component={Login}/>
                  <Route path='/404page' exact component={PageNotFound}/>

                </div>
              }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)