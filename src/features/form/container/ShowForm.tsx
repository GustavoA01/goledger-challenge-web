"use client"
import { DetailsSection } from "../components/DetailsSection"
import { FormFooter } from "../components/FormFooter"
import { SeasonsSection } from "../components/SeasonsSection"
import { FormProvider } from "react-hook-form"
import { TvShowFormType } from "@/src/data/schemas"
import { services } from "@/src/services"
import { EpisodeType, SeasonType, TvShowType } from "@/src/data/types"
import { useShowForm } from "../hooks/useShowForm"
import { AxiosError } from "axios"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const ShowForm = () => {
  const { addSeason, methods, removeSeason, updateEpisodes, seasons } =
    useShowForm()
  const [onSuccess, setOnSuccess] = useState<number | null>(null)
  const {push} = useRouter()
  const { mutateAsync: createTvShowFn } = useMutation({
    mutationFn: async (data: Omit<TvShowType, "@key">) => {
      setOnSuccess(0)
      return services.tvShows.createTvShow(data)
    },
    onSuccess: () => {
        setOnSuccess(1)
    },
    onError: (error) => {
      setOnSuccess(null)
      const errorAxios = error as AxiosError
      console.error("Erro ao salvar a série:", errorAxios)
      if (errorAxios.status === 409) {
        toast.error(
          "Você não pode adicionar uma série com o mesmo título de um já existente.",
        )
      }
    },
  })

  const { mutateAsync: createSeasonFn } = useMutation({
    mutationFn: async (data: Omit<SeasonType, "@key">[]) =>
      services.seasons.createSeasons(data),
    onSuccess: () => {
      setOnSuccess(2)
    },
    onError: (error) => {
      setOnSuccess(null)
      const errorAxios = error as AxiosError
      console.error("Erro ao salvar temporadas:", errorAxios)
      if (errorAxios.status === 409) {
        toast.error(
          "Você não pode adicionar uma temporada já existente há uma série.",
        )
      }
    },
  })

  const { mutateAsync: createEpisodesFn } = useMutation({
    mutationFn: async (data: Omit<EpisodeType, "@key">[]) =>
      services.episodes.createEpisodes(data),
    onSuccess: () => {
      setOnSuccess(3)
      toast.success("Série criada com sucesso!")
      push("/")
    },
    onError: (error) => {
      setOnSuccess(null)
      const errorAxios = error as AxiosError
      console.error("Erro ao salvar episódios:", errorAxios)
      if (errorAxios.status === 409) {
        toast.error(
          "Você não pode adicionar um episódio já existente há uma série.",
        )
      }
    },
  })

  const handleSaveShow = async (data: TvShowFormType) => {
    const formattedAge =
      data.recommendedAge === "Livre" ? 0 : parseInt(data.recommendedAge)
    const tvShow: Omit<TvShowType, "@key"> = {
      title: data.title,
      description: data.description,
      recommendedAge: formattedAge,
    }

    const tvShowResponse = await createTvShowFn(tvShow)
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

    const seasonsResponse = await createSeasonFn(seasonsToCreate)
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

    await createEpisodesFn(episodesToCreate)
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
        <FormFooter onSuccess={onSuccess} />
      </form>
    </FormProvider>
  )
}
