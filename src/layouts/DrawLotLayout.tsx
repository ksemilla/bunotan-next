import { useAuthStore } from "@/stores"
import {
  ActionIcon,
  Box,
  Flex,
  Menu,
  Switch,
  useMantineColorScheme,
} from "@mantine/core"
import {
  IconGift,
  IconLogout,
  IconMenu2,
  IconMoon,
  IconUser,
} from "@tabler/icons-react"
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/router"

const DrawLotLayout = (props: { children: React.ReactNode }) => {
  const router = useRouter()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const dark = colorScheme === "dark"
  const [isLogged, setIsLogged] = useAuthStore((state) => [
    state.isLogged,
    state.setIsLogged,
  ])
  if (!isLogged) {
    router.push("/")
    return null
  }

  return (
    <Box>
      <Flex mih="100%" justify="space-between" align="center" p="sm">
        <Link href="/">
          <IconGift />
        </Link>
        <Menu position="bottom-end" offset={-1} width={200}>
          <Menu.Target>
            <ActionIcon>
              <IconMenu2 />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconUser size={14} />}>My Account</Menu.Item>
            <Menu.Item
              icon={<IconMoon size={14} />}
              closeMenuOnClick={false}
              sx={{ cursor: "default" }}
              rightSection={
                <Switch
                  checked={dark}
                  onClick={() => toggleColorScheme()}
                  onLabel="On"
                  offLabel="Off"
                  styles={{
                    track: { cursor: "pointer" },
                  }}
                />
              }
            >
              Dark mode
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              icon={<IconLogout size={14} />}
              onClick={() => {
                setIsLogged(false)
                Cookies.remove("accessToken")
              }}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Box maw={{ base: 1200 }} m="auto" px={{ base: 20 }}>
        {props.children}
      </Box>
    </Box>
  )
}

export default DrawLotLayout
