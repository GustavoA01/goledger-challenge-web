"use client"
import { DetailsSection } from "../components/DetailsSection"
import { FormFooter } from "../components/FormFooter"
import { SeasonsSection } from "../components/SeasonsSection"
import { FormProvider } from "react-hook-form"
import { useShowForm } from "../hooks/useShowForm"

export const ShowForm = ({ titleKey }: { titleKey?: string }) => {
  const {
    addSeason,
    methods,
    removeSeason,
    updateEpisodes,
    seasons,
    onSuccess,
    handleSaveShow,
  } = useShowForm(titleKey)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSaveShow)}
        className="mt-8 space-y-6"
      >
        <DetailsSection disableTitle={!!titleKey} />
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
