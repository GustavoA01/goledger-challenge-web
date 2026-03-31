import { CardContent } from "@/src/components/ui/card"
import { APIEpisodeResponseType, APISeasonResponseType } from "@/src/data/types"
import { Dot } from "lucide-react"

type CardShowContentProps = {
  recommendedAge: number
  seasonWithEpisodes: {
    seasons: APISeasonResponseType[]
    episodes: APIEpisodeResponseType[]
  }
}

export const CardShowContent = ({
  recommendedAge,
  seasonWithEpisodes,
}: CardShowContentProps) => (
  <CardContent>
    <span>{recommendedAge === 0 ? "Livre" : `${recommendedAge} +`}</span>
    {seasonWithEpisodes.seasons && (
      <p>{seasonWithEpisodes.seasons?.length} temporadas</p>
    )}
    {seasonWithEpisodes?.episodes && (
      <>
        <Dot />
        <p>{seasonWithEpisodes.episodes.length} episódios</p>
      </>
    )}
  </CardContent>
)
