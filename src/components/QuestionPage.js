import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import NewQuestion from './NewQuestion'

class QuestionPage extends Component {
  render() {
    const { id, replies } = this.props
    return (
      <div>
        <Question id={id} />
        <NewQuestion id={id} />
        
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
 
}

export default connect(mapStateToProps)(QuestionPage)