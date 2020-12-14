import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestion from './UnansweredQuestion'


class QuestionPage extends Component {
  
  render() {
    
    const {authedUser, question} = this.props
   
    return (
      <div>
      { !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser) ?
        <UnansweredQuestion question={question}/>
      :
        <AnsweredQuestion question={question} />
      }

      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
 const { id } = props.match.params
 const question = questions[id]
 const avatarURL = users[question.author].avatarURL
  return {
    question: questions[id],
    avatarURL,
    authedUser,
  }
}

export default connect(mapStateToProps)(QuestionPage)