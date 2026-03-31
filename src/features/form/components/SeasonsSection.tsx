import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"

export const SeasonsSection = () => {
  return (
    <Card className="bg-muted/10">
      <CardHeader>
        <CardTitle>Estrutura de Lançamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Total de Temporadas</Label>
          <Input type="number" min={1} defaultValue={1} />
        </div>
        {/* <div className="space-y-2">
              <Label>Episódios (Soma total)</Label>
              <Input type="number" defaultValue={1} />
            </div>
            <div className="space-y-2">
              <Label>Ano  (Soma total)</Label>
              <Input type="number" defaultValue={1} />
            </div> */}
      </CardContent>
    </Card>
  )
}
