"use client"
import { APITvShowsResponseType } from "@/src/data/types"
import { TvShowCard } from "../components/TvShowCard"
import { Dialog } from "@/src/components/ui/dialog"
import { RemoveShowModal } from "./RemoveShowModal"
import { useAddShow } from "../hooks/useAddShow"

type ListDetailsContentProps = {
  titleKey: string
  tvShowsAdded: APITvShowsResponseType[]
  tvShowsKeys: string[]
}

export const ListDetailsContent = ({
  titleKey,
  tvShowsAdded,
  tvShowsKeys,
}: ListDetailsContentProps) => {
  const {
    handleOpenDialog,
    handleRemoveShow,
    isUpdating,
    push,
    setUpdateDialog,
    updateDialog,
  } = useAddShow(titleKey, tvShowsKeys)

  return (
    <main className="container mx-auto px-4 pt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tvShowsAdded.map((tvShow) => (
          <TvShowCard
            key={tvShow["@key"]}
            onClickCard={() =>
              push(`/detalhes/${encodeURIComponent(tvShow.title)}`)
            }
            tvShowTitle={tvShow.title}
            tvShowDescription={tvShow.description}
            setRemoveModal={() => handleOpenDialog(tvShow["@key"])}
          />
        ))}
      </div>
      <Dialog open={updateDialog} onOpenChange={setUpdateDialog}>
        <RemoveShowModal
          handleRemoveShow={handleRemoveShow}
          isRemovingShow={isUpdating}
        />
      </Dialog>
    </main>
  )
}
