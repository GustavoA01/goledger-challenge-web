import { api } from "@/lib/axios"
import { APIWatchlistResponseType, WatchlistType } from "../data/types"

export const createWatchlist = async (
  data: Omit<WatchlistType, "@key" | "tvShows">[],
) => {
  const response = await api.post<APIWatchlistResponseType[]>(
    "/invoke/createAsset",
    {
      asset: data.map((watchlist) => ({
        "@assetType": "watchlist",
        ...watchlist,
      })),
    },
  )
  return response
}

export const getAllWatchlist = async () => {
  const response = await api.post<{ result: APIWatchlistResponseType[] }>(
    "/query/search",
    {
      query: {
        selector: {
          "@assetType": "watchlist",
        },
      },
    },
  )
  return response
}
