import { NextPage } from 'next'
import AdminDashboard from './Layout/AdminDashboard'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <div>
    <AdminDashboard />
  </div>
}

export default Page
