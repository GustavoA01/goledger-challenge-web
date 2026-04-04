import { SavingProgress } from "@/src/components/SavingProgress"
import { Button } from "@/src/components/ui/button"
import { DialogClose, DialogFooter } from "@/src/components/ui/dialog"

const savingValue: Record<number, { message: string; value: number }> = {
  0: {
    message: "Criando lista...",
    value: 0,
  },
  1: {
    message: "Lista salva",
    value: 100,
  },
}

export const ListFormFooter = ({ onSuccess }: { onSuccess: number | null }) => (
  <DialogFooter>
    <div className="mr-auto">
      {onSuccess !== null && (
        <SavingProgress
          message={savingValue[onSuccess].message}
          value={savingValue[onSuccess].value}
        />
      )}
    </div>
    <div className="space-x-2">
      <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DialogClose>
      <Button disabled={onSuccess !== null} type="submit" form="watchlist-form">
        Criar
      </Button>
    </div>
  </DialogFooter>
)
