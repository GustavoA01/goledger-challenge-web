import { Badge } from "@/src/components/ui/badge"
import { Star } from "lucide-react"

type ShowInfoProps = {
  title: string
  recommendedAge: number
  rating: number | null
  description: string
  seasonsCount: number
}

export const ShowInfo = ({
  title,
  recommendedAge,
  rating,
  description,
  seasonsCount,
}: ShowInfoProps) => (
  <div className="max-w-3xl">
    <h1 className="text-3xl sm:text-5xl font-bold mb-3">{title}</h1>
    <div className="flex items-center gap-4 mb-4">
      <Badge variant="secondary" className="text-lg px-3 py-1">
        {recommendedAge}+
      </Badge>
      <div className="flex items-center gap-1">
        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
        {/* <span className="font-semibold text-lg">{rating}</span> */}
        <span className="text-muted-foreground">/ 10</span>
      </div>
      <span className="text-muted-foreground">{seasonsCount} Temporadas</span>
    </div>
    <p className="text-muted-foreground sm:text-lg leading-relaxed">
      {description}
    </p>
  </div>
)
