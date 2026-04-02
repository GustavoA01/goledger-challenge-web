import { createEpisodes, getAllEpisodes } from "./episodes"
import { createSeasons, getAllSeasons, getSeasonsByKey } from "./seasons"
import { createTvShow, getAllTvShows, getTvShowByKey } from "./tvShows"

export const services = {
  tvShows: {
    createTvShow,
    getAllTvShows,
    getTvShowByKey,
  },
  seasons: {
    createSeasons,
    getAllSeasons,
    getSeasonsByKey
  },
  episodes: {
    createEpisodes,
    getAllEpisodes,
  },
}
