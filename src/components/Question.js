import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/_DATA'
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
  filterAnswered = (questions) => {
    return questions.filter((question) =>{
      question.isAnswered === true
    })

  }
  render() {
    const { question } = this.props
    if (question === null) {
      return <p>This Question doesn't exist</p>
    }
    const {
      author, avatarURL, timestamp, optionOne, optionTwo, id
    } = question
      console.log(this.props)
      
    return (
      <Link to={`/question/${id}`} className='question'>
        <img
          src={avatarURL}
          alt={`Avatar of ${author}`}
          className='avatar'
        />
        <div className='question-info'>
          <div>
            <span>{author}</span>
            <div>{formatDate(timestamp)}</div>
            <p></p>
          </div>
          <div>{question.id}</div>
          <div className='question-options'>
           <form>
              <input type="radio" name="option-one"  value="optionOne"  /> 
              {optionOne.text}
              <input type="radio" name="option-two"  value="optionTwo"  /> 
              {optionTwo.text}
          </form>
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  return {
    authedUser,
    question: question
      ? formatQuestion(question.optionOne.text, question.optionTwo.text , users[question.author])
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Question))