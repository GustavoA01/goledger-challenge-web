import { TvShowFormType } from "@/src/data/schemas"
import {
  APISeasonResponseType,
  EpisodeType,
  SeasonType,
} from "@/src/data/types"

type UseFormUtilsType = {
  setSeasons: React.Dispatch<
    React.SetStateAction<Record<number, { episodes: number }>>
  >
  seasons: Record<number, { episodes: number }>
}

export const useFormUtils = ({ seasons, setSeasons }: UseFormUtilsType) => {
  const updateEpisodes = (seasonIndex: number, episodes: number) => {
    setSeasons((prev) => ({
      ...prev,
      [seasonIndex]: { episodes: episodes > 0 ? episodes : 1 },
    }))
  }

  const addSeason = () => {
    const newIndex = Object.keys(seasons).length
    setSeasons((prev) => ({
      ...prev,
      [newIndex]: { episodes: 1 },
    }))
  }

  const removeSeason = () => {
    const keys = Object.keys(seasons)
    if (keys.length > 1) {
      const newSeasons = { ...seasons }
      delete newSeasons[Number(keys[keys.length - 1])]
      setSeasons(newSeasons)
    }
  }

  const getSeasonsData = (
    tvShowKey: string,
    seasons: TvShowFormType["seasons"],
    titleKey: string | undefined,
    tvShowPreviousKey: string | null,
    previousSeasonsLength: number,
  ) => {
    const seasonsToCreate = []
    const seasonsToUpdate = []

    for (let i = 0; i < Object.keys(seasons).length; i++) {
      const key = titleKey ? tvShowPreviousKey : tvShowKey
      const seasonData: Omit<SeasonType, "@key"> = {
        year: seasons[i].year,
        number: i + 1,
        tvShow: { "@assetType": "tvShows" as const, "@key": key as string },
      }

      if (i < previousSeasonsLength) seasonsToUpdate.push(seasonData)
      else seasonsToCreate.push(seasonData)
    }

    return { seasonsToCreate, seasonsToUpdate }
  }

  const getEpisodesData = (
    seasonsResponse: APISeasonResponseType[],
    seasons: TvShowFormType["seasons"],
    previousEpisodesLength: number[],
  ) => {
    const episodesToCreate = []
    const episodesToUpdate = []

    for (let i = 0; i < seasonsResponse.length; i++) {
      const seasonKey = seasonsResponse[i]["@key"]
      for (let j = 0; j < seasons[i].episodes.length; j++) {
        const episodeData: Omit<EpisodeType, "@key"> = {
          title: seasons[i].episodes[j].title,
          description: seasons[i].episodes[j].description,
          episodeNumber: j + 1,
          releaseDate: seasons[i].episodes[j].releaseDate.toISOString(),
          season: {
            "@assetType": "seasons" as const,
            "@key": seasonKey,
          },
        }

        if (seasons[i].episodes[j].rating) {
          episodeData.rating = seasons[i].episodes[j].rating
        }

        if (j < previousEpisodesLength[i]) {
          episodesToUpdate.push(episodeData)
        } else {
          episodesToCreate.push(episodeData)
        }
      }
    }

    return { episodesToCreate, episodesToUpdate }
  }

  return {
    updateEpisodes,
    addSeason,
    removeSeason,
    getSeasonsData,
    getEpisodesData,
  }
}
