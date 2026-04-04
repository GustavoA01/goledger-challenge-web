"use client"
import { Plus } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { ListForm } from "../features/ListForm/container/ListForm"
import { FormHeader } from "../features/ListForm/components/FormHeader"
import { ListFormFooter } from "../features/ListForm/components/ListFormFooter"

export const AddToListButton = () => {
  const [openModal, setOpenModal] = useState(false)
  const [onSuccess, setOnSuccess] = useState<number | null>(null)

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger>
        <Card className="hidden sm:flex border-2 border-dashed border-muted-foreground bg-transparent group cursor-pointer hover:border-primary transition-all duration-200">
          <CardContent className="flex items-center justify-between flex-col text-muted-foreground group-hover:text-primary">
            <Plus />
            Adicionar lista
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <FormHeader />
        <ListForm setOnSuccess={setOnSuccess} setOpenDialog={setOpenModal}/>
        <ListFormFooter onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}
