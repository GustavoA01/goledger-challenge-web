import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs"
import { ArrowLeft, Star, Calendar, Bookmark, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { services } from "@/src/services"

const tvShow = {
  title: "Stranger Chains",
  recommendedAge: 16,
  rating: 8.7,
  description:
    "Um grupo de amigos descobre um mistério envolvendo contratos inteligentes e dimensões paralelas. A rede principal corre perigo e apenas eles possuem as chaves privadas para salvar o ecossistema.",
  seasons: [
    {
      number: 1,
      episodes: [
        {
          title: "Piloto",
          rating: 10,
          releaseDate: "2026-03-31",
          description: "Episódio piloto",
        },
        {
          title: "O Bloco Gênesis",
          rating: 9,
          releaseDate: "2026-04-07",
          description: "Continuação",
        },
      ],
    },
  ],
}

const DetailsPage = async ({
  params,
}: {
  params: Promise<{ title: string }>
}) => {
  const { title } = await params
  const titleKey = decodeURIComponent(title)

  const tvShowResponse = await services.tvShows.getTvShowByKey(titleKey)
  const seasonsResponse = await services.seasons.getAllSeasons()

  const seasons = seasonsResponse?.data.result.filter(
    (season) => season.tvShow["@key"] === tvShowResponse["@key"],
  ).sort((a, b) => a.number - b.number) || []
  console.log(seasons)

  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-linear-to-r from-primary/20 to-background pt-8 pb-16">
        <div className="container mx-auto px-4">
          <header className="flex justify-between items-center mb-8">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full gap-2">
                <Bookmark className="h-4 w-4" />
                Na Watchlist
              </Button>
              <Button variant="outline" className="rounded-full gap-2">
                <Edit className="h-4 w-4" />
                Editar Série
              </Button>
              <Button variant="destructive" className="rounded-full">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-3">{tvShow.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {tvShow.recommendedAge}+
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold text-lg">{tvShow.rating}</span>
                <span className="text-muted-foreground">/ 10</span>
              </div>
              <span className="text-muted-foreground">
                {tvShow.seasons.length} Temporadas
              </span>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {tvShow.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="seasons" className="w-full">
          <TabsList className="mb-6">
            {seasons.map((season) => (
              <TabsTrigger
                key={season.number}
                value={`season-${season.number}`}
              >
                Temporada {season.number}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="seasons" className="space-y-8">
            {tvShow.seasons.map((season) => (
              <div key={season.number} className="space-y-4">
                <h2 className="text-2xl font-semibold">
                  Temporada {season.number}
                </h2>
                <div className="grid gap-3">
                  {season.episodes.map((episode, idx) => (
                    <Card
                      key={idx}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">
                                {episode.title}
                              </h3>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                <span className="text-sm font-medium">
                                  {episode.rating}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {episode.description}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {new Date(
                                  episode.releaseDate,
                                ).toLocaleDateString("pt-BR", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="watchlist">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Adicione esta série à sua watchlist para acompanhar.
                </p>
                <Button className="mt-4 gap-2">
                  <Bookmark className="h-4 w-4" />
                  Adicionar à Watchlist
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default DetailsPage
