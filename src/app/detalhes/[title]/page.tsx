import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs"
import {
  ArrowLeft,
  Star,
  Bookmark,
  Edit,
  Trash,
  StarIcon,
  Calendar,
  ChevronDown,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react"
import Link from "next/link"
import { services } from "@/src/services"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion"
import { MainInfo } from "@/src/features/DetailsContent/components/MainInfo"
import { Chevron } from "@/src/features/DetailsContent/components/Chevron"
import { EpisodeAccordion } from "@/src/features/DetailsContent/container/EpisodeAccordion"
import { format } from "date-fns"
import { SeasonsTabs } from "@/src/features/DetailsContent/container/SeasonsTabs"

const DetailsPage = async ({
  params,
}: {
  params: Promise<{ title: string }>
}) => {
  const { title } = await params
  const titleKey = decodeURIComponent(title)

  const tvShow = await services.tvShows.getTvShowByKey(titleKey)
  const seasonsResponse = await services.seasons.getAllSeasons()
  const episodesResponse = await services.episodes.getAllEpisodes()

  const seasons =
    seasonsResponse?.data.result
      .filter((season) => season.tvShow["@key"] === tvShow["@key"])
      .sort((a, b) => a.number - b.number) || []

  const episodes =
    episodesResponse?.data.result.filter((episode) =>
      seasons.some(
        (season) =>
          episode.season["@key"] === season["@key"] &&
          season.tvShow["@key"] === tvShow["@key"],
      ),
    ) || []
  console.log("Episodes:", episodes)
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="relative bg-linear-to-r from-primary/20 to-background pt-8 pb-16">
        <div className="container mx-auto px-4">
          <header className="flex justify-between items-center mb-8">
            <Link href="/">
              <Button variant="ghost" className="rounded-full">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full gap-2">
                <Bookmark className="h-6 w-6" />
                <p>Na Watchlist</p>
              </Button>
              <Button variant="outline" className="rounded-full gap-2">
                <Edit className="h-6 w-6" />
                <p>Editar Série</p>
              </Button>
              <Button variant="destructive" className="rounded-full">
                <Trash className="h-6 w-6" />
              </Button>
            </div>
          </header>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-3">{tvShow.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {tvShow.recommendedAge}+
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                {/* <span className="font-semibold text-lg">{rating}</span> */}
                <span className="text-muted-foreground">/ 10</span>
              </div>
              <span className="text-muted-foreground">
                {seasons.length + 1} Temporadas
              </span>
            </div>
            <p className="text-muted-foreground sm:text-lg leading-relaxed">
              {tvShow.description}
            </p>
          </div>
        </div>
      </div>

      <SeasonsTabs seasons={seasons} episodes={episodes} />
    </div>
  )
}

export default DetailsPage
