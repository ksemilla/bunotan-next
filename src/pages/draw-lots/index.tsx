import { DrawLotsService, createDrawLot } from "@/api"
import { DrawLotLayout } from "@/layouts"
import { logError } from "@/utils"
import { Box, Button, Grid } from "@mantine/core"
import { useRouter } from "next/router"
import { MouseEventHandler } from "react"
import useSWR from "swr"
import DrawLotCard from "./DrawLotCard"

const DrawLots = () => {
  const router = useRouter()
  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      const res = await createDrawLot()
      router.push(res.data.url)
    } catch (e) {
      logError(e)
    }
  }

  const { data, error, isLoading } = useSWR(
    "/draw-lots",
    DrawLotsService.getAll
  )

  if (error) {
    return <div>Something went wrong</div>
  }

  return (
    <Box p="lg">
      <Button onClick={handleClick}>Create new session</Button>
      <Grid py="lg">
        {data?.list.map((drawLot) => (
          <Grid.Col key={drawLot.id} span={4}>
            <DrawLotCard drawLot={drawLot} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  )
}

DrawLots.getLayout = function getLayout(page: React.ReactNode) {
  return <DrawLotLayout>{page}</DrawLotLayout>
}

export default DrawLots
