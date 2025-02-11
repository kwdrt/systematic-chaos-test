import React from 'react'
import { CustomCard } from '../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Card } from 'react-bootstrap'

function GameSummaryCard(props) {
  return (
    <CustomCard>
      <CardHeader>{props.header}</CardHeader>
      <Card.Body>{props.body}</Card.Body>
    </CustomCard>
  )
}

export default GameSummaryCard
