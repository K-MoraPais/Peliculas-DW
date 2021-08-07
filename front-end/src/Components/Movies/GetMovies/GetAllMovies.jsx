import classes from './GetAllMovies.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const GetAllMovies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/getAll')
      .then((response) => {
        console.log(response);
        setMovies(
          response.data.map((movie, index) => {
            return (
              <div key={index} className={classes.singleMovie}>
                <img className={classes.image} src={movie.img} alt='images' />
                <div>
                  <h2 className={classes.title}>
                    {movie.nombre.trim().toUpperCase()}
                  </h2>
                </div>
              </div>
            );
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div className={classes.movieContainer}>{movies}</div>;
};

export default GetAllMovies;
