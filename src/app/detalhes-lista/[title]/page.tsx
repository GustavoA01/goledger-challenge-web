import { GoBackButton } from "@/src/components/GoBackButton"
import { Button } from "@/src/components/ui/button"
import { Dialog } from "@/src/components/ui/dialog"
import { services } from "@/src/services"
import { Edit, Plus } from "lucide-react"
import Link from "next/link"

const WatchListDetailsPage = async ({
  params,
}: {
  params: Promise<{ title: string }>
}) => {
  const { title } = await params
  const listTitle = decodeURIComponent(title)
  const watchList = await services.watchlist.getWatchlistByKey(listTitle)
  console.log(watchList)
  const tvShowsKeys = watchList.tvShows?.map((tvShow) => tvShow["@key"]) || []
  const tvShowsResponse = await services.tvShows.getAllTvShows()
  const tvShows =
    tvShowsResponse?.result.filter((tvShow) =>
      tvShowsKeys.includes(tvShow["@key"]),
    ) || []

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="bg-linear-to-r from-primary/20 to-background pt-8 pb-16">
        <div className="container mx-auto px-4">
          <header className="flex justify-between items-center mb-8">
            <GoBackButton />
            <div className="flex gap-2">
                <Button variant="outline" className="rounded-full gap-2">
                  <Plus className="h-6 w-6" />
                  <p>Adicionar série</p>
                </Button>
              <Link href={`/nova-serie?title=${encodeURIComponent(listTitle)}`}>
                <Button variant="outline" className="rounded-full gap-2">
                  <Edit className="h-6 w-6" />
                  <p>Editar Lista</p>
                </Button>
              </Link>
              <Dialog>
                {/* <ConfirmDelete tvShowTitle={tvShowTitle} tvShowKey={tvShowKey} /> */}
              </Dialog>
            </div>
          </header>
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-3">{listTitle}</h1>
            <p className="text-muted-foreground sm:text-lg leading-relaxed">
              {watchList.description || "Sem descrição para esta lista."}
            </p>
            <p className="text-muted-foreground sm:text-lg leading-relaxed">
              {!watchList.tvShows
                ? "Essa lista não possui séries adicionadas."
                : `${watchList.tvShows.length === 1 ? "1 série" : `${watchList.tvShows?.length} séries`}`}
            </p>
          </div>
        </div>
      </div>
      <main className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tvShows.map((tvShow) => (
            <Link
              key={tvShow["@key"]}
              href={`/detalhes/${encodeURIComponent(tvShow.title)}`}
              className="rounded-lg overflow-hidden border hover:border-accent hover:-translate-y-1 transition-all duration-200"
            >
              <div className="bg-primary/10 p-4 h-full flex flex-col gap-2 max-h-40">
                <h2 className="text-xl font-semibold">{tvShow.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {tvShow.description
                    ? tvShow.description
                    : "Sem descrição disponível."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export default WatchListDetailsPage
