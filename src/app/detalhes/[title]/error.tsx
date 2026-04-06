"use client"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"

const DetailsNotFound = () => (
  <div className="min-h-screen bg-background flex items-center justify-center px-4">
    <div className="text-center space-y-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">Série não encontrada</h2>
      <p className="text-muted-foreground">
        A série que você procura não existe mais ou foi removida.
      </p>
      <Link href="/">
        <Button>Voltar para o início</Button>
      </Link>
    </div>
  </div>
)

export default DetailsNotFound
