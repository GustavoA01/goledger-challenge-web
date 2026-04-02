import { Calendar, StarIcon } from "lucide-react"

type MainInfoProps = {
  episodeTitle: string
  date: string
  rating: number | null
}

export const MainInfo = ({ episodeTitle, date, rating }: MainInfoProps) => (
  <div className="space-y-2">
    <p className="text-lg">{episodeTitle}</p>

    <div className="flex items-center gap-2">
      {rating && (
        <div className="flex items-center gap-1">
          <StarIcon className="text-primary fill-primary h-4 w-4" />
          <p>{rating}</p>
        </div>
      )}

      <div className="flex text-muted-foreground items-center gap-1">
        <Calendar className=" h-4 w-4" />
        <p>{date}</p>
      </div>
    </div>
  </div>
)
