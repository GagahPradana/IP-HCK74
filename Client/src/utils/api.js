import axios from "axios";

const getTrendingMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    }
  );
  return response;
};

const getConfigurasionMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/configuration",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    }
  );
  return response;
};
const getSearchMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/collection",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    }
  );
  return response;
};

const getLoginData = async () => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/google-login",
  });
  return response;
};

const addListNameMovie = async (listName, token) => {
  const response = await axios.post(
    "http://localhost:3000/my-movies",
    {
      listName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
const getListName = async (token) => {
  const response = await axios.get("http://localhost:3000/my-movies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
const getMyList = async (token) => {
  const response = await axios.get("http://localhost:3000/my-movies", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
const editListNameMovie = async (listName, id, token) => {
  const response = await axios.put(
    "http://localhost:3000/my-movies/" + id,
    {
      listName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
const addListMovie = async (tags, movies, token) => {
  const response = await axios.post(
    "http://localhost:3000/my-movies",
    {
      tags,
      movies,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
const editListMovie = async (tags, movies, id, token) => {
  const response = await axios.put(
    "http://localhost:3000/my-movies/" + id,
    {
      tags,
      movies,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
const deleteMovie = async (id, token) => {
  const response = await axios.delete("http://localhost:3000/my-movies/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export {
  getTrendingMovies,
  getConfigurasionMovies,
  getLoginData,
  editListMovie,
  editListNameMovie,
  addListMovie,
  addListNameMovie,
  deleteMovie,
  getListName,
  getMyList,
  getSearchMovies,
};
