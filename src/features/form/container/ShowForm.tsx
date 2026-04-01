"use client"
import { useState } from "react"
import { DetailsSection } from "../components/DetailsSection"
import { FormFooter } from "../components/FormFooter"
import { SeasonsSection } from "../components/SeasonsSection"
import { FormProvider, useForm } from "react-hook-form"
import { TvShowFormType, tvShowSchema } from "@/src/data/schemas"
import { zodResolver } from "@hookform/resolvers/zod"

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

  const handleSaveShow = (data: TvShowFormType) => {
    console.log("Dados do formulário:", data)
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
