export interface APITvShowsResponseType {
  "@assetType": string
  "@key": string
  "@lastTouchBy": string
  "@lastTx": string
  "@lastTxID": string
  "@lastUpdated": string
  description: string
  recommendedAge: number
  title: string
}

export type TvShowType = Pick<
  APITvShowsResponseType,
  "@key" | "description" | "recommendedAge" | "title" | "recommendedAge"
>

export interface APISeasonResponseType {
  "@assetType": "seasons";
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastTxID": string;
  "@lastUpdated": string;
  number: number;
  year: number;
  tvShow: {
    "@assetType": "tvShows";
    "@key": string;
  };
}

export type SeasonType = Pick<
  APISeasonResponseType,
  "@key" | "number" | "year" | "tvShow"
>

export interface APIEpisodeResponseType {
  "@assetType": "episodes";
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastTxID": string;
  "@lastUpdated": string;
  title: string;
  episodeNumber: number;
  description: string;
  rating?: number;
  releaseDate: string;
  season: {
    "@assetType": "seasons";
    "@key": string;
  };
}

export type EpisodeType = Pick<
  APIEpisodeResponseType,
  "@key" | "title" | "episodeNumber" | "description" | "rating" | "releaseDate" | "season"
>