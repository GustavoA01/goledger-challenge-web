import { FormLabelInput } from "@/src/components/FormLabelInput"
import { WatchlistFormType } from "@/src/data/schemas"
import { useListForm } from "../hooks/useListForm"

type ListFormProps = {
  setOpenDialog: (open: boolean) => void
  setOnSuccess: (id: number | null) => void
  listTitle?: string
}

export const ListForm = ({ setOpenDialog, setOnSuccess, listTitle }: ListFormProps) => {
  const { handleCreateWatchList, methods } = useListForm({
    setOnSuccess,
    setOpenDialog,
    listTitle,
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  return (
    <form
      id="watchlist-form"
      onSubmit={handleSubmit(handleCreateWatchList)}
      className="space-y-4"
    >
      <FormLabelInput<WatchlistFormType>
        error={errors.title}
        name="title"
        register={register}
        label="Título"
        placeholder="Ex: Favoritos"
        disabled={!!listTitle}
      />
      <FormLabelInput<WatchlistFormType>
        error={errors.description}
        name="description"
        register={register}
        label="Descrição"
        placeholder="Ex: minhas séries favoritas"
      />
    </form>
  )
}
