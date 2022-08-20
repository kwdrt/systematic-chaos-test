import { Route, Routes } from 'react-router-dom'
import { PageRoutes } from '../../PageRoutes'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import Profile from '../../../components/student/Profile/Profile'

export default function ProfileRoutes() {
  return (
    <Routes>
      <Route
        path={PageRoutes.Student.Profile.PROFILE}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <Profile />
          </PageGuard>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
