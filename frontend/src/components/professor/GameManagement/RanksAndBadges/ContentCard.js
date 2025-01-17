import React from 'react'
import { CustomCard } from '../../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Card } from 'react-bootstrap'

function ContentCard(props) {
  return (
    <CustomCard $customHeight={'95vh'}>
      <CardHeader>
        <h5>{props.header}</h5>
      </CardHeader>
      <Card.Body className={'h-75'}>{props.body}</Card.Body>
    </CustomCard>
  )
}

export default ContentCard
