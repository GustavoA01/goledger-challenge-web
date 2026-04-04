import { APITvShowsResponseType } from "@/src/data/types"
import { ListHeader } from "@/src/features/ListDetails/components/ListHeader"
import { ListInfo } from "@/src/features/ListDetails/components/ListInfo"
import { ListDetailsContent } from "@/src/features/ListDetails/container/ListDetailsContent"
import { services } from "@/src/services"

const WatchListDetailsPage = async ({
  params,
}: {
  params: Promise<{ title: string }>
}) => {
  const { title } = await params
  const listTitle = decodeURIComponent(title)
  const watchList = await services.watchlist.getWatchlistByKey(listTitle)

  const tvShowsKeys = watchList.tvShows?.map((tvShow) => tvShow["@key"]) || []
  const tvShowsResponse = await services.tvShows.getAllTvShows()
  const tvShowsAdded: APITvShowsResponseType[] = []
  const tvShowsNotAdded: APITvShowsResponseType[] = []

  tvShowsResponse?.result.forEach((show) => {
    if (tvShowsKeys.includes(show["@key"])) {
      tvShowsAdded.push(show)
    } else {
      tvShowsNotAdded.push(show)
    }
  })

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="bg-linear-to-r from-primary/30 to-background pt-8 pb-16">
        <div className="container mx-auto px-4">
          <ListHeader listTitle={watchList.title} tvShows={tvShowsNotAdded} />
          <ListInfo
            listTitle={watchList.title}
            listDescription={watchList.description}
            tvShows={tvShowsAdded}
          />
        </div>
      </div>
      <ListDetailsContent
        titleKey={watchList.title}
        tvShowsAdded={tvShowsAdded}
        tvShowsKeys={tvShowsKeys}
      />
    </div>
  )
}

export default WatchListDetailsPage
