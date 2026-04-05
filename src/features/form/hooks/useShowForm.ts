import { TvShowFormType, tvShowSchema } from "@/src/data/schemas"
import { APISeasonResponseType, TvShowType } from "@/src/data/types"
import { services } from "@/src/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useShowMutation } from "./useShowMutation"
import { useFormUtils } from "./useFormUtils"

export const useShowForm = (titleKey: string | undefined) => {
  const methods = useForm<TvShowFormType>({
    resolver: zodResolver(tvShowSchema),
  })
  const [tvShowPreviousKey, setTvShowPreviousKey] = useState<string | null>(
    null,
  )
  const [seasons, setSeasons] = useState<Record<number, { episodes: number }>>({
    0: { episodes: 1 },
  })
  const [previousSeasonsLength, setPreviousSeasonsLength] = useState(0)
  const [preaviousEpisodesLength, setPreviousEpisodesLength] = useState<
    number[]
  >([])

  const {
    addSeason,
    getEpisodesData,
    getSeasonsData,
    removeSeason,
    updateEpisodes,
  } = useFormUtils({ seasons, setSeasons })

  const {
    createEpisodesFn,
    createSeasonFn,
    createTvShowFn,
    onSuccess,
    updateSeasonFn,
    updateEpisodesFn,
    updateTvShowFn,
    back,
  } = useShowMutation()

  useEffect(() => {
    if (titleKey) {
      const getTvShow = async () => {
        const tvShowToUpdate = await services.tvShows.getTvShowByKey(titleKey)
        const seasonsResponse = await services.seasons.getAllSeasons()
        const episodesResponse = await services.episodes.getAllEpisodes()
        setTvShowPreviousKey(tvShowToUpdate["@key"])

        const seasons =
          seasonsResponse?.data.result
            .filter(
              (season) => season.tvShow["@key"] === tvShowToUpdate["@key"],
            )
            .sort((a, b) => a.number - b.number) || []

        const episodes = episodesResponse?.data.result.filter((episode) =>
          seasons.some((season) => episode.season["@key"] === season["@key"]),
        )

        const previousEpisodesCount = seasons.map(
          (season) =>
            episodes.filter(
              (episode) => episode.season["@key"] === season["@key"],
            ).length || 0,
        )

        setPreviousSeasonsLength(seasons.length)
        setPreviousEpisodesLength(previousEpisodesCount)

        const seasonsData = seasons.map((season, i) => ({
          number: i,
          episodes: episodes.filter(
            (ep) => ep.season["@key"] === season["@key"],
          ).length,
        }))

        setSeasons(seasonsData)

        const seasonsWithEpisodes = seasons.map((season) => ({
          year: season.year,
          episodes: episodes
            .filter((ep) => ep.season["@key"] === season["@key"])
            .map((ep) => ({ ...ep, releaseDate: new Date(ep.releaseDate) }))
            .sort((a, b) => a.episodeNumber - b.episodeNumber),
        }))

        methods.reset({
          title: tvShowToUpdate.title,
          description: tvShowToUpdate.description,
          recommendedAge:
            tvShowToUpdate.recommendedAge === 0
              ? "Livre"
              : tvShowToUpdate.recommendedAge.toString(),
          seasons: seasonsWithEpisodes,
        })
      }
      getTvShow()
    }
  }, [titleKey, methods, setSeasons])

  const handleSaveShow = async (data: TvShowFormType) => {
    const formattedAge =
      data.recommendedAge === "Livre" ? 0 : parseInt(data.recommendedAge)
    const tvShow: Omit<TvShowType, "@key"> = {
      title: data.title,
      description: data.description,
      recommendedAge: formattedAge,
    }

    let tvShowResponse
    let tvShowKey

    if (!titleKey) {
      tvShowResponse = await createTvShowFn(tvShow)
      tvShowKey = tvShowResponse.data[0]["@key"]
    } else {
      await updateTvShowFn(tvShow)
    }

    const seasonsToCreate = getSeasonsData(
      tvShowKey as string,
      data.seasons,
      titleKey,
      tvShowPreviousKey,
      previousSeasonsLength,
    )

    let seasonsResponse: APISeasonResponseType[] = []

    if (titleKey) {
      seasonsResponse = await updateSeasonFn(seasonsToCreate.seasonsToUpdate)
    }

    if (seasonsToCreate.seasonsToCreate.length > 0) {
      const newSeasons = await createSeasonFn(seasonsToCreate.seasonsToCreate)
      seasonsResponse = [...seasonsResponse, ...(newSeasons ?? [])]
    }

    const episodesToCreate = getEpisodesData(
      seasonsResponse,
      data.seasons,
      preaviousEpisodesLength,
    )

    if (titleKey) {
      await updateEpisodesFn(episodesToCreate.episodesToUpdate)
    }

    if (episodesToCreate.episodesToCreate.length > 0) {
      await createEpisodesFn(episodesToCreate.episodesToCreate)
    }
  }

  return {
    addSeason,
    removeSeason,
    updateEpisodes,
    methods,
    seasons,
    onSuccess,
    handleSaveShow,
    back,
  }
}
