import { useEffect, useState, useMemo } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { Col } from 'react-bootstrap'
import ActivityListItem from './ActivityListItem'
import ProfessorService from '../../../services/professor.service'
import Loader from '../../general/Loader/Loader'
import { ERROR_OCCURRED } from '../../../utils/constants'

// note: currently the list assumes we can only manually grade File Tasks - this is due to the way our DB currently works,
// an ID is unique only in the task group. we might need to add a field that lets us know which task type it is
// on the backend if we want to check other types of activities in the future

export default function ActivityAssessmentList() {
  const [activityList, setActivityList] = useState(undefined)

  useEffect(() => {
    ProfessorService.getTasksToEvaluateList()
      .then((activityList) => {
        Promise.allSettled(
          activityList
            ?.filter((activity) => activity.toGrade !== 0)
            .map((activity) => {
              return ProfessorService.getFirstTaskToEvaluate(activity.activityId).then((response) => {
                return {
                  activity: response,
                  toGrade: activity.toGrade
                }
              })
            })
        ).then((response) => {
          setActivityList(
            response[0]?.status === 'rejected'
              ? null
              : response?.map((activity) => {
                  return {
                    activity: activity.value
                  }
                })
          )
        })
      })
      .catch(() => {
        setActivityList(null)
      })
  }, [])

  const colContent = useMemo(() => {
    if (activityList === undefined) {
      return <Loader />
    }
    if (activityList === null) {
      return <p className={'text-center text-danger h4'}>{ERROR_OCCURRED}</p>
    }
    if (activityList.length > 0 && activityList.filter((activity) => activity.toGrade > 0)) {
      return activityList.map((activity) => {
        const listActivity = activity.activity.activity
        const toGrade = activity.activity.toGrade
        return <ActivityListItem key={listActivity.activityName} activity={listActivity} toGrade={toGrade} />
      })
    }
    return <p className={'text-center'}>Brak aktywności do sprawdzenia!</p>
  }, [activityList])

  return (
    <Content>
      <h1 style={{ marginLeft: '20px', paddingTop: '20px' }}>Aktywności do sprawdzenia</h1>
      <Col style={{ paddingTop: '50px' }}>{colContent}</Col>
    </Content>
  )
}
