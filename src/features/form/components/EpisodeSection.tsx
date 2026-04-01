import { DatePicker } from "@/src/components/DatePicker"
import { FormLabelInput } from "./FormLabelInput"
import { Controller, useFormContext } from "react-hook-form"
import { TvShowFormType } from "@/src/data/schemas"
import { Label } from "@/src/components/ui/label"

type EpisodeSectionProps = {
  seasonIndex: number
  episodeIndex: number
}

export const EpisodeSection = ({
  seasonIndex,
  episodeIndex,
}: EpisodeSectionProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TvShowFormType>()
  const error = errors?.seasons?.[seasonIndex]?.episodes?.[episodeIndex]

  return (
    <div className="space-y-2 ml-4">
      <FormLabelInput<TvShowFormType>
        label="Título"
        placeholder={`Título do episódio ${episodeIndex + 1}`}
        name={`seasons.${seasonIndex}.episodes.${episodeIndex}.title`}
        register={register}
        error={error?.title}
      />

      <FormLabelInput<TvShowFormType>
        label="Descrição"
        placeholder={`Descrição do episódio ${episodeIndex + 1}`}
        name={`seasons.${seasonIndex}.episodes.${episodeIndex}.description`}
        register={register}
        error={error?.description}
      />

      <FormLabelInput<TvShowFormType>
        label="Avaliação"
        inputType="number"
        placeholder={`Nota do episódio ${episodeIndex + 1}`}
        name={`seasons.${seasonIndex}.episodes.${episodeIndex}.rating`}
        register={register}
        error={error?.rating}
        transformToNumber={(value) =>
          value === "" ? undefined : parseFloat(value)
        }
      />

      <Label>Data de lançamento</Label>
      <Controller<TvShowFormType>
        name={`seasons.${seasonIndex}.episodes.${episodeIndex}.releaseDate`}
        control={control}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            date={value ? new Date(value as string) : undefined}
            onSelect={onChange}
          />
        )}
      />
      <p className="text-red-500 text-sm mt-1">
        {error?.releaseDate?.message?.toString()}
      </p>
    </div>
  )
}
