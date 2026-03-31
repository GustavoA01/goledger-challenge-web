import { api } from "@/lib/axios"
import { SeasonType } from "../data/types"

export const seasons = {
  post: async (data:SeasonType) => await api.post("/invoke/createAsset", data),
  getAll: async () => {
    const response = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "seasons",
        },
      },
    })
    
    return response
  },
}