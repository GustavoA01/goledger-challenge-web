import { TvShowFormType, tvShowSchema } from "@/src/data/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export const useShowForm = () => {
  const methods = useForm<TvShowFormType>({
    resolver: zodResolver(tvShowSchema),
  })
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

  return {
    addSeason,
    removeSeason,
    updateEpisodes,
    methods,
    seasons,
  }
}
