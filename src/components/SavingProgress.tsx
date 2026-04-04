import { Progress } from "./ui/progress"

type SavingProgressProps = {
  message: string
  value: number
}

export const SavingProgress = ({
  message,
  value,
}: SavingProgressProps) => (
  <div>
    <div className="ml-2 space-y-1">
      <p className="text-muted-foreground animate-pulse text-sm">{message}</p>
      <Progress value={value} className="w-48" />
    </div>
  </div>
)
