import React, { useMemo, useState } from 'react'
import { Content } from '../../../App/AppGeneralStyles'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Tab } from 'react-bootstrap'
import { TabsContainer } from '../../../general/LoginAndRegistrationPage/AuthStyle'
import { getRanksData } from './mockData'
import { HeroType } from '../../../../utils/userRole'
import { getHeroName } from '../../../../utils/constants'
import { getBadgesList } from '../../../student/BadgesPage/mockData'
import ContentCard from './ContentCard'
import Table from './Table'
import EditionForm from './EditionForm'

function RankAndBadgesManagement(props) {
  const ranksData = getRanksData()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editedDataType, setEditedDataType] = useState('')

  const ranksContent = useMemo(() => {
    return (
      <TabsContainer defaultActiveKey={HeroType.WARRIOR} style={{ fontSize: 20 }}>
        {ranksData.map((rank, index) => (
          <Tab
            className={'text-center'}
            key={index + Date.now()}
            eventKey={rank.heroType}
            title={getHeroName(rank.heroType)}
          >
            <div className={'text-center'} style={{ maxHeight: '74.5vh', overflow: 'auto' }}>
              <Table
                headers={['Ikona', 'Nazwa rangi', 'Zakres punktowy']}
                body={rank.ranksList.map((listElements) => [
                  <img width={100} src={listElements.imgSrc} alt={'rank-icon'} />,
                  <span>{listElements.name}</span>,
                  <span>
                    {listElements.minPoints} - {listElements.maxPoints}
                  </span>
                ])}
                deleteIconCallback={() => setIsDeleteModalOpen(true)}
                editIconCallback={() => {
                  setEditedDataType('RANKS')
                  setIsEditModalOpen(true)
                }}
              />
            </div>
            <Button className={'my-3'}>Dodaj nową rangę</Button>
          </Tab>
        ))}
      </TabsContainer>
    )
  }, [ranksData])

  const badgesContent = useMemo(() => {
    return (
      <>
        <div className={'text-center'} style={{ maxHeight: '93%', overflow: 'auto' }}>
          <Table
            headers={['Ikona', 'Nazwa odznaki', 'Opis']}
            body={getBadgesList().map((badge) => [
              <img width={100} src={badge.src} alt={'badge-icon'} />,
              <span>{badge.name}</span>,
              <span>{badge.description}</span>
            ])}
            deleteIconCallback={() => setIsDeleteModalOpen(true)}
            editIconCallback={() => {
              setEditedDataType('BADGES')
              setIsEditModalOpen(true)
            }}
          />
        </div>
        <Button className={'my-3'} style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
          Dodaj nową odznakę
        </Button>
      </>
    )
  }, [])

  return (
    <Content>
      <Row className={'m-0 vh-100 w-100'}>
        <Col md={6} className={'pt-4'}>
          <ContentCard header={'Rangi'} body={ranksContent} />
        </Col>
        <Col md={6} className={'pt-4'}>
          <ContentCard header={'Odznaki'} body={badgesContent} />
        </Col>
      </Row>

      <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)}>
        <ModalHeader>
          <h5>Usunięcie elementu</h5>
        </ModalHeader>
        <ModalBody>Czy na pewno chcesz usunąć ten element? Tej operacji nie można cofnąć.</ModalBody>
        <ModalFooter>
          <Button variant={'info'} onClick={() => setIsDeleteModalOpen(false)}>
            Anuluj
          </Button>
          <Button variant={'danger'} onClick={() => setIsDeleteModalOpen(false)}>
            Usuń
          </Button>
        </ModalFooter>
      </Modal>

      <Modal show={isEditModalOpen} onHide={() => setIsEditModalOpen(false)} size={'lg'}>
        <ModalHeader>
          <h5>Edycja elementu</h5>
        </ModalHeader>
        <ModalBody>
          <EditionForm
            formVariant={editedDataType}
            onSubmit={() => setIsEditModalOpen(false)}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </ModalBody>
      </Modal>
    </Content>
  )
}

export default RankAndBadgesManagement
