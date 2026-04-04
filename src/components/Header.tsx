import { Plus, Search } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-800/20 backdrop-blur-md">
      <div className="flex items-center container justify-center mx-auto gap-4 p-8">
        <h1 className="p-2 bg-primary text-black font-bold rounded-md select-none">
          GoSERIES
        </h1>
        <Input placeholder="Procurar série" />
        <Button className="text-muted-foreground" variant="outline">
          <Search />
          <p className="hidden sm:block">Buscar</p>
        </Button>
        <Link href="/nova-serie" className="hidden sm:block">
          <Button>
            <Plus />
            <p className="hidden sm:block">Adicionar série</p>
          </Button>
        </Link>
      </div>
    </header>
  )
}
