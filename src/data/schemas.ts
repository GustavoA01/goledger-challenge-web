import { z } from "zod"

const episodeSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z
    .string()
    .min(10, "A descrição deve conter pelo menos 10 caracteres"),
  releaseDate: z.date({ message: "Data de lançamento obrigatória" }),
  rating: z
    .number()
    .min(0, { error: "A avaliação deve ser um número entre 0 e 10" })
    .max(10, { error: "A avaliação deve ser um número entre 0 e 10" })
    .optional(),
})

const seasonSchema = z.object({
  year: z
    .number({ message: "Ano obrigatório" })
    .min(1900)
    .max(2030, "Ano deve ser entre 1900 e 2030"),
  episodes: z.array(episodeSchema),
})

export const tvShowSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z
    .string()
    .min(10, "A descrição deve conter pelo menos 10 caracteres"),
  recommendedAge: z.string({ message: "Classificação indicativa obrigatória" }),
  seasons: z.array(seasonSchema),
})

export type TvShowFormType = z.infer<typeof tvShowSchema>
