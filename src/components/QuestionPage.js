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
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
 const { id } = props.match.params

  return {
    id,
    replies: !questions[id]
      ? []
      : questions[id].replies.sort((a,b,) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(QuestionPage)