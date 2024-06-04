import { Inter } from 'next/font/google'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import * as yup from 'yup'
import {
  IconDatabase,
  IconShield,
  IconExclamationMark,
} from '@tabler/icons-react'
import {
  Anchor,
  TextInput,
  Button,
  Group,
  PasswordInput,
  Alert,
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { Layout } from '@/components/Layout'
import { AuthForm } from '@/types'

const inter = Inter({ subsets: ['latin'] })

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('No email provided'),
  password: yup
    .string()
    .required('No password provided')
    .min(5, 'Password should be min 5 charts'),
})

export default function Home() {
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          email: form.values.email,
          password: form.values.password,
        })
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: form.values.email,
        password: form.values.password,
      })
      form.reset()
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }
  return (
    <Layout title="Auth">
      <IconShield className="size-16 text-blue-500" />
      {error && (
        <Alert
          my={'md'}
          variant="filled"
          icon={<IconExclamationMark />}
          title="Authorization Error"
          color="red"
          radius={'md'}
        >
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          mt={'md'}
          id="email"
          label="Email*"
          placeholder="example@gmail.com"
          {...form.getInputProps('email')}
        />
        <TextInput
          mt={'md'}
          id="password"
          label="Password*"
          placeholder="password"
          description="Must be min 5 char"
          {...form.getInputProps('password')}
        />
        <Group mt={'xl'}>
          <Anchor
            component="button"
            type="button"
            size="xs"
            className="text-gray-300"
            onClick={() => {
              setIsRegister((prev) => !prev)
              setError('')
            }}
          >
            {isRegister
              ? 'Have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button
            leftSection={<IconDatabase size={14} />}
            color="cyan"
            type="submit"
          >
            {isRegister ? 'Register' : 'Login'}
          </Button>
        </Group>
      </form>
    </Layout>
  )
}
