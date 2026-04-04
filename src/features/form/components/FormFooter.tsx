import { SavingProgress } from "@/src/components/SavingProgress"
import { Button } from "@/src/components/ui/button"

const onSuccessMessages: Record<number, { value: number; message: string }> = {
  0: {
    value:0,
    message: "Salvando série..."
  },
  1: {
    value:33,
    message: "Salvando temporadas..."
  },
  2: {
    value:66,
    message: "Salvando episódios..."
  },
  3: {
    value:100,
    message: "Série salva!"
  }
}

type FormFooterProps = {
  onSuccess: number | null
  goBack: () => void
}

export const FormFooter = ({ onSuccess, goBack }: FormFooterProps) => (
  <div className="flex justify-between gap-4">
    {onSuccess !== null && (
      <SavingProgress
        message={onSuccessMessages[onSuccess].message}
        value={onSuccessMessages[onSuccess].value}
      />
    )}
    <div className="space-x-2 ml-auto">
      <Button disabled={onSuccess !== null} variant="outline" type="button" onClick={goBack}>
        {onSuccess !== null ? "Aguarde" : "Cancelar"}
      </Button>
      <Button disabled={onSuccess !== null}>Salvar</Button>
    </div>
  </div>
)
