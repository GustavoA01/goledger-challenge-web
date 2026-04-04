import { WatchlistType } from "@/src/data/types"
import { services } from "@/src/services"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const useDeleteList = (isAdding?: boolean) => {
  const { push, refresh } = useRouter()
  const [updateDialog, setUpdateDialog] = useState(false)

  const { mutateAsync: deleteList, isPending: isDeleting } = useMutation({
    mutationFn: (watchListTitle: string) =>
      services.watchlist.deleteWatchlist(watchListTitle),
    onSuccess: () => {
      toast.success("Série excluída com sucesso")
      push("/")
    },
    onError: (error: AxiosError) => {
      console.error(error)
      toast.error("Ocorreu um erro ao excluir série")
    },
  })

  const { mutateAsync: updateShowsFn, isPending: isUpdating } = useMutation({
    mutationFn: async (data: Omit<WatchlistType, "@key">) => {
      return await services.watchlist.updateWatchlist(data)
    },
    onSuccess: () => {
      if (isAdding) toast.success("Série adicionada")
      else toast.success("Série removida")
      setUpdateDialog(false)
      refresh()
    },
    onError: (error: AxiosError) => {
      if (isAdding) {
        console.error("Erro ao adicionar série", error)
        toast.error("Ocorreu um erro ao adicionar série")
      } else {
        toast.error("Ocorreu um erro ao remover série")
        console.error("Erro ao remover série", error)
      }
    },
  })

  return {
    deleteList,
    isDeleting,
    updateShowsFn,
    updateDialog,
    setUpdateDialog,
    isUpdating,
    push
  }
}
