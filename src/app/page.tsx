import { Header } from "../components/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { APIEpisodeResponseType, APISeasonResponseType } from "../data/types"
import { services } from "../services"
import { ShowsTab } from "../components/ShowsTab"

const Home = async () => {
  const tvShowsResponse = await services.tvShows.getAllTvShows()
  const episodesResponse = await services.episodes.getAllEpisodes()
  const seasonsResponse = await services.seasons.getAllSeasons()
  const tvShows = []

  for (const tvShow of tvShowsResponse.result) {
    const seasonsOfShow = seasonsResponse?.data.result.filter(
      (season: APISeasonResponseType) =>
        season.tvShow["@key"] === tvShow["@key"],
    )

    const seasonKeys = seasonsOfShow?.map((season) => season["@key"])

    const numberOfEpisodes = episodesResponse.data.result.filter(
      (episode: APIEpisodeResponseType) =>
        seasonKeys?.includes(episode.season["@key"]),
    ).length

    const show = {
      "@key": tvShow["@key"],
      title: tvShow.title,
      description: tvShow.description,
      recommendedAge: tvShow.recommendedAge,
      numberOfSeasons: seasonsOfShow?.length,
      numberOfEpisodes: numberOfEpisodes,
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
