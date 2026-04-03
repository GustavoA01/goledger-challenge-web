import { createEpisodes, getAllEpisodes, updateEpisode } from "./episodes"
import { createSeasons, getAllSeasons, updateSeason } from "./seasons"
import { createTvShow, deleteTvShow, getAllTvShows, getTvShowByKey, updateTvShow } from "./tvShows"

export const services = {
  tvShows: {
    createTvShow,
    getAllTvShows,
    getTvShowByKey,
    deleteTvShow,
    updateTvShow
  },
  seasons: {
    createSeasons,
    getAllSeasons,
    updateSeason
  },
  episodes: {
    createEpisodes,
    getAllEpisodes,
    updateEpisode
  },
}
