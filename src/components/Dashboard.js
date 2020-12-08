import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'


class Dashboard extends Component {
  state = {
    showAnswered: false,
    answered: [],
    unanswered: []
  }
  toggleQuestions = (e) => {
    e.preventDefault()
    const changeDisplay = !this.state.showAnswered
    this.setState({
      showAnswered: changeDisplay
    })
  }

  filterAnsweredQuestions = (questions, authedUser) => {
    let filtered = []
    const { questionIds } = this.props
    for (let i = 0; i < questionIds.length; i++) {
      let key = questionIds[i]
      if (questions[key].optionOne.votes.includes(authedUser) || questions[key].optionTwo.votes.includes(authedUser)) {
        filtered.push(questions[key].id)
      }
    }
    return filtered

  }

  filterUnansweredQuestions = (questions, authedUser) => {
    let filtered = []
    const { questionIds } = this.props
    for (let i = 0; i < questionIds.length; i++) {
      let key = questionIds[i]
      if (!questions[key].optionOne.votes.includes(authedUser) && !questions[key].optionTwo.votes.includes(authedUser)) {
        filtered.push(questions[key].id)
      }
    }
    return filtered
  }
  
  render() {
    const { questions, authedUser } = this.props
    const { showAnswered } = this.state
    const answered = this.filterAnsweredQuestions(questions, authedUser) || []
    const unanswered = this.filterUnansweredQuestions(questions, authedUser) || []

    return (
      <div className="center">
        <div>
          <h3 className='center'>Would You Rather?</h3>
          <div className='center'>
            <button onClick={(e) => {this.toggleQuestions(e)}} disabled= {!showAnswered}>Unanswered</button>

            <button onClick={(e) => {this.toggleQuestions(e)}} disabled= {showAnswered}>Answered</button>
          </div>

        </div>
        { showAnswered === true ?
          <div className='answered-questions'>
            <h2 className='answered-title'>Answered Questions</h2>
            {
              answered.map((id) => (
                  <Question
                      id={id}
                      key={id}
                  />
              ))
            }
          </div> 
          :
          <div className='unanswered-questions'>
            <h2 className='unanswered-title'>Unanswered Questions</h2>
            {
              unanswered.map((id) => (
                  <Question
                      id={id}
                      key={id}
                  />
              ))
            }
          </div>
        }

      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser }) {
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    questions,
    authedUser
  }
}

export default connect(mapStateToProps)(Dashboard)