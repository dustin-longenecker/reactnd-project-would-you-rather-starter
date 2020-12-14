import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'


class Dashboard extends Component {
  state = {
    showAnswered: false,
  }
  toggleQuestions = (e) => {
    e.preventDefault()
    this.setState({
      showAnswered: !this.state.showAnswered
    })
  }
  
  render() {
    const { questions, authedUser, answered, unanswered } = this.props
    const { showAnswered } = this.state
    


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

function mapStateToProps ({users, questions, authedUser }) {
  let qKeys = Object.keys(questions)
  let aKeys = Object.keys(users[authedUser].answers)
  console.log(qKeys)
  console.log(aKeys)

    let answered = qKeys.filter(f => aKeys.includes(f)) 
    let unanswered = qKeys.filter(f => !aKeys.includes(f))
    

  console.log("answered", answered)
  console.log("unanswered", unanswered)
  
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    questions,
    authedUser,
    answered,
    unanswered
  }
}

export default connect(mapStateToProps)(Dashboard)