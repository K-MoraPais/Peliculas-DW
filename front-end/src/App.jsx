import { useState } from 'react';
import classes from './App.module.scss';
import Header from './Components/Header/Header';
import AddMovie from './Components/Movies/AddMovie/AddMovie';
import GetMovieById from './Components/Movies/GetMovieById/GetMovieById';
import GetAllMovies from './Components/Movies/GetMovies/GetAllMovies';

const App = () => {
  const [addMovieEnabled, setAddMovieEnabled] = useState(false);
  const [getMovieEnabled, setGetMovieEnabled] = useState(false);
  const [getAllMoviesEnabled, setGetAllMovieEnabled] = useState(false);

  const enableAddMovieHandler = (event) => {
    event.preventDefault();
    setAddMovieEnabled((prevState) => !prevState);
    setGetMovieEnabled(false);
    setGetAllMovieEnabled(false);
  };

  const enableGetMovieHandler = (event) => {
    event.preventDefault();
    setGetMovieEnabled((prevState) => !prevState);
    setAddMovieEnabled(false);
    setGetAllMovieEnabled(false);
  };

  const enableGetAllMovieHandler = (event) => {
    event.preventDefault();
    setGetAllMovieEnabled((prevState) => !prevState);
    setAddMovieEnabled(false);
    setGetMovieEnabled(false);
  };

  return (
    <>
      <Header
        addMovieHandler={enableAddMovieHandler}
        getAllMoviesHandler={enableGetAllMovieHandler}
        getMovieByIdHandler={enableGetMovieHandler}
      />
      <div className={classes.content}>
        {addMovieEnabled && (
          <AddMovie addMovieHandler={enableAddMovieHandler} />
        )}
        {getAllMoviesEnabled && <GetAllMovies />}
        {getMovieEnabled && (
          <GetMovieById getMovieHandler={enableGetMovieHandler} />
        )}
      </div>
    </>
  );
};

export default App;
