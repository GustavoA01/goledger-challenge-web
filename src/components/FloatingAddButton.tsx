import Link from "next/link"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

export const FloatingAddButton = () => (
  <Link
    href="/nova-serie"
    className="fixed bottom-5 right-5 rounded-full h-auto w-auto"
  >
    <Button className="sm:hidden rounded-full h-14 w-14">
      <Plus className=" h-8 w-8" />
    </Button>
  </Link>
)
