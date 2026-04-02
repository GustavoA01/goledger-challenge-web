import { api } from "@/lib/axios"
import { APISeasonResponseType, APITvShowsResponseType, TvShowType } from "../data/types"

export const createTvShow = async (data: Omit<TvShowType, "@key">) =>
  api.post("/invoke/createAsset", {
    asset: [{ "@assetType": "tvShows", ...data }],
  }) as Promise<{ data: APITvShowsResponseType}>

export const getAllTvShows = async () => {
  const response = await api.post("/query/search", {
    query: {
      selector: {
        "@assetType": "tvShows",
      },
    },
  })

  return response.data as APITvShowsResponseType[]
}
