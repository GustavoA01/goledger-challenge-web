import Link from "next/link"

type TvShowCardProps = {
  tvShowTitle: string
  tvShowDescription?: string
}

export const TvShowCard = ({
  tvShowTitle,
  tvShowDescription,
}: TvShowCardProps) => (
  <Link
    href={`/detalhes/${encodeURIComponent(tvShowTitle)}`}
    className="rounded-lg overflow-hidden border hover:border-accent hover:-translate-y-1 transition-all duration-200"
  >
    <div className="bg-primary/15 p-4 h-full flex flex-col gap-2 max-h-40">
      <h2 className="text-xl font-semibold">{tvShowTitle}</h2>
      <p className="text-sm text-muted-foreground line-clamp-3">
        {tvShowDescription ? tvShowDescription : "Sem descrição disponível."}
      </p>
    </div>
  </Link>
)
