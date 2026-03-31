"use client"
import { Card } from "@/src/components/ui/card"
import { CardShowContent } from "../components/CardShowContent"
import { CardShowHeader } from "../components/CardShowHeader"
import {
  APIEpisodeResponseType,
  APISeasonResponseType,
  TvShowType,
} from "../../../data/types"

type TvShowCardProps = Omit<TvShowType, "@key"> & {
  seasonWithEpisodes: {
    seasons: APISeasonResponseType[]
    episodes: APIEpisodeResponseType[]
  }
}

export const TvShowCard = ({
  title,
  recommendedAge,
  seasonWithEpisodes,
}: TvShowCardProps) => {
  return (
    <Card className="w-full cursor-pointer">
      <CardShowHeader handleAddToFavorites={() => {}} title={title} />
      <CardShowContent
        recommendedAge={recommendedAge}
        seasonWithEpisodes={seasonWithEpisodes}
      />
    </Card>
  )
}
