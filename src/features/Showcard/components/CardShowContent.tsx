import { CardContent } from "@/src/components/ui/card"
import { Dot } from "lucide-react"

type CardShowContentProps = {
  numberOfSeasons: number
  numberOfEpisodes: number
}

export const CardShowContent = ({
  numberOfSeasons,
  numberOfEpisodes,
}: CardShowContentProps) => (
  <CardContent>
    <div className="flex items-center">
      {numberOfSeasons > 0 && (
        <p>
          {numberOfSeasons > 1
            ? `${numberOfSeasons} temporadas`
            : "1 temporada"}
        </p>
      )}
      {numberOfEpisodes > 0 && (
        <>
          <Dot className="text-primary" />
          <p>{numberOfEpisodes} episódios</p>
        </>
      )}
    </div>
  </CardContent>
)
