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

export const getEpisodeByKey = async (seasonKey: string, numberKey: number) => {
  const response = await api.post<APIEpisodeResponseType>("/query/readAsset", {
    key: {
      "@assetType": "episodes",
      episodeNumber: numberKey,
      season: {
        "@assetType": "seasons",
        "@key": seasonKey,
      },
    },
  })
  return response.data
}

export const updateEpisode = async (data: Omit<EpisodeType, "@key">) => {
  const response = await api.put("/invoke/updateAsset", {
    update: {
      "@assetType": "episodes",
      ...data
    },
  })
  return response
}

export const deleteEpisode = async (seasonKey: string, episodeNumber: number) => {
  const response = await api.delete("/invoke/deleteAsset", {
    data: {
      key: {
        "@assetType": "episodes",
        episodeNumber: episodeNumber,
        season: {
          "@assetType": "seasons",
          "@key": seasonKey,
        },
      },
    },
  });
  return response;
};