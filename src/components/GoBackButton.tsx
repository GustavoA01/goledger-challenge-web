"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

export const GoBackButton = () => {
  const {back} = useRouter()

  return (
    <Button
      onClick={() => back()}
      variant="ghost"
      className="rounded-full"
    >
      <ArrowLeft className="h-6 w-6" />
    </Button>
  )
}
