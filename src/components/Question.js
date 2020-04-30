import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleToggleQuestion } from '../actions/questions'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  handleLike = (e) => {
    e.preventDefault()

    const { dispatch, question, authedUser } = this.props

    dispatch(handleToggleQuestion({
      id: question.id,
      hasLiked: question.hasLiked,
      authedUser
    }))
  }
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/question/${id}`)
  }
  viewPoll = (e, id) => {
    
  }
  render() {
    const { question } = this.props
    if (question === null) {
      return <p>This Question doesn't exist</p>
    }
    const {
      name, avatar, timestamp, optionOne, optionTwo, id, parent
    } = question

    return (
      <Link to={`/question/${id}`} className='question'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            
            <p></p>
          </div>
          <div></div>
          <div className='question-options'>

           <form>
              <input type="radio" name="option-one"  value="optionOne"  /> 
              {optionOne.text}
              <input type="radio" name="option-two"  value="optionTwo"  /> 
              {optionTwo.text}
          </form>
            <div><button >View Poll</button></div>
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  const parentQuestion = question ? questions[question.isAnswered] : null
  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser, parentQuestion)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Question))