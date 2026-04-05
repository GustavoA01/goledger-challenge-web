import { api } from "@/src/lib/axios"
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

export const getWatchlistByKey = async (key: string) => {
  const response = await api.post<APIWatchlistResponseType>(
    "/query/readAsset",
    {
      key: {
        "@assetType": "watchlist",
        title: key,
      },
    },
  )
  return response.data
}

export const updateWatchlist = async (data: Omit<WatchlistType, "@key">) => {
  const response = await api.put("/invoke/updateAsset", {
    update: {
      "@assetType": "watchlist",
      ...data,
    },
  })
  return response
}

export const deleteWatchlist = async (key: string) => {
  const response = await api.delete("/invoke/deleteAsset", {
    data: {
      key: {
        "@assetType": "watchlist",
        title: key,
      },
    },
  })
  return response
}
