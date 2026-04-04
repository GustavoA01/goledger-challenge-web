"use client"
import { Plus } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { useRouter } from "next/navigation"

export const AddToListButton = () => {
  const {push} = useRouter()

  return (
    <Card onClick={()=>push("/nova-lista")} className="hidden sm:flex border-2 border-dashed border-muted-foreground bg-transparent group cursor-pointer hover:border-primary transition-all duration-200">
      <CardContent className="flex items-center justify-between flex-col text-muted-foreground group-hover:text-primary">
        <Plus />
        Adicionar lista
      </CardContent>
    </Card>
  )
}
