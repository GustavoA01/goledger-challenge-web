import { api } from "@/src/lib/axios"
import { APISeasonResponseType, SeasonType } from "../data/types"

export const createSeasons = async (data: Omit<SeasonType, "@key">[]) => {
  try {
    const respoonse = await api.post<APISeasonResponseType[]>(
      "/invoke/createAsset",
      {
        asset: data.map((season) => ({ "@assetType": "seasons", ...season })),
      },
    )
    return respoonse.data
  } catch (error) {
    console.error("Error creating seasons:", error)
  }
}

export const getAllSeasons = async () => {
  try {
    const response = await api.post<{ result: APISeasonResponseType[] }>(
      "/query/search",
      {
        query: {
          selector: {
            "@assetType": "seasons",
          },
        },
      },
    )
    return response
  } catch (error) {
    console.error("Error fetching seasons:", error)
  }
}

export const getSeasonByKey = async (tvShowKey: string, numberKey: number) => {
  const response = await api.post<APISeasonResponseType>("/query/readAsset", {
    key: {
      "@assetType": "seasons",
      number: numberKey,
      tvShow: {
        "@assetType": "tvShows",
        "@key": tvShowKey,
      },
    },
  })
  return response.data
}

export const updateSeason = async (data: Omit<SeasonType, "@key">) => {
  const response = await api.put("/invoke/updateAsset", {
    update: {
      "@assetType": "seasons",
      ...data,
    },
  })
  return response
}

export const deleteSeason = async (tvShowKey: string, seasonNumber: number) => {
  const response = await api.delete("/invoke/deleteAsset", {
    data: {
      key: {
        "@assetType": "seasons",
        number: seasonNumber,
        tvShow: {
          "@assetType": "tvShows",
          "@key": tvShowKey,
        },
      },
    },
  })
  return response
}
