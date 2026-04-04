import { APITvShowsResponseType } from "@/src/data/types"

type ListHeaderProps = {
  listTitle: string
  listDescription?: string
  tvShows: APITvShowsResponseType[]
}

export const ListInfo = ({
  listTitle,
  listDescription,
  tvShows,
}: ListHeaderProps) => (
  <div className="max-w-3xl">
    <h1 className="text-3xl sm:text-5xl font-bold mb-3">{listTitle}</h1>
    <p className="text-muted-foreground sm:text-lg leading-relaxed">
      {listDescription || "Sem descrição para esta lista."}
    </p>
    <p className="text-muted-foreground sm:text-lg leading-relaxed">
      {!tvShows.length
        ? "Essa lista não possui séries adicionadas."
        : `${tvShows.length === 1 ? "1 série" : `${tvShows.length} séries`}`}
    </p>
  </div>
)
