import { Button } from "@/components/ui/button"
import { CardAction, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Bookmark, EllipsisVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

type CardShowHeaderProps = {
  title: string
  handleAddToFavorites: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const CardShowHeader = ({
  title,
  handleAddToFavorites,
}: CardShowHeaderProps) => (
  <CardHeader className="w-full">
    <CardTitle>{title}</CardTitle>
    <CardAction>
      <Button
        className="group"
        onClick={handleAddToFavorites}
        variant="outline"
      >
        <Bookmark className="group-hover:text-primary transition-all duration-200 h-6 w-6" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <EllipsisVertical className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardAction>
  </CardHeader>
)
