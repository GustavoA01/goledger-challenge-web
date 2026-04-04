import {
  createEpisodes,
  deleteEpisode,
  getAllEpisodes,
  getEpisodeByKey,
  updateEpisode,
} from "./episodes"
import {
  createSeasons,
  deleteSeason,
  getAllSeasons,
  getSeasonByKey,
  updateSeason,
} from "./seasons"
import {
  createTvShow,
  deleteTvShowCascade,
  getAllTvShows,
  getTvShowByKey,
  updateTvShow,
} from "./tvShows"
import { createWatchlist, getAllWatchlist, getWatchlistByKey, updateWatchlist } from "./watchlist"

export const services = {
  tvShows: {
    createTvShow,
    getAllTvShows,
    getTvShowByKey,
    deleteTvShowCascade,
    updateTvShow,
  },
  seasons: {
    createSeasons,
    getAllSeasons,
    getSeasonByKey,
    updateSeason,
    deleteSeason,
  },
  episodes: {
    createEpisodes,
    getAllEpisodes,
    getEpisodeByKey,
    updateEpisode,
    deleteEpisode,
  },
  watchlist: {
    createWatchlist,
    getAllWatchlist,
    getWatchlistByKey,
    updateWatchlist
  },
}
