import classes from "./GetAllMovies.module.scss";
import FetchMovies from "../Fetch/fetch-movies";
import { useEffect } from "react";

const GetAllMovies = ({ enableGetAllMovieHandler }) => {
  let movies;

  const test = async () => {
    const response = await FetchMovies({ type: 'GETALL' });
    return response.data;
  };

  const fetchMovies = async () => {
    const objectArray = await test();

    const movies = objectArray.map((movie, index) => {
      return (
        <div className={classes.singleMovie} key={index}>
          {movie.nombre}
        </div>
      );
    });

    return movies;
  };
  useEffect(() => {
    movies = fetchMovies();
  }, [movies]);

  return <div className={classes.movieContainer}>{movies}</div>;
};
export default GetAllMovies;
