import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ClosedQuestionPage from './ClosedQuestionPage/ClosedQuestionPage'
import { ERROR_OCCURRED, QuestionType } from '../../../../../utils/constants'
import Loader from '../../../../general/Loader/Loader'
import { ContentWithBackground } from './QuestionAndOptionsStyle'
import OpenQuestionPage from './OpenQuestionPage/OpenQuestionPage'
import ExpeditionService from '../../../../../services/expedition.service'
import { StudentRoutes } from '../../../../../routes/PageRoutes'

function QuestionAndOptions(props) {
  const [question, setQuestion] = useState(undefined)
  const navigate = useNavigate()
  const location = useLocation()
  const { activityId: expeditionId, nodeId: questionId, taskResultId } = location.state
  const remainingTime = props.remainingTime

  useEffect(() => {
    if (expeditionId == null || questionId == null || taskResultId == null) {
      navigate(StudentRoutes.GAME_CARD)
    } else {
      ExpeditionService.getQuestion(questionId)
        .then((response) => setQuestion(response ?? null))
        .catch(() => setQuestion(null))
    }
  }, [questionId, expeditionId, navigate, taskResultId])

  // complete the expedition and record user responses if the expedition has not been completed
  // before the timer runs out
  useEffect(() => {
    if (remainingTime === 0) {
      ExpeditionService.setSendTime(taskResultId, Date.now())
        .then(() => {
          navigate(StudentRoutes.GAME_MAP.GRAPH_TASK.SUMMARY, {
            state: {
              expeditionId: expeditionId,
              remainingTime: remainingTime,
              taskResultId: taskResultId
            }
          })
        })
        .catch(() => {})
    }
  }, [expeditionId, navigate, remainingTime, taskResultId])

  return (
    <ContentWithBackground>
      {question === undefined ? (
        <Loader />
      ) : question == null ? (
        <p className={'text-center text-danger h3'}>{ERROR_OCCURRED}</p>
      ) : (
        <>
          {question.type === QuestionType.OPEN_QUESTION ? (
            <OpenQuestionPage expeditionId={expeditionId} question={question} taskResultId={taskResultId} />
          ) : (
            <ClosedQuestionPage expeditionId={expeditionId} question={question} taskResultId={taskResultId} />
          )}
        </>
      )}
    </ContentWithBackground>
  )
}

export default QuestionAndOptions
