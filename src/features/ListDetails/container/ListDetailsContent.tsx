"use client"
import { APITvShowsResponseType, WatchlistType } from "@/src/data/types"
import { TvShowCard } from "../components/TvShowCard"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Dialog } from "@/src/components/ui/dialog"
import { RemoveShowModal } from "./RemoveShowModal"
import { useDeleteWatchlist } from "../hooks/useDeleteWatchlist"

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
  const { push } = useRouter()
  const { removeShowFn, setOpenRemoveDialog, openRemoveDialog,isRemovingShow } =
    useDeleteWatchlist()

  const [tvShowsFiltered, setTvShowsFiltered] = useState<string[]>(tvShowsKeys)

  const handleOpenDialog = (key: string) => {
    setOpenRemoveDialog(true)
    const tvShowsFiltered = tvShowsKeys.filter((showKey) => showKey !== key)
    setTvShowsFiltered(tvShowsFiltered)
  }

  const handleRemoveShow = async () => {
    const data = {
      title: titleKey,
      tvShows: tvShowsFiltered.map((key) => ({
        "@assetType": "tvShows",
        "@key": key,
      })),
    }

    await removeShowFn(data as Omit<WatchlistType, "@key">)
  }

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
      <Dialog open={openRemoveDialog} onOpenChange={setOpenRemoveDialog}>
        <RemoveShowModal handleRemoveShow={handleRemoveShow} isRemovingShow={isRemovingShow} />
      </Dialog>
    </main>
  )
}
