import { DrawLotsService } from "@/api"
import { DrawLotLayout } from "@/layouts"
import { NextPageWithLayout } from "@/types/utils"
import { Box, Button, Divider, Loader, TextInput } from "@mantine/core"
import { useDebouncedState } from "@mantine/hooks"
import { IconArrowLeft, IconCircleCheck } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import Members from "./Members"

const DrawLotDetailPage: NextPageWithLayout = () => {
  const { id } = useRouter().query

  const { data, isLoading, error } = useSWR(
    `draw-lots/${id}`,
    (url) => (id ? DrawLotsService.getOne(url) : null),
    { revalidateOnMount: true }
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

  if (isLoading || !data) return <div>Loading...</div>
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
          onChange={(e) => setName(e.target.value)}
          defaultValue={data?.name}
          rightSection={
            isMutating ? (
              <Loader size="sm" />
            ) : (
              <IconCircleCheck size={20} color="green" />
            )
          }
          sx={{
            input: {
              "::placeholder": {
                fontStyle: "italic",
              },
            },
          }}
          placeholder="Enter name of event"
        />
      </form>
      <Divider my={10} />
      <Members />
    </Box>
  )
}

DrawLotDetailPage.getLayout = function getLayout(page: React.ReactNode) {
  return <DrawLotLayout>{page}</DrawLotLayout>
}

export default DrawLotDetailPage
