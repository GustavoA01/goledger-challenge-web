import { EpisodeType, SeasonType, TvShowType } from "@/src/data/types"
import { services } from "@/src/services"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export const useShowCreate = (
  setOnSuccess: React.Dispatch<React.SetStateAction<number | null>>,
  push: (url: string) => void,
) => {
  const searchParams = useSearchParams()

  const { mutateAsync: createTvShowFn } = useMutation({
    mutationFn: async (data: Omit<TvShowType, "@key">) => {
      setOnSuccess(0)
      return services.tvShows.createTvShow(data)
    },
    onSuccess: () => {
      setOnSuccess(1)
    },
    onError: (error: AxiosError) => {
      setOnSuccess(null)
      console.error("Erro ao salvar a série:", error)
      if (error.status === 409) {
        toast.error(
          "Você não pode adicionar uma série com o título de uma já existente.",
        )
      } else {
        toast.error("Ocorreu um erro ao salvar as informações da série.")
      }
    },
  })

  const { mutateAsync: createSeasonFn } = useMutation({
    mutationFn: async (data: Omit<SeasonType, "@key">[]) =>
      services.seasons.createSeasons(data),
    onSuccess: () => {
      setOnSuccess(2)
    },
    onError: (error: AxiosError) => {
      setOnSuccess(null)
      console.error("Erro ao salvar temporadas:", error)
      if (error.status === 409) {
        toast.error(
          "Você não pode adicionar uma temporada já existente a uma série.",
        )
      } else {
        toast.error("Ocorreu um erro ao salvar as temporadas.")
      }
    },
  })

  const { mutateAsync: createEpisodesFn } = useMutation({
    mutationFn: async (data: {
      episodes: Omit<EpisodeType, "@key">[]
      isUpdatingShow: boolean
    }) => {
      const createEpisodesResponse = await services.episodes.createEpisodes(
        data.episodes,
      )
      return {
        episodesCreated: createEpisodesResponse,
        isUpdatingShow: data.isUpdatingShow,
      }
    },
    onSuccess: (data) => {
      if (!data.isUpdatingShow) {
        if (searchParams.get("title")) {
          setOnSuccess(3)
          toast.success("Série atualizada com sucesso!")
        } else {
          setOnSuccess(3)
          toast.success("Série criada com sucesso!")
          push("/")
        }
      }
    },
    onError: (error: AxiosError) => {
      setOnSuccess(null)
      console.error("Erro ao salvar episódios:", error)
      if (error.status === 409) {
        toast.error(
          "Você não pode adicionar um episódio já existente a uma série.",
        )
      } else {
        toast.error("Ocorreu um erro ao salvar os episódios.")
      }
    },
  })

  return {
    createTvShowFn,
    createSeasonFn,
    createEpisodesFn,
  }
}
