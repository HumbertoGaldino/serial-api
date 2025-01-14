import { api, apiKey } from "./api.js";

const findByName = async (query, pageSearch) => {
  const {
    data: { page, results, total_pages, total_results },
  } = await api.get(
    `search/multi?api_key=${apiKey}&query=${query}&page=${pageSearch}&language=pt-Br&include_adult=false`
  );
  return { page, results, total_pages, total_results };
};

const findTvShowByID = async (id) => {
  const { data: serie } = await api.get(
    `tv/${id}?api_key=${apiKey}&language=pt-BR`
  );
  return serie;
};

const findSeason = async (id, seasonNumber) => {
  const { data: season } = await api.get(
    `tv/${id}/season/${seasonNumber}?api_key=${apiKey}&language=pt-BR`
  );
  return season;
};

const getEpisode = async (idTvShow, seasonNumber, episodeNumber) => {
  const { data: episode } = await api.get(
    `tv/${idTvShow}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${apiKey}&language=pt-BR`
  );
  return episode;
};

const findMovieByID = async (id) => {
  const { data: movie } = await api.get(
    `movie/${id}?api_key=${apiKey}&language=pt-BR`
  );
  return movie;
};

const discoverMovies = async (pageOfDiscover) => {
  const {
    data: { page, results, total_pages, total_results },
  } = await api.get(
    `discover/movie?api_key=${apiKey}&language=pt-BR&page=${pageOfDiscover}`
  );
  return { page, results, total_pages, total_results };
};

const discoverTvShow = async (pageOfDiscover) => {
  const {
    data: { page, results, total_pages, total_results },
  } = await api.get(
    `discover/tv?api_key=${apiKey}&language=pt-BR&page=${pageOfDiscover}`
  );
  return { page, results, total_pages, total_results };
};

const trailerTvShow = async (id) => {
  const { data: trailer } = await api.get(
    `tv/${id}/season/1/videos?api_key=${apiKey}&language=pt-BR`
  );

  if (trailer.results.length == 0) {
    const { data: trailer2 } = await api.get(
      `tv/${id}/season/1/videos?api_key=${apiKey}`
    );

    if (trailer2.results.length == 0) {
      return "Tailer não existe";
    }

    const key2 = trailer2.results[0].key;
    return `https://www.youtube.com/watch?v=${key2}`;
  }

  const key = trailer.results[0].key;

  return `https://www.youtube.com/watch?v=${key}`;
};

const trailerMovie = async (id) => {
  const { data: trailer } = await api.get(
    `movie/${id}/videos?api_key=${apiKey}&language=pt-BR`
  );

  if (trailer.results.length == 0) {
    const { data: trailer2 } = await api.get(
      `movie/${id}/videos?api_key=${apiKey}`
    );

    if (trailer2.results.length == 0) {
      return "Tailer não existe";
    }

    const key2 = trailer2.results[0].key;
    return `https://www.youtube.com/watch?v=${key2}`;
  }
  const key = trailer.results[0].key;
  return `https://www.youtube.com/watch?v=${key}`;
};

export default {
  findByName,
  findTvShowByID,
  findSeason,
  getEpisode,
  findMovieByID,
  discoverMovies,
  discoverTvShow,
  trailerTvShow,
  trailerMovie,
};
