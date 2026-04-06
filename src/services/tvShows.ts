import { api } from "@/src/lib/axios"
import { APITvShowsResponseType, TvShowType } from "../data/types"
import { services } from "."

export const createTvShow = async (data: Omit<TvShowType, "@key">) => {
  const response = await api.post<APITvShowsResponseType[]>(
    "/invoke/createAsset",
    {
      asset: [{ "@assetType": "tvShows", ...data }],
    },
  )
  return response
}

export const getAllTvShows = async () => {
  const response = await api.post("/query/search", {
    query: {
      selector: {
        "@assetType": "tvShows",
      },
    },
  })
  return response.data as { metadata: null; result: APITvShowsResponseType[] }
}

export const getTvShowByKey = async (key: string) => {
  const response = await api.post<APITvShowsResponseType>("/query/readAsset", {
    key: {
      "@assetType": "tvShows",
      title: key,
    },
  })
  return response.data
}

export const deleteTvShowCascade = async (
  tvShowTitle: string,
  tvShowKey: string,
) => {
  const seasonsResponse = await services.seasons.getAllSeasons()

  if (seasonsResponse === undefined) {
    console.error("Erro ao buscar temporadas para exclusão")
    return
  }

  const allSeasons = seasonsResponse.data.result
  const seasons = allSeasons.filter((s) => s.tvShow["@key"] === tvShowKey)

  if (allSeasons.length > 0) {
    const episodesResponse = await services.episodes.getAllEpisodes()
    const allEpisodes = episodesResponse?.data.result

    for (const season of seasons) {
      if (episodesResponse === undefined || allEpisodes.length === 0) return

      const episodes = allEpisodes.filter(
        (e) => e.season["@key"] === season["@key"],
      )

      for (const episode of episodes) {
        await services.episodes.deleteEpisode(
          season["@key"],
          episode.episodeNumber,
        )
      }

      await services.seasons.deleteSeason(tvShowKey, season.number)
    }
  }
  await deleteTvShow(tvShowTitle)
}

export const deleteTvShow = async (key: string) => {
  const response = await api.delete("/invoke/deleteAsset", {
    data: {
      key: {
        "@assetType": "tvShows",
        title: key,
      },
    },
  })
  return response
}

export const updateTvShow = async (data: Omit<TvShowType, "@key">) => {
  const response = await api.put("/invoke/updateAsset", {
    update: {
      "@assetType": "tvShows",
      ...data,
    },
  })
  return response
}
