import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { AgeSelect } from "@/src/features/form/components/AgeSelect"
import { useFormContext } from "react-hook-form"
import { FormLabelInput } from "../../../components/FormLabelInput"
import { TvShowFormType } from "@/src/data/schemas"

export const DetailsSection = ({
  disableTitle,
}: {
  disableTitle?: boolean
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TvShowFormType>()

  return (
    <Card className="bg-muted/10">
      <CardHeader>
        <CardTitle>Detalhes Principais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormLabelInput<TvShowFormType>
          name="title"
          label="Título da Série"
          placeholder="Ex: Breaking Bad"
          error={errors.title}
          register={register}
          disabled={disableTitle}
        />

        <div className="space-y-2">
          <Label>Descrição (Sinopse)</Label>
          <Textarea
            placeholder="EX: um professor de química..."
            className="resize-none"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description?.message?.toString()}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Classificação Indicativa</Label>
          <AgeSelect />
          {errors.recommendedAge && (
            <p className="text-red-500 text-sm mt-1">
              {errors.recommendedAge?.message?.toString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
