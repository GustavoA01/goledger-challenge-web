"use client"
import { Card } from "../../components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"
import {
  APIEpisodeResponseType,
  APISeasonResponseType,
  TvShowType,
} from "../../data/types"
import { CardShowContent } from "../components/CardShowContent"
import { CardShowHeader } from "../components/CardShowHeader"

type TvShowCardProps = Omit<TvShowType, "@key"> & {
  seasonWithEpisodes: {
    seasons: APISeasonResponseType[]
    episodes: APIEpisodeResponseType[]
  }
}

export const TvShowCard = ({
  title,
  description,
  recommendedAge,
  seasonWithEpisodes,
}: TvShowCardProps) => {
  return (
      <Accordion collapsible type="single" className="w-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer" asChild>
            <Card className="w-full">
              <CardShowHeader
                handleAddToFavorites={() => {}}
                title={title}
              />
              <CardShowContent
                recommendedAge={recommendedAge}
                seasonWithEpisodes={seasonWithEpisodes}
              />
            </Card>
          </AccordionTrigger>
          <AccordionContent>{description}</AccordionContent>
        </AccordionItem>
      </Accordion>
      
  )
}
