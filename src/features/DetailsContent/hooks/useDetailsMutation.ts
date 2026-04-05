import { services } from "@/src/services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDetailsMutation = (tvShowKey?: string) => {
  const queryClient = useQueryClient()

  const { data: listResponse } = useQuery({
    queryKey: ["watchlists"],
    queryFn: services.watchlist.getAllWatchlist,
    enabled: !!tvShowKey,
  })

  const { mutateAsync: updateListFn, isPending: isAddingToList } = useMutation({
    mutationFn: services.watchlist.updateWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlists"] })
      toast.success("Série adicionada à lista!")
    },
    onError: () => {
      console.error("Erro ao adicionar série à lista")
      toast.error("Erro ao adicionar série à lista")
    },
  })

  const list = listResponse?.data.result.filter(
    (watchlist) =>
      !watchlist.tvShows?.some((tvShow) => tvShow["@key"] === tvShowKey),
  )

  return {
    list,
    updateListFn,
    isAddingToList,
  }
}
