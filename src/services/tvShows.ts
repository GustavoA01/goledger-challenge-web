import { api } from "@/lib/axios"
import { TvShowType } from "../data/types"

export const tvShows = {
  post: async (data: TvShowType) => await api.post("/invoke/createAsset", data),
  getAll: async () =>
    await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "tvShows",
        },
      },
    }),
}
