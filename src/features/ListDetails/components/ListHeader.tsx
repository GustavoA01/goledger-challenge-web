"use client"
import { AddToListButton } from "@/src/features/ListForm/container/AddListButton"
import { GoBackButton } from "@/src/components/GoBackButton"
import { Button } from "@/src/components/ui/button"
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog"
import { APITvShowsResponseType, WatchlistType } from "@/src/data/types"
import { Plus } from "lucide-react"
import { ConfirmDelete } from "../container/ConfirmDelete"
import { TvShowList } from "./TvShowList"
import { useDeleteList } from "../hooks/useDeleteWatchlist"

type ListHeaderProps = {
  listTitle: string
  previousTvShows: APITvShowsResponseType[]
  tvShowsNotAdded: APITvShowsResponseType[]
}

export const ListHeader = ({
  listTitle,
  previousTvShows,
  tvShowsNotAdded,
}: ListHeaderProps) => {
  const { updateShowsFn, isUpdating } = useDeleteList(true)

  const handleAddTvShow = async (tvShowKey: string) => {
    const tvShowToAdd = {
      "@assetType": "tvShows",
      "@key": tvShowKey,
    }
    const data = {
      title: listTitle,
      tvShows: [...previousTvShows, tvShowToAdd],
    }
    await updateShowsFn(data as Omit<WatchlistType, "@key">)
  }

  return (
    <header className="flex justify-between items-center mb-8">
      <GoBackButton />
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-full gap-2">
              <Plus className="h-6 w-6" />
              <p>Adicionar série</p>
            </Button>
          </DialogTrigger>
          <TvShowList
            tvShows={tvShowsNotAdded}
            handleAddTvShow={handleAddTvShow}
            isUpdating={isUpdating}
          />
        </Dialog>
        <AddToListButton listTitle={listTitle} />
        <Dialog>
          <ConfirmDelete watchListTitle={listTitle} />
        </Dialog>
      </div>
    </header>
  )
}
