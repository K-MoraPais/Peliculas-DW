import classes from "./Header.module.scss";

const Header = ({ addMovieHandler, getAllMoviesHandler }) => {
  return (
    <header className={classes.header}>
      <h2 className={classes.title}>Movies</h2>
      <div>
        <a href="/" onClick={addMovieHandler}>
          Add Movie
        </a>
        <a href="/" onClick={getAllMoviesHandler}>
          Get Movie
        </a>
        <a href="/">Get All Movies</a>
      </div>
    </header>
  );
};

export default Header;
