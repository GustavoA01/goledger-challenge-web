import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { AgeSelect } from "@/src/features/form/components/AgeSelect"

export const DetailsSection = () => {
  return (
    <Card className="bg-muted/10">
      <CardHeader>
        <CardTitle>Detalhes Principais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título da Série</Label>
          <Input id="title" placeholder="Ex: Breaking Bad" />
        </div>
        <div className="space-y-2">
          <Label>Descrição (Sinopse)</Label>
          <Textarea
            placeholder="Escreva sobre a série (sem spoilers!)"
            className="resize-none"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Classificação Indicativa</Label>
          <AgeSelect />
        </div>
      </CardContent>
    </Card>
  )
}
