import { Button } from "@/src/components/ui/button"
import { Progress } from "@/src/components/ui/progress"
import Link from "next/link"

const onSuccessMessages = [
  "Salvando série...",
  "Salvando temporadas...",
  "Salvando episódios...",
  "Série salva!",
]

type FormFooterProps = {
  onSuccess: number | null
}

export const FormFooter = ({ onSuccess }: FormFooterProps) => {
  const progressValues: Record<number, number> = {
    0: 0,
    1: 33,
    2: 66,
    3: 100,
  }

  return (
    <div className="flex justify-between gap-4">
      <div>
        {onSuccess !== null && (
          <div className="ml-2 space-y-1">
            <p className="text-muted-foreground animate-pulse text-sm">
              {onSuccessMessages[onSuccess]}
            </p>
            <Progress value={progressValues[onSuccess]} className="w-48" />
          </div>
        )}
      </div>
      <div className="space-x-2">
        <Link href="/">
          <Button variant="outline" type="button">
            Cancelar
          </Button>
        </Link>
        <Button>Salvar</Button>
      </div>
    </div>
  )
}
