"use client"
import { useState } from "react"
import { DetailsSection } from "../components/DetailsSection"
import { FormFooter } from "../components/FormFooter"
import { SeasonsSection } from "../components/SeasonsSection"
import { FormProvider, useForm } from "react-hook-form"
import { TvShowFormType, tvShowSchema } from "@/src/data/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/axios"
import { services } from "@/src/services"
import { TvShowType } from "@/src/data/types"

export const ShowForm = () => {
  const methods = useForm<TvShowFormType>({
    resolver: zodResolver(tvShowSchema),
  })
  const { handleSubmit } = methods
  const [seasons, setSeasons] = useState<Record<number, { episodes: number }>>({
    0: { episodes: 1 },
  })

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

  const handleSaveShow = async (data: TvShowFormType) => {
    console.log("Dados do formulário:", data)
    const formattedAge =
      data.recommendedAge === "Livre" ? "0" : data.recommendedAge
    const tvShow: Omit<TvShowType, "@key"> = {
      title: data.title,
      description: data.description,
      recommendedAge: formattedAge,
    }

    try {
      const tvShowResponse = await services.tvShows.createTvShow(tvShow)
      console.log("Série criada:", tvShowResponse)
      const tvShowKey = tvShowResponse.data["@key"]
      const seasonsToCreate = []

      for (let i = 0; i < Object.keys(seasons).length; i++) {
        const seasonToAdd = {
          year: data.seasons[i].year,
          number: i + 1,
          tvShow: { "@assetType": "tvShows" as const, "@key": tvShowKey },
        }
        seasonsToCreate.push(seasonToAdd)
      }

      const seasonsResponse = await services.seasons.createSeasons(seasonsToCreate)
      console.log("Temporadas criadas:", seasonsResponse)
    } catch (error) {
      console.error("Erro ao salvar a série:", error)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSaveShow)} className="mt-8 space-y-6">
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
