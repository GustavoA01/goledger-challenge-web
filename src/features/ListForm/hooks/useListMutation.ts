import { WatchlistType } from "@/src/data/types"
import { services } from "@/src/services"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type UseListMutationProps = {
  setOnSuccess: (id: number | null) => void
  setOpenDialog: (open: boolean) => void
}

export const useListMutation = ({
  setOnSuccess,
  setOpenDialog,
}: UseListMutationProps) => {
  const { refresh } = useRouter()

  const { mutateAsync: createListFn } = useMutation({
    mutationFn: async (data: Omit<WatchlistType, "@key" | "tvShows">) => {
      setOnSuccess(0)
      return await services.watchlist.createWatchlist([data])
    },
    onSuccess: () => {
      setOnSuccess(1)
      toast.success("Lista criada com sucesso")
      setOpenDialog(false)
      refresh()
    },
    onError: (error: AxiosError) => {
      setOnSuccess(null)
      if (error.response?.status === 409) {
        toast.error(
          "Você já tem uma lista com esse título, escolha outro nome.",
        )
      } else {
        console.error("Erro ao criar lista", error)
        toast.error("Ocorreu um erro ao criar lista")
      }
    },
  })

  return {
    createListFn,
  }
}
