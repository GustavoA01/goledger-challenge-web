import { useRouter } from "next/navigation"
import { useState } from "react"
import { useShowCreate } from "./useShowCreate"
import { useShowUpdate } from "./useShowUpdate"

export const useShowMutation = () => {
  const [onSuccess, setOnSuccess] = useState<number | null>(null)
  const { push } = useRouter()
  const { createEpisodesFn, createSeasonFn, createTvShowFn } = useShowCreate(
    setOnSuccess,
    push,
  )
  const { updateEpisodesFn, updateSeasonFn, updateTvShowFn } =
    useShowUpdate(setOnSuccess)

  return {
    createTvShowFn,
    createSeasonFn,
    createEpisodesFn,
    onSuccess,
    updateTvShowFn,
    updateSeasonFn,
    updateEpisodesFn,
  }
}
