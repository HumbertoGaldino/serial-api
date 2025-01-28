import TMDBServices from "../services/TMDBServices.js";

const tmdbController = {
  async discoverMovies(req, res) {
    try {
      const language = req.query.lang;
      const pageOfDiscover = parseInt(req.params.page);
      const discoverMovies = await TMDBServices.discoverMovies(pageOfDiscover, language);

      res.status(200).json(discoverMovies);
    } catch (error) {
      res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }
  },

  async discoverTvShows(req, res) {
    try {
      const language = req.query.lang;
      const pageOfDiscover = parseInt(req.params.page);
      const discoverTvShows = await TMDBServices.discoverTvShow(pageOfDiscover, language);

      res.status(200).json(discoverTvShows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }
  },

  async search(req, res) {
    try {
      const language = req.query.lang;
      const pageSearch = parseInt(req.params.page);
      const { query } = req.params;
      const search = await TMDBServices.findByName(query, pageSearch, language);
      res.status(200).json(search);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }
  },

  async getTvShow(req, res) {
    try {
      const language = req.query.lang;
      const id = parseInt(req.params.id);
      const tvShowData = await TMDBServices.findTvShowByID(id, language);
      res.status(200).json(tvShowData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }
  },

  async getSeason(req, res) {
    try {
      const language = req.query.lang;
      const id = parseInt(req.params.id);
      const season = parseInt(req.params.season);
      const seasonData = await TMDBServices.findSeason(id, season, language);
      res.status(200).json(seasonData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }
  },

  async getEpisode(req, res) {
    try {
      const language = req.query.lang;
      const id = parseInt(req.params.id);
      const season = parseInt(req.params.season);
      const episode = parseInt(req.params.episode);
      const episodeData = await TMDBServices.getEpisode(id, season, episode, language);
      res.status(200).json(episodeData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }
  },

  async getMovie(req, res) {
    try {
      const language = req.query.lang;
      const id = parseInt(req.params.id);
      const movieData = await TMDBServices.findMovieByID(id, language);

      res.status(200).json(movieData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }
  },

  async getMovieTrailer(req, res) {
    try {
      const language = req.query.lang;
      const id = parseInt(req.params.id);
      const trailer = await TMDBServices.trailerMovie(id, language);

      res.status(200).json(trailer);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }
  },

  async getSeasonTrailer(req, res) {
    try {
      const language = req.query.lang;
      const id = parseInt(req.params.id);
      const trailer = await TMDBServices.trailerTvShow(id, language);

      res.status(200).json(trailer);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor, tente novamente" });
    }
  },
};

export default tmdbController;
