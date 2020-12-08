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
    this.setState({
      showAnswered: !this.state.showAnswered
    })
  }

  

  filterQuestions = (questions, authedUser) => {
    let unanswered = []
    let answered = []
    
    for(let qid in questions){
      let qOne = questions[qid][1].optionOne.votes.includes(authedUser)
      let qTwo = questions[qid][1].optionTwo.votes.includes(authedUser)
      if(!qOne && !qTwo){
        unanswered.push(questions[qid][1].id)
      }else if (qOne || qTwo){
        answered.push(questions[qid][1].id)
        
      }
    }
    return {answered, unanswered}
    
  }
  
  render() {
    const { questions, authedUser } = this.props
    const { showAnswered, unanswered, answered} = this.state
    let filteredQuestions = this.filterQuestions(questions, authedUser)
    console.log(answered)
    console.log(unanswered)

    //const answered = this.filterAnsweredQuestions(questions, authedUser) || []
    //const unanswered = this.filterUnansweredQuestions(questions, authedUser) || []

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
              filteredQuestions.answered.map((id) => (
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
              filteredQuestions.unanswered.map((id) => (
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
    questions: Object.entries(questions),
    authedUser
  }
}

export default connect(mapStateToProps)(Dashboard)