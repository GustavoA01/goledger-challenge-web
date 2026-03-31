import { Button } from "@/src/components/ui/button"
import { ShowForm } from "@/src/features/form/container/ShowForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const NewShowPage = () => {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <header className="flex items-center gap-4 mt-4">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Adicionar Nova Série</h1>
      </header>
      
      <ShowForm />
    </div>
  )
}

export default NewShowPage
