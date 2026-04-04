import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { APITvShowsResponseType } from "@/src/data/types"

export const TvShowList = ({tvShows}:{tvShows: APITvShowsResponseType[]}) => (
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
)
