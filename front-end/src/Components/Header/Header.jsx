import classes from './Header.module.scss';

const Header = ({
  addMovieHandler,
  getAllMoviesHandler,
  getMovieByIdHandler,
}) => {
  return (
    <header className={classes.header}>
      <h2 className={classes.title}>Movies</h2>
      <div>
        <a href='/' onClick={addMovieHandler}>
          Add Movie
        </a>
        <a href='/' onClick={getMovieByIdHandler}>
          Get Movie
        </a>
        <a href='/' onClick={getAllMoviesHandler}>
          Get All Movies
        </a>
      </div>
    </header>
  );
};

export default Header;
