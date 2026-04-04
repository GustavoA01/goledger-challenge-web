import { TvShowType } from "../data/types"
import { TvShowCard } from "../features/Showcard/container/TvShowCard"

type TvShowWithDetails = TvShowType & {
  numberOfSeasons?: number
  numberOfEpisodes?: number
}

type ShowTabProps = {
  tvShows: Omit<TvShowWithDetails, "description">[]
}

export const ShowsTab = ({ tvShows }: ShowTabProps) => (
  <>
    {tvShows.map((tvShow) => (
      <TvShowCard
        key={tvShow["@key"]}
        title={tvShow.title}
        recommendedAge={tvShow.recommendedAge}
        numberOfSeasons={tvShow.numberOfSeasons!}
        numberOfEpisodes={tvShow.numberOfEpisodes!}
      />
    ))}
  </>
)
