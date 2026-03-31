import { api } from "@/lib/axios"
import { APITvShowsResponseType, TvShowType } from "../data/types"

export const tvShows = {
  post: async (data: TvShowType) => await api.post("/invoke/createAsset", data),
  getAll: async () => {
    const response = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "tvShows",
        },
      },
    })
    
    const tvShows = {
      metadata: response.data.metadata,
      result: response.data.result as APITvShowsResponseType[],
    }
    return tvShows
  },
}
