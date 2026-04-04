import { Card, CardContent } from "@/src/components/ui/card"
import { DialogTrigger } from "@/src/components/ui/dialog"
import { Plus } from "lucide-react"

export const HomeFormTrigger = ({ listTitle }: { listTitle: boolean }) => (
  <DialogTrigger className="w-full">
    <Card className=" border-2 border-dashed border-muted-foreground bg-transparent group cursor-pointer hover:border-primary transition-all duration-200">
      <CardContent className="flex items-center justify-between flex-col text-muted-foreground group-hover:text-primary">
        <Plus />
        {listTitle ? "Editar lista" : "Adicionar lista"}
      </CardContent>
    </Card>
  </DialogTrigger>
)
