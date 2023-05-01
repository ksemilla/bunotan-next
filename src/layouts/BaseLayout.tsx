import { useAuthStore } from "@/stores"
import {
  ActionIcon,
  Button,
  Flex,
  Header,
  useMantineColorScheme,
} from "@mantine/core"
import { IconGift, IconMoon, IconSun } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/router"

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  const isLogged = useAuthStore((state) => state.isLogged)
  const router = useRouter()

  router.pathname

  return (
    <div>
      <Flex justify="space-between" p="sm">
        <Link href="/">
          <IconGift />
        </Link>
        <Flex justify="flex-end" gap="md">
          <ActionIcon onClick={() => toggleColorScheme()} variant="subtle">
            {dark ? <IconSun size="2.5rem" /> : <IconMoon size="2.5rem" />}
          </ActionIcon>
        </Flex>
      </Flex>
      {children}
    </div>
  )
}

export default BaseLayout
