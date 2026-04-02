import { api } from "@/lib/axios"
import { APITvShowsResponseType, TvShowType } from "../data/types"

export const createTvShow = async (data: Omit<TvShowType, "@key">) => {
  const response = await api.post<APITvShowsResponseType[]>(
    "/invoke/createAsset",
    {
      asset: [{ "@assetType": "tvShows", ...data }],
    },
  )
  return response
}

export const getAllTvShows = async () => {
  const response = await api.post("/query/search", {
    query: {
      selector: {
        "@assetType": "tvShows",
      },
    },
  })

  return response.data as {metadata: null, result: APITvShowsResponseType[]}
}
