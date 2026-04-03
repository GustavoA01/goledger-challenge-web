import { createEpisodes, getAllEpisodes } from "./episodes"
import { createSeasons, getAllSeasons } from "./seasons"
import { createTvShow, deleteTvShow, getAllTvShows, getTvShowByKey } from "./tvShows"

export const services = {
  tvShows: {
    createTvShow,
    getAllTvShows,
    getTvShowByKey,
    deleteTvShow
  },
  seasons: {
    createSeasons,
    getAllSeasons,
  },
  episodes: {
    createEpisodes,
    getAllEpisodes,
  },
}
