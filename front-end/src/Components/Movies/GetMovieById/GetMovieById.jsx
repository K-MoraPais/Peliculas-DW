import classes from './GetMovieById.module.scss';
import { useEffect, useState } from 'react';
import useInput from '../../../Hooks/use-inputs';
import FetchMovies from '../Fetch/fetch-movies';

const isNotEmpty = (value) => value.trim() !== '';

const GetMovieById = ({ getMovieHandler }) => {
  const [movie, setMovie] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: enteredId,
    hasError: idInputHasError,
    isValid: enteredIdIsValid,
    valueChangeHandler: idChangeHandler,
    inputBlurHandler: idBlurHandler,
    reset: idInputReset,
  } = useInput(isNotEmpty);

  useEffect(() => {
    if (enteredIdIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredIdIsValid]);

  const searchMovieHandler = async (event) => {
    event.preventDefault();

    const response = await FetchMovies({
      type: 'GETBYID',
      data: { id: enteredId },
    });

    const data = response.data;

    if (data.length === 0) {
      idInputReset();
      return setMovie(
        <div
          className={classes['single-movie']}
          style={{
            alignItems: 'center',
            height: 'auto',
            margin: '2rem 0 2rem 2rem',
            minHeight: 'auto',
          }}
        >
          <h2 style={{ color: '#ffffff', margin: '0', height: 'auto' }}>
            No movies with that id.
          </h2>
        </div>
      );
    }
    idInputReset();
    return setMovie(
      <div className={classes['single-movie']}>
        <img className={classes.image} src={data[0].img} alt='images' />
        <div>
          <h2 className={classes.title}>
            {data[0].nombre.trim().toUpperCase()}
          </h2>
        </div>
      </div>
    );
  };

  let idInvalidInputClasses = idInputHasError ? classes['invalid'] : '';

  return (
    <div className={classes['movie-container']}>
      <form className={classes['form']} onSubmit={searchMovieHandler}>
        <div className={`${idInvalidInputClasses}`}>
          <label htmlFor='id'>Movie Id</label>
          <input
            type='number'
            min='0'
            id='id'
            onChange={idChangeHandler}
            onBlur={idBlurHandler}
            value={enteredId}
          />
          {idInputHasError && (
            <p className={classes['error-text']}>Id can't be empty</p>
          )}
        </div>

        <div className={classes.buttons}>
          <button type='button' onClick={getMovieHandler}>
            CANCEL
          </button>
          <button type='submit' disabled={!formIsValid} className={classes.add}>
            ADD
          </button>
        </div>
      </form>
      {movie}
    </div>
  );
};

export default GetMovieById;
