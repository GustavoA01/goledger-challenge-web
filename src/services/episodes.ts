import { api } from "@/lib/axios"
import { APIEpisodeResponseType, EpisodeType } from "../data/types"

export const createEpisodes = async (data:  Omit<EpisodeType, "@key">[]) =>{
  const response =  await api.post<APIEpisodeResponseType[]>("/invoke/createAsset", {
    asset: data.map((episode) => ({ "@assetType": "episodes", ...episode })),
  })
  return response
}

export const getAllEpisodes = async () => {
  const response = await api.post<{result: APIEpisodeResponseType[]}>("/query/search", {
    query: {
      selector: {
        "@assetType": "episodes",
      },
    },
  })
  return response
}
