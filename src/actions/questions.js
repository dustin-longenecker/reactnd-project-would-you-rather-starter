import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addUserQuestion, saveUserAnswer } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addUserQuestion(authedUser, question.id))
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function answerQuestion ({ id, authedUser, answer }) {
  return {
    type: ANSWER_QUESTION,
    id,
    authedUser,
    answer
  }
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
            .then((question) => {
                dispatch(answerQuestion( qid, authedUser, answer ))
                dispatch(saveUserAnswer(authedUser, qid, answer))
            })
            .then(() => dispatch(hideLoading()))

    }

}