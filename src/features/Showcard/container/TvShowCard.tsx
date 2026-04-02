"use client"
import { Card } from "@/src/components/ui/card"
import { CardShowContent } from "../components/CardShowContent"
import { CardShowHeader } from "../components/CardShowHeader"
import { TvShowType } from "../../../data/types"
import { useRouter } from "next/navigation"

type TvShowCardProps = Omit<TvShowType, "@key" | "description"> & {
  numberOfSeasons: number
  numberOfEpisodes: number
  recommendedAge: number
}

export const TvShowCard = ({
  title,
  numberOfSeasons,
  numberOfEpisodes,
  recommendedAge,
}: TvShowCardProps) => {
  const { push } = useRouter()

  return (
    <Card
      onClick={() => push(`/detalhes/${encodeURIComponent(title)}`)}
      className="w-full cursor-pointer group border hover:border-accent transition-all duration-200"
    >
      <CardShowHeader
        handleAddToFavorites={() => {}}
        title={title}
        recommendedAge={recommendedAge}
      />
      <CardShowContent
        numberOfSeasons={numberOfSeasons}
        numberOfEpisodes={numberOfEpisodes}
      />
    </Card>
  )
}
