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
    back,
    loadingCurrentShow,
  } = useShowForm(titleKey)

  return (
    <FormProvider {...methods}>
      <form
        className="mt-8 space-y-6"
        onSubmit={methods.handleSubmit(handleSaveShow)}
      >
        <DetailsSection
          disableTitle={!!titleKey}
          loadingCurrentShow={loadingCurrentShow}
        />
        <SeasonsSection
          seasons={seasons}
          numberOfSeasons={Object.keys(seasons).length}
          updateEpisodes={updateEpisodes}
          removeSeason={removeSeason}
          addSeason={addSeason}
        />
        <FormFooter goBack={back} onSuccess={onSuccess} />
      </form>
    </FormProvider>
  )
}
