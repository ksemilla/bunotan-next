import { DrawLotsService } from "@/api"
import { DrawLotLayout } from "@/layouts"
import { NextPageWithLayout } from "@/types/utils"
import { Box, Button, Loader, TextInput } from "@mantine/core"
import { useDebouncedState } from "@mantine/hooks"
import {
  IconArrowLeft,
  IconCircleCheck,
  IconSignLeft,
} from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"

const DrawLotDetailPage: NextPageWithLayout = () => {
  const { id } = useRouter().query

  const { data, isLoading, error } = useSWR(
    `draw-lots/${id}`,
    DrawLotsService.getOne
  )

  const { trigger, isMutating } = useSWRMutation(
    `draw-lots/${id}`,
    DrawLotsService.update,
    { revalidate: true }
  )

  const [name, setName] = useDebouncedState<string | null>(null, 500)

  useEffect(() => {
    if (name !== null) {
      trigger({
        name,
      })
    }
  }, [name])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <Box>
      <Button
        component={Link}
        href="/draw-lots"
        variant="subtle"
        leftIcon={<IconArrowLeft />}
      >
        Back
      </Button>
      <form>
        <TextInput
          label="Name"
          onChange={(e) => setName(e.target.value)}
          defaultValue={data?.name}
          rightSection={
            isMutating ? (
              <Loader size="sm" />
            ) : (
              <IconCircleCheck size={20} color="green" />
            )
          }
        />
      </form>
    </Box>
  )
}

DrawLotDetailPage.getLayout = function getLayout(page: React.ReactNode) {
  return <DrawLotLayout>{page}</DrawLotLayout>
}

export default DrawLotDetailPage
