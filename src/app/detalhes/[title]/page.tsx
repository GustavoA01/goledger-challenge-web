import { SeasonsTabs } from "@/src/features/DetailsContent/container/SeasonsTabs"
import { DetailsHeader } from "@/src/features/DetailsContent/container/DetailsHeader"
import { ShowInfo } from "@/src/features/DetailsContent/components/ShowInfo"
import { services } from "@/src/services"

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

    return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="relative bg-linear-to-r from-primary/20 to-background pt-8 pb-16">
        <div className="container mx-auto px-4">
          <DetailsHeader />

          <ShowInfo
            title={tvShow.title}
            recommendedAge={tvShow.recommendedAge}
            description={tvShow.description}
            seasonsCount={seasons.length + 1}
            rating={10}
          />
        </div>
      </div>

      <SeasonsTabs seasons={seasons} episodes={episodes} />
    </div>
  )
}

export default DetailsPage
