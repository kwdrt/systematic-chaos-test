import { Tab } from 'react-bootstrap'
import UsersTable from './UsersTable'
import { getAllParticipants, getGroups } from '../ParticipantsPage/mockData'
import { GradesContent } from './GradeListAndExportStyles'
import { TabsContainer } from './GradeListAndExportStyles'
import { ExportButton } from './GradeListAndExportStyles'
export default function GradeListAndExport() {
  const allUsers = getAllParticipants()
  const groups = getGroups()
  return (
    <GradesContent>
      <TabsContainer>
        <Tab eventKey={'all'} title={'Wszyscy'}>
          <UsersTable users={allUsers} />
        </Tab>

        {groups.map((group, index) => (
          <Tab key={index + group.groupKey} title={group.groupName} eventKey={group.groupKey}>
            <UsersTable users={group} />
          </Tab>
        ))}
      </TabsContainer>
      {/* <TableContainer></TableContainer> */}
      <ExportButton>Eksportuj oceny</ExportButton>
    </GradesContent>
  )
}
