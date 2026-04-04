import { WatchlistFormType, watchListSchema } from "@/src/data/schemas"
import { WatchlistType } from "@/src/data/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useListMutation } from "./useListMutation"
import { useEffect, useState } from "react"
import { services } from "@/src/services"

type UseListMutationProps = {
  setOnSuccess: (id: number | null) => void
  setOpenDialog: (open: boolean) => void
  listTitle?: string
}

export const useListForm = ({
  setOnSuccess,
  setOpenDialog,
  listTitle,
}: UseListMutationProps) => {
  const methods = useForm<Omit<WatchlistType, "@key" | "tvShows">>({
    resolver: zodResolver(watchListSchema),
  })
  const { createListFn, updateListFn } = useListMutation({
    setOnSuccess,
    setOpenDialog,
  })
  const [previousTvShows, setPreviousTvShows] = useState<WatchlistType["tvShows"]>([]);

  useEffect(() => {
    if (listTitle) {
      const getList = async () => {
        const list = await services.watchlist.getWatchlistByKey(listTitle)
        if (list) {
          setPreviousTvShows(list.tvShows)
          methods.reset({
            title: list.title,
            description: list.description,
          })
        }
      }
      getList()
    }
  }, [listTitle, methods])

  const handleCreateWatchList = async (data: WatchlistFormType) => {
    if (listTitle) {
      await updateListFn({
        ...data,
        tvShows: previousTvShows,
      })
    } else {
      await createListFn(data)
    }
  }

  return {
    handleCreateWatchList,
    methods,
  }
}
