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

export const ConfirmDelete = ({ tvShowTitle }: { tvShowTitle: string }) => {
  const {deleteTvShow,isDeleting} = useDeleteTvShow()

  return (
    <>
      <DialogTrigger asChild>
        <Button variant="destructive" className="rounded-full">
          <Trash className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir série</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir {tvShowTitle}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={() => deleteTvShow(tvShowTitle)}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}
