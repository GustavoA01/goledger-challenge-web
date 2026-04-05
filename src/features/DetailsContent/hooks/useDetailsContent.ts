import { WatchlistType } from "@/src/data/types"
import { useDetailsMutation } from "./useDetailsMutation"
import { services } from "@/src/services"

export const useDetailsContent = (tvShowKey: string) => {
  const {isAddingToList,updateListFn,list} = useDetailsMutation(tvShowKey)

  const handleAddToList = async (keyToSearch: string) => {
    const watchList = await services.watchlist.getWatchlistByKey(keyToSearch)
    const updatedWatchList: Omit<WatchlistType, "@key"> = {
      ...watchList,
      tvShows: [
        ...(watchList.tvShows || []),
        { "@assetType": "tvShows", "@key": tvShowKey },
      ],
    }
    await updateListFn(updatedWatchList)
  }

  return {
    handleAddToList,
    isAddingToList,
    list,
  }
}