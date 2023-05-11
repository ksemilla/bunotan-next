import { DrawLot } from "@/types"
import { Card, Text, Title } from "@mantine/core"
import Link from "next/link"

const DrawLotCard = ({ drawLot }: { drawLot: DrawLot }) => {
  return (
    <Card
      shadow="xs"
      padding="lg"
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
      component={Link}
      href={`/draw-lots/${drawLot.id}`}
    >
      <Title>{drawLot.name}</Title>
      <Text>Members: {drawLot.members.length}</Text>
    </Card>
  )
}

export default DrawLotCard
