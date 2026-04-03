import { Button } from "@/src/components/ui/button"
import { ArrowLeft, Bookmark, Edit, Trash } from "lucide-react"
import Link from "next/link"

export const DetailsHeader = () => (
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
)
