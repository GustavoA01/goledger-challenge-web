import { useState } from "react"
import { useDeleteList } from "./useDeleteWatchlist"
import { WatchlistType } from "@/src/data/types"

export const useAddShow = (titleKey: string, tvShowsKeys: string[]) => {
  const { updateShowsFn, setUpdateDialog, updateDialog, isUpdating, push } =
    useDeleteList()

  const [tvShowsFiltered, setTvShowsFiltered] = useState<string[]>(tvShowsKeys)

  const handleOpenDialog = (key: string) => {
    setUpdateDialog(true)
    const tvShowsFiltered = tvShowsKeys.filter((showKey) => showKey !== key)
    setTvShowsFiltered(tvShowsFiltered)
  }

  const handleRemoveShow = async () => {
    const data = {
      title: titleKey,
      tvShows: tvShowsFiltered.map((key) => ({
        "@assetType": "tvShows",
        "@key": key,
      })),
    }

    await updateShowsFn(data as Omit<WatchlistType, "@key">)
  }
  
  return {
    handleOpenDialog,
    handleRemoveShow,
    isUpdating,
    updateDialog,
    setUpdateDialog,
    push,
  }
}
