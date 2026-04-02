"use client"
import { Card } from "@/src/components/ui/card"
import { CardShowContent } from "../components/CardShowContent"
import { CardShowHeader } from "../components/CardShowHeader"
import { TvShowType } from "../../../data/types"
import { useRouter } from "next/navigation"

type TvShowCardProps = Omit<TvShowType, "@key" | "description"> & {
  id: string
  numberOfSeasons: number
  numberOfEpisodes: number
  recommendedAge: number
}

export const TvShowCard = ({
  title,
  numberOfSeasons,
  numberOfEpisodes,
  recommendedAge,
  id,
}: TvShowCardProps) => {
  const { push } = useRouter()

  return (
    <Card
      onClick={() => push(`/detalhes/${id}`)}
      className="w-full cursor-pointer group"
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
