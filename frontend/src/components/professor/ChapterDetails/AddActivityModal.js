import React, { useCallback, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Tab } from 'react-bootstrap'
import { TabsContainer } from '../ParticipantsPage/ParticipantsStyles'
import { Activity, getActivityTypeName } from '../../../utils/constants'
import AddGraphTask from './AddActivity/AddGraphTask'
import AddCombatTask from './AddActivity/AddCombatTask'
import AddInfoTask from './AddActivity/AddInfoTask'
import AddSurveyTask from './AddActivity/AddSurveyTask'

function AddActivityModal(props) {
  const activities = Object.keys(Activity)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const getActivityTab = useCallback(
    (activityType) => {
      const onCancel = () => props.setShow(false)
      const onSuccess = () => {
        props.setShow(false)
        setIsSuccessModalOpen(true)
      }

      switch (activityType) {
        case Activity.EXPEDITION:
          return <AddGraphTask chapterId={props.chapterId} onSuccess={onSuccess} onCancel={onCancel} />
        case Activity.TASK:
          return <AddCombatTask chapterId={props.chapterId} onSuccess={onSuccess} onCancel={onCancel} />
        case Activity.INFO:
          return <AddInfoTask chapterId={props.chapterId} onSuccess={onSuccess} onCancel={onCancel} />
        case Activity.SURVEY:
          return <AddSurveyTask chapterId={props.chapterId} onSuccess={onSuccess} onCancel={onCancel} />
        default:
          return <></>
      }
    },
    [props]
  )

  const onSuccessModalClose = () => {
    setIsSuccessModalOpen(false)
    props.onSuccess()
  }

  return (
    <>
      <Modal show={props.showModal} onHide={() => props.setShow(false)} size={'xl'}>
        <ModalHeader closeButton>
          <h5>Dodaj nową aktywność</h5>
        </ModalHeader>
        <ModalBody>
          <TabsContainer defaultActiveKey={Activity.EXPEDITION}>
            {activities.map(
              (activity, index) =>
                activity !== Activity.ADDITIONAL && (
                  <Tab title={getActivityTypeName(activity)} eventKey={activity} key={index + Date.now()}>
                    {getActivityTab(activity)}
                  </Tab>
                )
            )}
          </TabsContainer>
        </ModalBody>
      </Modal>
      <Modal show={isSuccessModalOpen} onHide={() => setIsSuccessModalOpen(false)}>
        <ModalHeader>
          <h5>Aktywność dodana pomyślnie</h5>
        </ModalHeader>
        <ModalBody>
          <p>Twoja aktywność została pomyślnie zapisana w bazie danych.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onSuccessModalClose}>Zakończ</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AddActivityModal
