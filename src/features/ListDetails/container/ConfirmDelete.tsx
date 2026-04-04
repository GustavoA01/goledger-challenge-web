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
import { useDeleteList } from "../hooks/useDeleteWatchlist"

export const ConfirmDelete = ({
  watchListTitle,
}: {
  watchListTitle: string
}) => {
  const { deleteList, isDeleting } = useDeleteList()
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
            Tem certeza que deseja excluir {watchListTitle}?
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
            onClick={() => deleteList(watchListTitle)}
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
