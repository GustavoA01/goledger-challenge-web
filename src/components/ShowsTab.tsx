import {
  TvShowType,
} from "../data/types"
import { TvShowCard } from "../features/Showcard/container/TvShowCard"

type ShowTabProps = Omit<TvShowType,"description"> & {
  numberOfSeasons: number
  numberOfEpisodes: number
}

export const ShowsTab = ({ tvShows }: { tvShows: ShowTabProps[] }) => {
  return (
    <div className="flex-col max-sm:space-y-4 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tvShows.map((tvShow) => (
        <TvShowCard
          key={tvShow["@key"]}
          title={tvShow.title}
          recommendedAge={tvShow.recommendedAge}
          numberOfSeasons={tvShow.numberOfSeasons}
          numberOfEpisodes={tvShow.numberOfEpisodes}
        />
      ))}
    </div>
  )
}
