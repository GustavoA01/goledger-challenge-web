import { WatchlistFormType, watchListSchema } from "@/src/data/schemas"
import { WatchlistType } from "@/src/data/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useListMutation } from "./useListMutation"

type UseListMutationProps = {
  setOnSuccess: (id: number | null) => void
  setOpenDialog: (open: boolean) => void
}

export const useListForm = ({
  setOnSuccess,
  setOpenDialog,
}: UseListMutationProps) => {
  const { createListFn } = useListMutation({
    setOnSuccess,
    setOpenDialog,
  })
  const methods = useForm<Omit<WatchlistType, "@key" | "tvShows">>({
    resolver: zodResolver(watchListSchema),
  })

  const handleCreateWatchList = async (data: WatchlistFormType) => {
    await createListFn(data)
  }

  return {
    handleCreateWatchList,
    methods,
  }
}
