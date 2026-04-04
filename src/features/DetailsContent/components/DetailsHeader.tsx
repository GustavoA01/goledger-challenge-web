import { Button } from "@/src/components/ui/button"
import { Dialog } from "@/src/components/ui/dialog"
import { Edit } from "lucide-react"
import Link from "next/link"
import { ConfirmDelete } from "../container/ConfirmDelete"
import { GoBackButton } from "@/src/components/GoBackButton"

export const DetailsHeader = ({ tvShowTitle,tvShowKey }: { tvShowTitle: string; tvShowKey: string }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <GoBackButton />
      <div className="flex gap-2">
        <Link href={`/nova-serie?title=${encodeURIComponent(tvShowTitle)}`}>
          <Button variant="outline" className="rounded-full gap-2">
            <Edit className="h-6 w-6" />
            <p>Editar Série</p>
          </Button>
        </Link>
        <Dialog>
          <ConfirmDelete tvShowTitle={tvShowTitle} tvShowKey={tvShowKey} />
        </Dialog>
      </div>
    </header>
  )
}
