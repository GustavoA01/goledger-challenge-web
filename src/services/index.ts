import { episodes } from "./episodes";
import { createSeasons, getAllSeasons } from "./seasons";
import { createTvShow, getAllTvShows } from "./tvShows";

export const services = {
  tvShows:{
    createTvShow,
    getAllTvShows
  }, seasons:{
    createSeasons,
    getAllSeasons
  } ,episodes
};