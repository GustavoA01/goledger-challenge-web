import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { EpisodeSection } from "./EpisodeSection"
import { FormLabelInput } from "../../../components/FormLabelInput"
import { Button } from "@/src/components/ui/button"
import { useFormContext } from "react-hook-form"
import { TvShowFormType } from "@/src/data/schemas"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"

type SeasonsSectionProps = {
  numberOfSeasons: number
  seasons: Record<number, { episodes: number }>
  updateEpisodes: (seasonIndex: number, episodes: number) => void
  removeSeason: () => void
  addSeason: () => void
}

export const SeasonsSection = ({
  numberOfSeasons,
  updateEpisodes,
  seasons,
  removeSeason,
  addSeason,
}: SeasonsSectionProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TvShowFormType>()

  return (
    <Card className="bg-muted/10">
      <CardHeader>
        <CardTitle>Estrutura de Lançamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={addSeason}>
            Adicionar temporada
          </Button>
          {numberOfSeasons > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeSeason}
            >
              Remover temporada
            </Button>
          )}
        </div>

        {Array.from({ length: numberOfSeasons }).map((_, seasonIndex) => {
          const error = errors?.seasons?.[seasonIndex]?.year
          return (
            <div key={seasonIndex} className="space-y-2">
              <h2 className="font-semibold text-lg">
                Temporada {seasonIndex + 1}
              </h2>

              <FormLabelInput<TvShowFormType>
                label="Ano de lançamento"
                name={`seasons.${seasonIndex}.year`}
                register={register}
                inputType="number"
                placeholder={`Ano de lançamento da temporada ${seasonIndex + 1}`}
                transformToNumber={(value) => parseFloat(value)}
                error={error}
              />

              <div className={`space-y-2`}>
                <Label>{`Número de episódios na temporada ${seasonIndex + 1}`}</Label>
                <Input
                  type="number"
                  placeholder={`Número de episódios na temporada ${seasonIndex + 1}`}
                  value={seasons[seasonIndex]?.episodes || 1}
                  onChange={(e) =>
                    updateEpisodes(seasonIndex, parseInt(e.target.value) || 1)
                  }
                />
              </div>

              {Array.from({ length: seasons[seasonIndex]?.episodes || 1 }).map(
                (_, episodeIndex) => (
                  <div key={episodeIndex} className="space-y-2">
                    <p className="font-semibold">Episódio {episodeIndex + 1}</p>
                    <EpisodeSection
                      seasonIndex={seasonIndex}
                      episodeIndex={episodeIndex}
                    />
                  </div>
                ),
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
