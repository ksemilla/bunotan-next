import { MembersService } from "@/api"
import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Grid,
  TextInput,
  Title,
} from "@mantine/core"
import { IconMail, IconPlus, IconX } from "@tabler/icons-react"
import { useRouter } from "next/router"
import { Member } from "@/types"
import useSWR from "swr"
import { ChangeEventHandler, useEffect, useRef, useState } from "react"
import { useClickOutside, useDebouncedState } from "@mantine/hooks"
import useSWRMutation from "swr/mutation"
import { logError } from "@/utils"
import { v4 as uuidv4 } from "uuid"

const MemberCard = (props: {
  member: Member
  idx: number
  memberListLength: number
  appendEmptyMember: () => void
  deleteMember: (id: number) => void
}) => {
  const [doAction, setDoAction] = useState(false)
  const { id } = useRouter().query as { id: string }
  const [member, setMember] = useDebouncedState<Member>(props.member, 500)
  const ref = useClickOutside(() => {
    if (member.id > 0 && member.name === "") {
      handleDelete()
    }
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target as {
      name: "name" | "email"
      value: string
    }
    setMember({
      ...member,
      [name]: value,
    })
    setDoAction(true)
  }

  const { trigger: create, isMutating } = useSWRMutation(
    `draw-lots/${props.member?.id}`,
    () =>
      MembersService.create({
        drawLot: parseInt(id),
        name: member ? member.name : "",
        email: member ? member.email : "",
      }),
    { revalidate: true }
  )

  const { trigger: update } = useSWRMutation(
    `draw-lots/${props.member.id}`,
    () =>
      MembersService.update({
        id: member.id,
        drawLot: member.drawLot,
        name: member.name,
      })
  )

  const { trigger: deleteMember } = useSWRMutation(
    `draw-lots/${props.member.id}`,
    () => MembersService.delete(member.id)
  )

  const createMember = async () => {
    try {
      const res = await create()
      setMember({
        drawLot: member.drawLot,
        name: member.name,
        id: res?.data.id ?? 0,
      })
      props.appendEmptyMember()
    } catch (e) {
      logError(e)
    }
  }

  const updateMember = async () => {
    try {
      const res = await update()
    } catch (e) {
      logError(e)
    }
  }

  useEffect(() => {
    if (doAction && member.name !== "") {
      if (member?.id <= 0) {
        createMember()
      } else if (member.id > 0) {
        updateMember()
      }
    }
  }, [member])

  const handleDelete = async () => {
    try {
      await deleteMember()
      props.deleteMember(member.id)
    } catch (e) {
      logError(e)
    }
  }

  return (
    <Card
      ref={ref}
      shadow="xs"
      padding={0}
      radius="md"
      sx={(theme) => ({
        cursor: "pointer",
        "&:hover": {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <Box p="sm">
        <TextInput
          name="name"
          placeholder="Enter name"
          radius={0}
          onChange={handleChange}
          defaultValue={props.member.name}
        />
        <TextInput
          name="email"
          placeholder="Enter email"
          radius={0}
          onChange={handleChange}
        />
      </Box>
      <Divider />
      <Box p={8} display="flex" sx={{ justifyContent: "space-between" }}>
        <ActionIcon>
          <IconMail size={15} />
        </ActionIcon>
        {member.id > 0 && (
          <ActionIcon
            sx={{ "&:hover": { color: "red" } }}
            onClick={() => handleDelete()}
          >
            <IconX size={15} />
          </ActionIcon>
        )}
      </Box>
    </Card>
  )
}

const MemberList = () => {
  const { id } = useRouter().query as { id: string }
  const [members, setMembers] = useState<Member[]>([])

  const { data, error, isLoading } = useSWR("members", () =>
    MembersService.getAll({ drawLot: parseInt(id) })
  )
  useEffect(() => {
    data &&
      setMembers([...data.map((m) => ({ ...m, uuid: uuidv4() })), emptyMember])
  }, [data])

  const emptyMember: Member = {
    id: 0,
    drawLot: { id: parseInt(id) },
    name: "",
    email: "",
    uuid: uuidv4(),
  }

  const appendEmptyMember = () => {
    setMembers((prevState) => [...prevState, emptyMember])
  }

  const deleteMember = (id: number) => {
    setMembers((prevState) => prevState.filter((m) => id !== m.id))
  }

  return (
    <Box>
      <Title order={3}>Members </Title>
      <Grid>
        {members.map((member, idx) => (
          <Grid.Col md={4} key={member.uuid}>
            <MemberCard
              member={member}
              idx={idx}
              memberListLength={members.length}
              appendEmptyMember={appendEmptyMember}
              deleteMember={deleteMember}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  )
}

export default MemberList
