import { SavingProgress } from "@/src/components/SavingProgress"
import { Button } from "@/src/components/ui/button"

const onSuccessMessages = [
  "Salvando série...",
  "Salvando temporadas...",
  "Salvando episódios...",
  "Série salva!",
]

const progressValues: Record<number, number> = {
  0: 0,
  1: 33,
  2: 66,
  3: 100,
}

type FormFooterProps = {
  onSuccess: number | null
  goBack: () => void
}

export const FormFooter = ({ onSuccess, goBack }: FormFooterProps) => (
  <div className="flex justify-between gap-4">
    {onSuccess !== null && (
      <SavingProgress
        message={onSuccessMessages[onSuccess]}
        value={progressValues[onSuccess]}
      />
    )}
    <div className="space-x-2 ml-auto">
      <Button variant="outline" type="button" onClick={goBack}>
        Cancelar
      </Button>
      <Button>Salvar</Button>
    </div>
  </div>
)
