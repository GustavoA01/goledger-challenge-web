import { api } from "@/lib/axios"
import { APIWatchlistResponseType } from "../data/types"

export const getAllWatchlist = async () => {
  const response = await api.post<{result: APIWatchlistResponseType[]}>("/query/search", {
    query: {
      selector: {
        "@assetType": "watchlist",
      },
    },
  })
  return response
}