import classes from "./GetAllMovies.module.scss";

const response = [
  { img: "A", nombre: "nombre" },
  { img: "B", nombre: "nombre" },
  { img: "C", nombre: "nombre" },
  { img: "D", nombre: "nombre" },
  { img: "E", nombre: "nombre" },
  { img: "F", nombre: "nombre" },
  { img: "G", nombre: "nombre" },
  { img: "H", nombre: "nombre" },

];
const GetAllMovies = ({ enableGetAllMovieHandler }) => {
  enableGetAllMovieHandler = (
    <div className={classes.movieContainer}>
      {response.map((movies) => (
        <div className={classes.singleMovie} key={movies}>
          {movies.img}
        </div>
      ))}
    </div>
  );

  return enableGetAllMovieHandler;
};
export default GetAllMovies;
