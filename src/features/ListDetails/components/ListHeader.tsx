import { AddToListButton } from "@/src/features/ListForm/container/AddListButton"
import { GoBackButton } from "@/src/components/GoBackButton"
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { APITvShowsResponseType } from "@/src/data/types"
import { Plus } from "lucide-react"

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
          <DialogContent className="h-70 overflow-hidden">
            <DialogHeader>
              <DialogTitle>Adicionar Série</DialogTitle>
              <DialogDescription>
                Selecione uma série para adicionar à lista
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 overflow-y-auto min-h-0">
              {tvShows.map((tvShow) => (
                <div
                  key={tvShow["@key"]}
                  className="p-2 bg-primary/10 rounded-lg cursor-pointer hover:bg-primary/20 transition-all duration-200"
                >
                  <h2>{tvShow.title}</h2>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <AddToListButton listTitle={listTitle} />
        <Dialog>
          {/* <ConfirmDelete tvShowTitle={tvShowTitle} tvShowKey={tvShowKey} /> */}
        </Dialog>
      </div>
    </header>
  )
}
