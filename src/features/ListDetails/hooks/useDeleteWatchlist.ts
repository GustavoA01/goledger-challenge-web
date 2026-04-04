import { WatchlistType } from "@/src/data/types"
import { services } from "@/src/services"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const useDeleteWatchlist = () => {
  const { push } = useRouter()
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false)
  
  const { mutateAsync: deleteWatchlistFn, isPending: isDeleting } = useMutation(
    {
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
    },
  )

  const { mutateAsync: removeShowFn, isPending:isRemovingShow } = useMutation({
    mutationFn: async (data: Omit<WatchlistType, "@key">) => {
      return await services.watchlist.updateWatchlist(data)
    },
    onSuccess: () => {
      setOpenRemoveDialog(false)
      toast.success("Série removida")
    },
    onError: (error: AxiosError) => {
      setOpenRemoveDialog(false)
      console.error("Erro ao remover série", error)
      toast.error("Ocorreu um erro ao remover série")
    },
  })

  return {
    deleteWatchlistFn,
    isDeleting,
    removeShowFn,
    openRemoveDialog,
    setOpenRemoveDialog,
    isRemovingShow
  }
}
