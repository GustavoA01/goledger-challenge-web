"use client"
import { Edit } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { ListForm } from "./ListForm"
import { FormHeader } from "../components/FormHeader"
import { ListFormFooter } from "../components/ListFormFooter"
import { HomeFormTrigger } from "../components/HomeFormTrigger"
import { Button } from "../../../components/ui/button"

export const AddToListButton = ({ listTitle }: { listTitle?: string }) => {
  const [openModal, setOpenModal] = useState(false)
  const [onSuccess, setOnSuccess] = useState<number | null>(null)

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      {listTitle ? (
        <DialogTrigger asChild>
          <Button variant="outline" className="rounded-full gap-2">
            <Edit className="h-6 w-6" />
            <p>Editar Lista</p>
          </Button>
        </DialogTrigger>
      ) : (
        <HomeFormTrigger listTitle={!!listTitle} />
      )}
      <DialogContent>
        <FormHeader />
        <ListForm listTitle={listTitle} setOnSuccess={setOnSuccess} setOpenDialog={setOpenModal} />
        <ListFormFooter listTitle={!!listTitle} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}
