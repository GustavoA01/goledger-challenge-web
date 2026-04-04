import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Trash } from "lucide-react"
import Link from "next/link"
import { RemoveShowModal } from "../container/RemoveShowModal"

type TvShowCardProps = {
  tvShowTitle: string
  tvShowDescription?: string
  onClickCard: () => void
  setRemoveModal: () => void
}

export const TvShowCard = ({
  tvShowTitle,
  tvShowDescription,
  onClickCard,
  setRemoveModal,
}: TvShowCardProps) => (
  <div className="bg-primary/15 p-4 h-full flex flex-col gap-2 max-h-40 rounded-lg overflow-hidden border hover:border-accent hover:-translate-y-1 transition-all duration-200">
    <div className="flex justify-between">
      <div className="flex-1 cursor-pointer" onClick={onClickCard}>
        <h2 className="text-xl font-semibold">{tvShowTitle}</h2>
      </div>
      <Button onClick={setRemoveModal} size="sm" variant="outline">
        <Trash className="w-6 h-6" />
      </Button>
    </div>
    <div className="cursor-pointer" onClick={onClickCard}>
      <p className="text-sm text-muted-foreground line-clamp-3">
        {tvShowDescription ? tvShowDescription : "Sem descrição disponível."}
      </p>
    </div>
  </div>
)
