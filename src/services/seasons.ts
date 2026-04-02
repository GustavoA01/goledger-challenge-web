import { api } from "@/lib/axios"
import { SeasonType } from "../data/types"

export const createSeasons = async (data: Omit<SeasonType, "@key">[]) =>
  await api.post("/invoke/createAsset", {
    asset: data.map((season) => ({ "@assetType": "seasons", ...season })),
  })

export const getAllSeasons = async () => {
  const response = await api.post("/query/search", {
    query: {
      selector: {
        "@assetType": "seasons",
      },
    },
  })

  return response
}
