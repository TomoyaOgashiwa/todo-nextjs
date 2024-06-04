import { Layout } from '@/components/Layout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { IconLogout } from '@tabler/icons-react'
import axios from 'axios'
import { UserInfo } from '@/components/UserInfo'
import { useQueryClient } from '@tanstack/react-query'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const logout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    queryClient.removeQueries({ queryKey: ['user'] })
    router.push('/')
  }
  return (
    <Layout title="Task Board">
      <IconLogout
        className="size-6 mb-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <UserInfo />
    </Layout>
  )
}

export default Dashboard
