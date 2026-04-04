import { AddToListButton } from "@/src/features/ListForm/container/AddListButton"
import { GoBackButton } from "@/src/components/GoBackButton"
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { APITvShowsResponseType } from "@/src/data/types"
import { Plus } from "lucide-react"
import { ConfirmDelete } from "../container/ConfirmDelete"
import { TvShowList } from "./TvShowList"

type ListHeaderProps = {
  listTitle: string
  tvShows: APITvShowsResponseType[]
}

export const ListHeader = ({ listTitle, tvShows }: ListHeaderProps) => {
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
          <TvShowList tvShows={tvShows} />
        </Dialog>

        <AddToListButton listTitle={listTitle} />
        <Dialog>
          <ConfirmDelete watchListTitle={listTitle} />
        </Dialog>
      </div>
    </header>
  )
}
