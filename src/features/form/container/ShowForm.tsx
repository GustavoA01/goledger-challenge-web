"use client"
import { useState } from "react"
import { DetailsSection } from "../components/DetailsSection"
import { FormFooter } from "../components/FormFooter"
import { SeasonsSection } from "../components/SeasonsSection"

export const ShowForm = () => {
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

  const numberOfSeasons = Object.keys(seasons).length

  return (
    <form className="mt-8 space-y-6">
      <DetailsSection />
      <SeasonsSection
        numberOfSeasons={numberOfSeasons}
        updateEpisodes={updateEpisodes}
        seasons={seasons}
        removeSeason={removeSeason}
        addSeason={addSeason}
      />
      <FormFooter />
    </form>
  )
}
