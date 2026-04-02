"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion"
import { Card, CardContent } from "@/src/components/ui/card"
import { MainInfo } from "../components/MainInfo"
import { Chevron } from "../components/Chevron"
import { useState } from "react"

type EpisodeAccordionProps = {
  episodeTitle: string
  episodeNumber: number
  date: string
  rating: number | null
  episodeDescription: string
}

export const EpisodeAccordion = ({
  episodeTitle,
  episodeNumber,
  date,
  rating,
  episodeDescription,
}: EpisodeAccordionProps) => {
  const [openAccordion, setOpenAccordion] = useState("")

  return (
    <Accordion
      value={openAccordion}
      collapsible
      onValueChange={(value) => setOpenAccordion(value || "")}
      type="single"
    >
      <AccordionItem value={`episode-${episodeNumber}`}>
        <AccordionTrigger className="group">
          <Card className="w-full">
            <CardContent className="flex gap-10 items-center">
              <p className="text-lg sm:text-xl ml-2 text-muted-foreground">
                {episodeNumber}
              </p>
              <MainInfo
                episodeTitle={episodeTitle}
                date={date}
                rating={rating}
              />
              <Chevron />
            </CardContent>
          </Card>
        </AccordionTrigger>
        <AccordionContent className="sm:ml-4">
          <p className="text-muted-foreground">{episodeDescription}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
