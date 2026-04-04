import { Header } from "../components/Header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { APIEpisodeResponseType, APISeasonResponseType } from "../data/types"
import { services } from "../services"
import { ShowsTab } from "../components/ShowsTab"
import { FloatingAddButton } from "../components/FloatingAddButton"
import { AddToListButton } from "../features/ListForm/container/AddListButton"
import { ListsTab } from "../components/ListsTab"

const Home = async () => {
  const tvShowsResponse = await services.tvShows.getAllTvShows()
  const episodesResponse = await services.episodes.getAllEpisodes()
  const seasonsResponse = await services.seasons.getAllSeasons()
  const watchLists = await services.watchlist.getAllWatchlist()
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
          <TabsList className="max-sm:w-full">
            <TabsTrigger value="all">Séries</TabsTrigger>
            <TabsTrigger value="favorites">Listas</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="flex-col max-sm:space-y-4 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ShowsTab tvShows={tvShows} />
            </div>
            <FloatingAddButton url="/nova-serie" />
          </TabsContent>
          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AddToListButton />
              <ListsTab lists={watchLists.data.result} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default Home
