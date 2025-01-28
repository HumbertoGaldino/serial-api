import { api, apiKey } from "./api.js";

const findByName = async (query, pageSearch, lang = "pt-BR") => {
  const {
    data: { page, results, total_pages, total_results },
  } = await api.get(
    `search/multi?api_key=${apiKey}&query=${query}&page=${pageSearch}&language=${lang}&include_adult=false`
  );
  return { page, results, total_pages, total_results };
};

const findTvShowByID = async (id, lang = "pt-BR") => {
  const { data: serie } = await api.get(
    `tv/${id}?api_key=${apiKey}&language=${lang}`
  );
  return serie;
};

const findSeason = async (id, seasonNumber, lang = "pt-BR") => {
  const { data: season } = await api.get(
    `tv/${id}/season/${seasonNumber}?api_key=${apiKey}&language=${lang}`
  );
  return season;
};

const getEpisode = async (idTvShow, seasonNumber, episodeNumber, lang = "pt-BR") => {
  const { data: episode } = await api.get(
    `tv/${idTvShow}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${apiKey}&language=${lang}`
  );
  return episode;
};

const findMovieByID = async (id, lang = "pt-BR") => {
  const { data: movie } = await api.get(
    `movie/${id}?api_key=${apiKey}&language=${lang}`
  );
  return movie;
};

const discoverMovies = async (pageOfDiscover, lang = "pt-BR") => {
  const {
    data: { page, results, total_pages, total_results },
  } = await api.get(
    `discover/movie?api_key=${apiKey}&language=${lang}&page=${pageOfDiscover}`
  );
  return { page, results, total_pages, total_results };
};

const discoverTvShow = async (pageOfDiscover, lang = "pt-BR") => {
  const {
    data: { page, results, total_pages, total_results },
  } = await api.get(
    `discover/tv?api_key=${apiKey}&language=${lang}&page=${pageOfDiscover}`
  );
  return { page, results, total_pages, total_results };
};

const trailerTvShow = async (id, lang = "pt-BR") => {
  const { data: trailer } = await api.get(
    `tv/${id}/season/1/videos?api_key=${apiKey}&language=${lang}`
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

const trailerMovie = async (id, lang = "pt-BR") => {
  const { data: trailer } = await api.get(
    `movie/${id}/videos?api_key=${apiKey}&language=${lang}`
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
