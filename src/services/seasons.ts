import { api } from "@/lib/axios"
import { APISeasonResponseType, SeasonType } from "../data/types"

export const createSeasons = async (data: Omit<SeasonType, "@key">[]) => {
  try {
    const respoonse = await api.post<APISeasonResponseType[]>(
      "/invoke/createAsset",
      {
        asset: data.map((season) => ({ "@assetType": "seasons", ...season })),
      },
    )
    return respoonse
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

export const getSeasonsByKey = async (tvShowKey:string, numberKey: number) => {
  try{

    const response = await api.post("/query/readAsset", {
      key: {
        "@assetType": "seasons",
        number: numberKey,
        tvShow:{
          title: tvShowKey
        }
      },
    })
    return response 
  }catch(error){
    console.error("Error fetching season by key:", error)
  }
}