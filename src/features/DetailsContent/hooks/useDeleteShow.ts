import { services } from "@/src/services"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useDeleteShow = () => {
  const { push } = useRouter()

  const { mutateAsync: deleteTvShowFn, isPending: isDeleting } = useMutation({
    mutationFn: (params: { tvShowTitle: string; tvShowKey: string }) => {
      return services.tvShows.deleteTvShowCascade(
        params.tvShowTitle,
        params.tvShowKey,
      )
    },
    onSuccess: () => {
      toast.success("Série excluída")
      push("/")
    },
    onError: (error: AxiosError) => {
      console.error(error)
      toast.error("Ocorreu um erro ao excluir série")
    },
  })
  
  return {
    deleteTvShowFn,
    isDeleting,
  }
}
