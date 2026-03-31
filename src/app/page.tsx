import { Header } from "../components/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { APIEpisodeResponseType, APISeasonResponseType } from "../data/types"
import { services } from "../services"
import { ShowsTab } from "../components/ShowsTab"

const Home = async () => {
  const tvShowsResponse = await services.tvShows.getAll()
  const episodesResponse = await services.episodes.getAll()
  const seasonsResponse = await services.seasons.getAll()
  const tvShows = []

  const getSeasonsWithEpisodes = (tvShowKey: string) => {
    const seasons = seasonsResponse.data.result.filter(
      (season: APISeasonResponseType) => season.tvShow["@key"] === tvShowKey,
    )

    return seasons.map((season: APISeasonResponseType) => ({
      ...season,
      episodes: episodesResponse.data.result.filter(
        (episode: APIEpisodeResponseType) =>
          episode.season["@key"] === season["@key"],
      ),
    }))
  }

  for (const tvShow of tvShowsResponse.result) {
    const show = {
      "@key": tvShow["@key"],
      title: tvShow.title,
      description: tvShow.description,
      recommendedAge: tvShow.recommendedAge,
      seasonWithEpisodes: getSeasonsWithEpisodes(tvShow["@key"]),
    }
    tvShows.push(show)
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4 mt-24">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ShowsTab tvShows={tvShows} />
          </TabsContent>
          <TabsContent value="favorites">Favorites</TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default Home
