import { login } from "@/api"
import { useAuthStore } from "@/stores"
import { LoginData } from "@/types"
import { logError } from "@/utils"
import { Button, Center, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconLock, IconUser } from "@tabler/icons-react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

const LoginForm = () => {
  const router = useRouter()
  const [isLogged, setIsLogged] = useAuthStore((state) => [
    state.isLogged,
    state.setIsLogged,
  ])

  const form = useForm<LoginData>({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (val) => !val,
      password: (val) => !val,
    },
  })

  const onSubmit = form.onSubmit(async (data: LoginData) => {
    try {
      const res = await login(data)
      Cookies.set("accessToken", res.data.accessToken, {
        // domain: process.env.NEXT_PUBLIC_API_ROOT,
      })
      setIsLogged(true)
      router.push("/draw-lots")
    } catch (e) {
      logError(e)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing="xs">
        <TextInput
          withAsterisk
          {...form.getInputProps("username")}
          placeholder="Username"
          icon={<IconUser size="1rem" />}
        />
        <TextInput
          withAsterisk
          type="password"
          {...form.getInputProps("password")}
          placeholder="Password"
          icon={<IconLock size="1rem" />}
        />
        <Center>
          <Button type="submit" w="100%">
            Login
          </Button>
        </Center>
      </Stack>
    </form>
  )
}

export default LoginForm
