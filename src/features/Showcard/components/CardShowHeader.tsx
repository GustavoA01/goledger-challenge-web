import { CardAction, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Bookmark, EllipsisVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { Button } from "@/src/components/ui/button"

type CardShowHeaderProps = {
  title: string
  handleAddToFavorites: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const CardShowHeader = ({
  title,
  handleAddToFavorites,
}: CardShowHeaderProps) => (
  <CardHeader className="w-full">
    <CardTitle className="line-clamp-1">{title}</CardTitle>
    <CardAction className="space-x-2">
      <Button
        className="group"
        onClick={handleAddToFavorites}
        variant="ghost"
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
