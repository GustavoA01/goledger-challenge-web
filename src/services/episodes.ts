import { api } from "@/lib/axios"
import { EpisodeType } from "../data/types"

export const episodes = {
  post: async (data:EpisodeType) => await api.post("/invoke/createAsset", data),
  getAll: async () => {
    const response = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "episodes",
        },
      },
    })
    return response
  },
}