import { FormLabelInput } from "./FormLabelInput"

export const EpisodeSection = ({ index }: { index: number }) => {
  return (
    <div className="space-y-2 ml-4">
    <FormLabelInput label="Título" placeholder={`Título do episódio ${index + 1}`} />
    <FormLabelInput label="Número do Episódio" inputType="number" placeholder={`Número do episódio ${index + 1}`} />
    <FormLabelInput label="Descrição" placeholder={`Descrição do episódio ${index + 1}`} />
    <FormLabelInput label="Data" placeholder={`Data de lançamento do episódio ${index + 1}`} />
    </div>
  )
}
