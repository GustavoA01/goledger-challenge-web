import { Button } from "@/src/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

type RemoveShowModalProps = {
  handleRemoveShow: () => void
  isRemovingShow: boolean
}

export const RemoveShowModal = ({
  handleRemoveShow,
  isRemovingShow,
}: RemoveShowModalProps) => (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Remover série</DialogTitle>
      <DialogDescription>
        Tem certeza que deseja remover essa série da lista?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline" disabled={isRemovingShow}>
          Cancelar
        </Button>
      </DialogClose>
      <DialogClose asChild>
        <Button
          variant="destructive"
          onClick={handleRemoveShow}
          disabled={isRemovingShow}
        >
          {isRemovingShow ? "Removendo..." : "Remover"}
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
)
