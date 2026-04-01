import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { EpisodeSection } from "./EpisodeSection"
import { FormLabelInput } from "./FormLabelInput"
import { Button } from "@/src/components/ui/button"

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
  return (
    <Card className="bg-muted/10">
      <CardHeader>
        <CardTitle>Estrutura de Lançamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={addSeason}>
            + Temporada
          </Button>
          {numberOfSeasons > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeSeason}
            >
              - Temporada
            </Button>
          )}
        </div>
        {Array.from({ length: numberOfSeasons }).map((_, seasonIndex) => (
          <div key={seasonIndex} className="space-y-2">
            <div className="flex items-center gap-2">
              <FormLabelInput
                label={`Temporada ${seasonIndex + 1}`}
                placeholder={`Número da temporada ${seasonIndex + 1}`}
              />
            </div>
            <FormLabelInput
              label={`Número de episódios na temporada ${seasonIndex + 1}`}
              inputType="number"
              placeholder={`Número de episódios na temporada ${seasonIndex + 1}`}
              value={seasons[seasonIndex]?.episodes || 1}
              onChangeFn={(value) =>
                updateEpisodes(seasonIndex, parseInt(value) || 1)
              }
            />

            {Array.from({ length: seasons[seasonIndex]?.episodes || 1 }).map(
              (_, episodeIndex) => (
                <div key={episodeIndex} className="space-y-2">
                  <p className="font-semibold">Episódio {episodeIndex + 1}</p>
                  <EpisodeSection index={episodeIndex} />
                </div>
              ),
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
