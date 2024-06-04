import React from 'react'
import { useQueryUser } from '@/hooks/useQueryUser'
import { Loader } from '@mantine/core'
import { useRouter } from 'next/router'

export const UserInfo = () => {
  const router = useRouter()
  const { data: user, status, isError } = useQueryUser()
  if (isError) {
    router.push('/')
  }
  if (status === 'pending') return <Loader />
  return <div>{user?.email}</div>
}
