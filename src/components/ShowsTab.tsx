"use client"
import {
  APIEpisodeResponseType,
  APISeasonResponseType,
  TvShowType,
} from "../data/types"
import { TvShowCard } from "../features/container/TvShowCard"

type TvShowCardProps = TvShowType & {
  seasonWithEpisodes: {
    seasons: APISeasonResponseType[]
    episodes: APIEpisodeResponseType[]
  }
}

export const ShowsTab = ({ tvShows }: { tvShows: TvShowCardProps[] }) => {
  return (
    <div className="flex-col sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tvShows.map((tvShow) => (
        <TvShowCard
          key={tvShow["@key"]}
          title={tvShow.title}
          description={tvShow.description}
          recommendedAge={tvShow.recommendedAge}
          seasonWithEpisodes={tvShow.seasonWithEpisodes}
        />
      ))}
    </div>
  )
}
