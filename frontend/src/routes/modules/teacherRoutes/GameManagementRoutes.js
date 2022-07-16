import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import Groups from '../../../components/professor/GroupsPage/Groups'
import GroupAddition from '../../../components/professor/GroupAdditionPage/GroupAddition'
import { PageRoutes } from '../../PageRoutes'

export default function GameManagementRoutes() {
  return (
    <Routes>
      <Route
        path={`${PageRoutes.Teacher.GameManagement.Groups.GROUPS}`}
        element={
          <PageGuard role={Role.LOGGED_IS_AS_TEACHER}>
            <Groups />
          </PageGuard>
        }
      />

      <Route
        path={`${PageRoutes.Teacher.GameManagement.Groups.GROUP_ADDITION}`}
        element={
          <PageGuard role={Role.LOGGED_IS_AS_TEACHER}>
            <GroupAddition />
          </PageGuard>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}