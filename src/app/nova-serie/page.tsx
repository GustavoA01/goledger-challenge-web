import { GoBackButton } from "@/src/components/GoBackButton"
import { ShowForm } from "@/src/features/form/container/ShowForm"

const NewShowPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>
}) => {
  const { title } = await searchParams
  const key = title ? decodeURIComponent(title) : undefined
  
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <header className="flex items-center gap-4 mt-4">
        <GoBackButton/>
        <h1 className="text-xl font-semibold">
          {key ? "Editar" : "Adicionar Nova"} Série
        </h1>
      </header>

      <ShowForm titleKey={key}/>
    </div>
  )
}

export default NewShowPage
