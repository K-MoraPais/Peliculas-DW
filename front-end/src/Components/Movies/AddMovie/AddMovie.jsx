import { useEffect, useState } from 'react';
import useInput from '../../../Hooks/use-inputs';

import FetchMovies from '../Fetch/fetch-movies';

import classes from './AddMovie.module.scss';

const isNotEmpty = (value) => value.trim() !== '';

const AddMovie = ({ addMovieHandler }) => {
  const [formIsValid, setFormIsValid] = useState();

  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameInputReset,
  } = useInput(isNotEmpty);

  const {
    value: enteredImage,
    hasError: imageInputHasError,
    isValid: enteredImageIsValid,
    valueChangeHandler: imageChangeHandler,
    inputBlurHandler: imageBlurHandler,
    reset: imageInputReset,
  } = useInput(isNotEmpty);

  useEffect(() => {
    if (enteredNameIsValid && enteredImageIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredImageIsValid, enteredNameIsValid]);

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const res = await FetchMovies({
      type: 'ADD',
      data: { nombre: `${enteredName.trim()}`, img: `${enteredImage}` },
    });

    if (res.data === 'Pelicula ingresada correctamente') {
      console.log(res.data);
    }

    nameInputReset();
    imageInputReset();
  };

  let nameInvalidInputClasses = nameInputHasError ? classes['invalid'] : '';
  let imageInvalidInputClasses = imageInputHasError ? classes['invalid'] : '';

  return (
    <>
      <div className={classes.backdrop} onClick={addMovieHandler}></div>
      <div className={classes['add-movie']}>
        <h2>Add Movie</h2>
        <form className={classes.form} onSubmit={submitFormHandler}>
          <div className={classes.inputs}>
            <div className={`${nameInvalidInputClasses}`}>
              <label htmlFor='name'>Movie Name</label>
              <input
                type='text'
                id='name'
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                value={enteredName}
              />
              {nameInputHasError && (
                <p className={classes['error-text']}>Name can't be empty</p>
              )}
            </div>
            <div className={`${imageInvalidInputClasses}`}>
              <label htmlFor='image'>Image (URL)</label>
              <input
                type='url'
                id='image'
                onChange={imageChangeHandler}
                onBlur={imageBlurHandler}
                value={enteredImage}
              />
              {imageInputHasError && (
                <p className={classes['error-text']}>Image can't be empty</p>
              )}
            </div>
          </div>
          <div className={classes.buttons}>
            <button type='button' onClick={addMovieHandler}>
              CANCEL
            </button>
            <button
              type='submit'
              disabled={!formIsValid}
              className={classes.add}
            >
              ADD
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddMovie;
