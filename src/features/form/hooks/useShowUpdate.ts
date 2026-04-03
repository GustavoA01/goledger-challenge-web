import { EpisodeType, SeasonType, TvShowType } from "@/src/data/types"
import { services } from "@/src/services"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const useShowUpdate = (
  setOnSuccess: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  const { mutateAsync: updateTvShowFn } = useMutation({
    mutationFn: async (data: Omit<TvShowType, "@key">) => {
      setOnSuccess(0)
      return await services.tvShows.updateTvShow(data)
    },
    onSuccess: () => {
      setOnSuccess(1)
    },
    onError: (error) => {
      setOnSuccess(null)
      const errorAxios = error as AxiosError
      console.error("Erro ao atualizar a série:", errorAxios)
      toast.error("Ocorreu um erro ao atualizar as informações da série.")
    },
  })

  const { mutateAsync: updateSeasonFn } = useMutation({
    mutationFn: async (seasonsToUpdate: Omit<SeasonType, "@key">[]) => {
      const promises = seasonsToUpdate.map(async (season) => {
        const res = await services.seasons.updateSeason(season)
        return res.data
      })
      return await Promise.all(promises)
    },
    onSuccess: () => {
      setOnSuccess(2)
    },
    onError: (error) => {
      setOnSuccess(null)
      const errorAxios = error as AxiosError
      console.error("Erro ao atualizar temporadas:", errorAxios)
      toast.error("Ocorreu um erro ao atualizar as temporadas.")
    },
  })

  const { mutateAsync: updateEpisodesFn } = useMutation({
    mutationFn: async (episodeToUpdate: Omit<EpisodeType, "@key">[]) => {
      const promises = episodeToUpdate.map(async (episode) => {
        const res = await services.episodes.updateEpisode(episode)
        return res.data
      })
      return await Promise.all(promises)
    },
    onSuccess: () => {
      setOnSuccess(3)
      toast.success("Série atualizada com sucesso!")
      setTimeout(() => {
        setOnSuccess(null)
      }, 3000)
    },
    onError: (error) => {
      setOnSuccess(null)
      const errorAxios = error as AxiosError
      console.error("Erro ao atualizar episódios:", errorAxios)
      toast.error("Ocorreu um erro ao atualizar os episódios.")
    },
  })

  return {
    updateTvShowFn,
    updateSeasonFn,
    updateEpisodesFn,
  }
}
