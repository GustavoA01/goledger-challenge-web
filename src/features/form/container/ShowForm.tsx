"use client"
import { DetailsSection } from "../components/DetailsSection"
import { FormFooter } from "../components/FormFooter"
import { SeasonsSection } from "../components/SeasonsSection"
import { FormProvider } from "react-hook-form"
import { TvShowFormType } from "@/src/data/schemas"
import { services } from "@/src/services"
import { EpisodeType, SeasonType, TvShowType } from "@/src/data/types"
import { useShowForm } from "../hooks/useShowForm"

export const ShowForm = () => {
  const { addSeason, methods, removeSeason, updateEpisodes, seasons } =
    useShowForm()

  const handleSaveShow = async (data: TvShowFormType) => {
    const formattedAge =
      data.recommendedAge === "Livre" ? 0 : parseInt(data.recommendedAge)
    const tvShow: Omit<TvShowType, "@key"> = {
      title: data.title,
      description: data.description,
      recommendedAge: formattedAge,
    }

    try {
      const tvShowResponse = await services.tvShows.createTvShow(tvShow)
      const tvShowKey = tvShowResponse.data[0]["@key"]
      const seasonsToCreate = []

      for (let i = 0; i < Object.keys(seasons).length; i++) {
        const seasonToAdd: Omit<SeasonType, "@key"> = {
          year: data.seasons[i].year,
          number: i + 1,
          tvShow: { "@assetType": "tvShows" as const, "@key": tvShowKey },
        }
        seasonsToCreate.push(seasonToAdd)
      }

      const seasonsResponse =
        await services.seasons.createSeasons(seasonsToCreate)
      const episodesToCreate = []

      if (!seasonsResponse || !seasonsResponse.data) {
        console.error("Erro: seasonsResponse está undefined")
        return
      }

      for (let i = 0; i < seasonsResponse.data.length; i++) {
        const seasonKey = seasonsResponse.data[i]["@key"]
        for (let j = 0; j < data.seasons[i].episodes.length; j++) {
          const episodeToAdd: Omit<EpisodeType, "@key"> = {
            title: data.seasons[i].episodes[j].title,
            description: data.seasons[i].episodes[j].description,
            episodeNumber: j + 1,
            releaseDate: data.seasons[i].episodes[j].releaseDate.toISOString(),
            season: {
              "@assetType": "seasons" as const,
              "@key": seasonKey,
            },
          }
          if (data.seasons[i].episodes[j].rating) {
            episodeToAdd.rating = data.seasons[i].episodes[j].rating
          }
          episodesToCreate.push(episodeToAdd)
        }
      }

      await services.episodes.createEpisodes(episodesToCreate)
    } catch (error) {
      console.error("Erro ao salvar a série:", error)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSaveShow)}
        className="mt-8 space-y-6"
      >
        <DetailsSection />
        <SeasonsSection
          seasons={seasons}
          numberOfSeasons={Object.keys(seasons).length}
          updateEpisodes={updateEpisodes}
          removeSeason={removeSeason}
          addSeason={addSeason}
        />
        <FormFooter />
      </form>
    </FormProvider>
  )
}
