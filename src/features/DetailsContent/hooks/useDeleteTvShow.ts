import { services } from "@/src/services"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const useDeleteTvShow = () => {
  const { push } = useRouter()
  const { mutateAsync: deleteTvShow, isPending: isDeleting } = useMutation({
    mutationFn: services.tvShows.deleteTvShow,
    onSuccess: () => {
      toast.success("Série excluída com sucesso")
      push("/")
    },
    onError: (error: AxiosError) => {
      console.error(error.message)
      toast.error("Ocorreu um erro ao excluir série")
    },
  })
  
  return {
    deleteTvShow,
    isDeleting,
  }
}