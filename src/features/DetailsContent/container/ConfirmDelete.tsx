"use client"
import { Button } from "@/src/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Trash } from "lucide-react"
import { useDeleteTvShow } from "../hooks/useDeleteTvShow"

export const ConfirmDelete = ({
  tvShowTitle,
  tvShowKey,
}: {
  tvShowTitle: string
  tvShowKey: string
}) => {
  const { deleteTvShowFn, isDeleting } = useDeleteTvShow()

  return (
    <>
      <DialogTrigger asChild>
        <Button variant="destructive" className="rounded-full">
          <Trash className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Excluir série</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir {tvShowTitle}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose disabled={isDeleting} asChild>
            <Button variant="outline">
              {isDeleting ? "Aguarde" : "Cancelar"}
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={() => deleteTvShowFn({ tvShowTitle, tvShowKey })}
          >
            <p className={`${isDeleting ? "animate-pulse" : ""}`}>
              {isDeleting ? "Excluindo..." : "Excluir"}
            </p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}
