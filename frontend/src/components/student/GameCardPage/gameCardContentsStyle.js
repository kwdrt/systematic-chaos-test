import styled from 'styled-components'
import { Col, Table } from 'react-bootstrap'

export const CustomTable = styled(Table)`
  margin: 0;
  color: var(--font-color);
  font-size: 18px;

  & th,
  & td {
    border: 1px solid var(--dark-blue) !important;
  }
`

export const ChartCol = styled(Col)`
  height: 75%;

  & canvas {
    width: 100% !important;
    max-height: 100% !important;
    margin: 0 auto;
  }
`