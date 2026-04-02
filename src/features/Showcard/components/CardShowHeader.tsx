import { CardAction, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Bookmark } from "lucide-react"
import { Button } from "@/src/components/ui/button"

type CardShowHeaderProps = {
  title: string
  recommendedAge: number
  handleAddToFavorites: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const borderColor: Record<number, string> = {
  0: "border-[#2d913d]",
  10: "border-[#09d1ff]",
  12: "border-[#fdcd01]",
  14: "border-[#ff6801]",
  16: "border-[#ff0101]",
  18: "border-black",
}

export const CardShowHeader = ({
  title,
  recommendedAge,
  handleAddToFavorites,
}: CardShowHeaderProps) => (
  <CardHeader className="w-full">
    <CardTitle className="line-clamp-1 group-hover:text-primary transition-all duration-200">
      {title}
    </CardTitle>
    <CardAction className="space-x-2 items-center">
      <span
        className={`border p-1 font-font-semibold rounded-md ${borderColor[recommendedAge] || "border-gray-800"}`}
      >
        {recommendedAge === 0 ? "Livre" : `${recommendedAge}+`}
      </span>
      <Button
        className="group/bookmark"
        onClick={handleAddToFavorites}
        variant="ghost"
      >
        <Bookmark className="group-hover/bookmark:text-primary transition-all duration-200 h-6 w-6" />
      </Button>
    </CardAction>
  </CardHeader>
)
