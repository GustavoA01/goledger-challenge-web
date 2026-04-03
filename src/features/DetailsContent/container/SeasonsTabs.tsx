"use client"
import { Tabs, TabsContent } from "@/src/components/ui/tabs"
import { EpisodeAccordion } from "./EpisodeAccordion"
import { format } from "date-fns"
import { APIEpisodeResponseType, APISeasonResponseType } from "@/src/data/types"
import { useState } from "react"

type SeasonsTabsProps = {
  seasons: APISeasonResponseType[]
  episodes: APIEpisodeResponseType[]
}

export const SeasonsTabs = ({ seasons, episodes }: SeasonsTabsProps) => {
  const [tabsValue, setTabValue] = useState("season-1")

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="season-1" value={tabsValue} className="w-full">
        <div className="flex mb-6 overflow-x-auto hide-scrollbar">
          {seasons.map((season) => (
            <div
              key={season.number}
              onClick={() => setTabValue(`season-${season.number}`)}
              className={`border-b-2 cursor-pointer py-2 px-4 min-w-35 text-muted-foreground transition-all duration-200 ${
                tabsValue === `season-${season.number}`
                  ? "border-b-primary text-primary"
                  : "hover:text-white"
              }`}
            >
              Temporada {season.number}
            </div>
          ))}
        </div>

        {seasons.map((season) => (
          <TabsContent
            key={season.number}
            value={`season-${season.number}`}
            defaultValue={"season-1"}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold ">
                Temporada {season.number}
              </h2>
              <div>
                {episodes
                  .filter(
                    (episode) => episode.season["@key"] === season["@key"],
                  )
                  .sort((a, b) => a.episodeNumber - b.episodeNumber)
                  .map((episode) => (
                    <EpisodeAccordion
                      key={episode["@key"]}
                      episodeTitle={episode.title}
                      episodeNumber={episode.episodeNumber}
                      date={format(new Date(episode.releaseDate), "dd/MM/yyyy")}
                      rating={episode.rating ?? null}
                      episodeDescription={episode.description}
                    />
                  ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
