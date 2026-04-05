import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Dialog, DialogTrigger } from "@/src/components/ui/dialog"
import { Bookmark, Star } from "lucide-react"
import { ListDialog } from "../container/ListDialog"

type ShowInfoProps = {
  title: string
  recommendedAge: number
  rating: string | null
  description: string
  seasonsCount: number
  tvShowKey: string
}

export const ShowInfo = ({
  title,
  recommendedAge,
  rating,
  description,
  seasonsCount,
  tvShowKey,
}: ShowInfoProps) => (
  <div className="max-w-3xl">
    <h1 className="text-3xl sm:text-5xl font-bold mb-3">{title}</h1>
    <div className="flex items-center gap-4 mb-4">
      <Badge variant="secondary" className="text-lg p-3">
        {recommendedAge}+
      </Badge>
      {rating && (
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
          <span className="font-semibold text-lg">{rating}</span>
          <span className="text-muted-foreground">/ 10</span>
        </div>
      )}
      <span className="text-muted-foreground">
        {seasonsCount === 1 ? "1 Temporada" : `${seasonsCount} Temporadas`}
      </span>
    </div>
    <p className="text-muted-foreground sm:text-lg leading-relaxed">
      {description}
    </p>
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-8">
          <Bookmark fill="black" />
          <p>Adicionar a uma lista</p>
        </Button>
      </DialogTrigger>
      <ListDialog tvShowKey={tvShowKey} />
    </Dialog> 
  </div>
)
