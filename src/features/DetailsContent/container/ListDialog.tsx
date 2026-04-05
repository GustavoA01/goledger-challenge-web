"use client"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { Spinner } from "@/src/components/ui/spinner"
import { useDetailsContent } from "../hooks/useDetailsContent"

export const ListDialog = ({ tvShowKey }: { tvShowKey: string }) => {
  const { handleAddToList, isAddingToList, list } = useDetailsContent(tvShowKey)

  return (
    <DialogContent className="overflow-hidden h-100">
      <DialogHeader>
        <DialogTitle>Adicionar a uma lista</DialogTitle>
        <DialogDescription>
          Selecione uma lista para adicionar essa série
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-2 overflow-y-auto">
        {isAddingToList ? (
          <div className="flex justify-center">
            <Spinner className="text-primary" />
          </div>
        ) : (
          list?.map((watchlist) => (
            <div
              key={watchlist["@key"]}
              onClick={() => handleAddToList(watchlist.title)}
              className="text-center p-2 bg-primary/10 rounded-lg cursor-pointer hover:bg-primary/20 transition-all duration-200"
            >
              {watchlist.title}
            </div>
          ))
        )}
      </div>
    </DialogContent>
  )
}
